import { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import mapConfig from '../config/mapConfig';

/**
 * Component that adds a legend to the map
 */
const MapLegend = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Create a legend control
    const legend = L.control({ position: 'bottomright' });

    // Add content to the legend
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.backgroundColor = 'white';
      div.style.padding = '10px';
      div.style.borderRadius = '5px';
      div.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
      
      div.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 10px;">Legenda</div>
        
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 20px; height: 3px; background-color: ${mapConfig.borderStyle.color}; 
                      margin-right: 8px; opacity: ${mapConfig.borderStyle.opacity}"></div>
          <span>Granica obszaru ${mapConfig.areaName}</span>
        </div>
        
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 12px; height: 12px; border-radius: 50%; 
                      background-color: ${mapConfig.categoryNames.finance ? '#4CAF50' : 'green'}; 
                      margin-right: 8px;"></div>
          <span>${mapConfig.categoryNames.finance || 'Finanse'}</span>
        </div>
        
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 12px; height: 12px; border-radius: 50%; 
                      background-color: ${mapConfig.categoryNames.social ? '#2196F3' : 'blue'}; 
                      margin-right: 8px;"></div>
          <span>${mapConfig.categoryNames.social || 'Społeczne'}</span>
        </div>
        
        <div style="display: flex; align-items: center;">
          <div style="width: 12px; height: 12px; border-radius: 50%; 
                      background-color: ${mapConfig.categoryNames.health ? '#F44336' : 'red'}; 
                      margin-right: 8px;"></div>
          <span>${mapConfig.categoryNames.health || 'Zdrowie'}</span>
        </div>
      `;
      
      return div;
    };

    // Add legend to map
    legend.addTo(map);

    // Cleanup function
    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
};

export default MapLegend;