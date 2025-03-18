import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import PinList from '../components/PinList';
import mapConfig from '../config/mapConfig';

// Import map component dynamically to avoid SSR issues with Leaflet
const Map = dynamic(() => import('../components/Map'), {
  ssr: false
});

// Sample data for testing (will be replaced with API calls)
const samplePins = mapConfig.samplePins;

export default function Home() {
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Fetch pins (simulated for now)
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setPins(samplePins);
      setLoading(false);
    }, 500);
  }, []);

  // Filter pins based on selected category
  const filteredPins = filter === 'all' 
    ? pins 
    : pins.filter(pin => pin.categories.includes(filter));

  return (
    <>
      <Head>
        <title>Mapa {mapConfig.areaName}</title>
        <meta name="description" content={`Interaktywna mapa z punktami dla obszaru ${mapConfig.areaName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar with pin list */}
        <div className="w-96 bg-white shadow-lg z-20 overflow-auto">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold mb-4">Lokalizacje</h2>
            
            {/* Category filters */}
            <div className="flex space-x-2 mb-4">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
              >
                Wszystkie
              </button>
              <button 
                onClick={() => setFilter('finance')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'finance' ? 'bg-finance text-white' : 'bg-gray-200'}`}
              >
                {mapConfig.categoryNames.finance}
              </button>
              <button 
                onClick={() => setFilter('social')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'social' ? 'bg-social text-white' : 'bg-gray-200'}`}
              >
                {mapConfig.categoryNames.social}
              </button>
              <button 
                onClick={() => setFilter('health')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'health' ? 'bg-health text-white' : 'bg-gray-200'}`}
              >
                {mapConfig.categoryNames.health}
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Ładowanie punktów...</p>
            </div>
          ) : (
            <PinList 
              pins={filteredPins} 
              selectedPin={selectedPin} 
              onSelectPin={setSelectedPin} 
            />
          )}
        </div>

        {/* Map container */}
        <div className="flex-1">
          <Map 
            pins={filteredPins} 
            selectedPin={selectedPin} 
            onSelectPin={setSelectedPin} 
          />
        </div>
      </div>
    </>
  );
}