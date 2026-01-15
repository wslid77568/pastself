import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const getAuthHeader = () => {
  const token = localStorage.getItem('pastself_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authAPI = {
  signup: async (email, password) => {
    const response = await axios.post(`${API}/auth/signup`, { email, password });
    return response.data;
  },
  
  login: async (email, password) => {
    const response = await axios.post(`${API}/auth/login`, { email, password });
    return response.data;
  },
  
  getMe: async () => {
    const response = await axios.get(`${API}/auth/me`, { headers: getAuthHeader() });
    return response.data;
  }
};

export const entriesAPI = {
  createOrUpdate: async (entryData) => {
    const response = await axios.post(`${API}/entries`, entryData, { headers: getAuthHeader() });
    return response.data;
  },
  
  getEntries: async (limit = 30) => {
    const response = await axios.get(`${API}/entries?limit=${limit}`, { headers: getAuthHeader() });
    return response.data;
  },
  
  compare: async (daysAgo) => {
    const response = await axios.get(`${API}/entries/compare?days_ago=${daysAgo}`, { headers: getAuthHeader() });
    return response.data;
  }
};

export const insightsAPI = {
  getInsights: async () => {
    const response = await axios.get(`${API}/insights`, { headers: getAuthHeader() });
    return response.data;
  }
};

export const userAPI = {
  exportData: async () => {
    const response = await axios.get(`${API}/user/export`, { headers: getAuthHeader() });
    return response.data;
  },
  
  deleteAccount: async () => {
    const response = await axios.delete(`${API}/user/account`, { headers: getAuthHeader() });
    return response.data;
  }
};
