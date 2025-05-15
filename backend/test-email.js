const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

async function testEmail() {
  try {
    console.log('Email credentials:', {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? '****' : 'not set'
    });
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true, // Enable debug output
    });
    
    console.log('Attempting to send test email...');
    const result = await transporter.sendMail({
      from: `Test <${process.env.EMAIL_USER}>`,
      to: "melitazdenekxny23@gmail.com",
      subject: 'Test Email',
      text: 'This is a test email to check connectivity.',
    });
    
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

testEmail(); 