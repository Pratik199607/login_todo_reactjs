import './index.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TodoList from './components/TodoList';

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
};

function App() {
  const isLoggedIn = useAuthentication();
  const token = localStorage.getItem('token');
  return (
    <Router>
      <div className="App">
        <nav>
          <span className='todo pad'>TodoList</span>
          <div>
            <Link className='pad' to="/register">Register</Link>
            <Link className='pad' to="/login">Login</Link>
            {token && <Link className='pad' to="/todo">Todo</Link>}
          </div>
          
        </nav>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          {isLoggedIn ? (
            <Route path="/todo" element={<TodoList />} />
            // <Route path="/todo" element={<TodoList />} />
          ) : (
            <Route path="/todo" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
