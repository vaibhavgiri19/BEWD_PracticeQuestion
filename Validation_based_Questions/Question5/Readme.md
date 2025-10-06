# Inventory Manager Assignment

Welcome to your hands-on practice assignment!

## Objective
You will implement a function `inventoryManager(operation, productsData, productInfo)` to manage products in a store. The function should handle **adding, retrieving, and deleting products**.

---

## Product Fields
Each product should have the following properties:

- `id` (unique number)
- `name` (string)
- `price` (number)
- `quantity` (number)
- `category` (string)
- `status` (default: "in-stock")

---

## Operations

### 1. ADD
- Required fields: `name`, `price`, `quantity`, `category`
- Price and quantity must be positive numbers
- Generate unique `id` for each product
- Default `status`: `"in-stock"`

### 2. GET
- Return all products if no parameters provided
- Return specific product if `id` is provided
- Return products filtered by `category` if provided

### 3. DELETE
- Remove product by `id`
- Return updated products array
- Return error if `id` does not exist

---

## Boilerplate Instructions
- Open `index.js`
- Complete all `TODO` sections
- Replace `false` and `PLACEHOLDER` with real logic

---

## Testing
- Install dependencies:
```bash
npm install --save-dev jest
