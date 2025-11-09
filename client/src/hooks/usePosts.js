// usePosts.js - Custom hook for managing posts

import { useState, useEffect } from 'react';
import { postService } from '../services/api';

export const usePosts = (page = 1, limit = 10, category = null, search = null) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        // getAllPosts handles both category and search filters
        const response = await postService.getAllPosts(
          page,
          limit,
          category,
          search
        );
        setPosts(response.data);
        setTotal(response.total);
        setPages(response.pages);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit, category, search]);

  return { posts, loading, error, total, pages };
};

// Hook for a single post
export const usePost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await postService.getPost(id);
        setPost(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { post, loading, error };
};

