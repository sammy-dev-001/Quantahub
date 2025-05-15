const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

console.log('Starting direct email test...');
console.log('Email credentials:', {
  user: process.env.EMAIL_USER ? process.env.EMAIL_USER : 'not set',
  pass: process.env.EMAIL_PASS ? '*****' : 'not set'
});

async function testDirectEmail() {
  try {
    // Create a more specific transporter configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      },
      debug: true,
      logger: true // log to console
    });

    console.log('Verifying connection...');
    
    // Verify connection configuration
    await new Promise((resolve, reject) => {
      transporter.verify(function(error, success) {
        if (error) {
          console.error('Verification error:', error);
          reject(error);
        } else {
          console.log('Server is ready to take our messages');
          resolve(success);
        }
      });
    });

    console.log('Attempting to send direct test email...');
    
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: 'melitazdenekxny23@gmail.com',
      subject: 'Direct Test from Node.js',
      text: 'This is a direct test from Node.js without going through the Express server.',
      html: '<b>This is a direct test from Node.js without going through the Express server.</b>'
    });

    console.log('Message sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    
  } catch (error) {
    console.error('Error in direct email test:', error);
  }
}

// Run the test
testDirectEmail(); 