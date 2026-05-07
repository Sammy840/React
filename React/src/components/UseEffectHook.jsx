import React, { useEffect, useState } from 'react'

const UseEffectHook = () => {
    // const [count, setCount] = useState(0);
    // const [click, setClick] = useState(0);

    const [data, setData] = useState([]);

    // useEffect(() => {
    //     console.log('Called useEffect');
    //     document.title = `Increment ${count}`;
    // }, [count])

    useEffect(() => {
        async function getData() {
            const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await resp.json();

            if (data && data.length) setData(data);
        }

        getData();
    }, [])

  return (
    <div>
        {/* <h1>{count}</h1>
        <h1>{click}</h1>
        <button onClick={() => setCount(count => (count + 1))}>Increment</button>
        <button onClick={() => setClick(click => (click + 1))}>Click Me</button> */}


        <ul>
            {data.map((todo) => (
                <section key={todo.id}>
                    <li style={{fontWeight: 'bolder'}}>{todo.title}</li>
                    <li>{todo.body}</li>
                </section>
            ))}
        </ul>
    </div>
  )
}

export default UseEffectHook