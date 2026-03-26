// utils/axiosConfig.js
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {

      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      

      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Student API service functions
export const studentApi = {
  // Get current student profile using JWT token
  getProfile: () => api.get('/students/profile'),
  
  // Get student by username
  getByUsername: (username) => api.get(`/students/by-username/${username}`),
  
  // Update current student profile
  updateProfile: (studentData) => api.put('/students/profile', studentData),
  
  // Get all students (admin/registrar only)
  getAllStudents: () => api.get('/students'),
  
  // Create new student
  createStudent: (studentData) => api.post('/students', studentData),
  
  // Update student by ID
  updateStudent: (id, studentData) => api.put(`/students/${id}`, studentData),
  
  // Delete student by ID
  deleteStudent: (id) => api.delete(`/students/${id}`),
};