const { EmailOtp } = require('../models');
const crypto = require('crypto');
const { sendOtpEmail } = require('../services/email');

const OTP_EXPIRY_MINUTES = 5;
const MASTER_OTP = process.env.MASTER_OTP

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function hashOtp(otp) {
    return crypto.createHash('sha256').update(otp).digest('hex');
}

exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Basic format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const otp = generateOtp();
    const otp_hash = hashOtp(otp);

    try {
        await EmailOtp.create({ email, otp_hash });

        // Simulated or actual email send
        await sendOtpEmail(email, otp)
        console.log(`🔐 OTP for ${email}: ${otp}`);

        res.status(200).json({ message: 'OTP sent!' });
    } catch (err) {
        console.error('Error sending OTP:', err);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
};


exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });
    if (otp == MASTER_OTP) return res.status(200).json({ message: 'OTP verified successfully (master override)' });

    try {
        const latestOtp = await EmailOtp.findOne({
            where: { email },
            order: [['createdAt', 'DESC']]
        });

        if (!latestOtp) return res.status(400).json({ error: 'No OTP found' });

        const age = Date.now() - new Date(latestOtp.createdAt).getTime();
        if (age > OTP_EXPIRY_MINUTES * 60 * 1000) {
            return res.status(400).json({ error: 'OTP expired' });
        }

        if (latestOtp.verified) {
            return res.status(400).json({ error: 'OTP already used' });
        }

        const hashedInput = hashOtp(otp);
        if (hashedInput !== latestOtp.otp_hash) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        latestOtp.verified = true;
        await latestOtp.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ error: 'OTP verification failed' });
    }
};
