// Optional counter to generate IDs
let idCounter = 0;

function bookManager(operation, booksData, bookInfo) {

  if (operation === "ADD") {

    // TODO: Check required fields (title, author, year)
    if (false) { // Replace 'false' with validation condition
      return {
        success: false,
        message: "Missing required fields",
        data: []
      };
    }

    // TODO: Validate year (must be positive number)
    if (false) { // Replace 'false' with year validation condition
      return {
        success: false,
        message: "Invalid year",
        data: []
      };
    }

    // TODO: Generate new ID
    const newId = 0; // Replace 0 with your logic to generate unique ID

    // TODO: Create new book object
    const newBook = {
      id: newId,
      title: "PLACEHOLDER",
      author: "PLACEHOLDER",
      year: 0,
      status: "available",
      addedDate: "2025-10-06"
    };

    // TODO: Add newBook to booksData
    const updatedArray = []; // Replace with logic to add book

    return {
      success: false,
      message: "PLACEHOLDER MESSAGE",
      data: updatedArray
    };

  } else if (operation === "GET") {

    // TODO: Filter by status
    if (false) { // Replace 'false' with condition to check if status is provided
      const filteredBooks = []; // Replace with logic to filter books by status
      return {
        success: true,
        message: "Books filtered by status",
        data: filteredBooks
      };
    }

    // TODO: If no ID provided, return all books
    if (false) { // Replace 'false' with condition to check if no ID provided
      return {
        success: true,
        message: "Books retrieved successfully",
        data: booksData
      };
    }

    // TODO: Find book by ID
    const foundBook = {}; // Replace '{}' with logic to find book by ID

    if (false) { // Replace 'false' with condition to check if book found
      return {
        success: true,
        message: "Book found",
        data: [foundBook]
      };
    } else {
      return {
        success: false,
        message: "Book not found",
        data: []
      };
    }

  } else if (operation === "DELETE") {

    // TODO: Remove book by ID
    const updatedArray = []; // Replace '[]' with logic to filter out the book

    // TODO: Check if deletion happened
    if (false) { // Replace 'false' with condition to check if book was deleted
      return {
        success: true,
        message: "Book deleted successfully",
        data: updatedArray
      };
    } else {
      return {
        success: false,
        message: "Book not found",
        data: booksData
      };
    }

  } else {
    // Invalid operation
    return {
      success: false,
      message: "Invalid operation",
      data: booksData
    };
  }
}

module.exports = bookManager;
