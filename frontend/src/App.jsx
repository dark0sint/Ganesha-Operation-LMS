import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser ] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user profile jika perlu
    }
  }, [token]);

  const handleLogin = (userData, newToken) => {
    setUser (userData);
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setUser (null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <div className="container mt-4">
      <h1>Ganesha Operation LMS</h1>
      {user && <button className="btn btn-danger" onClick={handleLogout}>Logout</button>}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
        <Route path="/courses" element={user ? <CourseList user={user} /> : <Navigate to="/" />} />
        {user && user.role === 'guru' && <Route path="/create-course" element={<CourseForm />} />}
      </Routes>
    </div>
  );
}

export default App;
