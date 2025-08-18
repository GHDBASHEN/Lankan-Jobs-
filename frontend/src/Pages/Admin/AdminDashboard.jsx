import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link to="/admin/users" className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-indigo-50 transition-colors">
                    <h2 className="text-xl font-bold text-gray-800">Manage Users</h2>
                </Link>
                <Link to="/admin/jobs" className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-indigo-50 transition-colors">
                    <h2 className="text-xl font-bold text-gray-800">Manage Jobs</h2>
                </Link>
                <Link to="/admin/applications" className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-indigo-50 transition-colors">
                    <h2 className="text-xl font-bold text-gray-800">View Applications</h2>
                </Link>
                <Link to="/admin/resumes" className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-indigo-50 transition-colors">
                    <h2 className="text-xl font-bold text-gray-800">View Resumes</h2>
                </Link>
            </div>
            <div className="mt-8">
                <Link to="/admin/register" className="bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition-colors">
                    Create New Admin
                </Link>
            </div>
        </div>
    );
}