import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'siswa' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Register failed: ' + err.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Nama</label>
        <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
      </div>
      <div className="mb-3">
        <label>Role</label>
        <select className="form-control" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
          <option value="siswa">Siswa</option>
