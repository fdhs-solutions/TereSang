// utils/mailer.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
});

// Test transporter to verify SMTP connection
transporter.verify(function (error, success) {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log('SMTP server is ready to send emails ✅');
    }
});

export const sendResetOtpEmail = async ({ to, subject, text }) => {
    await transporter.sendMail({
        to,
        from: process.env.FROM_EMAIL,
        subject,
        text
    });
};

// call sendOtp(email, otp)
export const sendOtp = async (email, firstName, otp) => {
    const html = createOtpEmailTemplate(otp, firstName, email);

    const mailOptions = {
        from: process.env.MAIL_USER || `"No Reply" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Your OTP for password reset",
        html
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
};


// OTP Email Template
const createOtpEmailTemplate = (otpCode, firstName, email) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP verification for forgot password</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
        
        <div style="background-color: rgba(12, 13, 14, 1); padding: 10px; text-align: center;">
            <img src="https://plus.unsplash.com/premium_photo-1674235766088-80d8410f9523?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2VkZGluZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D" />
        </div>

        <div style="padding: 30px; text-align: center;">
            <h2 style="font-size: 24px; color: #1a1a1a; margin-bottom: 20px;">OTP Verification</h2>
            ${firstName ? `<p style="font-size: 16px; line-height: 1.6; color: #555;">Hello ${firstName},</p>` : ''}
            <p style="font-size: 16px; line-height: 1.6; color: #555;">Your verification code for password reset is:</p>
            
            <div style="background-color: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h1 style="font-size: 32px; color: #007bff; margin: 0; letter-spacing: 8px; font-weight: bold;">${otpCode}</h1>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #555;">This code will expire in ${process.env.OTP_EXPIRY_MINUTES} minutes.</p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">If you didn't request this code, please ignore this email.</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #777;">
            <p style="margin: 0;">&copy; 2025 Teresung. All rights reserved.</p>
            <p style="margin: 0;">Need help? <a href="mailto:support@fdhssolution@gmail.com" style="color: #007bff; text-decoration: none;">Contact Support</a></p>
        </div>

    </div>
</body>
</html>
    `;
};