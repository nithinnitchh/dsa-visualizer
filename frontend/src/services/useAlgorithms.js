/**
 * Example React Hook for using the API Service with sorting algorithms.
 * This demonstrates how to integrate the backend API into React components.
 */

import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Hook for executing sorting algorithms via the backend API
 * Usage:
 *   const { execute, result, loading, error, steps } = useSortingAlgorithm();
 *   await execute('Quick Sort', [8, 3, 7, 1, 5, 2]);
 */
export function useSortingAlgorithm() {
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (algorithmName, array) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setSteps([]);

    try {
      const response = await api.executeSortingAlgorithm(algorithmName, array);
      
      if (!response.success) {
        throw new Error(response.error || 'Algorithm execution failed');
      }

      setResult(response);
      setSteps(response.steps || []);
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Sorting algorithm error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    execute,
    result,
    steps,
    loading,
    error,
    statistics: result?.statistics,
    complexity: result?.complexity,
  };
}

/**
 * Hook for executing graph algorithms via the backend API
 */
export function useGraphAlgorithm() {
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (algorithmName, adjacencyList, weights, startVertex = null) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setSteps([]);

    try {
      const response = await api.executeGraphAlgorithm(algorithmName, adjacencyList, weights, startVertex);
      
      if (!response.success) {
        throw new Error(response.error || 'Algorithm execution failed');
      }

      setResult(response);
      setSteps(response.steps || []);
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Graph algorithm error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    execute,
    result,
    steps,
    loading,
    error,
    statistics: result?.statistics,
    complexity: result?.complexity,
  };
}

/**
 * Hook for executing pathfinding algorithms via the backend API
 */
export function usePathfindingAlgorithm() {
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (algorithmName, grid, start, end) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setSteps([]);

    try {
      const response = await api.executePathfindingAlgorithm(algorithmName, grid, start, end);
      
      if (!response.success) {
        throw new Error(response.error || 'Algorithm execution failed');
      }

      setResult(response);
      setSteps(response.steps || []);
      return response;
    } catch (err) {
      setError(err.message);
      console.error('Pathfinding algorithm error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    execute,
    result,
    steps,
    loading,
    error,
    statistics: result?.statistics,
    complexity: result?.complexity,
  };
}

/**
 * Hook for authentication
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(api.isAuthenticated());

  const register = useCallback(async (email, username, password, confirmPassword) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.register(email, username, password, confirmPassword);
      setUser(response);
      setIsAuthenticated(true);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.login(email, password);
      setUser(response);
      setIsAuthenticated(true);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    api.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const getCurrentUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.getCurrentUser();
      setUser(response);
      return response;
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
    getCurrentUser,
  };
}
