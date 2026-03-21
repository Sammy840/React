import React, { useState } from 'react'

const Counter = () => {

    const [count, setCount] = useState(0);

    const increment = () => setCount(count => count + 1);
    const decrement = () => setCount(count => count - 1);

  return (
    <div>
        <h1>Counter: {count}</h1>
        <button onClick={increment}>Add Counter</button>
        <button onClick={decrement}>Lower Counter</button>
    </div>

  )
}

export default Counter;