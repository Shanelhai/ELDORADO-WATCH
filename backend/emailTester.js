import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config(); // Load .env file

// Function to send a test email
async function sendTestEmail(toEmail, subject, message) {
    try {
        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT), // convert to number
            secure: true, // true for 465
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Mail options
        const mailOptions = {
            from: `"Test Sender" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: subject,
            text: message,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully! Message ID:", info.messageId);
    } catch (err) {
        console.error("Error sending email:", err);
    }
}

// Example usage: replace with your test recipient
const testRecipient = "receiver@example.com";
const testSubject = "Test Email from emailTester.js";
const testMessage = "Hello! This is a test email sent using Nodemailer in Node.js.";

sendTestEmail(testRecipient, testSubject, testMessage);
