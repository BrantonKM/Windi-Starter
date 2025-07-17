// server/routes/contact.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await pool.query(
      'INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4)',
      [name, email, phone, message]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
