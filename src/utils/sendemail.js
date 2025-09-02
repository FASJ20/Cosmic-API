import nodemailer from 'nodemailer';
import { email_host, email_pass, email_port, email_secure, email_service, email_user } from '../config/env.config.js';

const transporter = nodemailer.createTransport({
    host: email_host,
    service: email_service,
    port: email_port,
    secure: email_secure,
    auth: {
        user: `${email_user}`,
        pass: `${email_pass}`
    }
});

export const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
        from: `${email_user}`,
        to,
        subject,
        text
    };

    return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
