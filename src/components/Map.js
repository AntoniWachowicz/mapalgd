import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { format } from 'date-fns';
import PinMarker from './PinMarker';
import BoundaryEnforcer from './BoundaryEnforcer';
import MapLegend from './MapLegend';
import mapConfig from '../config/mapConfig';
import lgdBorder from '../config/lgdBorder';

// Component to handle map click events
function MapEventHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e);
      }
    },
  });
  return null;
}

// Component to fly to selected pin
function FlyToMarker({ selectedPin }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedPin) {
      map.flyTo([selectedPin.lat, selectedPin.lng], 15, {
        duration: 1
      });
    }
  }, [selectedPin, map]);
  
  return null;
}

export default function Map({ 
  pins = [], 
  selectedPin, 
  onSelectPin, 
  onMapClick,
  isAdmin = false
}) {
  // Initial position is centered on the configured area
  const [position, setPosition] = useState([mapConfig.initialPosition.lat, mapConfig.initialPosition.lng]);
  const [zoom, setZoom] = useState(mapConfig.initialZoom);

  // Fix for Leaflet default icon issues in Next.js
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker-icon-2x.png',
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer 
      center={position} 
      zoom={zoom} 
      style={{ height: '100%', width: '100%' }}
      minZoom={mapConfig.minZoom}
      maxZoom={mapConfig.maxZoom}
      maxBounds={mapConfig.boundaries}
      maxBoundsViscosity={1.0} // Prevents the map from being dragged outside bounds
      keyboard={true}
      inertia={true}
      inertiaDeceleration={3000} // Faster deceleration to prevent boundary issues
      worldCopyJump={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* LGD Border */}
      <GeoJSON 
        data={lgdBorder} 
        style={() => mapConfig.borderStyle}
        onEachFeature={(feature, layer) => {
          if (feature.properties && feature.properties.name) {
            layer.bindTooltip(feature.properties.name, {
              permanent: false,
              direction: 'center',
              className: 'lgd-border-tooltip'
            });
          }
        }}
      />
      
      {/* Map event handlers */}
      {isAdmin && <MapEventHandler onMapClick={onMapClick} />}
      <FlyToMarker selectedPin={selectedPin} />
      <BoundaryEnforcer bounds={mapConfig.boundaries} />
      <MapLegend />
      
      {/* Display all pins */}
      {pins.map((pin) => (
        <PinMarker 
          key={pin.id}
          pin={pin}
          isSelected={selectedPin?.id === pin.id}
          onClick={() => onSelectPin(pin)}
        >
          <Popup>
            {pin.imageUrl && (
              <img 
                src={pin.imageUrl} 
                alt={pin.name} 
                className="pin-popup-image"
              />
            )}
            <div className="pin-popup-title">{pin.name}</div>
            <div className={`pin-popup-category ${pin.mainCategory}`}>
              {mapConfig.categoryNames[pin.mainCategory] || 
               pin.mainCategory.charAt(0).toUpperCase() + pin.mainCategory.slice(1)}
            </div>
            <div className="pin-popup-date">
              {format(new Date(pin.date), mapConfig.dateFormat)}
            </div>
            <div className="pin-popup-description">{pin.description}</div>
            <div className="pin-popup-value">
              Wartość: {mapConfig.currency.format(pin.value)}
            </div>
            
            {/* Display all categories */}
            <div className="mt-2 text-xs">
              Kategorie:
              {pin.categories.map(category => (
                <span 
                  key={category}
                  className={`inline-block px-2 py-1 mr-1 rounded-full bg-${category} text-white text-xs`}
                >
                  {mapConfig.categoryNames[category] || 
                   category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              ))}
            </div>
          </Popup>
        </PinMarker>
      ))}
    </MapContainer>
  );
}