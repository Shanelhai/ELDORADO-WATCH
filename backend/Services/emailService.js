import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendOrderEmail(toEmail, orderId) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: true, 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Watch Store" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: "Order Confirmation",
            text: `Your order (ID: ${orderId}) has been successfully placed. You will receive your order in 4 days. Thank you for shopping with us!`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Order confirmation email sent! Message ID:", info.messageId);
    } catch (err) {
        console.error("Error sending order email:", err);
    }
}
