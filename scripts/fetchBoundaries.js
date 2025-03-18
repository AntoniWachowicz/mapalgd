/**
 * Script to fetch and save administrative boundaries from OpenStreetMap
 * 
 * This script:
 * 1. Fetches municipality boundaries from OpenStreetMap Overpass API
 * 2. Converts the OSM data to GeoJSON format
 * 3. Saves the result to a file for use in the application
 * 
 * Usage:
 *   npm run fetch-boundaries
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const osmtogeojson = require('osmtogeojson');

// List of municipalities in LGD Bud-Uj Razem
const LGD_MUNICIPALITIES = [
  'Będków',
  'Budziszewice',
  'Czerniewice',
  'Lubochnia',
  'Rokiciny',
  'Rzeczyca',
  'Tomaszów Mazowiecki',
  'Ujazd',
  'Żelechlinek'
];

/**
 * Create an Overpass query to fetch the boundaries of specified municipalities in Poland
 */
function createOverpassQuery(municipalityNames) {
  // Create a simpler query format that's more reliable
  return `
    [out:json][timeout:180];
    // Fetch administrative boundaries of Polish municipalities by name
    (
      relation["boundary"="administrative"]["admin_level"="7"]["name"="Będków"];
      relation["boundary"="administrative"]["admin_level"="7"]["name"="Budziszewice"];
      relation["boundary"="administrative"]["admin_level"="7"]["name"="Czerniewice"];
      relation["boundary"="administrative"]["admin_level"="7"]["name"="Lubochnia"];
      relation["boundary"="administrative"]["admin_level"="7"]["name"="Rokiciny"];
      relation["boundary"="administrative"]["admin_level"="7"]["name"="Rzeczyca"];
      relation["boundary"="administrative"]["admin_level"="7"]["name"~"^Tomaszów Mazowiecki$"]["type"="boundary"]["admin_level"="7"];
      relation["boundary"="administrative"]["admin_level"="7"]["name"="Ujazd"];
      relation["boundary"="administrative"]["admin_level"="7"]["name"="Żelechlinek"];
    );
    // Include the full geometry
    out body;
    >;
    out skel qt;
  `;
}

/**
 * Fetch data from Overpass API
 */
function fetchFromOverpass(query) {
  return new Promise((resolve, reject) => {
    // URL encode the query
    const encodedQuery = encodeURIComponent(query);
    const url = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;
    
    console.log('Sending request to:', url);
    
    const request = https.get(url, {
      timeout: 180000, // 3 minute timeout
      headers: {
        'User-Agent': 'MapPinApp/1.0 (OpenStreetMap Boundary Fetcher)'
      }
    }, (response) => {
      let data = '';
      
      // Log response status
      console.log(`Response status: ${response.statusCode} ${response.statusMessage}`);
      
      // Collect data chunks
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      // Process the complete response
      response.on('end', () => {
        if (response.statusCode === 200) {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            console.error('Failed to parse response:', error.message);
            console.error('First 200 characters of response:', data.substring(0, 200));
            reject(new Error('Failed to parse response: ' + error.message));
          }
        } else {
          console.error('Response data:', data);
          reject(new Error(`HTTP error: ${response.statusCode} - ${response.statusMessage}`));
        }
      });
    });
    
    // Handle request errors
    request.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });
    
    // Handle timeout
    request.on('timeout', () => {
      console.error('Request timed out');
      request.abort();
      reject(new Error('Request timed out'));
    });
  });
}

/**
 * Save data to a file
 */
function saveToFile(data, filePath) {
  const dir = path.dirname(filePath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Write the data to file
  fs.writeFileSync(filePath, data);
  console.log(`Data saved to ${filePath}`);
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Fetching administrative boundaries from OpenStreetMap...');
    
    // Create the Overpass query
    const query = createOverpassQuery(LGD_MUNICIPALITIES);
    console.log('Query created. Sending request to Overpass API...');
    
    // Fetch data from Overpass API
    const osmData = await fetchFromOverpass(query);
    console.log(`Received data from Overpass API with ${osmData.elements.length} elements`);
    
    // Convert OSM data to GeoJSON using the osmtogeojson library
    const geoJson = osmtogeojson(osmData);
    console.log('Converted OSM data to GeoJSON format');
    
    // Update feature properties
    geoJson.features.forEach(feature => {
      if (feature.properties) {
        // Add extra properties for better display
        feature.properties.lgd = 'LGD Bud-Uj Razem';
        
        // Simplified name (remove suffix like "gmina")
        if (feature.properties.name) {
          const nameParts = feature.properties.name.split(' ');
          feature.properties.simpleName = nameParts[0];
        }
      }
    });
    
    // Create the final boundary data with metadata
    const boundaryData = {
      type: 'FeatureCollection',
      metadata: {
        generated: new Date().toISOString(),
        source: 'OpenStreetMap',
        description: 'Administrative boundaries for LGD Bud-Uj Razem area'
      },
      features: geoJson.features
    };
    
    // Format the data as a module export
    const moduleContent = `/**
 * LGD Bud-Uj Razem administrative boundaries
 * Generated from OpenStreetMap data on ${new Date().toISOString()}
 */

const lgdBorder = ${JSON.stringify(boundaryData, null, 2)};

export default lgdBorder;`;
    
    // Save to file - adjust the path to work with your project structure
    // This path uses relative paths from the script's location
    const outputPath = path.join(__dirname, '..', 'src', 'config', 'lgdBorder.js');
    saveToFile(moduleContent, outputPath);
    
    console.log('Successfully completed!');
  } catch (error) {
    console.error('Error fetching boundaries:', error);
    process.exit(1);
  }
}

// Run the script
main();