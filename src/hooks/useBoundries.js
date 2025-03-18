import { useState, useEffect } from 'react';
import { fetchLGDBoundaries, fallbackLGDBoundary } from '../utils/osmBoundaries';
import lgdBorder from '../config/lgdBorder';

/**
 * Custom hook for loading administrative boundaries
 * 
 * @param {boolean} useLiveData - Whether to fetch live data from OSM
 * @returns {Object} Boundary data and loading state
 */
const useBoundaries = (useLiveData = false) => {
  const [boundaries, setBoundaries] = useState(lgdBorder);
  const [loading, setLoading] = useState(useLiveData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If not using live data, use the static GeoJSON
    if (!useLiveData) {
      return;
    }

    const loadBoundaries = async () => {
      try {
        setLoading(true);
        // Fetch boundaries from OpenStreetMap
        const osmBoundaries = await fetchLGDBoundaries();
        
        // Use fetched boundaries if available, otherwise use fallback
        if (osmBoundaries && osmBoundaries.features && osmBoundaries.features.length > 0) {
          setBoundaries(osmBoundaries);
        } else {
          console.warn('Using fallback boundaries - OSM data unavailable or empty');
          setBoundaries(fallbackLGDBoundary);
        }
      } catch (err) {
        console.error('Error loading boundaries:', err);
        setError(err);
        // Use the fallback boundaries on error
        setBoundaries(fallbackLGDBoundary);
      } finally {
        setLoading(false);
      }
    };

    loadBoundaries();
  }, [useLiveData]);

  return { 
    boundaries, 
    loading, 
    error,
    isLiveData: useLiveData && !error && boundaries !== fallbackLGDBoundary && boundaries !== lgdBorder
  };
};

export default useBoundaries;