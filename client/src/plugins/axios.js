import axios from 'axios';
import store from '@/store';
import router from '@/router';

axios.interceptors.request.use(
  config => {
    const token = store.getters['users/getToken'];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.dispatch('users/logout');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default axios;