const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // STARTTLS
    auth: {
        user: 'tech@tsbi.in',
        pass: process.env.SMTP_APP_PASS, // App Password
    },
    tls: {
        rejectUnauthorized: false, // avoids TLS handshake error
        minVersion: 'TLSv1.2',     // modern TLS required by Outlook
    },
});

// Verify connection
(async () => {
    try {
        await transporter.verify();
        console.log('SMTP connected successfully');
    } catch (err) {
        console.error('SMTP verify failed:', {
            code: err.code,
            responseCode: err.responseCode,
            command: err.command,
            response: err.response,
        });
    }
})();

module.exports = transporter;
