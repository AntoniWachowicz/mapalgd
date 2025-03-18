import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import PinForm from '../components/PinForm';
import PinList from '../components/PinList';
import mapConfig from '../config/mapConfig';

// Import map component dynamically to avoid SSR issues with Leaflet
const Map = dynamic(() => import('../components/Map'), {
  ssr: false
});

// Sample data for testing (will be replaced with API calls)
const samplePins = mapConfig.samplePins;

export default function Admin() {
  const { data: session, status } = useSession();
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPin, setEditingPin] = useState(null);

  // Fetch pins (simulated for now)
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setPins(samplePins);
      setLoading(false);
    }, 500);
  }, []);

  // Check for user authentication
  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Ładowanie...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Wymagany dostęp administratora</h1>
        <p>Musisz być zalogowany jako administrator, aby uzyskać dostęp do tej strony.</p>
      </div>
    );
  }

  // Handle map click to add a new pin
  const handleMapClick = (e) => {
    setSelectedLocation({
      lat: e.latlng.lat,
      lng: e.latlng.lng
    });
    setShowForm(true);
    setIsEditing(false);
  };

  // Handle editing an existing pin
  const handleEditPin = (pin) => {
    setEditingPin(pin);
    setSelectedLocation({
      lat: pin.lat,
      lng: pin.lng
    });
    setShowForm(true);
    setIsEditing(true);
  };

  // Handle pin form submission
  const handleSubmitPin = (pinData) => {
    const newPin = {
      id: isEditing ? editingPin.id : Date.now().toString(),
      ...pinData,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng
    };

    if (isEditing) {
      // Update existing pin
      setPins(pins.map(pin => pin.id === newPin.id ? newPin : pin));
      toast.success('Punkt został zaktualizowany pomyślnie!');
    } else {
      // Add new pin
      setPins([...pins, newPin]);
      toast.success('Nowy punkt został dodany pomyślnie!');
    }

    setShowForm(false);
    setSelectedLocation(null);
    setEditingPin(null);
  };

  // Handle pin deletion
  const handleDeletePin = (pinId) => {
    setPins(pins.filter(pin => pin.id !== pinId));
    toast.info('Punkt został usunięty pomyślnie!');
  };

  return (
    <>
      <Head>
        <title>Panel administracyjny - Mapa {mapConfig.areaName}</title>
        <meta name="description" content={`Panel administracyjny do zarządzania punktami na mapie ${mapConfig.areaName}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar with pin list */}
        <div className="w-96 bg-white shadow-lg z-10 overflow-auto">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold mb-2">Panel Administracyjny</h2>
            <p className="text-sm text-gray-600 mb-4">Kliknij na mapę, aby dodać nowy punkt</p>
            
            {/* Add new pin button */}
            <button 
              onClick={() => {
                setShowForm(true);
                setIsEditing(false);
                setEditingPin(null);
              }}
              className="w-full py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
            >
              Dodaj Nowy Punkt
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Ładowanie punktów...</p>
            </div>
          ) : (
            <PinList 
              pins={pins} 
              selectedPin={selectedPin} 
              onSelectPin={setSelectedPin}
              isAdmin
              onEditPin={handleEditPin}
              onDeletePin={handleDeletePin}
            />
          )}
        </div>

        {/* Map container */}
        <div className="flex-1 relative">
          <Map 
            pins={pins} 
            selectedPin={selectedPin} 
            onSelectPin={setSelectedPin}
            onMapClick={handleMapClick}
            isAdmin
          />
          
          {/* Pin form modal */}
          {showForm && (
            <div className="absolute inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
              <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-bold mb-4">
                  {isEditing ? 'Edytuj Punkt' : 'Dodaj Nowy Punkt'}
                </h2>
                <PinForm 
                  initialValues={isEditing ? editingPin : {
                    name: '',
                    date: new Date().toISOString().split('T')[0],
                    description: '',
                    imageUrl: '',
                    value: 0,
                    mainCategory: 'finance',
                    categories: ['finance'],
                    lat: selectedLocation?.lat,
                    lng: selectedLocation?.lng
                  }}
                  onSubmit={handleSubmitPin}
                  onCancel={() => {
                    setShowForm(false);
                    setSelectedLocation(null);
                    setEditingPin(null);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  return {
    props: {
      session
    }
  };
}