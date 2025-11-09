// EditPost.jsx - Page for editing an existing post

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePost } from '../hooks/usePosts';
import { postService } from '../services/api';
import PostForm from '../components/PostForm';
import './EditPost.css';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { post, loading: postLoading, error: postError } = usePost(id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Check if user is the author
  useEffect(() => {
    if (post && user && post.author._id !== user.id) {
      navigate('/');
    }
  }, [post, user, navigate]);

  if (postLoading) {
    return <div className="loading">Loading post...</div>;
  }

  if (postError) {
    return <div className="error">Error: {postError}</div>;
  }

  if (!post) {
    return <div className="error">Post not found</div>;
  }

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    try {
      await postService.updatePost(id, formData);
      // Navigate back to the post
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update post');
      setLoading(false);
    }
  };

  return (
    <div className="edit-post-page">
      <div className="container">
        <h1 className="page-title">Edit Post</h1>
        {error && <div className="error">{error}</div>}
        <PostForm post={post} onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default EditPost;

