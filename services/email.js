const transporter = require('../configs/mailer');
const otpEmailTemplate = require('../templates/email/otp');

exports.sendOtpEmail = async (email, otp) => {
    const { subject, html } = otpEmailTemplate(otp, email);
    await transporter.sendMail({
        from: `"TSBI TECH" <tech@tsbi.in>`,
        to: email,
        subject,
        html
    });
};
