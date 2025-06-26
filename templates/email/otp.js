module.exports = function otpEmailTemplate(otp, recipientEmail) {
  return {
    subject: 'Your OTP Code for Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #2E86DE;">🔐 Email Verification Code</h2>
        <p>Hi ${recipientEmail},</p>

        <p>Here is your One-Time Password (OTP) to verify your email address:</p>

        <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #333; margin: 20px 0; text-align: center;">
          ${otp}
        </div>

        <p>This code is valid for <strong>5 minutes</strong>. Do not share this OTP with anyone.</p>

        <p style="color: #999;">If you didn't request this code, please ignore this email.</p>

        <hr style="margin: 30px 0;">
        <footer style="text-align: center; font-size: 12px; color: #aaa;">
          &copy; ${new Date().getFullYear()} TheSmallBigIdea. All rights reserved.
        </footer>
      </div>
    `
  };
};
