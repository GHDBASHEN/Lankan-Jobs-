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
        <p className="text-gray-600">Logged as: <strong>{user.type}</strong></p>

        {user.type === 'Employer' && (
          <div className="mt-4">
            <Link to="/jobs/new" className="bg-indigo-600 text-white px-3 py-1 rounded">Post a job</Link>
            {/* employers could see their posted jobs & applicants here */}
          </div>
        )}

        {user.type === 'Job Seeker' && (
          <div className="mt-4">
            <Link to="/upload-resume" className="bg-indigo-600 text-white px-3 py-1 rounded mr-3">Upload Resume</Link>
            <Link to="/jobs" className="border px-3 py-1 rounded">Browse Jobs</Link>
          </div>
        )}
      </div>
    </div>
  );
}
