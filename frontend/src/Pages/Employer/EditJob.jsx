import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobService from '../../Services/JobService';

export default function EditJob() {
  const { id } = useParams();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    job_type: "Full-time",
  });

  useEffect(() => {
    jobService.getById(id).then(setFormData).catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await jobService.update(id, formData);
    alert('Job updated successfully!');
    nav('/my-jobs');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="5"
            required
          ></textarea>

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Remote</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}