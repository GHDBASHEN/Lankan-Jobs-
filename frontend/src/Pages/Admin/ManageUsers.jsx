import React, { useEffect, useState } from 'react';
import adminService from '../../Services/AdminServices';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        adminService.getUsers().then(setUsers).catch(console.error);
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await adminService.deleteUser(id);
            setUsers(users.filter(u => u.user_id !== id));
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>
            <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 uppercase font-semibold text-sm">ID</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm">Name</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm">Email</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm">Type</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {users.map(user => (
                            <tr key={user.user_id}>
                                <td className="py-3 px-4">{user.user_id}</td>
                                <td className="py-3 px-4">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">{user.user_type}</td>
                                <td className="py-3 px-4">
                                    <button onClick={() => handleDelete(user.user_id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}