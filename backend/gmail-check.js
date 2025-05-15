const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

console.log('====== Gmail Authentication Test ======');
console.log('Email User:', process.env.EMAIL_USER || 'not set');
console.log('Email Pass:', process.env.EMAIL_PASS ? '[set]' : 'not set');
console.log('Email Pass Length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

// Function to try different transporter configurations
async function testGmailAuth() {
  // Test configurations to try
  const configs = [
    {
      name: "Simple Gmail Service",
      config: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      }
    },
    {
      name: "Direct SMTP with SSL",
      config: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      }
    },
    {
      name: "Direct SMTP with TLS",
      config: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      }
    }
  ];

  // Try each configuration
  for (const {name, config} of configs) {
    console.log(`\n\nTesting configuration: "${name}"`);
    console.log('Configuration:', JSON.stringify(config, null, 2));
    
    try {
      const transporter = nodemailer.createTransport(config);
      
      console.log('Verifying connection...');
      const verified = await transporter.verify();
      console.log('Connection verified:', verified);
      
      console.log('Sending test email...');
      const info = await transporter.sendMail({
        from: `"Test" <${process.env.EMAIL_USER}>`,
        to: 'melitazdenekxny23@gmail.com',
        subject: `Test from ${name}`,
        text: `This is a test email from ${name} configuration.`,
      });
      
      console.log('Email sent successfully!');
      console.log('Message ID:', info.messageId);
      console.log('Response:', info.response);
      
      // If we got here, we have a working configuration
      console.log('\n✅ SUCCESS: This configuration works!\n');
      return config; // Return the working config
    } catch (error) {
      console.error(`❌ ERROR with ${name}:`, error.message);
      if (error.code) console.error('Error code:', error.code);
      if (error.command) console.error('Error command:', error.command);
      if (error.response) console.error('Error response:', error.response);
      console.error('\n');
    }
  }
  
  console.error('❌ All configurations failed. Check Gmail account settings.');
  return null;
}

// Run the test
testGmailAuth().then(workingConfig => {
  if (workingConfig) {
    console.log('Use this configuration in your app:');
    console.log(JSON.stringify(workingConfig, null, 2));
  } else {
    console.log('Troubleshooting tips:');
    console.log('1. Ensure 2-step verification is enabled for your Google account');
    console.log('2. Generate a new app password specifically for this application');
    console.log('3. Make sure the password is copied correctly (without spaces)');
    console.log('4. Check if your Google account has any security restrictions');
    console.log('5. Try with a different Google account if possible');
  }
}); 