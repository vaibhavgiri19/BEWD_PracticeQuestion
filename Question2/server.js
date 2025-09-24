const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const DATA_FILE = "members.json";

// Middleware to parse JSON
app.use(express.json());

// Serve your index.html frontend
app.use(express.static(__dirname));

// Helper functions
function readMembers() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeMembers(members) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(members, null, 2));
}

// Temporary storage for "logged in users" (fake tokens)
let sessions = {};

// Register (Public)
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const members = readMembers();
  if (members.find((m) => m.email === email)) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const newMember = { id: Date.now().toString(), name, email, password };
  members.push(newMember);
  writeMembers(members);

  res.json({ message: "Registration successful" });
});

// Login (Public)
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const members = readMembers();
  const member = members.find(
    (m) => m.email === email && m.password === password
  );

  if (!member) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Create a fake token
  const token = Date.now().toString();
  sessions[token] = member.id;

  res.json({ message: "Login successful", token });
});

// Profile (Private)
app.get("/api/profile", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  const memberId = sessions[token];
  if (!memberId) return res.status(401).json({ error: "Unauthorized" });

  const members = readMembers();
  const member = members.find((m) => m.id === memberId);
  if (!member) return res.status(404).json({ error: "Member not found" });

  res.json({ id: member.id, name: member.name, email: member.email });
});

// Logout (Public)
app.post("/api/logout", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    delete sessions[token];
  }
  res.json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
