import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded p-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Find your next job in Sri Lanka</h1>
        <p className="text-gray-600 mb-4">Search thousands of jobs or post your job as an employer.</p>
        <div className="space-x-3">
          <Link to="/jobs" className="bg-indigo-600 text-white px-4 py-2 rounded">Browse Jobs</Link>
          <Link to="/register" className="border px-4 py-2 rounded">Get Started</Link>
        </div>
      </div>
    </div>
  );
}
