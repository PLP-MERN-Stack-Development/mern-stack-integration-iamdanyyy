// PostDetail.jsx - Page to display a single post with comments

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { usePost } from '../hooks/usePosts';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/api';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, loading, error } = usePost(id);
  const { user, isAuthenticated } = useAuth();
  const [commentContent, setCommentContent] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }

    setCommentLoading(true);
    setCommentError('');

    try {
      await postService.addComment(id, { content: commentContent });
      setCommentContent('');
      // Refresh the page to show new comment
      window.location.reload();
    } catch (error) {
      setCommentError(error.response?.data?.error || 'Failed to add comment');
    } finally {
      setCommentLoading(false);
    }
  };

  // Handle post deletion
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setDeleting(true);
    try {
      await postService.deletePost(id);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to delete post');
      setDeleting(false);
    }
  };

  // Check if user is the author
  const isAuthor = post && user && post.author._id === user.id;

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!post) {
    return <div className="error">Post not found</div>;
  }

  return (
    <div className="post-detail-page">
      <div className="container">
        <article className="post-detail">
          {/* Post header */}
          <header className="post-header">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span className="post-author">By {post.author?.name}</span>
              <span className="post-date">{formatDate(post.createdAt)}</span>
              {post.category && (
                <span className="post-category">{post.category.name}</span>
              )}
              <span className="post-views">{post.viewCount} views</span>
            </div>
            {isAuthor && (
              <div className="post-actions">
                <Link to={`/posts/${id}/edit`} className="btn btn-secondary">
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn btn-danger"
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </header>

          {/* Post excerpt */}
          {post.excerpt && (
            <div className="post-excerpt">{post.excerpt}</div>
          )}

          {/* Post content */}
          <div className="post-content">
            <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
          </div>

          {/* Post tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="post-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Comments section */}
          <section className="comments-section">
            <h2>Comments ({post.comments?.length || 0})</h2>

            {/* Comment form */}
            {isAuthenticated ? (
              <form onSubmit={handleCommentSubmit} className="comment-form">
                {commentError && (
                  <div className="error-message">{commentError}</div>
                )}
                <div className="form-group">
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Write a comment..."
                    rows="4"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={commentLoading}
                >
                  {commentLoading ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            ) : (
              <p className="login-prompt">
                <Link to="/login">Login</Link> to leave a comment
              </p>
            )}

            {/* Comments list */}
            <div className="comments-list">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <div className="comment-header">
                      <span className="comment-author">
                        {comment.user?.name || 'Anonymous'}
                      </span>
                      <span className="comment-date">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <div className="comment-content">{comment.content}</div>
                  </div>
                ))
              ) : (
                <p className="no-comments">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;

