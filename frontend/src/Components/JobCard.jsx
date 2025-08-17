import React from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
      <div>
        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
        <p className="text-md text-gray-600 mt-1">{job.location} • <span className="font-semibold text-indigo-600">{job.job_type}</span></p>
        <p className="mt-2 text-gray-700 line-clamp-3">{job.description}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="text-indigo-600 font-semibold">{job.salary ? `Rs ${job.salary}` : 'Competitive Salary'}</div>
        <Link to={`/jobs/${job.job_id}`} className="text-sm text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">View Job</Link>
      </div>
    </div>
  );
}