// Home.jsx - Home page displaying all posts

import { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useCategories } from '../hooks/useCategories';
import PostList from '../components/PostList';
import './Home.css';

const Home = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const { posts, loading, error, total, pages } = usePosts(
    page,
    10,
    selectedCategory,
    activeSearch
  );
  const { categories } = useCategories();

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value || null);
    setActiveSearch(''); // Clear search when category changes
    setSearchQuery(''); // Clear search input
    setPage(1); // Reset to first page when category changes
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery);
    setSelectedCategory(null); // Clear category filter when searching
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveSearch('');
    setPage(1);
  };

  return (
    <div className="home-page">
      <div className="container">
        <h1 className="page-title">Welcome to MERN Blog</h1>
        <p className="page-subtitle">Read and share amazing blog posts</p>

        {/* Search and filter section */}
        <div className="filters-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
            {activeSearch && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="btn btn-secondary"
              >
                Clear
              </button>
            )}
          </form>
          {activeSearch && (
            <p className="search-info">Searching for: "{activeSearch}"</p>
          )}

          <div className="category-filter">
            <label htmlFor="category">Filter by category:</label>
            <select
              id="category"
              value={selectedCategory || ''}
              onChange={handleCategoryChange}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts list */}
        <PostList posts={posts} loading={loading} error={error} />

        {/* Pagination */}
        {pages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn btn-secondary"
            >
              Previous
            </button>
            <span className="page-info">
              Page {page} of {pages} (Total: {total} posts)
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page === pages}
              className="btn btn-secondary"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

