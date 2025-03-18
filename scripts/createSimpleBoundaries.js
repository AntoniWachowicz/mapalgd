/**
 * Script to create a simple boundary file for the LGD area
 * 
 * This creates an approximate representation of the municipalities
 * in the LGD Bud-Uj Razem area without requiring API access.
 * 
 * Usage:
 *   node scripts/createSimpleBoundaries.js
 */

const fs = require('fs');
const path = require('path');

// Define approximate boundaries for each municipality in the LGD
// These are simplified shapes based on approximate locations
const municipalities = [
  {
    name: "Będków",
    coordinates: [
      [19.68, 51.46], [19.75, 51.46], 
      [19.75, 51.51], [19.68, 51.51]
    ]
  },
  {
    name: "Budziszewice",
    coordinates: [
      [19.82, 51.52], [19.87, 51.52], 
      [19.87, 51.56], [19.82, 51.56]
    ]
  },
  {
    name: "Czerniewice",
    coordinates: [
      [19.95, 51.52], [20.05, 51.52], 
      [20.05, 51.60], [19.95, 51.60]
    ]
  },
  {
    name: "Lubochnia",
    coordinates: [
      [19.95, 51.45], [20.05, 51.45], 
      [20.05, 51.52], [19.95, 51.52]
    ]
  },
  {
    name: "Rokiciny",
    coordinates: [
      [19.75, 51.51], [19.83, 51.51], 
      [19.83, 51.58], [19.75, 51.58]
    ]
  },
  {
    name: "Rzeczyca",
    coordinates: [
      [19.92, 51.45], [20.00, 51.45], 
      [20.00, 51.52], [19.92, 51.52]
    ]
  },
  {
    name: "Tomaszów Mazowiecki",
    coordinates: [
      [19.75, 51.46], [19.92, 51.46], 
      [19.92, 51.51], [19.75, 51.51]
    ]
  },
  {
    name: "Ujazd",
    coordinates: [
      [19.75, 51.58], [19.83, 51.58], 
      [19.83, 51.65], [19.75, 51.65]
    ]
  },
  {
    name: "Żelechlinek",
    coordinates: [
      [19.83, 51.56], [19.95, 51.56], 
      [19.95, 51.65], [19.83, 51.65]
    ]
  }
];

// Create GeoJSON features from the municipality data
const features = municipalities.map(muni => {
  // Convert to the format needed for GeoJSON (close the polygon)
  const polygonCoords = [...muni.coordinates];
  polygonCoords.push(polygonCoords[0]); // Close the polygon
  
  return {
    type: "Feature",
    properties: {
      name: muni.name,
      simpleName: muni.name,
      lgd: "LGD Bud-Uj Razem"
    },
    geometry: {
      type: "Polygon",
      coordinates: [polygonCoords]
    }
  };
});

// Create the GeoJSON structure
const geoJson = {
  type: "FeatureCollection",
  metadata: {
    generated: new Date().toISOString(),
    source: "Simplified approximation",
    description: "Simplified boundaries for LGD Bud-Uj Razem area"
  },
  features: features
};

// Format as a JavaScript module
const moduleContent = `/**
 * LGD Bud-Uj Razem administrative boundaries (simplified)
 * Generated on ${new Date().toISOString()}
 * 
 * This is a simplified approximation - for actual boundaries,
 * use OpenStreetMap data when available.
 */

const lgdBorder = ${JSON.stringify(geoJson, null, 2)};

export default lgdBorder;`;

// Save to file
const outputPath = path.join(__dirname, '..', 'src', 'config', 'lgdBorder.js');
fs.writeFileSync(outputPath, moduleContent);

console.log(`Simplified boundaries saved to ${outputPath}`);
console.log('Note: These are approximate boundaries. For precise boundaries, use the fetch-boundaries script when possible.');