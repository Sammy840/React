import React, { useState } from 'react'

const Todo = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: "Learn React", completed: false },
        { id: 2, text: "Build Todo App", completed: true }
    ]);
    const [input, setInput] = useState("");
    
    // New state to track the active filter
    const [filter, setFilter] = useState("all");

    const handleChange = (e) => setInput(e.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (input.trim() === "") return;
        const newTodo = { id: Date.now(), text: input, completed: false };
        setTodos([...todos, newTodo]);
        setInput("");
    }

    const deleteTask = (id) => setTodos(todos.filter(todo => todo.id !== id));

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // Logic to filter the tasks before rendering
    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true; // "all"
    });

    return (
        <div style={{ padding: '20px', maxWidth: '400px', fontFamily: 'Arial' }}>
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

            {/* Filter Buttons */}
            <div style={{ margin: '20px 0' }}>
                <button onClick={() => setFilter("all")} style={{ fontWeight: filter === "all" ? "bold" : "normal" }}>All</button>
                <button onClick={() => setFilter("active")} style={{ fontWeight: filter === "active" ? "bold" : "normal", margin: '0 5px' }}>Active</button>
                <button onClick={() => setFilter("completed")} style={{ fontWeight: filter === "completed" ? "bold" : "normal" }}>Completed</button>
            </div>

            <h3>{filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {/* Map through the FILTERED list instead of the original todos */}
                {filteredTodos.map((todo) => (
                    <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input 
                                type="checkbox" 
                                checked={todo.completed} 
                                onChange={() => toggleComplete(todo.id)} 
                            />
                            <span style={{ 
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                marginLeft: '10px'
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