import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

const api = axios.create({
  baseURL: API_URL,
});

export const loginUser = async (credentials) => {
  const response = await api.post(`${API_URL}/api/v1/auth/login`, credentials);
  return response.data;
};

const token = localStorage.getItem('token');

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       // Token is expired or invalid
//       localStorage.removeItem('token');
//       window.location.href = '/login'; 
//     }
//     return Promise.reject(error);
//   }
// );

export const getAllMembers = async () => {
  const response = await api.get(`${API_URL}/api/v1/user/locations`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data;
};

export const updateMember = async (id, updatedData) => {
  const response = await api.put(`${API_URL}/api/v1/user/locations/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};