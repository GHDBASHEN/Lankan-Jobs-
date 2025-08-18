import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../../Services/AdminServices';

export default function AdminRegister() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handle = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await adminService.registerAdmin(form);
      setSuccess('Admin user created successfully! Redirecting...');
      setTimeout(() => navigate('/admin/users'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create admin user.');
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center">
      <div className="w-full max-w-md">
        <form onSubmit={submit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create New Admin</h2>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</p>}
          {success && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">{success}</p>}
          <input name="name" onChange={handle} value={form.name} placeholder="Name" className="w-full border p-3 mb-4 rounded" required />
          <input name="email" type="email" onChange={handle} value={form.email} placeholder="Email" className="w-full border p-3 mb-4 rounded" required />
          <input name="password" type="password" onChange={handle} value={form.password} placeholder="Password" className="w-full border p-3 mb-4 rounded" required />
          <input name="phone" onChange={handle} value={form.phone} placeholder="Phone" className="w-full border p-3 mb-4 rounded" />
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors">Create Admin</button>
        </form>
      </div>
    </div>
  );
}