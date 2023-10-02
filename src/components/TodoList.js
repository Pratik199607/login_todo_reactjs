import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CardComponent from "./CardComponent";
import { Button } from "flowbite-react";

const TodoList = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('userId');
  const [todos, setTodos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [newTodo, setNewTodo] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const handleCreateTodo = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/todo`,
        { task: newTodo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const createdTodo = response.data;
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
      fetchTodos();
      setNewTodo("");
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`${API_URL}/api/todo/${todoId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
      fetchTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [currentPage]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/todo?page=${currentPage}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
      const { todos: fetchedTodos, totalPages } = response.data;
      setTodos(fetchedTodos);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const renderTodos = () => {
    return todos.map((todo) => (
      <CardComponent key={todo._id} todo={todo} onDelete={handleDeleteTodo} />
    ));
  };

  return (
    <div className="mx-auto container max-w-4xl text-center my-14 bg-slate-200 rounded-xl flex flex-col items-center">
      <h2 className='mt-3'>Current User: {user} </h2>
      <input
        className="rounded-xl mt-5 max-w-screen-sm"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        required
      />
      <Button gradientDuoTone="greenToBlue" outline pill className="w-40 mt-5 bg-purple-600" onClick={handleCreateTodo}>
        Create Todo
      </Button>
      {renderTodos()}
      <div>
        <button
          className="mt-3 mx-2 w-44 h-10 rounded-3xl bg-gray-300 disabled:bg-transparent"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className="mt-3 mx-2 w-44 h-10 rounded-3xl bg-gray-300 disabled:bg-transparent"
          onClick={handleNextPage}
          disabled={currentPage === totalPages || todos.length === 0}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default TodoList;
