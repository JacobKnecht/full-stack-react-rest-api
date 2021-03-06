import React from 'react';

//render a simple error message for unauthorized users
const Forbidden = () => {
  return (
    <div className="bounds">
      <h1>Forbidden</h1>
      <p>Oh no! You can't access this page.</p>
    </div>
  );
}

export default Forbidden;
