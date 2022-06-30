import React from 'react';
import { Watch } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex items-center justify-center fixed z-999">
      <Watch
        ariaLabel="loading-indicator"
        className="text-red-700"
        height={100}
        width={100}
      />
    </div>
  );
};

export default Loader;
