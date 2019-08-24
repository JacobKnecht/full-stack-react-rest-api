import React from 'react';

//render a simple error message for unhandled errors and server errors
const UnhandledError = () => {
  return (
    <div className="bounds">
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
    </div>
  );
}

export default UnhandledError;
