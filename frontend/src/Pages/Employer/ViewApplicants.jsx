import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jobService from '../../Services/JobService';

export default function ViewApplicants() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    jobService.getApplicants(id).then(setApplicants).catch(console.error);
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Applicants</h2>
      <div className="bg-white shadow rounded p-4">
        {applicants.length > 0 ? (
          <ul>
            {applicants.map(app => (
              <li key={app.user_id} className="border-b py-2">
                <p><strong>{app.name}</strong> ({app.email})</p>
                {app.file_path && <a href={`http://localhost:5000${app.file_path}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600">View Resume</a>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No applicants yet.</p>
        )}
      </div>
    </div>
  );
}