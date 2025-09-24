const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const DATA_FILE = "./members.json";

app.use(express.json());
app.use(express.static(__dirname));


// --- Helper functions ---
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

// --- Step 4: Private route middleware ---
function requireMembership(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Club membership required for this area" });

  const memberId = token.replace("Bearer ", "");
  req.memberId = memberId;
  next();
}

// --- Register ---
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

  const members = readMembers();
  if (members.find(m => m.email === email)) return res.status(400).json({ error: "Email already registered" });

  const newMember = { id: Date.now().toString(), name, email, password };
  members.push(newMember);
  writeMembers(members);

  res.json({ message: "Registration successful" });
});

// --- Login ---
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const members = readMembers();
  const member = members.find(m => m.email === email && m.password === password);

  if (!member) return res.status(400).json({ error: "Invalid email or password" });

  // Simulate a token (just member ID)
  const token = member.id;
  res.json({ message: "Login successful", token });
});

// --- Logout ---
app.post("/api/logout", (req, res) => {
  // No real session, so just respond success
  res.json({ message: "Logged out successfully" });
});

// --- Members-only profile ---
app.get("/api/profile", requireMembership, (req, res) => {
  const members = readMembers();
  const member = members.find(m => m.id === req.memberId);
  if (!member) return res.status(404).json({ error: "Member not found" });

  res.json({ id: member.id, name: member.name, email: member.email });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Club server running on http://localhost:${PORT}`);
});
