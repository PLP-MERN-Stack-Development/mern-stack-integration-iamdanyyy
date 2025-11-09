// CategoryForm.jsx - Simple form to create a new category

import { useState } from 'react';
import { categoryService } from '../services/api';
import './CategoryForm.css';

const CategoryForm = ({ onCategoryCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent event from bubbling to parent form
    }
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Category name is required');
      return;
    }

    setLoading(true);

    try {
      await categoryService.createCategory({ name: name.trim(), description: description.trim() });
      setSuccess('Category created successfully!');
      setName('');
      setDescription('');
      // Notify parent component to refresh categories
      if (onCategoryCreated) {
        onCategoryCreated();
      }
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key on inputs
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit(e);
    }
  };

  return (
    <div className="category-form-container">
      <h3>Create New Category</h3>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="category-form-wrapper">
        <div className="form-group">
          <label htmlFor="category-name">Category Name *</label>
          <input
            type="text"
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Technology, Lifestyle, Travel"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category-description">Description (optional)</label>
          <input
            type="text"
            id="category-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Brief description of this category"
          />
        </div>
        <button 
          type="button" 
          onClick={handleSubmit} 
          className="btn btn-primary" 
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Category'}
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;

