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
      <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map(job => (
          <div key={job.job_id} className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.location} • {job.job_type}</p>
            <div className="mt-3 flex justify-end">
              <Link to={`/jobs/${job.job_id}`} className="text-sm text-white bg-indigo-600 px-3 py-1 rounded">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}