import React, { useState } from 'react'

const Todo = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: "Learn React", completed: false },
        { id: 2, text: "Build Todo App", completed: false }
    ]);

    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (input.trim() === "") return;

        const newTodo = {
            id: Date.now(),
            text: input,
            completed: false
        };

        setTodos([...todos, newTodo]);
        setInput("");
    }

    const deleteTask = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px' }}>
            <h1>My Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder='Enter new task'
                    value={input}
                    onChange={handleChange} 
                />
                <button type="submit">Add</button>
            </form>

            <h3>Tasks</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* Checkbox linked to the 'completed' state */}
                            <input 
                                type="checkbox" 
                                checked={todo.completed} 
                                onChange={() => toggleComplete(todo.id)} 
                                style={{ marginRight: '10px', cursor: 'pointer' }}
                            />
                            <span style={{ 
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                color: todo.completed ? '#888' : '#000'
                            }}>
                                {todo.text}
                            </span>
                        </div>
                        <button onClick={() => deleteTask(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todo;