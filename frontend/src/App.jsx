import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Jobs from './Pages/Jobs';
import JobDetails from './Pages/JobDetails';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import UploadResume from './Pages/UploadResume';
import ProtectedRoute from './Components/ProtectedRoute';
import PostJob from './Pages/PostJob';
import MyJobs from './Pages/Employer/MyJobs';
import EditJob from './Pages/Employer/EditJob';
import ViewApplicants from './Pages/Employer/ViewApplicants';
import MyApplications from './Pages/MyApplications';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-gray-50 min-h-screen">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/upload-resume" element={<ProtectedRoute role="Job Seeker"><UploadResume /></ProtectedRoute>} />
              <Route path="/post-job" element={<ProtectedRoute role="Employer"><PostJob /></ProtectedRoute>} />
              <Route path="/my-jobs" element={<ProtectedRoute role="Employer"><MyJobs /></ProtectedRoute>} />
              <Route path="/edit-job/:id" element={<ProtectedRoute role="Employer"><EditJob /></ProtectedRoute>} />
              <Route path="/applicants/:id" element={<ProtectedRoute role="Employer"><ViewApplicants /></ProtectedRoute>} />
              <Route path="/my-applications" element={<ProtectedRoute role="Job Seeker"><MyApplications /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;