const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Helper function to send email
const sendEmail = async (contactData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Star Talent <${process.env.MAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Event Booking: ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #dc2626;">New Booking Specialist Request</h2>
          <p><strong>Artist Name:</strong> ${contactData.artistName || 'General Inquiry'}</p>
          <hr />
          <p><strong>Client Name:</strong> ${contactData.name}</p>
          <p><strong>Client Email:</strong> ${contactData.email}</p>
          <p><strong>Client Phone:</strong> ${contactData.phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${contactData.message}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was automatically generated from the Artist Profile Page.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent: ' + info.response);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};

exports.submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    
    // Trigger email notification in background
    sendEmail(req.body);

    res.status(201).json({ message: 'Booking request sent successfully!', contact });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
