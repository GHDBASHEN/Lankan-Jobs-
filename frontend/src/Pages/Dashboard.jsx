import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-gray-600">Logged in as: <strong>{user.type}</strong></p>

        {user.type === 'Employer' && (
          <div className="mt-4">
           <Link to="/post-job" className="bg-indigo-600 text-white px-3 py-1 rounded mr-3">Post a Job</Link>
           <Link to="/my-jobs" className="border px-3 py-1 rounded">My Jobs</Link>
          </div>
        )}

        {user.type === 'Job Seeker' && (
          <div className="mt-4">
            <Link to="/upload-resume" className="bg-indigo-600 text-white px-3 py-1 rounded mr-3">Upload Resume</Link>
            <Link to="/my-applications" className="border px-3 py-1 rounded">My Applications</Link>
          </div>
        )}
      </div>
    </div>
  );
}