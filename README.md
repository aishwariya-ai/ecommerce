# Product Management System

## Overview

The Product Management System is a web application developed to manage products efficiently. It allows users to perform CRUD (Create, Read, Update, Delete) operations on products through an intuitive user interface.

The frontend is built using Vue.js, while JSON Server is used as a mock REST API to simulate backend functionality during development. Axios is used to communicate with the API, and Pinia is used for state management.

---

## Features

### Authentication
- User Registration
- User Login
- Route Protection
- Role-based Access (Admin/User)
- Logout

### Product Management
- View Products
- Add New Product
- Edit Product
- Delete Product
- Search Products
- Form Validation

### User Interface
- Responsive Design
- Product Cards
- Data Table View
- Loading Indicators
- Error Handling

---

## Technology Stack

### Frontend
- Vue.js 3
- Vue Router
- Pinia
- Axios
- Vuetify

### Mock Backend
- JSON Server
- db.json

---

## Project Structure

```
Product Management System
│
├── src
│   ├── api
│   │   └── axios.js
│   ├── assets
│   ├── components
│   ├── router
│   ├── stores
│   ├── views
│   ├── App.vue
│   └── main.js
│
├── db.json
├── package.json
└── README.md
```

---

## Functional Modules

### User Module
- Register
- Login
- Logout

### Product Module
- Create Product
- Read Products
- Update Product
- Delete Product
- Search Products

---

## API Endpoints

### Users

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /users | Get Users |
| POST | /users | Register User |

### Products

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /products | Get All Products |
| GET | /products/:id | Get Product |
| POST | /products | Add Product |
| PUT | /products/:id | Update Product |
| DELETE | /products/:id | Delete Product |

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/product-management-system.git
```

---

### Install Dependencies

```bash
npm install
```

---

### Start JSON Server

```bash
npx json-server --watch db.json --port 3000
```

---

### Start Vue Application

```bash
npm run dev
```

---

## Application Workflow

```
User
   │
   ▼
Vue Component
   │
   ▼
Pinia Store
   │
   ▼
Axios
   │
   ▼
JSON Server
   │
   ▼
db.json
   │
   ▼
Response
   │
   ▼
Vue UI
```

---

## Database (db.json)

### Users

- id
- name
- email
- password
- role

### Products

- id
- name
- category
- price
- quantity
- image

---

## Validation

### User
- Name is required
- Email is required
- Password is required

### Product
- Product Name is required
- Category is required
- Price must be a valid number
- Quantity must be a valid number

---

## Project Features

- Component-based architecture
- State management using Pinia
- Axios for API communication
- CRUD operations
- Search functionality
- Route Guards
- Local Storage for authentication
- Responsive UI using Vuetify

---


