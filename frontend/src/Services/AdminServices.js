import api from '../Api/Api';

const getUsers = async () => {
    const { data } = await api.get('/admin/users');
    return data;
};

const deleteUser = async (id) => {
    const { data } = await api.delete(`/admin/users/${id}`);
    return data;
};

const getJobs = async () => {
    const { data } = await api.get('/admin/jobs');
    return data;
};

const deleteJob = async (id) => {
    const { data } = await api.delete(`/admin/jobs/${id}`);
    return data;
};

const getApplications = async () => {
    const { data } = await api.get('/admin/applications');
    return data;
};

const getResumes = async () => {
    const { data } = await api.get('/admin/resumes');
    return data;
};

const registerAdmin = async (payload) => {
    const { data } = await api.post('/admin/register', payload);
    return data;
};

export default {
    getUsers,
    deleteUser,
    getJobs,
    deleteJob,
    getApplications,
    getResumes,
    registerAdmin
};