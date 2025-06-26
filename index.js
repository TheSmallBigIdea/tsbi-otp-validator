require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.SERVER_PORT || 3000;

// ========================
// ✅ Rate Limiter
// ========================
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per windowMs
    message: {
        error: 'Too many requests. Please try again later.'
    }
});
app.use(limiter);

// ========================
// ✅ Middlewares
// ========================
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ========================
// ✅ Routes
// ========================
app.use('/api', require('./routes'));

// ========================
// ✅ 404 Handler
// ========================
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// ========================
// ✅ Global Error Handler
// ========================
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// ========================
app.listen(port, () => {
    console.log(`🚀 Server listening at http://localhost:${port}`);
});
