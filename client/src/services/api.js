import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('resume_generator_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const resumeService = {
  getResumes: async (userId = 'guest') => {
    const response = await apiClient.get(`/resumes?userId=${userId}`);
    return response.data;
  },

  getResumeById: async (id) => {
    const response = await apiClient.get(`/resumes/${id}`);
    return response.data;
  },

  createResume: async (resumeData) => {
    const response = await apiClient.post('/resumes', resumeData);
    return response.data;
  },

  updateResume: async (id, resumeData) => {
    const response = await apiClient.put(`/resumes/${id}`, resumeData);
    return response.data;
  },

  deleteResume: async (id) => {
    const response = await apiClient.delete(`/resumes/${id}`);
    return response.data;
  },
};

export default apiClient;
