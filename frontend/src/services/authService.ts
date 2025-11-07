import { apiClient } from './api';
import Cookies from 'js-cookie';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', data);
  },

  async signup(data: SignupRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/signup', data);
  },

  async getCurrentUser(): Promise<User> {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('Token não encontrado');
    }
    return apiClient.get<User>('/auth/me', token);
  },

  saveToken(token: string) {
    Cookies.set('token', token, {
      expires: 7,
      sameSite: 'lax',
      path: '/',
    });
  },

  clearToken() {
    Cookies.remove('token');
  },

  getToken() {
    return Cookies.get('token');
  },
};

