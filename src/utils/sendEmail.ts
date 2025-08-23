import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  otp: string,
  expiry: Date
) => {
  const expiryTime = expiry.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #4CAF50; text-align: center;">myFOODIE - Password Reset</h2>
      <p>Hi,</p>
      <p>You requested to reset your password. Use the OTP below to proceed:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; background: #4CAF50; color: white; padding: 12px 24px; border-radius: 6px; font-size: 24px; letter-spacing: 3px;">
          ${otp}
        </span>
      </div>
      <p style="color: #333;">⏳ This OTP will expire in <b>5 minutes</b> (at <b>${expiryTime}</b>).</p>
      <p style="color: #ef310bff;">Please do not share it with anyone.</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <br/>
      <p>Best regards,</p>
      <p><b>The myFOODIE Team</b></p>
    </div>
  `;

  await transporter.sendMail({
    from: `"myFOODIE" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlTemplate,
  });
};
