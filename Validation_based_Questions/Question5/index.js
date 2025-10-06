// Optional counter for generating unique IDs
let idCounter = 0;

function inventoryManager(operation, productsData, productInfo) {

  if (operation === "ADD") {

    // TODO: Check required fields (name, price, quantity, category)
    if (false) { // Replace 'false' with validation condition
      return {
        success: false,
        message: "Missing required fields",
        data: []
      };
    }

    // TODO: Validate price and quantity (must be positive numbers)
    if (false) { // Replace 'false' with validation for price and quantity
      return {
        success: false,
        message: "Invalid price or quantity",
        data: []
      };
    }

    // TODO: Generate new ID
    const newId = 0; // Replace 0 with logic to generate unique ID

    // TODO: Create new product object
    const newProduct = {
      id: newId,
      name: "PLACEHOLDER",
      price: 0,
      quantity: 0,
      category: "PLACEHOLDER",
      status: "in-stock"
    };

    // TODO: Add newProduct to productsData
    const updatedArray = []; // Replace with logic to add product

    return {
      success: false,
      message: "PLACEHOLDER MESSAGE",
      data: updatedArray
    };

  } else if (operation === "GET") {

    // TODO: Filter products by category
    if (false) { // Replace 'false' with condition to check if category is provided
      const filteredProducts = []; // Replace with logic to filter products by category
      return {
        success: true,
        message: "Products filtered by category",
        data: filteredProducts
      };
    }

    // TODO: If no ID provided, return all products
    if (false) { // Replace 'false' with condition to check if no ID provided
      return {
        success: true,
        message: "Products retrieved successfully",
        data: productsData
      };
    }

    // TODO: Find product by ID
    const foundProduct = {}; // Replace '{}' with logic to find product by ID

    if (false) { // Replace 'false' with condition to check if product found
      return {
        success: true,
        message: "Product found",
        data: [foundProduct]
      };
    } else {
      return {
        success: false,
        message: "Product not found",
        data: []
      };
    }

  } else if (operation === "DELETE") {

    // TODO: Remove product by ID
    const updatedArray = []; // Replace '[]' with logic to filter out the product

    // TODO: Check if deletion happened
    if (false) { // Replace 'false' with condition to check if product was deleted
      return {
        success: true,
        message: "Product deleted successfully",
        data: updatedArray
      };
    } else {
      return {
        success: false,
        message: "Product not found",
        data: productsData
      };
    }

  } else {
    // Invalid operation
    return {
      success: false,
      message: "Invalid operation",
      data: productsData
    };
  }
}

module.exports = inventoryManager;
