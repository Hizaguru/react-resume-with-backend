import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container" role="status" aria-live="polite" aria-label="Sending message">
      <div className="loading-spinner" aria-hidden="true"></div>
      <span className="sr-only">Sending message, please wait...</span>
    </div>
  );
};
export default LoadingSpinner;
