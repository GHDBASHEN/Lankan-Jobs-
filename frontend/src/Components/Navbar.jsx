import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const handleLogout = () => {
    logout();
    nav('/');
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">LankanJobs</Link>
        <div className="flex gap-4 items-center">
          <Link to="/jobs" className="hover:text-indigo-600">Jobs</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-indigo-600 text-white px-3 py-1 rounded">Login</Link>
              <Link to="/register" className="border px-3 py-1 rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
