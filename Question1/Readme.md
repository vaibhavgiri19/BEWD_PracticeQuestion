# Guestbook App - Backend Assignment

## Overview
You are given a complete **frontend (HTML, CSS, JS)** for a Guestbook application.  
Your task is to build the **backend API** using **Node.js + Express + fs**.

Visitors should be able to:
- Add their name & message
- View all guestbook entries
- Delete an entry

---

## Requirements

### 1. Data Storage
- Store all entries in a file called `entries.json`.
- Each entry should have:
  - `id` (unique string, e.g. Date.now())
  - `name`
  - `message`

Example:
```json
[
  {
    "id": "1695412345678",
    "name": "Alice",
    "message": "Hello, great site!"
  }
]
