import React, { useState, useContext } from "react";
import jobService from "../Services/JobService";
import { AuthContext } from "../Context/AuthContext";

export default function PostJob() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    job_type: "Full-time",
  });
  const [loading, setLoading] = useState(false);

  if (!user || user.type !== "Employer") {
    return (
      <div className="container mx-auto p-6 text-red-600">
        You must be logged in as an employer to post jobs.
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await jobService.create(formData);
      alert("Job posted successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        job_type: "Full-time",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
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

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}
