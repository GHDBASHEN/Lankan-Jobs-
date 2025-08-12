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

export default { getAll, create, getById };
