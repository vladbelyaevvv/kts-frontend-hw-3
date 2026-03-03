import axios from 'axios';

const api = axios.create({
  baseURL: 'https://front-school-strapi.ktsdev.ru/api',
});

export function setJWTToken(jwt: string | null) {
  if (jwt) {
    api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

export default api;
