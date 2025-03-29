const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS - replace with your actual domain
app.use(cors({
  origin: ['https://acucogn.vercel.app', 'http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Create email transporter using GoDaddy's SMTP server
const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net', // GoDaddy's SMTP server
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test route to check if server is running
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Server is running correctly' });
});

// API endpoint for contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name, email, and message are required' 
    });
  }

  try {
    // Email content for you (notification)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    // Email confirmation for the submitter
    const confirmationOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting AcuCogn',
      html: `
        <h2>Thank you for contacting AcuCogn!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p>${message}</p>
        <br>
        <p>Best regards,</p>
        <p>The AcuCogn Team</p>
      `
    };

    // Send emails
    const info1 = await transporter.sendMail(mailOptions);
    const info2 = await transporter.sendMail(confirmationOptions);

    console.log('Notification email sent: ', info1.messageId);
    console.log('Confirmation email sent: ', info2.messageId);

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message' 
    });
  }
});

// API endpoint for newsletter subscription
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  // Basic validation
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email is required' 
    });
  }

  try {
    // Email notification for you
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
      `
    };

    // Email confirmation for the subscriber
    const confirmationOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to AcuCogn Newsletter',
      html: `
        <h2>Thank you for subscribing to our newsletter!</h2>
        <p>You'll now receive updates about our services and industry insights.</p>
        <p>If you didn't subscribe to our newsletter, please ignore this email.</p>
        <br>
        <p>Best regards,</p>
        <p>The AcuCogn Team</p>
      `
    };

    // Send both emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Subscription successful' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to subscribe' 
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});