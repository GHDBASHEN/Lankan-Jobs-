import React, { useState } from 'react';
import resumeService from '../Services/ResumeService';

export default function UploadResume() {
  const [file, setFile] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Choose a file');
    try {
      await resumeService.upload(file);
      alert('Resume uploaded');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <form onSubmit={submit} className="bg-white shadow rounded p-6">
        <h2 className="text-xl mb-4">Upload Resume</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Upload</button>
      </form>
    </div>
  );
}
