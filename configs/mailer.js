


const nodemailer = require('nodemailer');

console.log('SMTP Password = ', process.env.SMTP_PASS)

const transporter = nodemailer.createTransport({
    service: 'gmail', // simpler than specifying host/port manually
    auth: {
        user: 'thesmallbigidea1@gmail.com',
        pass: 'meiu tjlt edoa sezi', // must be an App Password, not your regular Gmail password
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

