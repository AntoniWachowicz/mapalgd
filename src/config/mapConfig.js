/**
 * Central configuration for map settings
 * Edit this file to customize the application for different areas
 */

const mapConfig = {
    // Area name (displayed in UI)
    areaName: "LGD Bud-Uj Razem",
    
    // Initial map position
    initialPosition: {
      lat: 51.7833,
      lng: 19.4667,
    },
    
    // Initial zoom level
    initialZoom: 9,
    
    // Zoom restrictions
    minZoom: 8,
    maxZoom: 18,
    
    // Map boundaries (to prevent panning too far)
    // Format: [[southWest_lat, southWest_lng], [northEast_lat, northEast_lng]]
    boundaries: [
      [51.0, 18.0], // Southwest corner
      [52.5, 21.0]  // Northeast corner
    ],
    
    // Border styling for the LGD area
    borderStyle: {
      color: "#3388ff",
      weight: 3,
      opacity: 0.7,
      fill: true,
      fillColor: "#3388ff",
      fillOpacity: 0.1,
      dashArray: "5, 5",
      lineCap: "round"
    },
    
    // Sample pins for the area (used for initial demo)
    samplePins: [
      {
        id: '1',
        name: 'Urząd Gminy Rokiciny',
        lat: 51.6970,
        lng: 19.7574,
        date: '2023-07-15',
        description: 'Główny budynek administracyjny gminy Rokiciny',
        imageUrl: 'https://images.unsplash.com/photo-1577791465485-b80039b4d69a',
        value: 1500000,
        mainCategory: 'finance',
        categories: ['finance', 'social']
      },
      {
        id: '2',
        name: 'Centrum Społeczne w Ujazd',
        lat: 51.6062,
        lng: 19.5696,
        date: '2023-06-10',
        description: 'Lokalne centrum społeczne wspierające mieszkańców',
        imageUrl: 'https://images.unsplash.com/photo-1577791465485-b80039b4d69a',
        value: 450000,
        mainCategory: 'social',
        categories: ['social', 'health']
      },
      {
        id: '3',
        name: 'Ośrodek Zdrowia Będków',
        lat: 51.5383,
        lng: 19.7200,
        date: '2023-07-01',
        description: 'Nowoczesna placówka zdrowotna świadcząca usługi medyczne',
        imageUrl: 'https://images.unsplash.com/photo-1516549655669-d2190c128a78',
        value: 750000,
        mainCategory: 'health',
        categories: ['health']
      }
    ],
    
    // Category translations
    categoryNames: {
      finance: 'Finanse',
      social: 'Społeczne',
      health: 'Zdrowie'
    },
    
    // Currency symbol and format
    currency: {
      symbol: 'zł',
      format: (value) => `${value.toLocaleString()} zł`
    },
    
    // Date format (for display)
    dateFormat: 'dd.MM.yyyy'
  };
  
  export default mapConfig;