import React, { useEffect, useState } from 'react';
import jobService from '../Services/JobService';
import JobCard from '../Components/JobCard';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    jobService.getAll().then(setJobs).catch(console.error);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Open Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map(j => <JobCard key={j.job_id} job={j} />)}
      </div>
    </div>
  );
}
