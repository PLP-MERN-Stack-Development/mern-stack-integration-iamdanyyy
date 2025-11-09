// posts.js - Post routes

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validator');

// Validation rules
const postValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required'),
];

// Routes
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', protect, postValidation, validate, createPost);
router.put('/:id', protect, postValidation, validate, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/comments', protect, addComment);

module.exports = router;

