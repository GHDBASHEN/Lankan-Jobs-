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
    if (!user) return alert('Please login as a job seeker to apply');
    if (user.type !== 'Job Seeker') return alert('Only job seekers can apply');
    
    try {
      await applicationService.apply({ job_id: id });
      alert('Application submitted successfully!');
    } catch (err) {
      alert('Failed to submit application. You may have already applied.');
    }
  };

  if (!job) return <div className="container mx-auto p-6">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {job.image_path && (
          <img 
            src={`http://localhost:5000${job.image_path}`} 
            alt={job.title} 
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
          <p className="text-md text-gray-600 mb-4">{job.location} • <span className="font-semibold">{job.job_type}</span></p>
          {job.salary && <p className="text-lg text-green-600 font-bold mb-4">Salary: Rs {job.salary}</p>}
          
          <h2 className="text-xl font-semibold mt-6 mb-2">Job Description</h2>
          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
            {job.description}
          </div>

          <div className="mt-8">
            <button 
              onClick={handleApply} 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
              disabled={user && user.type !== 'Job Seeker'}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}