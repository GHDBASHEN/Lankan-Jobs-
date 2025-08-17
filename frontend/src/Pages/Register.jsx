import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', user_type: 'Job Seeker' });
  const nav = useNavigate();

  const handle = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Registration successful! Please login to continue.');
      nav('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center">
      <div className="w-full max-w-md">
        <form onSubmit={submit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
          <input name="name" onChange={handle} value={form.name} placeholder="Name" className="w-full border p-3 mb-4 rounded" required />
          <input name="email" onChange={handle} value={form.email} placeholder="Email" className="w-full border p-3 mb-4 rounded" required />
          <input name="password" type="password" onChange={handle} value={form.password} placeholder="Password" className="w-full border p-3 mb-4 rounded" required />
          <input name="phone" onChange={handle} value={form.phone} placeholder="Phone" className="w-full border p-3 mb-4 rounded" />
          <select name="user_type" onChange={handle} value={form.user_type} className="w-full border p-3 mb-4 rounded">
            <option>Job Seeker</option>
            <option>Employer</option>
          </select>
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors">Register</button>
        </form>
      </div>
    </div>
  );
}