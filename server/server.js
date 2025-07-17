// server/server.js
const express = require('express');
const cors = require('cors');
const contactRoute = require('./routes/contact');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/contact', contactRoute);

// Optional: ensure table exists
async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT NOT NULL,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

app.listen(PORT, async () => {
  await ensureTable();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
