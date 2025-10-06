const bookManager = require('./index');

describe('Library Book Manager Test Suite', function() {

  // Test 1 - ADD: Valid book
  it('Test 1 - should add a valid book', function() {
    const result = bookManager("ADD", [], {
      title: "The Alchemist",
      author: "Paulo Coelho",
      year: 1988
    });
    expect(result).toEqual({
      success: true,
      message: "Book added successfully",
      data: [{
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        year: 1988,
        status: "available",
        addedDate: "2025-10-06"
      }]
    });
  });

  // Test 2 - ADD: Missing field
  it('Test 2 - should fail when missing title', function() {
    const result = bookManager("ADD", [], { author: "Author", year: 2000 });
    expect(result).toEqual({ success: false, message: "Missing required fields", data: [] });
  });

  // Test 3 - ADD: Invalid year
  it('Test 3 - should fail when year <= 0', function() {
    const result = bookManager("ADD", [], { title: "Book", author: "Author", year: -5 });
    expect(result).toEqual({ success: false, message: "Invalid year", data: [] });
  });

  // Test 4 - GET: Return all books
  it('Test 4 - should return all books', function() {
    const books = [
      { id: 1, title: "A", author: "X", year: 2000, status: "available", addedDate: "2025-10-06" },
      { id: 2, title: "B", author: "Y", year: 2005, status: "borrowed", addedDate: "2025-10-06" }
    ];
    const result = bookManager("GET", books, {});
    expect(result).toEqual({ success: true, message: "Books retrieved successfully", data: books });
  });

  // Test 5 - GET: Find by ID
  it('Test 5 - should return book by ID', function() {
    const books = [{ id: 1, title: "A", author: "X", year: 2000, status: "available", addedDate: "2025-10-06" }];
    const result = bookManager("GET", books, { id: 1 });
    expect(result).toEqual({ success: true, message: "Book found", data: books });
  });

  // Test 6 - GET: Book not found
  it('Test 6 - should handle book ID not found', function() {
    const books = [{ id: 1, title: "A", author: "X", year: 2000, status: "available", addedDate: "2025-10-06" }];
    const result = bookManager("GET", books, { id: 999 });
    expect(result).toEqual({ success: false, message: "Book not found", data: [] });
  });

  // Test 7 - GET: Filter by status
  it('Test 7 - should return books filtered by status', function() {
    const books = [
      { id: 1, title: "A", author: "X", year: 2000, status: "available", addedDate: "2025-10-06" },
      { id: 2, title: "B", author: "Y", year: 2005, status: "borrowed", addedDate: "2025-10-06" }
    ];
    const result = bookManager("GET", books, { status: "available" });
    expect(result).toEqual({
      success: true,
      message: "Books filtered by status",
      data: [{ id: 1, title: "A", author: "X", year: 2000, status: "available", addedDate: "2025-10-06" }]
    });
  });

  // Test 8 - DELETE: Success
  it('Test 8 - should delete a book successfully', function() {
    const books = [
      { id: 1, title: "A", author: "X", year: 2000, status: "available", addedDate: "2025-10-06" },
      { id: 2, title: "B", author: "Y", year: 2005, status: "borrowed", addedDate: "2025-10-06" }
    ];
    const result = bookManager("DELETE", books, { id: 1 });
    expect(result).toEqual({
      success: true,
      message: "Book deleted successfully",
      data: [{ id: 2, title: "B", author: "Y", year: 2005, status: "borrowed", addedDate: "2025-10-06" }]
    });
  });

  // Test 9 - DELETE: Book not found
  it('Test 9 - should handle book not found for deletion', function() {
    const books = [{ id: 1, title: "A", author: "X", year: 2000, status: "available", addedDate: "2025-10-06" }];
    const result = bookManager("DELETE", books, { id: 999 });
    expect(result).toEqual({ success: false, message: "Book not found", data: books });
  });

  // Test 10 - Invalid operation
  it('Test 10 - should handle invalid operation', function() {
    const books = [];
    const result = bookManager("UPDATE", books, {});
    expect(result).toEqual({ success: false, message: "Invalid operation", data: books });
  });

});
