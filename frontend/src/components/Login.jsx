import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      onLogin(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed: ' + err.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
      <p>Belum punya akun? <a href="/register">Register</a></p>
    </form>
  );
};

export default Login;
