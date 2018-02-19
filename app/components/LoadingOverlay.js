import React from 'react';
import Spinner from 'components/Spinner';

const LoadingOverlay = (props) => (
  <div className="loading-overlay flex justify-center items-center">
    <Spinner />
  </div>
  );

export default LoadingOverlay;
