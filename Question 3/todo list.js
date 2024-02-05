import React, { useState, useEffect } from 'react';
import './TodoList.css'; // Assuming you have some styles for TodoList

const TodoList = () => {
  // State for storing todos
  const [todos, setTodos] = useState([]);

  // Effect to load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  // Function to save todos to local storage
  const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // Function to handle toggling the "checked" state of a todo
  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Function to add a new todo
  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      checked: false,
      created_at: new Date().toISOString(),
      completed_at: null,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Effect to save todos to local storage whenever the todos state changes
  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  // Sort todos by created_at for active todos and completed_at for completed todos
  const sortedTodos = todos.sort((a, b) =>
    a.checked
      ? b.checked
        ? a.completed_at.localeCompare(b.completed_at)
        : 1
      : b.checked
      ? -1
      : b.created_at.localeCompare(a.created_at)
  );

  return (
    <div className="todo-list">
      <ul>
        {sortedTodos.map((todo) => (
          <li
            key={todo.id}
            className={todo.checked ? 'completed' : ''}
            onClick={() => handleToggleTodo(todo.id)}
          >
            {todo.text}
            {todo.checked && (
              <span className="timestamp">Completed at: {todo.completed_at}</span>
            )}
            <span
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation(); // Prevent toggling when clicking delete icon
                handleDeleteTodo(todo.id);
              }}
            >
              &#x2715;
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add a new todo..."
        onKeyPress={(e) => {
          if (e.key === 'Enter' && e.target.value.trim() !== '') {
            handleAddTodo(e.target.value.trim());
            e.target.value = '';
          }
        }}
      />
    </div>
  );
};

export default TodoList;
