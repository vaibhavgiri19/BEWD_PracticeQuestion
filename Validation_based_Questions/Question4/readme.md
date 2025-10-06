🧩 Challenge: Library Book Manager
🏁 Overview

You are building the backend logic for a small library system.
The goal is to manage a collection of books — add new ones, view existing ones, or remove them.

Each book in your library has the following structure:

{
  id: 1,
  title: "The Alchemist",
  author: "Paulo Coelho",
  year: 1988,
  status: "available",
  addedDate: "2025-10-06"
}

🧠 Your Task

Write a function named bookManager(operation, booksData, bookInfo)
This function should handle three operations:

1️⃣ ADD a book

Add a new book if all fields (title, author, year) are present.

year must be a positive number.

Each new book gets:

A unique auto-incremented id

status = "available"

addedDate = today’s date (YYYY-MM-DD)

2️⃣ GET books

If no id or status is provided, return all books.

If id is given, return the book with that ID.

If status is given, return all books with that status (available / borrowed).

3️⃣ DELETE a book

Remove a book by its id.

If the book is found and deleted → success.

If not found → return error.