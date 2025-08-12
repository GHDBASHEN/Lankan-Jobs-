import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      if (res?.token) {
        nav('/');
      } else {
        alert(res?.message || 'Login failed');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <form onSubmit={submit} className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
               className="w-full border p-2 rounded mb-3" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
               className="w-full border p-2 rounded mb-3" required />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
