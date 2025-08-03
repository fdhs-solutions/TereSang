// utils/mailer.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
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
