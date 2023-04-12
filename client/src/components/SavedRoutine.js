import React from 'react';

function SavedRoutine({ routine }) {
  return (
    <div>
      <h1>Saved Routine</h1>
      <ul>
        {routine.map((product, index) => (
          <li key={index}>
            {product.name} - Step {product.step}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedRoutine;