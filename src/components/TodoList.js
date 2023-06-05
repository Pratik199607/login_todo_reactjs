import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/todo', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTodos(response.data.todos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, []);

  const createTodo = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/todo',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      // Refresh todos after creating a new todo
      const response = await axios.get('http://localhost:5000/api/todo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTodos(response.data.todos);
      // Clear input fields
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Refresh todos after deleting a todo
      const response = await axios.get('http://localhost:5000/api/todo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTodos(response.data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo._id === id);
    setTitle(todoToEdit.title);
    setDescription(todoToEdit.description);
    setEditMode(true);
    setEditTodoId(id);
  };

  const updateTodo = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/todo/${editTodoId}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      // Refresh todos after updating a todo
      const response = await axios.get('http://localhost:5000/api/todo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTodos(response.data.todos);
      // Clear input fields and reset edit mode
      setTitle('');
      setDescription('');
      setEditMode(false);
      setEditTodoId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {editMode ? (
          <button onClick={updateTodo}>Update</button>
        ) : (
          <button onClick={createTodo}>Create</button>
        )}
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            <button onClick={() => startEdit(todo._id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
