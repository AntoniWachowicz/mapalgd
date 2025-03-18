import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

/**
 * This component enforces map boundaries when panning/zooming
 * It ensures users can't flick the map outside the defined boundaries
 */
export default function BoundaryEnforcer({ bounds }) {
  const map = useMap();
  
  useEffect(() => {
    if (!map || !bounds) return;
    
    // Convert bounds to Leaflet bounds format
    const leafletBounds = L.latLngBounds(bounds);
    
    // Function to check and enforce boundaries after any movement
    const enforceLimit = () => {
      // Only enforce if map is outside bounds
      if (!map.getBounds().isWithin(leafletBounds)) {
        // Get the current center
        const center = map.getCenter();
        
        // Compute the constrained center
        const constrainedCenter = L.latLng(
          Math.max(
            Math.min(center.lat, leafletBounds.getNorth()), 
            leafletBounds.getSouth()
          ),
          Math.max(
            Math.min(center.lng, leafletBounds.getEast()), 
            leafletBounds.getWest()
          )
        );
        
        // Move map to constrained position (with no animation)
        map.panTo(constrainedCenter, { animate: false });
      }
    };
    
    // Add event listeners for all movement types
    map.on('move', enforceLimit);
    map.on('moveend', enforceLimit);
    map.on('dragend', enforceLimit);
    
    // Clean up
    return () => {
      map.off('move', enforceLimit);
      map.off('moveend', enforceLimit);
      map.off('dragend', enforceLimit);
    };
  }, [map, bounds]);
  
  return null;
}