import { getSession } from 'next-auth/react';

// Mock database for now
// In a real application, this would be replaced with MongoDB
let pins = [
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

export default async function handler(req, res) {
  // Get user session for authenticated routes
  const session = await getSession({ req });
  
  // GET /api/pins - Get all pins (public)
  if (req.method === 'GET') {
    return res.status(200).json(pins);
  }
  
  // POST /api/pins - Create a new pin (authenticated)
  if (req.method === 'POST') {
    // Check authentication
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const pin = {
      id: Date.now().toString(), // Simple ID generation
      ...req.body
    };
    
    // Validate pin data
    if (!pin.name || !pin.lat || !pin.lng || !pin.description || 
        !pin.mainCategory || !pin.categories || pin.categories.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Make sure main category is included in categories
    if (!pin.categories.includes(pin.mainCategory)) {
      pin.categories.push(pin.mainCategory);
    }
    
    // Add to "database"
    pins.push(pin);
    
    return res.status(201).json(pin);
  }
  
  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}