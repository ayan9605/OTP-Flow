const crypto = require('crypto');

const generateOtp = () => {
    // Generates a cryptographically secure 6-digit OTP
    return crypto.randomInt(100000, 999999).toString();
};

module.exports = generateOtp;
