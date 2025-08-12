import React from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.location} • {job.job_type}</p>
      <p className="mt-2 text-gray-700 line-clamp-2">{job.description}</p>
      <div className="mt-3 flex justify-between items-center">
        <div className="text-indigo-600 font-semibold">{job.salary ? `Rs ${job.salary}` : ''}</div>
        <Link to={`/jobs/${job.job_id}`} className="text-sm text-white bg-indigo-600 px-3 py-1 rounded">View</Link>
      </div>
    </div>
  );
}
