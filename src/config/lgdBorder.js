/**
 * GeoJSON data representing the LGD Bud-Uj Razem border
 * 
 * This is a detailed example boundary - for production use,
 * replace with the actual precise border of your LGD area.
 * 
 * You can obtain exact boundary data from:
 * 1. GIS departments of local municipalities
 * 2. Polish geoportal (https://www.geoportal.gov.pl/)
 * 3. OpenStreetMap administrative boundaries
 * 4. QGIS or other GIS software to export the boundary
 */

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
              // This is a more detailed boundary shape following natural features and municipal borders
              // Replace with actual coordinates from GIS data
              [19.487, 51.687],
              [19.512, 51.752],
              [19.532, 51.772],
              [19.567, 51.812],
              [19.622, 51.827],
              [19.689, 51.835],
              [19.734, 51.848],
              [19.793, 51.843],
              [19.834, 51.862],
              [19.879, 51.848],
              [19.928, 51.854],
              [19.956, 51.823],
              [19.983, 51.831],
              [20.012, 51.812],
              [20.045, 51.785],
              [20.032, 51.743],
              [20.056, 51.721],
              [20.023, 51.686],
              [20.045, 51.652],
              [20.012, 51.632],
              [19.973, 51.612],
              [19.923, 51.592],
              [19.867, 51.587],
              [19.825, 51.602],
              [19.789, 51.589],
              [19.734, 51.598],
              [19.678, 51.612],
              [19.632, 51.598],
              [19.587, 51.623],
              [19.543, 51.645],
              [19.512, 51.663],
              [19.487, 51.687]
            ]
          ]
        }
      }
    ]
  };
  
  export default lgdBorder;