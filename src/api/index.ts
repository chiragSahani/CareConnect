import axios from 'axios';

const API = axios.create({
  baseURL: 'https://careconnect-2-3mc8.onrender.com/api',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile') as string).token
    }`;
  }

  return req;
});

export const fetchDoctors = () => API.get('/doctors');
export const fetchDoctor = (id: string) => API.get(`/doctors/${id}`);

export const signIn = (formData: any) => API.post('/auth/login', formData);
export const signUp = (formData: any) => API.post('/auth/signup', formData);
