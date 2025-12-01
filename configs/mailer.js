const nodemailer = require("nodemailer");

/* ---------------- PRIMARY: OUTLOOK ---------------- */
const outlookConfig = {
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: "tech@tsbi.in",
        pass: process.env.OUTLOOK_APP_PASS,
    },
    tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
    },
};

/* ---------------- FALLBACK: GMAIL ---------------- */
const gmailConfig = {
    service: "gmail",
    auth: {
        user: "thesmallbigidea1@gmail.com",
        pass: process.env.GMAIL_APP_PASS,
    },
};

let transporter = nodemailer.createTransport(outlookConfig);

/* ------------ AUTO-SELECT WORKING TRANSPORTER ------------- */
(async () => {
    try {
        await transporter.verify();
        console.log("✅ Using OUTLOOK SMTP");
    } catch (err) {
        console.error("❌ Outlook failed, switching to Gmail:", err.response || err);

        transporter = nodemailer.createTransport(gmailConfig);

        try {
            await transporter.verify();
            console.log("✅ Using GMAIL SMTP (fallback)");
        } catch (gmailErr) {
            console.error("❌ Gmail also failed!", gmailErr.response || gmailErr);
        }
    }
})();




module.exports = transporter;
