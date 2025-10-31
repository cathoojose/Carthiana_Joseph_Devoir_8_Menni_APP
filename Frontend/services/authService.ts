// services/authService.ts
import api from './api';

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  user_type?: string;
}

export interface LoginData {
  identifier: string;
  password: string;
}

export const authService = {
  async register(userData: RegisterData) {
    try {
      // Adaptation pour le backend
        const backendData = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password, // ✅ "password" au lieu de "password_hash"
      user_type: userData.user_type || 'client'
    };

      const response = await api.post('/auth/register', backendData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erreur lors de l\'inscription');
    }
  },

  // Connexion
  async login(loginData: LoginData) {
    try {
      const response = await api.post('/auth/login', loginData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erreur lors de la connexion');
    }
  },

  // Vérifier si un utilisateur existe
  async checkUserExists(identifier: string) {
    try {
      const response = await api.post('/auth/check-user', { identifier });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erreur de vérification');
    }
  }
};