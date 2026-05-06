import React, { useState } from 'react'

const TodoApp = () => {

    const [todos, setTodos] = useState([
        {id:1, text: 'Learn React', completed: false},
        {id:2, text: 'Build App', completed: false}
    ])

    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        const newTodo = {
            id: Date.now(),
            text: input,
            completed: false
        }

        setTodos([...todos, newTodo]);
        setInput('');
    }

    const deleteTask = (id) => {
        setTodos(todos.filter( todo => todo.id !== id ))
    }

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed} : todo
        ))
    }

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
       <h1>Todo App</h1>
       <form onSubmit={handleSubmit}>
        <input 
            type="text"
            placeholder='Enter new task'
            value={input}
            onChange={handleChange}
        />
        <button type='Submit'>Add</button>
       </form>

       <h3>Tasks</h3>
       <ul style={{listStyleType: 'none'}}>
        {todos.map((todo) => (
            <li key={todo.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}>
                <div style={{
                    display: 'flex', 
                    alignItems: 'center'}}>
                    <input 
                        type="checkbox" 
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        style={{ marginRight: '10px', cursor: 'pointer' }}
                    />
                        <span style={{
                            textDecoration: todo.completed ? 'line-through' : 'none', 
                            color: todo.completed ? 'red' : 'blue',
                            marginRight: '10px'
                            }}>
                                {todo.text}
                        </span>
                    <button onClick={() => deleteTask(todo.id)} style={{fontSize: '10px'}}>Delete</button>
                </div>
            </li>
        ))}
       </ul>
    </div>
  )
}

export default TodoApp;