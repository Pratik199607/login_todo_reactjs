import './index.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TodoList from './components/TodoList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token: ', token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <div className="App">
      <nav>
        <span className="todo pad">TodoList</span>
        <div>
          {isLoggedIn ? (
            <>
              <Link className="pad" to="/todo">
                Todo
              </Link>
              <Link className="pad" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="pad" to="/register">
                Register
              </Link>
              <Link className="pad" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          <Route path="/todo" element={<TodoList />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
