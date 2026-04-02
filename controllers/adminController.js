const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Initial setup to create the first admin (optional, can be removed after first use)
exports.setupAdmin = async (req, res) => {
    try {
        const adminExists = await Admin.findOne({ username: 'admin' });
        if (adminExists) return res.status(400).json({ error: 'Admin already exists' });

        const newAdmin = new Admin({
            username: 'admin',
            password: 'adminpassword123' // User should change this
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully', username: 'admin' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
