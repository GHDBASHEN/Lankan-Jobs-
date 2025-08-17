import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import jobService from '../Services/JobService';
import applicationService from '../Services/ApplicationService';
import { AuthContext } from '../Context/AuthContext';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    jobService.getById(id).then(setJob).catch(console.error);
  }, [id]);

  const handleApply = async () => {
    if (!user) return alert('Please login as job seeker to apply');
    if (user.type !== 'Job Seeker') return alert('Only job seekers can apply');
    await applicationService.apply({ job_id: id });
    alert('Application submitted');
  };

  if (!job) return <div className="container mx-auto p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-sm text-gray-500">{job.location} • {job.job_type}</p>
        <div className="mt-4">{job.description}</div>
        <div className="mt-6 flex gap-4">
          <button onClick={handleApply} className="bg-indigo-600 text-white px-4 py-2 rounded">Apply</button>
        </div>
      </div>
    </div>
  );
}