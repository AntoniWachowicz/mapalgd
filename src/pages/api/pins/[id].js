import { getSession } from 'next-auth/react';

// This would be connected to the same database as in index.js
// For demonstration, we'll access the same pins array from the other file
// In a real app with MongoDB, we would import and use the Pin model
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
  const { id } = req.query;
  const session = await getSession({ req });
  
  // Find the pin in our "database"
  const pinIndex = pins.findIndex(p => p.id === id);
  
  if (pinIndex === -1) {
    return res.status(404).json({ error: 'Pin not found' });
  }
  
  // GET /api/pins/:id - Get a specific pin (public)
  if (req.method === 'GET') {
    return res.status(200).json(pins[pinIndex]);
  }
  
  // Check authentication for all other methods
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // PUT /api/pins/:id - Update a pin (authenticated)
  if (req.method === 'PUT') {
    const updatedPin = {
      ...pins[pinIndex],
      ...req.body,
      id // Ensure ID doesn't change
    };
    
    // Validate updated pin data
    if (!updatedPin.name || !updatedPin.lat || !updatedPin.lng || 
        !updatedPin.description || !updatedPin.mainCategory || 
        !updatedPin.categories || updatedPin.categories.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Make sure main category is included in categories
    if (!updatedPin.categories.includes(updatedPin.mainCategory)) {
      updatedPin.categories.push(updatedPin.mainCategory);
    }
    
    // Update in "database"
    pins[pinIndex] = updatedPin;
    
    return res.status(200).json(updatedPin);
  }
  
  // DELETE /api/pins/:id - Delete a pin (authenticated)
  if (req.method === 'DELETE') {
    // Remove from "database"
    pins = pins.filter(p => p.id !== id);
    
    return res.status(200).json({ message: 'Pin deleted successfully' });
  }
  
  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}