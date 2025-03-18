/**
 * GeoJSON data representing the LGD Bud-Uj Razem border
 * This is a simplified example - replace with actual border coordinates for your LGD
 */

// This is an approximation - replace with actual border coordinates
// The coordinates below create a simplified polygon around the area
const lgdBorder = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "LGD Bud-Uj Razem",
          "description": "Granice obszaru LGD"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [19.4000, 51.4500], // SW
              [19.4000, 52.0500], // NW
              [20.0000, 52.0500], // NE
              [20.0000, 51.4500], // SE
              [19.4000, 51.4500]  // Close the polygon
            ]
          ]
        }
      }
    ]
  };
  
  export default lgdBorder;