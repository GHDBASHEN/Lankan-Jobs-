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
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">LankanJobs</Link>
        <div className="flex items-center space-x-4">
          <Link to="/jobs" className="text-gray-600 hover:text-indigo-600 transition-colors">Jobs</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}