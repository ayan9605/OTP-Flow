require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectRedis } = require('./config/redis');
const otpRoutes = require('./routes/otpRoutes');

const app = express();

// Trust the reverse proxy (Render) to correctly resolve the user's IP for rate limiting
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: '*', // Adjust for production (e.g., ['https://nodrix.in', 'app://android'])
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '10kb' })); 

// Global Rate Limiting to prevent massive abuse
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', apiLimiter);

// Routes
app.use('/api/auth', otpRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Nodrix OTP API is running' });
});

// Initialization
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectRedis();
        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
