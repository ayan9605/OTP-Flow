const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // 🔥 The magic setting: Enables connection pooling
    pool: true, 
    host: process.env.SMTP_HOST || 'mail.nodrix.in',
    port: process.env.SMTP_PORT || 465,
    secure: true, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    // Pool configuration options
    maxConnections: 5,   // Maximum number of simultaneous connections to keep open
    maxMessages: 100,    // Restart a connection after 100 emails (prevents cPanel timeouts)
    rateLimit: 5,        // Max emails to send per second (prevents cPanel from blocking you for spamming)
    rateDelta: 1000      // Timeframe for the rate limit (1000ms = 1 second)
});

// Verify the connection pool when the server starts
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Pool Connection Error:', error);
    } else {
        console.log('SMTP Connection Pool is ready and authenticated');
    }
});

module.exports = transporter;
