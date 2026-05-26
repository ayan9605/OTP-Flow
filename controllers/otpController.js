const OtpService = require('../services/otpService');
const { sendOtpEmail } = require('../services/emailService');

// Basic email regex validation
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validTypes = ['register', 'forgot-password'];

const sendOtp = async (req, res) => {
    try {
        const { email, type } = req.body;

        if (!email || !type || !isValidEmail(email)) {
            return res.status(400).json({ success: false, message: 'Valid email and type are required.' });
        }

        if (!validTypes.includes(type)) {
            return res.status(400).json({ success: false, message: 'Invalid OTP type.' });
        }

        const otp = await OtpService.createAndStoreOtp(email, type);
        await sendOtpEmail(email, otp, type);

        return res.status(200).json({ 
            success: true, 
            message: 'OTP sent successfully to your email.' 
        });

    } catch (error) {
        if (error.message.includes('wait')) {
            return res.status(429).json({ success: false, message: error.message });
        }
        console.error('Send OTP Error:', error);
        return res.status(500).json({ success: false, message: 'Failed to process OTP request.' });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp, type } = req.body;

        if (!email || !otp || !type) {
            return res.status(400).json({ success: false, message: 'Email, OTP, and type are required.' });
        }

        await OtpService.verifyOtp(email, otp, type);

        return res.status(200).json({ 
            success: true, 
            message: 'Email verified successfully.' 
        });

    } catch (error) {
        const isBruteForceOrInvalid = error.message.includes('Invalid') || error.message.includes('Maximum') || error.message.includes('expired');
        const status = isBruteForceOrInvalid ? 400 : 500;
        
        return res.status(status).json({ success: false, message: error.message });
    }
};

module.exports = { sendOtp, verifyOtp };
