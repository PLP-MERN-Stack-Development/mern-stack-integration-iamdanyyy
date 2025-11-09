# Step-by-Step Setup Guide

This guide will walk you through setting up the MERN Blog application from scratch.

## Prerequisites Checklist

Before you begin, make sure you have:
- [ ] Node.js (v18 or higher) installed
- [ ] MongoDB installed locally OR a MongoDB Atlas account
- [ ] A code editor (VS Code recommended)
- [ ] Git installed
- [ ] Terminal/Command Prompt access

## Step 1: Install Dependencies

### Backend Dependencies

1. Open your terminal and navigate to the server directory:
```bash
cd server
```

2. Install all backend dependencies:
```bash
npm install
```

This will install:
- express (web framework)
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- express-validator (input validation)
- cors (cross-origin requests)
- dotenv (environment variables)
- nodemon (development server)

### Frontend Dependencies

1. Open a new terminal window and navigate to the client directory:
```bash
cd client
```

2. Install all frontend dependencies:
```bash
npm install
```

This will install:
- react (UI library)
- react-dom (React DOM renderer)
- react-router-dom (routing)
- axios (HTTP client)
- vite (build tool)

## Step 2: Configure Environment Variables

### Backend Configuration

1. In the `server` directory, create a file named `.env`
2. Add the following content:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

**Important Notes:**
- If you're using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string
- Change `JWT_SECRET` to a random string (you can generate one online)
- The database name `mern-blog` will be created automatically if it doesn't exist

### Frontend Configuration (Optional)

1. In the `client` directory, create a file named `.env`
2. Add the following content:

```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** This is optional as the default value is already set in the code.

## Step 3: Start MongoDB

### Option A: Local MongoDB

If you have MongoDB installed locally:
1. Start MongoDB service:
   - **Windows**: MongoDB should start automatically, or run `net start MongoDB`
   - **Mac/Linux**: Run `mongod` in terminal or `brew services start mongodb-community`

### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `MONGODB_URI` in your `.env` file

## Step 4: Start the Backend Server

1. Make sure you're in the `server` directory
2. Run the development server:
```bash
npm run dev
```

You should see:
```
Connected to MongoDB
Server running on port 5000
```

If you see an error, check:
- MongoDB is running
- `.env` file exists and has correct values
- Port 5000 is not already in use

## Step 5: Start the Frontend Server

1. Open a new terminal window
2. Navigate to the `client` directory
3. Run the development server:
```bash
npm run dev
```

You should see:
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

## Step 6: Test the Application

1. Open your browser and go to `http://localhost:3000`
2. You should see the blog homepage
3. Try registering a new account
4. Create a category (you'll need this to create posts)
5. Create your first blog post!

## Step 7: Create Your First Category

Since categories are required for posts, you'll need to create at least one category:

### Option A: Using the API

You can use Postman or curl to create a category:

```bash
# First, register and login to get a token
# Then create a category:
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name": "Technology", "description": "Posts about technology"}'
```

### Option B: Using the Application

1. Register and login
2. The application doesn't have a UI for creating categories yet, so you'll need to use the API
3. Alternatively, you can add a simple category creation form in the frontend

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify the connection string in `.env`
   - Make sure the database name is correct

2. **Port Already in Use**
   - Change the PORT in `.env` file
   - Or stop the process using that port

3. **Module Not Found Errors**
   - Make sure you ran `npm install` in both server and client directories
   - Delete `node_modules` and `package-lock.json`, then run `npm install` again

4. **CORS Errors**
   - Make sure the backend is running on port 5000
   - Check that the frontend proxy is configured correctly in `vite.config.js`

5. **Authentication Issues**
   - Check that JWT_SECRET is set in `.env`
   - Verify that tokens are being stored in localStorage
   - Check browser console for errors

## Next Steps

Once everything is running:
1. Create some categories
2. Create blog posts
3. Add comments to posts
4. Try searching and filtering
5. Test the authentication flow

## Development Tips

- Use browser DevTools to debug frontend issues
- Check server console for backend errors
- Use Postman to test API endpoints
- Check MongoDB Compass to view your database
- Read the code comments to understand how things work

## Need Help?

If you encounter issues:
1. Check the error messages in the console
2. Verify all environment variables are set correctly
3. Make sure all dependencies are installed
4. Check that MongoDB is running
5. Review the README.md for more information

Happy coding!

