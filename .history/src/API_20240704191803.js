import axios from "axios";

const API_URL = `https://cgifs-portfolio-management-backend.vercel.app`;
//"http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
});

export const loginUser = async (credentials) => {
  const response = await api.post(`${API_URL}/api/v1/auth/login`, credentials);
  return response.data;
};

const token = localStorage.getItem("token");

export const getAllMembers = async () => {
  const response = await api.get(`${API_URL}/api/v1/user/locations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const updateMember = async (id, updatedData) => {
  const response = await api.patch(
    `${API_URL}/api/v1/user/location/${id}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const addLocation = async (locationData) => {
  const response = await api.post(
    `${API_URL}/api/v1/user/locations`,
    locationData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const deleteMember = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`${API_URL}/api/v1/user/locations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
