# Map Configuration Guide

This folder contains configuration files used to customize the map application for different areas and organizations.

## How to Customize the Application for Different Areas

To adapt this application for a different area, you only need to modify the `mapConfig.js` file in this directory.

### Step-by-Step Guide:

1. **Change the Area Name**
   - Update `areaName` with the name of your LGD or organization
   - This will be displayed in the UI throughout the application

2. **Set Map Coordinates and Boundaries**
   - Update `initialPosition` with the latitude and longitude of your area's center
   - Set appropriate `initialZoom` for your area (higher numbers = more zoomed in)
   - Configure `minZoom` and `maxZoom` to control how far users can zoom in/out
   - Set appropriate map `boundaries` to restrict panning to your region
   
3. **Customize Sample Pins**
   - Replace the sample pins in the `samplePins` array with locations relevant to your area
   - Be sure to use coordinates within your defined boundaries
   
4. **Customize Category Names**
   - You can customize category names in the `categoryNames` object
   - The keys (`finance`, `social`, `health`) should stay the same for compatibility
   
5. **Set Currency Format**
   - Update the currency settings in the `currency` object
   - Change the symbol and format function as needed

### Example Configuration for a Different Area:

```js
const mapConfig = {
  // Area name
  areaName: "LGD Kraina Rawki",
  
  // Initial map position (centered on Rawa Mazowiecka)
  initialPosition: {
    lat: 51.7620,
    lng: 20.2528,
  },
  
  // Initial zoom level
  initialZoom: 10,
  
  // Zoom restrictions
  minZoom: 9,
  maxZoom: 18,
  
  // Map boundaries
  boundaries: [
    [51.2, 19.8], // Southwest corner
    [52.2, 20.7]  // Northeast corner
  ],
  
  // Sample pins for the area
  samplePins: [
    {
      id: '1',
      name: 'Urząd Miasta Rawa Mazowiecka',
      lat: 51.7620,
      lng: 20.2528,
      date: '2023-07-15',
      description: 'Główny budynek administracyjny miasta',
      imageUrl: 'https://images.unsplash.com/photo-1577791465485-b80039b4d69a',
      value: 1800000,
      mainCategory: 'finance',
      categories: ['finance', 'social']
    },
    // Add more pins relevant to your area...
  ],
  
  // Rest of the configuration...
};
```

## Advanced Customization

For more extensive customizations (such as adding new categories or changing the application structure), you may need to modify other files in the application. However, most common adjustments can be made entirely through this configuration file.