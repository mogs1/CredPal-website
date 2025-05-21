import api from './api';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth';

function handleAuthError(error: any) {
  if (error.response && error.response.data?.message) {
    try {
      const parsed = JSON.parse(error.response.data.message);
      return { errors: parsed }; // e.g., { email: "Invalid", password: "Too short" }
    } catch {
      return { errors: { general: error.response.data.message } }; // fallback if not JSON
    }
  }
  return { errors: { general: 'Something went wrong. Please try again.' } };
}

export const AuthService = {
  async register(credentials: RegisterCredentials): Promise<{ data?: AuthResponse; errors?: any }> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', credentials);
      return { data: response.data };
    } catch (error) {
      return handleAuthError(error);
    }
  },

  async login(credentials: LoginCredentials): Promise<{ data?: AuthResponse; errors?: any }> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      return { data: response.data };
    } catch (error) {
      return handleAuthError(error);
    }
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },
};
