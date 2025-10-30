# 🛍️ Products API (Node.js + Express)

A simple RESTful API for managing products, built with Node.js and Express.js.  
Includes authentication using an API key, input validation, and global error handling.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create Environment File
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 4️⃣ Set Environment Variables
Edit the `.env` file and provide your values:
```bash
API_KEY=mysecretkey123
PORT=3000
```

### 5️⃣ Start the Server
For development (auto-restarts):
```bash
npm run dev
```

Or regular run:
```bash
node server.js
```

### 6️⃣ Test the API
Use **Postman**, **cURL**, or any REST client.

---

## 🔑 Authentication
All requests must include an **API key** in the headers:
```
x-api-key: mysecretkey123
```

---

## 📚 API Endpoints

### 🟢 GET `/products`
Fetch all products.

**Headers:**
```
x-api-key: mysecretkey123
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1200,
    "category": "Electronics",
    "inStock": true
  }
]
```

---

### 🟢 GET `/products/:id`
Fetch a single product by its ID.

**Example:**
`GET /products/1`

**Response:**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1200,
  "category": "Electronics",
  "inStock": true
}
```

---

### 🟡 POST `/products`
Create a new product.

**Headers:**
```
x-api-key: mysecretkey123
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Phone",
  "description": "Android smartphone",
  "price": 500,
  "category": "Electronics",
  "inStock": true
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Phone",
  "description": "Android smartphone",
  "price": 500,
  "category": "Electronics",
  "inStock": true
}
```

---

### 🟠 PUT `/products/:id`
Update an existing product.

**Headers:**
```
x-api-key: mysecretkey123
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Updated Phone",
  "price": 550,
  "inStock": false
}
```

**Response:**
```json
{
  "message": "Product updated successfully",
  "product": {
    "id": 2,
    "name": "Updated Phone",
    "description": "Android smartphone",
    "price": 550,
    "category": "Electronics",
    "inStock": false
  }
}
```

---

### 🔴 DELETE `/products/:id`
Delete a product by ID.

**Example:**
`DELETE /products/2`

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## ⚠️ Error Responses

| Error Type | Example Message | HTTP Code |
|-------------|-----------------|------------|
| Missing API Key | "Unauthorized: Invalid API key" | 401 |
| Invalid Input | "Product name and price are required" | 400 |
| Not Found | "Product not found" | 404 |
| Server Error | "Internal Server Error" | 500 |

---

## 🧰 Tech Stack
- Node.js  
- Express.js  
- dotenv (for environment variables)  
- body-parser (for JSON parsing)  

---

## 👨‍💻 Author
**Emmanuel**  
Feel free to modify and improve!
