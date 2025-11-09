// PostCard.jsx - Component to display a single post preview

import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post }) => {
  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Truncate content for preview
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="post-card">
      <div className="post-card-header">
        <h2>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </h2>
        <div className="post-meta">
          <span className="post-author">
            By {post.author?.name || 'Unknown'}
          </span>
          <span className="post-date">{formatDate(post.createdAt)}</span>
        </div>
      </div>
      <div className="post-card-body">
        {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
        <p className="post-content-preview">
          {truncateContent(post.content)}
        </p>
        <div className="post-tags">
          {post.category && (
            <span className="post-category">{post.category.name}</span>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="post-tag-list">
              {post.tags.map((tag, index) => (
                <span key={index} className="post-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="post-card-footer">
        <Link to={`/posts/${post._id}`} className="btn btn-primary">
          Read More
        </Link>
        <span className="post-views">{post.viewCount} views</span>
      </div>
    </div>
  );
};

export default PostCard;

