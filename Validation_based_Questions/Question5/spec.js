const inventoryManager = require('./index');

describe('Inventory Manager Test Suite', function() {

  // Test 1 - ADD: Valid product
  it('Test 1 - should add a valid product', function() {
    const result = inventoryManager("ADD", [], {
      name: "Laptop",
      price: 500,
      quantity: 10,
      category: "Electronics"
    });
    expect(result).toEqual({
      success: true,
      message: "Product added successfully",
      data: [{
        id: 1,
        name: "Laptop",
        price: 500,
        quantity: 10,
        category: "Electronics",
        status: "in-stock"
      }]
    });
  });

  // Test 2 - ADD: Missing field
  it('Test 2 - should fail when missing price', function() {
    const result = inventoryManager("ADD", [], {
      name: "Laptop",
      quantity: 5,
      category: "Electronics"
    });
    expect(result).toEqual({
      success: false,
      message: "Missing required fields",
      data: []
    });
  });

  // Test 3 - ADD: Invalid price or quantity
  it('Test 3 - should fail when price is negative', function() {
    const result = inventoryManager("ADD", [], {
      name: "Laptop",
      price: -10,
      quantity: 5,
      category: "Electronics"
    });
    expect(result).toEqual({
      success: false,
      message: "Invalid price or quantity",
      data: []
    });
  });

  // Test 4 - GET: Return all products
  it('Test 4 - should return all products', function() {
    const products = [
      { id: 1, name: "Laptop", price: 500, quantity: 10, category: "Electronics", status: "in-stock" },
      { id: 2, name: "Chair", price: 50, quantity: 20, category: "Furniture", status: "in-stock" }
    ];
    const result = inventoryManager("GET", products, {});
    expect(result).toEqual({
      success: true,
      message: "Products retrieved successfully",
      data: products
    });
  });

  // Test 5 - GET: Find by ID
  it('Test 5 - should return product by ID', function() {
    const products = [
      { id: 1, name: "Laptop", price: 500, quantity: 10, category: "Electronics", status: "in-stock" }
    ];
    const result = inventoryManager("GET", products, { id: 1 });
    expect(result).toEqual({
      success: true,
      message: "Product found",
      data: products
    });
  });

  // Test 6 - GET: Product not found
  it('Test 6 - should handle product ID not found', function() {
    const products = [
      { id: 1, name: "Laptop", price: 500, quantity: 10, category: "Electronics", status: "in-stock" }
    ];
    const result = inventoryManager("GET", products, { id: 999 });
    expect(result).toEqual({
      success: false,
      message: "Product not found",
      data: []
    });
  });

  // Test 7 - GET: Filter by category
  it('Test 7 - should return products filtered by category', function() {
    const products = [
      { id: 1, name: "Laptop", price: 500, quantity: 10, category: "Electronics", status: "in-stock" },
      { id: 2, name: "Chair", price: 50, quantity: 20, category: "Furniture", status: "in-stock" }
    ];
    const result = inventoryManager("GET", products, { category: "Electronics" });
    expect(result).toEqual({
      success: true,
      message: "Products filtered by category",
      data: [
        { id: 1, name: "Laptop", price: 500, quantity: 10, category: "Electronics", status: "in-stock" }
      ]
    });
  });

  // Test 8 - DELETE: Success
  it('Test 8 - should delete a product successfully', function() {
    const products = [
      { id: 1, name: "Laptop", price: 500, quantity: 10, category: "Electronics", status: "in-stock" },
      { id: 2, name: "Chair", price: 50, quantity: 20, category: "Furniture", status: "in-stock" }
    ];
    const result = inventoryManager("DELETE", products, { id: 1 });
    expect(result).toEqual({
      success: true,
      message: "Product deleted successfully",
      data: [
        { id: 2, name: "Chair", price: 50, quantity: 20, category: "Furniture", status: "in-stock" }
      ]
    });
  });

  // Test 9 - DELETE: Product not found
  it('Test 9 - should handle product not found for deletion', function() {
    const products = [
      { id: 1, name: "Laptop", price: 500, quantity: 10, category: "Electronics", status: "in-stock" }
    ];
    const result = inventoryManager("DELETE", products, { id: 999 });
    expect(result).toEqual({
      success: false,
      message: "Product not found",
      data: products
    });
  });

  // Test 10 - Invalid operation
  it('Test 10 - should handle invalid operation', function() {
    const products = [];
    const result = inventoryManager("UPDATE", products, {});
    expect(result).toEqual({
      success: false,
      message: "Invalid operation",
      data: products
    });
  });

});
