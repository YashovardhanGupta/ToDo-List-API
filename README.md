# ToDo List API
A robust RESTful API for managing to-do items, built with Node.js, Express, and MongoDB. This project implements secure user authentication, CRUD operations, and pagination, following best practices for backend development.

# Features

- **User Authentication**: Secure Signup and Login using JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Task Management**: Full CRUD capabilities (Create, Read, Update, Delete) for to-do items.
- **Route Protection**: Middleware ensures users can only access and modify their own tasks.
- **Pagination**: Efficient data retrieval handling for large lists of tasks (supports `page` and `limit`).
- **Data Validation**: Robust error handling and input validation
- **Security**: Implementation of secure password storage and token-based authorization.

# Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB(Atlas)
- **Authentication**: JSON Web Tokens(JWT) & bcryptjs
- **ODM**: Mongoose

# Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- A [MongoDB Atlas](https://www.mongodb.com/products/platform) account (or a local MongoDB instance)

# Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository:

```bash
git clone https://github.com/YashovardhanGupta/ToDo-List-API.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project. You can copy the structure below:

```
# Database Connection String
MONGO_URI = mongodb+srv://<username>:<password>@cluster0.mongodb.net/todo-db

# Secret Key for signing JWTs (make this long and random)
JWT_SECRET = your_super_secret_random_key_here

# Server Port
PORT = 3000
```

### 4. Run the Server

```
# Start the server
npm start
```

the server will start on `http://localhost:3000`.

# API Endpoints

### Authentication

| **Method** | **Endpoint** | **Description** | **Request Body** |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Register a new user | `{"name": "John, "email": "john@doe.com", "password": "123"}` |
|POST | `/api/auth/login` | Login and receive a Token | `{"email: "john@doe.com, "password": "123"}` |

### ToDos

**Note:** All todo endpoints require the `Authorization` header with a valid Bearer token.

`Authorization: Bearer <your_token_here>`

| **Method** | **Endpoint** | **Description** | **Request Body** |
| --- | --- | --- | --- |
| POST | `/api/todos` | Create a new to-do item | `{"title": "Buy Milk, "description": "2 cartons"}` |
| GET | `/api/todos` | Get all to-dos (supports `?page=1&limit=10`) | N/A |
| PUT | `/api/todos/:id` | Update a to-do item | `{ "title": "Buy Almond Milk" }` |
| DELETE | `/api/todos/:id` | Delete a to-do item | N/A |

# Project Structure

        ToDo List API/
        ├─ middleware/              # Custom Middleware
        │  └─ authMiddleware.js     # Protects routes using JWT verification
        ├─ models/                  # Database Schemas
        │  ├─ Todo.js               # ToDo Schema Definition
        │  └─ User.js               # User Schema
        ├─ routes/                  # API Route Definitions
        │  ├─ authRoutes.js         # Registration and Login routes
        │  └─ todoRoutes.js         # CRUD operations for ToDos
        ├─ .env                     # Environment Variables (ignored using gitignore)
        ├─ package.json             # Project Dependencies
        ├─ README.md
        └─ server.js                # Entry point of the application

# RoadMap.sh URL

```
https://roadmap.sh/projects/todo-list-api
```
