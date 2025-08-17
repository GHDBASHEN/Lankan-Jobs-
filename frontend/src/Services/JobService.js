import api from '../Api/Api';

const getAll = async () => {
  const { data } = await api.get('/jobs');
  return data;
};

const create = async (payload) => {
  const { data } = await api.post('/jobs', payload);
  return data;
};

const getById = async (id) => {
  const { data } = await api.get(`/jobs/${id}`);
  return data;
};

const getByEmployer = async () => {
  const { data } = await api.get('/jobs/my-jobs');
  return data;
};

const update = async (id, payload) => {
  const { data } = await api.put(`/jobs/${id}`, payload);
  return data;
};

const remove = async (id) => {
  const { data } = await api.delete(`/jobs/${id}`);
  return data;
};

const getApplicants = async (id) => {
    const {data} = await api.get(`/applications/job/${id}`);
    return data;
}

export default { getAll, create, getById, getByEmployer, update, remove, getApplicants };