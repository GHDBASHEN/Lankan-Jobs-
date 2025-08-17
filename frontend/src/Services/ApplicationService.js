import api from '../Api/Api';

const apply = async (payload) => {
  const { data } = await api.post('/applications', payload);
  return data;
};

const getByJob = async (jobId) => {
  const { data } = await api.get(`/applications/job/${jobId}`);
  return data;
};

const getAppliedJobs = async () => {
    const { data } = await api.get('/applications/my-applications');
    return data;
};

export default { apply, getByJob, getAppliedJobs };