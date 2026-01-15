import React, { useEffect, useState } from 'react';
import jobService from '../Services/JobService';
import JobCard from '../Components/JobCard';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    jobService.getAll().then(setJobs).catch(console.error);
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Available Jobs</h1>
        <p className="text-gray-600">Find the job that's right for you.</p>
        <div className="mt-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for jobs or locations..."
            className="w-full px-4 py-2 border rounded-md shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map(j => <JobCard key={j._id} job={j} />)}
      </div>
    </div>
  );
}