// useCategories.js - Custom hook for managing categories

import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryService.getAllCategories();
      // Response structure: { success: true, count: X, data: [...] }
      setCategories(response.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch categories');
      setCategories([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, refreshTrigger]);

  // Function to refresh categories
  const refresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return { categories, loading, error, refresh };
};

