import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { format } from 'date-fns';
import PinMarker from './PinMarker';

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
  // Initial position is centered on New York City by default
  const [position, setPosition] = useState([40.7128, -74.0060]);
  const [zoom, setZoom] = useState(12);

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
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Map event handlers */}
      {isAdmin && <MapEventHandler onMapClick={onMapClick} />}
      <FlyToMarker selectedPin={selectedPin} />
      
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
              {pin.mainCategory.charAt(0).toUpperCase() + pin.mainCategory.slice(1)}
            </div>
            <div className="pin-popup-date">
              {format(new Date(pin.date), 'MMM d, yyyy')}
            </div>
            <div className="pin-popup-description">{pin.description}</div>
            <div className="pin-popup-value">
              Value: ${pin.value.toLocaleString()}
            </div>
            
            {/* Display all categories */}
            <div className="mt-2 text-xs">
              Categories:
              {pin.categories.map(category => (
                <span 
                  key={category}
                  className={`inline-block px-2 py-1 mr-1 rounded-full bg-${category} text-white text-xs`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              ))}
            </div>
          </Popup>
        </PinMarker>
      ))}
    </MapContainer>
  );
}