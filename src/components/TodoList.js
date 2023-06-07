import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CardComponent from "./CardComponent";
import { Button } from "flowbite-react";

const TodoList = () => {
  //State for fetching
  const [todos, setTodos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  //State for Create Todo
  const [newTodo, setNewTodo] = useState("");
  const userId = localStorage.getItem("userId");

  const handleCreateTodo = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/todo", { userId, task: newTodo });
      const createdTodo = response.data.todo;
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
      setNewTodo("");
      fetchTodos(); 
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/${todoId}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [currentPage]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/todo?userId=${userId}&page=${currentPage}`);
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
      <CardComponent
        key={todo._id}
        todo={todo}
        onDelete={handleDeleteTodo}
      />
    ));
  };

  return (
    <div className="mx-auto container max-w-4xl text-center my-14 bg-slate-200 rounded-xl flex flex-col items-center">
      <input className="rounded-xl mt-5 max-w-screen-sm" type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} required />
      <Button gradientDuoTone="greenToBlue" outline pill className="w-40 mt-5 bg-purple-600" onClick={handleCreateTodo}>
        Create Todo
      </Button>
      {renderTodos()}
      <div>
        <button className='mt-3 mx-2 w-44 h-10 rounded-3xl bg-gray-300 disabled:bg-transparent' onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button className='mt-3 mx-2 w-44 h-10 rounded-3xl bg-gray-300 disabled:bg-transparent' onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default TodoList;
