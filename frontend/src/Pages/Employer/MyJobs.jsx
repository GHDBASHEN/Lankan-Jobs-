import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jobService from '../../Services/JobService';


export default function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    jobService.getByEmployer().then(setJobs).catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await jobService.remove(id);
      setJobs(jobs.filter(j => j._id !== id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map(job => (
          <div key={job._id} className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.location} • {job.job_type}</p>
            <div className="mt-3 flex justify-between items-center">
              <div>
                <Link to={`/edit-job/${job._id}`} className="text-sm text-white bg-indigo-600 px-3 py-1 rounded mr-2">Edit</Link>
                <button onClick={() => handleDelete(job._id)} className="text-sm text-white bg-red-600 px-3 py-1 rounded">Delete</button>
              </div>
              <Link to={`/applicants/${job._id}`} className="text-sm text-indigo-600">View Applicants</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}