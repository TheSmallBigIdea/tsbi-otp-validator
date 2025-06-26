const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: 'tech@tsbi.in',  // Replace with your Outlook email
        pass: 'H^852830955367ay',       // Use an app password if MFA is enabled
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

module.exports = transporter;
