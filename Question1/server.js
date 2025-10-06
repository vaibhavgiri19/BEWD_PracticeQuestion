const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'entries.json');
const FRONTEND_FILE = path.join(__dirname, 'guestbook_frontend.html');

app.use(express.json());

/* ---------- Serve frontend ---------- */
app.get('/', (req, res) => {
  res.sendFile(FRONTEND_FILE);
});

/* ---------- Helpers ---------- */
function readEntries() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading entries:', err);
    return [];
  }
}

function writeEntries(entries) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

/* ---------- API routes ---------- */

// GET all entries
app.get('/api/entries', (req, res) => {
  const entries = readEntries();
  res.json(entries);
});

// POST new entry
app.post('/api/entries', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  const entries = readEntries();
  const newEntry = { id: Date.now().toString(), name, message };
  entries.push(newEntry);
  writeEntries(entries);

  res.status(201).json(newEntry);
});

// DELETE entry by id
app.delete('/api/entries/:id', (req, res) => {
  const { id } = req.params;
  const entries = readEntries();
  const filtered = entries.filter(entry => entry.id !== id);

  if (filtered.length === entries.length) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  writeEntries(filtered);
  res.json({ success: true });
});

/* ---------- Start server ---------- */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
