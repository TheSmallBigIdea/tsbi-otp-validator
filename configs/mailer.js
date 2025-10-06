


const nodemailer = require('nodemailer');

console.log('SMTP Password = ', process.env.SMTP_PASS)

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,               // STARTTLS (not SMTPS)
    requireTLS: true,
    auth: {
        user: 'tech@tsbi.in',      // must be the actual sign-in mailbox
        pass: process.env.SMTP_PASS, // move the secret to env
    },
    tls: {
        minVersion: 'TLSv1.2',     // Office 365 requires modern TLS
        servername: 'smtp.office365.com',
    },
});

(async () => {
    try {
        await transporter.verify();
        console.log('SMTP OK');
    } catch (e) {
        console.error('SMTP verify failed:', {
            code: e.code,
            responseCode: e.responseCode,
            command: e.command,
            response: e.response,
        });
    }
})();

module.exports = transporter;

