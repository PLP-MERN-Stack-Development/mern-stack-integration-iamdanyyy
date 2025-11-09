// CreatePost.jsx - Page for creating a new post

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/api';
import PostForm from '../components/PostForm';
import './CreatePost.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (formData) => {
    console.log('CreatePost: handleSubmit called with:', formData);
    setLoading(true);
    setError('');

    try {
      console.log('CreatePost: Calling postService.createPost...');
      const response = await postService.createPost(formData);
      console.log('CreatePost: Response received:', response);
      
      // Navigate to the new post
      if (response && response.data && response.data._id) {
        console.log('CreatePost: Navigating to post:', response.data._id);
        navigate(`/posts/${response.data._id}`);
      } else {
        console.error('CreatePost: Invalid response structure:', response);
        setError('Post created but unable to navigate. Please check the posts list.');
        setLoading(false);
      }
    } catch (err) {
      console.error('CreatePost: Error creating post:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to create post';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <div className="container">
        <h1 className="page-title">Create New Post</h1>
        {error && (
          <div className="error" style={{ 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            padding: '15px', 
            borderRadius: '5px', 
            marginBottom: '20px',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}
        <PostForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default CreatePost;

