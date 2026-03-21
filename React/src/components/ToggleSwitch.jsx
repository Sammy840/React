import React, { useState } from 'react';

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(true);

  // This flips the boolean state
  const toggle = () => setIsOn(prev => !prev);

  return (
    <div style={{
        width: "500px", 
        height: "300px", 
        backgroundColor: isOn ? "yellow" : "black", 
        color: isOn ? "black" : "white", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s ease"
    }}>
        <h1>Toggle Switch</h1>
        <p>The light is {isOn ? "ON" : "OFF"}</p>
        <button onClick={toggle}>
          Switch to {isOn ? "OFF" : "ON"}
        </button>
    </div>
  );
};

export default ToggleSwitch;