/**
 * Utility for fetching administrative boundaries from OpenStreetMap
 * using the Overpass API
 */

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
   * 
   * @param {Array} municipalityNames - Array of municipality names to fetch
   * @returns {string} Overpass API query
   */
  const createOverpassQuery = (municipalityNames) => {
    // Join municipality names with a condition for each
    const nameConditions = municipalityNames
      .map(name => `name~"${name}"`)
      .join('|');
    
    // Overpass query for administrative boundaries with specified names in Poland
    return `
      [out:json][timeout:25];
      // Fetch administrative boundaries (level 7 is gmina/municipality in Poland)
      (
        relation["boundary"="administrative"]["admin_level"="7"][${nameConditions}]["name:pl"];
      );
      // Include the full geometry and tags
      out body;
      >;
      out skel qt;
    `;
  };
  
  /**
   * Fetch municipality boundaries from OpenStreetMap
   * 
   * @returns {Promise<GeoJSON>} GeoJSON object with the combined boundaries
   */
  export const fetchLGDBoundaries = async () => {
    try {
      // Create the query for all LGD municipalities
      const query = createOverpassQuery(LGD_MUNICIPALITIES);
      
      // URL encode the query
      const encodedQuery = encodeURIComponent(query);
      
      // Make the request to the Overpass API
      const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodedQuery}`);
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Overpass API responded with status: ${response.status}`);
      }
      
      // Parse the response as JSON
      const data = await response.json();
      
      // Convert OSM data to GeoJSON
      const geoJson = osmToGeoJSON(data);
      
      return geoJson;
    } catch (error) {
      console.error('Error fetching LGD boundaries:', error);
      // Return null or a fallback boundary
      return null;
    }
  };
  
  /**
   * Convert OSM data to GeoJSON format
   * This is a simplified converter - for production use, consider using a library like osmtogeojson
   * 
   * @param {Object} osmData - Data from Overpass API
   * @returns {Object} GeoJSON object
   */
  const osmToGeoJSON = (osmData) => {
    // This is a simplified conversion - in a real app, use a proper library
    
    // First, organize data by ID for efficient lookup
    const elements = {};
    for (const element of osmData.elements) {
      elements[element.type + element.id] = element;
    }
    
    // Prepare the GeoJSON structure
    const geoJson = {
      type: "FeatureCollection",
      features: []
    };
    
    // Process each relation (municipality)
    osmData.elements.filter(el => el.type === 'relation' && el.tags && el.tags.boundary === 'administrative').forEach(relation => {
      try {
        // Get all ways that form the outer boundary
        const outerWays = relation.members
          .filter(member => member.role === 'outer' && member.type === 'way')
          .map(member => elements['way' + member.ref])
          .filter(way => way); // Filter out undefined ways
        
        if (outerWays.length === 0) return; // Skip if no outer ways
        
        // Get coordinates for each way
        const wayCoordinates = [];
        for (const way of outerWays) {
          if (!way.nodes) continue;
          
          const coordinates = way.nodes
            .map(nodeId => {
              const node = elements['node' + nodeId];
              return node ? [node.lon, node.lat] : null;
            })
            .filter(coord => coord); // Filter out null coordinates
          
          wayCoordinates.push(coordinates);
        }
        
        // Create a feature for this municipality
        const feature = {
          type: "Feature",
          properties: {
            name: relation.tags?.name || "Unknown",
            adminLevel: relation.tags?.admin_level,
            type: "municipality",
            id: relation.id
          },
          geometry: {
            type: "MultiPolygon",
            coordinates: [wayCoordinates] // Simplified - proper implementation would connect the ways
          }
        };
        
        // Add to feature collection
        geoJson.features.push(feature);
      } catch (error) {
        console.error(`Error processing relation ${relation.id}:`, error);
      }
    });
    
    return geoJson;
  };
  
  /**
   * Fallback boundary in case API fetching fails
   */
  export const fallbackLGDBoundary = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "LGD Bud-Uj Razem",
          "description": "Przybliżone granice obszaru LGD"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [19.60, 51.40],
              [20.15, 51.40],
              [20.15, 51.65],
              [19.60, 51.65],
              [19.60, 51.40]
            ]
          ]
        }
      }
    ]
  };
  
  export default { fetchLGDBoundaries, fallbackLGDBoundary };