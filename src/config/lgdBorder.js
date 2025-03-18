/**
 * GeoJSON data representing the LGD Bud-Uj Razem border based on municipality boundaries
 * 
 * LGD Bud-Uj Razem includes the following municipalities (gminy):
 * - Będków
 * - Budziszewice
 * - Czerniewice
 * - Lubochnia
 * - Rokiciny
 * - Rzeczyca
 * - Tomaszów Mazowiecki (gmina wiejska)
 * - Ujazd
 * - Żelechlinek
 * 
 * This file provides an approximation of their combined boundaries.
 */

const lgdBorder = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "LGD Bud-Uj Razem",
          "description": "Granice obszaru LGD (gminy członkowskie)"
        },
        "geometry": {
          "type": "MultiPolygon",
          "coordinates": [
            // This represents the combined boundaries of all member municipalities
            // The coordinates below approximate the shapes of the 9 municipalities
            // For actual implementation, replace with precise GIS data
            
            // Będków
            [[
              [19.695, 51.480],
              [19.764, 51.488],
              [19.771, 51.465],
              [19.745, 51.436],
              [19.714, 51.437],
              [19.695, 51.480]
            ]],
            
            // Budziszewice
            [[
              [19.815, 51.527],
              [19.858, 51.535],
              [19.872, 51.502],
              [19.822, 51.497],
              [19.815, 51.527]
            ]],
            
            // Czerniewice
            [[
              [19.999, 51.580],
              [20.063, 51.597],
              [20.089, 51.562],
              [20.062, 51.525],
              [19.996, 51.520],
              [19.999, 51.580]
            ]],
            
            // Lubochnia
            [[
              [19.993, 51.527],
              [20.062, 51.525],
              [20.089, 51.500],
              [20.075, 51.470],
              [20.018, 51.458],
              [19.978, 51.482],
              [19.993, 51.527]
            ]],
            
            // Rokiciny
            [[
              [19.770, 51.541],
              [19.815, 51.527],
              [19.822, 51.497],
              [19.798, 51.482],
              [19.764, 51.488],
              [19.732, 51.510],
              [19.770, 51.541]
            ]],
            
            // Rzeczyca
            [[
              [19.995, 51.520],
              [20.018, 51.458],
              [19.957, 51.430],
              [19.905, 51.453],
              [19.915, 51.498],
              [19.995, 51.520]
            ]],
            
            // Tomaszów Mazowiecki (gmina wiejska)
            [[
              [19.978, 51.482],
              [20.018, 51.458],
              [19.957, 51.430],
              [19.905, 51.453],
              [19.822, 51.497],
              [19.798, 51.482],
              [19.745, 51.436],
              [19.714, 51.437],
              [19.683, 51.457],
              [19.720, 51.499],
              [19.772, 51.508],
              [19.978, 51.482]
            ]],
            
            // Ujazd
            [[
              [19.770, 51.541],
              [19.832, 51.597],
              [19.872, 51.580],
              [19.858, 51.535],
              [19.815, 51.527],
              [19.770, 51.541]
            ]],
            
            // Żelechlinek
            [[
              [19.872, 51.580],
              [19.932, 51.608],
              [19.999, 51.580],
              [19.996, 51.520],
              [19.915, 51.498],
              [19.872, 51.502],
              [19.858, 51.535],
              [19.872, 51.580]
            ]]
          ]
        }
      }
    ]
  };
  
  export default lgdBorder;