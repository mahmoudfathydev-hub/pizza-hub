import React from 'react';

interface LoadingSpinnerProps {
  isLoading: boolean;
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
  size = 60,
  color = '#3b82f6', // Default primary blue color
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="pointer-events-none">
        <div
          className="animate-spin rounded-full border-4 border-gray-200 border-t-transparent"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderTopColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
