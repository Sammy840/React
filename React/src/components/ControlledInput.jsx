import React, { useState } from 'react'

const ControlledInput = () => {
    const [input, setInput] = useState("");

    // 1. Capture the event 'e' to get the typed value
    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Submitted Name: ${input}`);
        setInput("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Name' 
                    value={input} 
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
            <p>Typed value: {input}</p>
        </div>
    )
}

export default ControlledInput

