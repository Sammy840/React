import React from 'react';

const GreetingCard = ({ name, msg, mood }) => {
  // 1. Logic to pick the color
  // If mood is "Happy", use green. Otherwise, use blue.
  const dynamicColor = mood === "Happy" ? "green" : "blue";

  return (
    // 2. Apply the dynamic color to the style object
    <div style={{ 
      border: `2px solid ${dynamicColor}`, 
      color: dynamicColor, 
      padding: '15px', 
      margin: '10px',
      borderRadius: '10px'
    }}>
      <h1>{name}, {msg}</h1>
      <strong>Status: {mood}</strong>
    </div>
  );
};

export default GreetingCard;



// import React from 'react'

// const GreetingCard = ({ name, msg , mood}) => {

//   const color = mood === "Happy" ? "green" : "blue";

//   return (
//     <div style={{color: `${color}`}}>
//       {name}, {msg}
//     </div>
//   )
// }

// export default GreetingCard;