# Custom React Hooks

This directory contains custom React hooks used in the application.

## Available Hooks

### `useBoundaries`

A hook for loading administrative boundaries for the LGD area.

```jsx
const { boundaries, loading, error } = useBoundaries();
```

This hook provides the GeoJSON data for the administrative boundaries of the LGD area.