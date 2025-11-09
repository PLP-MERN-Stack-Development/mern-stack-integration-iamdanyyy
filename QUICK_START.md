# Quick Start Guide

Get up and running in 5 minutes!

## 1. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend (in a new terminal)
cd client
npm install
```

## 2. Configure Environment

Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

## 3. Start MongoDB

Make sure MongoDB is running locally or use MongoDB Atlas.

## 4. Start Servers

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## 5. Create Your First Category

Since posts require categories, create one using the API:

```bash
# First, register a user through the UI
# Then login to get a token
# Finally, create a category:

curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name": "Technology"}'
```

Or use Postman to make the request.

## 6. Start Blogging!

1. Go to http://localhost:3000
2. Register an account
3. Create a category (via API or add UI later)
4. Create your first post!

## Common Commands

```bash
# Backend
npm run dev    # Start development server
npm start      # Start production server

# Frontend
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## Troubleshooting

- **Can't connect to MongoDB**: Check if MongoDB is running
- **Port already in use**: Change PORT in .env
- **Module errors**: Delete node_modules and run `npm install` again
- **CORS errors**: Make sure backend is running on port 5000

For detailed setup, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

