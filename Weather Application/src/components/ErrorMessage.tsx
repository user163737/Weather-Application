import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="glass-card w-full max-w-md mx-auto p-8 rounded-3xl">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-medium text-white mb-2">Oops!</h2>
        <p className="text-white/80 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;