// services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.61:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Requête API: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('📤 Données envoyées:', config.data);
    return config;
  },
  (error) => {
    console.error('❌ Erreur requête API:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ Réponse API: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ Erreur réponse API:`, {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default api;