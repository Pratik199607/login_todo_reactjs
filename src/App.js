import './index.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TodoList from './components/TodoList';
// import Navbar from './components/Navbar';

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token: ', token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);
  console.log('isLoggedIn:', isLoggedIn);
  return isLoggedIn;
};

function App() {
  const isLoggedIn = useAuthentication();

  const clearLocalStorage = () => {
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
                <Link className="pad" to="/login" onClick={clearLocalStorage}>
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
        {/* <Navbar /> */}
        <Routes>
          <Route  path="/register" exact element={<Register />} />
          <Route  path="/login" element={<Login />} />
          {isLoggedIn ? (
            <Route path="/todo" exact element={<TodoList />} />
          ) : (
            <Route path="/todo" element={<Navigate to="/todo" />} />
          )}
        </Routes>
      </div>
  );
}

export default App;
