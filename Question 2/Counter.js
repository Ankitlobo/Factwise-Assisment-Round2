import React, { useState } from 'react';

const Counter = () => {
  // State to hold the current value
  const [value, setValue] = useState(0);

  // Function to handle incrementing the value
  const handleIncrement = () => {
    setValue(value + 1);
  };

  // Function to handle decrementing the value
  const handleDecrement = () => {
    setValue(value - 1);
  };

  return (
    <div>
      {/* Display the current value */}
      <div id="value">{value}</div>
      
      {/* Button to increment the value */}
      <button id="increment" onClick={handleIncrement}>
        Increment
      </button>

      {/* Button to decrement the value */}
      <button id="decrement" onClick={handleDecrement}>
        Decrement
      </button>
    </div>
  );
};

export default Counter;
