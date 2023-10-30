import React from 'react';

function MarkerInfo({ matchingItem }) {
  return (
    <div className="marker-info">
        hi
      <h3>Highlighted Item Info</h3>
      <p>ID: {matchingItem.id}</p>
      {/* Add more fields as needed */}
    </div>
  );
}

export default MarkerInfo;