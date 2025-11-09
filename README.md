# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js for the Week 4 MERN Stack Integration Assignment.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)
- [Features Implemented](#features-implemented)
- [Screenshots](#screenshots)

## 🎯 Overview

This is a complete blog application that allows users to:
- View and read blog posts
- Create, edit, and delete their own posts
- Comment on posts
- Search and filter posts by category
- Register and login with authentication
- Manage categories for organizing posts

## ✨ Features

### Core Features
- ✅ Full CRUD operations for blog posts
- ✅ User authentication (Register/Login/Logout)
- ✅ Category management
- ✅ Post comments system
- ✅ Search functionality
- ✅ Category filtering
- ✅ Pagination
- ✅ Protected routes
- ✅ Responsive design

### Advanced Features
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation on both frontend and backend
- ✅ Error handling middleware
- ✅ View count tracking
- ✅ Post tags support
- ✅ Post excerpt feature

## 📁 Project Structure

```
mern-stack-integration-iamdanyyy/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React Context providers
│   │   ├── services/       # API service layer
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Server entry point
│   └── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn
- Git

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd mern-stack-integration-iamdanyyy
```

### Step 2: Set Up the Backend

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

4. Make sure MongoDB is running on your system, or update `MONGODB_URI` with your MongoDB Atlas connection string.

5. Start the server:
```bash
npm run dev
```

The server should now be running on `http://localhost:5000`

### Step 3: Set Up the Frontend

1. Open a new terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory (optional, defaults are set):
```bash
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The client should now be running on `http://localhost:3000`

### Step 4: Create Initial Categories

To create categories for your blog posts, you can use the API or create them through the application after logging in. Categories are required when creating posts.

## 📚 API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body**: `{ name, email, password }`
- **Access**: Public

#### Login User
- **POST** `/api/auth/login`
- **Body**: `{ email, password }`
- **Access**: Public

#### Get Current User
- **GET** `/api/auth/me`
- **Access**: Private (requires token)

### Post Endpoints

#### Get All Posts
- **GET** `/api/posts`
- **Query Parameters**: `page`, `limit`, `category`, `search`
- **Access**: Public

#### Get Single Post
- **GET** `/api/posts/:id`
- **Access**: Public

#### Create Post
- **POST** `/api/posts`
- **Body**: `{ title, content, excerpt, category, tags, isPublished }`
- **Access**: Private (requires token)

#### Update Post
- **PUT** `/api/posts/:id`
- **Body**: `{ title, content, excerpt, category, tags, isPublished }`
- **Access**: Private (post owner only)

#### Delete Post
- **DELETE** `/api/posts/:id`
- **Access**: Private (post owner only)

#### Add Comment
- **POST** `/api/posts/:id/comments`
- **Body**: `{ content }`
- **Access**: Private (requires token)

### Category Endpoints

#### Get All Categories
- **GET** `/api/categories`
- **Access**: Public

#### Get Single Category
- **GET** `/api/categories/:id`
- **Access**: Public

#### Create Category
- **POST** `/api/categories`
- **Body**: `{ name, description }`
- **Access**: Private (requires token)

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Styling

## 📝 Features Implemented

### Task 1: Project Setup ✅
- ✅ Clear directory structure for client and server
- ✅ MongoDB connection using Mongoose
- ✅ Express.js server with middleware
- ✅ React frontend using Vite
- ✅ Environment variables configuration
- ✅ Proxy configuration for API calls

### Task 2: Back-End Development ✅
- ✅ RESTful API endpoints for posts and categories
- ✅ Mongoose models for Post, Category, and User
- ✅ Input validation using express-validator
- ✅ Error handling middleware
- ✅ Authentication middleware
- ✅ Protected routes

### Task 3: Front-End Development ✅
- ✅ React components for post list, detail, and form
- ✅ Navigation and layout components
- ✅ React Router for navigation
- ✅ React hooks (useState, useEffect, useContext)
- ✅ Custom hooks (usePosts, useCategories, useAuth)
- ✅ API service layer

### Task 4: Integration and Data Flow ✅
- ✅ API service in React
- ✅ State management with Context API
- ✅ Forms with validation
- ✅ Loading and error states
- ✅ Optimistic UI updates (where applicable)

### Task 5: Advanced Features ✅
- ✅ User authentication (registration, login, protected routes)
- ✅ Comments feature for blog posts
- ✅ Search functionality
- ✅ Category filtering
- ✅ Pagination

## 📸 Screenshots

<img width="1903" height="1001" alt="Screenshot 2025-11-09 214834" src="https://github.com/user-attachments/assets/369f2e14-5b85-4e1a-a211-b269fda1368b" />

<img width="1901" height="1019" alt="Screenshot 2025-11-09 214901" src="https://github.com/user-attachments/assets/59568872-3045-4c0e-9587-45c76f373aba" />


<img width="1904" height="1014" alt="Screenshot 2025-11-09 214918" src="https://github.com/user-attachments/assets/ec5b73b1-4fe4-4f74-b56f-ab6a2a85b02f" />

<img width="1903" height="1016" alt="Screenshot 2025-11-09 214947" src="https://github.com/user-attachments/assets/e3840688-9dd9-4c4b-8a3f-a6502d7018eb" />





- Home page with post list
- Post detail page with comments
- Create/Edit post form
- Login/Register pages
- Search and filter functionality

## 🎓 Learning Outcomes

Through building this application, I learned:
- How to set up a full-stack MERN application
- Implementing RESTful APIs with Express.js
- Database modeling with Mongoose
- Authentication and authorization with JWT
- State management in React using Context API
- Building reusable React components
- Handling API calls and error states
- Input validation on both frontend and backend
- Creating custom React hooks
- Routing and navigation in React

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes on both frontend and backend
- Input validation and sanitization
- CORS configuration
- Environment variables for sensitive data

## 🐛 Known Issues / Future Improvements

- Image upload functionality (featured images) - partially implemented in model
- User profile pages
- Admin panel for managing all posts
- Rich text editor for post content
- Email verification
- Password reset functionality
- Social media sharing
- Post likes/favorites
