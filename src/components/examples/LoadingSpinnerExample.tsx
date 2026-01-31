import React, { useState } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

const LoadingSpinnerExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate a 10-second save operation
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Loading Spinner Example
        </h1>
        
        <p className="text-gray-600 mb-6">
          Click the "Save" button below to see the loading spinner in action. 
          The spinner will be displayed for 10 seconds to simulate a long-running operation.
        </p>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Status:</h2>
          <p className="text-sm text-gray-600">
            {isLoading 
              ? '⏳ Loading spinner is active. The page is disabled.' 
              : '✅ Ready. Click "Save" to start loading.'
            }
          </p>
        </div>
      </div>

      {/* Loading Spinner Overlay */}
      <LoadingSpinner 
        isLoading={isLoading}
        size={80}
        color="#3b82f6"
      />
    </div>
  );
};

export default LoadingSpinnerExample;
