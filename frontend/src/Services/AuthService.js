import api from '../Api/Api';

const register = async (payload) => {
  const { data } = await api.post('/users/register', payload);
  return data;
};

const login = async (payload) => {
  const { data } = await api.post('/users/login', payload);
  // backend returns: { token, user }
  if (data.token) localStorage.setItem('token', data.token);
  return data;
};

export default { register, login };
