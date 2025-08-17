import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import applicationService from '../Services/ApplicationService';

export default function MyApplications() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    applicationService.getAppliedJobs().then(setJobs).catch(console.error);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Applications</h1>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div key={job.job_id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                <p className="text-md text-gray-600 mt-1">{job.location} • <span className="font-semibold text-indigo-600">{job.job_type}</span></p>
              </div>
              <div className="mt-4 flex justify-end">
                <Link to={`/jobs/${job.job_id}`} className="text-sm text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">View Job</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You have not applied to any jobs yet.</p>
      )}
    </div>
  );
}