// PostList.jsx - Component to display a list of posts

import PostCard from './PostCard';
import './PostList.css';

const PostList = ({ posts, loading, error }) => {
  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-center">No posts found. Be the first to create one!</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;

