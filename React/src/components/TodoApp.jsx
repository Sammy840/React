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

  return (
    <div>
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
       <ul>
        {todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
        ))}
       </ul>
    </div>
  )
}

export default TodoApp;