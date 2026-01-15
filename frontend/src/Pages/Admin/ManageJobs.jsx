import React, { useEffect, useState } from 'react';
import adminService from '../../Services/AdminServices';

export default function ManageJobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        adminService.getJobs().then(setJobs).catch(console.error);
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            await adminService.deleteJob(id);
            setJobs(jobs.filter(j => j._id !== id));
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Jobs</h1>
            <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 uppercase font-semibold text-sm">ID</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm">Title</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm">Employer ID</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {jobs.map(job => (
                            <tr key={job._id}>
                                <td className="py-3 px-4">{job._id}</td>
                                <td className="py-3 px-4">{job.title}</td>
                                <td className="py-3 px-4">{job.employer_id}</td>
                                <td className="py-3 px-4">
                                    <button onClick={() => handleDelete(job._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}