// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

// Middleware setup
app.use(bodyParser.json());

function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url}`);
  next(); // Don't forget to call next()
}
// - Request logging
app.use(requestLogger);

// Authentication Middleware
function authenticateAPIKey(req, res, next) {
  const apiKey = req.header('x-api-key');
  const VALID_API_KEY = process.env.API_KEY;

  if (apiKey !== VALID_API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }

  next(); // proceed if API key is valid
}
app.use(authenticateAPIKey);

// Validation Middleware
function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;

  // Check for missing fields
  if (!name || !description || price == null || !category || inStock == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Type checks
  if (typeof name !== 'string' || typeof description !== 'string' || typeof category !== 'string') {
    return res.status(400).json({ message: 'Name, description, and category must be strings' });
  }

  if (typeof price !== 'number') {
    return res.status(400).json({ message: 'Price must be a number' });
  }

  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'inStock must be a boolean (true/false)' });
  }

  next(); // All validations passed
}

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /api/products - Create a new product
app.post('/api/products', validateProduct, (req, res) => {
  try {
      const { name, description, price, category, inStock } = req.body;
      if (!name || !price) {
        throw new ValidationError('Product name and price required');
      }
    const newProduct = {
      id: products.length + 1,
      name,
      description,
      price,
      category,
      inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', validateProduct, (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const { name, description, price, category, inStock } = req.body;
  product.name = name ?? product.name;
  product.description = description ?? product.description;
  product.price = price ?? product.price;
  product.category = category ?? product.category;
  product.inStock = inStock ?? product.inStock;

  res.json(product);
});


// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ message: 'Product deleted successfully' });
});

// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// TODO: Implement custom middleware for:


// - Authentication
// - Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);

  // Use default 500 if no statusCode is defined
  const status = err.statusCode || 500;

  res.status(status).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 