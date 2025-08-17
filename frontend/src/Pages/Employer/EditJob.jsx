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
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    jobService.getById(id).then(setFormData).catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (image) {
      data.append('image', image);
    }

    try {
      await jobService.update(id, data);
      alert('Job updated successfully!');
      nav('/my-jobs');
    } catch (err) {
      console.error(err);
      alert('Failed to update job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
        {loading && <p className="text-indigo-600 font-medium">Loading...</p>}
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

          <div className="w-full border p-2 rounded">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Job Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
              className="mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}