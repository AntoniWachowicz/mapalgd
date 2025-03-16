import { useEffect, useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

export default function PinMarker({ pin, isSelected, children, onClick }) {
  // Create a custom icon based on the pin's main category
  const icon = useMemo(() => {
    // Define colors for each category
    const colors = {
      finance: '#4CAF50',
      social: '#2196F3',
      health: '#F44336'
    };
    
    const color = colors[pin.mainCategory] || '#757575';
    const selectedScale = isSelected ? 1.2 : 1;
    
    return L.divIcon({
      className: 'custom-pin-marker',
      html: `
        <svg 
          width="${30 * selectedScale}" 
          height="${45 * selectedScale}" 
          viewBox="0 0 30 45" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style="overflow: visible;"
        >
          <filter id="shadow-${pin.id}" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="3" stdDeviation="${isSelected ? 3 : 1}" flood-color="rgba(0,0,0,0.3)" />
          </filter>
          
          <path 
            d="M15 0C6.75 0 0 6.75 0 15C0 25.5 15 45 15 45C15 45 30 25.5 30 15C30 6.75 23.25 0 15 0ZM15 22.5C10.875 22.5 7.5 19.125 7.5 15C7.5 10.875 10.875 7.5 15 7.5C19.125 7.5 22.5 10.875 22.5 15C22.5 19.125 19.125 22.5 15 22.5Z" 
            fill="${color}"
            stroke="${isSelected ? 'white' : 'none'}"
            stroke-width="${isSelected ? 2 : 0}"
            filter="url(#shadow-${pin.id})"
          />
        </svg>
      `,
      iconSize: [30, 45],
      iconAnchor: [15, 45],
      popupAnchor: [0, -45]
    });
  }, [pin.mainCategory, pin.id, isSelected]);

  return (
    <Marker 
      position={[pin.lat, pin.lng]} 
      icon={icon} 
      eventHandlers={{
        click: onClick
      }}
      zIndexOffset={isSelected ? 1000 : 0}
    >
      {children}
    </Marker>
  );
}