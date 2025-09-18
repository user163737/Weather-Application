import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="glass-card w-full max-w-md mx-auto p-8 rounded-3xl">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
        <p className="text-white/80 text-lg">Loading weather data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;