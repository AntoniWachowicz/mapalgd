/**
 * Fetches all pins from the API
 */
export async function getAllPins() {
  const response = await fetch('/api/pins');
  
  if (!response.ok) {
    throw new Error('Failed to fetch pins');
  }
  
  return response.json();
}

/**
 * Fetches a specific pin by ID
 */
export async function getPinById(id) {
  const response = await fetch(`/api/pins/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch pin');
  }
  
  return response.json();
}

/**
 * Creates a new pin
 */
export async function createPin(pinData) {
  const response = await fetch('/api/pins', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pinData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create pin');
  }
  
  return response.json();
}

/**
 * Updates an existing pin
 */
export async function updatePin(id, pinData) {
  const response = await fetch(`/api/pins/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pinData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update pin');
  }
  
  return response.json();
}

/**
 * Deletes a pin
 */
export async function deletePin(id) {
  const response = await fetch(`/api/pins/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete pin');
  }
  
  return response.json();
}

/**
 * Filters pins by category
 */
export function filterPinsByCategory(pins, category) {
  if (category === 'all') {
    return pins;
  }
  
  return pins.filter(pin => pin.categories.includes(category));
}

/**
 * Sorts pins by name, date, or value
 */
export function sortPins(pins, sortBy = 'name', order = 'asc') {
  return [...pins].sort((a, b) => {
    let valueA, valueB;
    
    if (sortBy === 'name') {
      valueA = a.name.toLowerCase();
      valueB = b.name.toLowerCase();
    } else if (sortBy === 'date') {
      valueA = new Date(a.date);
      valueB = new Date(b.date);
    } else if (sortBy === 'value') {
      valueA = a.value;
      valueB = b.value;
    }
    
    if (order === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });
}