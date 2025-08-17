import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, <strong className="text-indigo-600">{user.name}</strong>!</p>
        <p className="text-gray-500">You are logged in as a: <strong>{user.type}</strong></p>

        {user.type === 'Employer' && (
          <div className="mt-6 space-x-4">
           <Link to="/post-job" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">Post a New Job</Link>
           <Link to="/my-jobs" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">Manage My Jobs</Link>
          </div>
        )}

        {user.type === 'Job Seeker' && (
          <div className="mt-6">
            {!user.hasResume && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                <p className="font-bold">Get Started</p>
                <p>Upload your CV to start applying for jobs.</p>
              </div>
            )}
            <div className="space-x-4">
              <Link to="/upload-resume" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                {user.hasResume ? 'Update My CV' : 'Upload My CV'}
              </Link>
              <Link to="/my-applications" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">My Applications</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}