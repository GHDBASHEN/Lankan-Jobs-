import api from '../Api/Api';

const upload = async (file) => {
  const form = new FormData();
  form.append('resume', file);
  const { data } = await api.post('/resumes', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

const deleteResume = async () => {
    const { data } = await api.delete('/resumes');
    return data;
};

const checkResume = async () => {
    const { data } = await api.get('/resumes/check');
    return data;
}

export default { upload, deleteResume, checkResume };