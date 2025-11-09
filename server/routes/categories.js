// categories.js - Category routes

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getCategories,
  getCategory,
  createCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validator');

// Validation rules
const categoryValidation = [
  body('name').trim().notEmpty().withMessage('Category name is required'),
];

// Routes
router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', protect, categoryValidation, validate, createCategory);

module.exports = router;

