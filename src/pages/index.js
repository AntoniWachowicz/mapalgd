import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import PinList from '../components/PinList';

// Import map component dynamically to avoid SSR issues with Leaflet
const Map = dynamic(() => import('../components/Map'), {
  ssr: false
});

// Sample data for testing (will be replaced with API calls)
const samplePins = [
  {
    id: '1',
    name: 'Financial District Office',
    lat: 40.7128,
    lng: -74.0060,
    date: '2023-07-15',
    description: 'Main office building in the financial district',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    value: 1500000,
    mainCategory: 'finance',
    categories: ['finance', 'social']
  },
  {
    id: '2',
    name: 'Community Center',
    lat: 40.7200,
    lng: -73.9950,
    date: '2023-06-10',
    description: 'Local community center serving the neighborhood',
    imageUrl: 'https://images.unsplash.com/photo-1577791465485-b80039b4d69a',
    value: 450000,
    mainCategory: 'social',
    categories: ['social', 'health']
  },
  {
    id: '3',
    name: 'Medical Clinic',
    lat: 40.7300,
    lng: -74.0100,
    date: '2023-07-01',
    description: 'Modern healthcare facility providing essential services',
    imageUrl: 'https://images.unsplash.com/photo-1516549655669-d2190c128a78',
    value: 750000,
    mainCategory: 'health',
    categories: ['health']
  }
];

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
        <title>Map Pin Application</title>
        <meta name="description" content="Interactive map application with pin categories" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar with pin list */}
        <div className="w-96 bg-white shadow-lg z-20 overflow-auto">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold mb-4">Locations</h2>
            
            {/* Category filters */}
            <div className="flex space-x-2 mb-4">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('finance')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'finance' ? 'bg-finance text-white' : 'bg-gray-200'}`}
              >
                Finance
              </button>
              <button 
                onClick={() => setFilter('social')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'social' ? 'bg-social text-white' : 'bg-gray-200'}`}
              >
                Social
              </button>
              <button 
                onClick={() => setFilter('health')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'health' ? 'bg-health text-white' : 'bg-gray-200'}`}
              >
                Health
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading pins...</p>
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