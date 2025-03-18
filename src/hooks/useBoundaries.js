import { useState, useEffect } from 'react';
import lgdBorder from '../config/lgdBorder';

/**
 * Custom hook for loading administrative boundaries
 * 
 * @param {boolean} useLiveData - Whether to fetch live data (not used in this simplified version)
 * @returns {Object} Boundary data and loading state
 */
const useBoundaries = (useLiveData = false) => {
  const [boundaries, setBoundaries] = useState(lgdBorder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // This simplified version just returns the static border data
  // No actual API fetching is done here to avoid deployment issues

  return { 
    boundaries, 
    loading, 
    error,
    isLiveData: false
  };
};

export default useBoundaries;