// services/api.ts - VERSION CONNECTÉE AU BACKEND

import axios from 'axios';

// ✅ Remplace l'adresse IP par celle de ton PC local accessible depuis ton téléphone (ex: ton IPv4)
const API_BASE_URL = 'http://192.168.1.166:5000/api';

// ✅ Configuration d'Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
