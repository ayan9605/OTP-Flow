const { redisClient } = require('../config/redis');
const generateOtp = require('../utils/generateOtp');

const OTP_EXPIRY = 300; // 5 minutes in seconds
const COOLDOWN_TIME = 60; // 60 seconds
const MAX_ATTEMPTS = 3;

class OtpService {
    static async createAndStoreOtp(email, type) {
        const cooldownKey = `cooldown:${email}`;
        
        // Check 60-second cooldown to prevent spam
        const onCooldown = await redisClient.get(cooldownKey);
        if (onCooldown) {
            throw new Error(`Please wait ${COOLDOWN_TIME} seconds before requesting a new OTP.`);
        }

        const otp = generateOtp();
        const otpKey = `otp:${type}:${email}`;
        const attemptsKey = `attempts:${type}:${email}`;

        // Multi-exec for atomic operations
        const multi = redisClient.multi();
        multi.setEx(otpKey, OTP_EXPIRY, otp);
        multi.setEx(cooldownKey, COOLDOWN_TIME, '1');
        multi.setEx(attemptsKey, OTP_EXPIRY, '0');
        await multi.exec();

        return otp;
    }

    static async verifyOtp(email, otp, type) {
        const otpKey = `otp:${type}:${email}`;
        const attemptsKey = `attempts:${type}:${email}`;

        const [storedOtp, attemptsStr] = await Promise.all([
            redisClient.get(otpKey),
            redisClient.get(attemptsKey)
        ]);

        if (!storedOtp) {
            throw new Error('OTP expired or invalid.');
        }

        let attempts = parseInt(attemptsStr || '0', 10);
        
        if (attempts >= MAX_ATTEMPTS) {
            await redisClient.del(otpKey); // Prevent brute force
            throw new Error('Maximum verification attempts exceeded. Please request a new OTP.');
        }

        if (storedOtp !== otp) {
            await redisClient.incr(attemptsKey);
            throw new Error(`Invalid OTP. You have ${MAX_ATTEMPTS - attempts - 1} attempts left.`);
        }

        // Clean up keys on success
        await Promise.all([
            redisClient.del(otpKey),
            redisClient.del(attemptsKey)
        ]);

        return true;
    }
}

module.exports = OtpService;
