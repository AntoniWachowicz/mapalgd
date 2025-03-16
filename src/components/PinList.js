import { format } from 'date-fns';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function PinList({ 
  pins, 
  selectedPin, 
  onSelectPin,
  isAdmin = false,
  onEditPin,
  onDeletePin
}) {
  if (pins.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No pins available. {isAdmin && 'Click on the map to add a new pin.'}
      </div>
    );
  }

  return (
    <div className="divide-y">
      {pins.map((pin) => (
        <div 
          key={pin.id}
          className={`p-4 cursor-pointer hover:bg-gray-50 ${
            selectedPin?.id === pin.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
          }`}
          onClick={() => onSelectPin(pin)}
        >
          <div className="flex justify-between">
            <h3 className="font-medium text-gray-900">{pin.name}</h3>
            
            {/* Admin controls */}
            {isAdmin && (
              <div className="flex space-x-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditPin(pin);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit size={16} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this pin?')) {
                      onDeletePin(pin.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center mt-1">
            <span 
              className={`inline-block w-3 h-3 rounded-full bg-${pin.mainCategory} mr-2`}
            ></span>
            <span className="text-sm text-gray-600">
              {pin.mainCategory.charAt(0).toUpperCase() + pin.mainCategory.slice(1)}
            </span>
            <span className="text-sm text-gray-400 mx-2">•</span>
            <span className="text-sm text-gray-600">
              {format(new Date(pin.date), 'MMM d, yyyy')}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {pin.description}
          </p>

          <div className="mt-2 text-sm font-medium text-gray-900">
            ${pin.value.toLocaleString()}
          </div>

          {/* Categories */}
          <div className="mt-2 flex flex-wrap gap-1">
            {pin.categories.map(category => (
              <span 
                key={category}
                className={`inline-block px-2 py-0.5 rounded-full bg-${category} bg-opacity-20 text-${category} text-xs`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}