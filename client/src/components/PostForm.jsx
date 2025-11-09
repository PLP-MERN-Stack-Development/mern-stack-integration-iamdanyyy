// PostForm.jsx - Component for creating and editing posts

import { useState, useEffect } from 'react';
import { useCategories } from '../hooks/useCategories';
import CategoryForm from './CategoryForm';
import './PostForm.css';

const PostForm = ({ post, onSubmit, loading }) => {
  const { categories, loading: categoriesLoading, error: categoriesError, refresh } = useCategories();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    isPublished: true,
  });
  const [error, setError] = useState('');

  // Populate form if editing
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        category: post.category?._id || post.category || '',
        tags: post.tags ? post.tags.join(', ') : '',
        isPublished: post.isPublished !== undefined ? post.isPublished : true,
      });
    }
  }, [post]);

  // Handle category creation - refresh categories list
  const handleCategoryCreated = () => {
    // Refresh the categories list
    refresh();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    console.log('PostForm: Form submitted with data:', formData);

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }
    if (!formData.category) {
      setError('Please select a category');
      return;
    }

    // Process tags (split by comma and trim)
    const tags = formData.tags
      ? formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag)
      : [];

    // Prepare data for submission
    const submitData = {
      ...formData,
      tags,
    };

    // Call the onSubmit handler passed from parent
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(submitData);
    } else {
      console.error('onSubmit handler is not a function:', onSubmit);
      setError('Form submission error. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form" noValidate>
      {error && <div className="error-message" style={{ 
        backgroundColor: '#f8d7da', 
        color: '#721c24', 
        padding: '12px', 
        borderRadius: '5px', 
        marginBottom: '15px',
        border: '1px solid #f5c6cb'
      }}>{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter post title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="excerpt">Excerpt (optional)</label>
        <input
          type="text"
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Short description of your post"
          maxLength={200}
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content *</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your post content here..."
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category *</label>
        {categoriesLoading ? (
          <div>Loading categories...</div>
        ) : categoriesError ? (
          <div className="error-message">
            Error loading categories: {categoriesError}
          </div>
        ) : categories.length === 0 ? (
          <div>
            <div className="error-message" style={{ marginBottom: '15px' }}>
              No categories available. Please create a category first.
            </div>
            <CategoryForm onCategoryCreated={handleCategoryCreated} />
          </div>
        ) : (
          <>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <details style={{ marginTop: '10px' }}>
              <summary style={{ cursor: 'pointer', color: '#007bff', fontSize: '0.9rem' }}>
                + Create new category
              </summary>
              <div style={{ marginTop: '10px' }}>
                <CategoryForm onCategoryCreated={handleCategoryCreated} />
              </div>
            </details>
          </>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags (optional)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Separate tags with commas (e.g., react, javascript, web)"
        />
        <small className="form-hint">Separate multiple tags with commas</small>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          <span>Publish immediately</span>
        </label>
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || categoriesLoading}
        >
          {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </button>
        {loading && <p style={{ marginTop: '10px', color: '#666' }}>Creating post...</p>}
      </div>
    </form>
  );
};

export default PostForm;

