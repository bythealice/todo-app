'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import type { LoginFormData, LoginResponse } from '@/validations/loginSchema';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);

  const login = async (data: LoginFormData): Promise<LoginResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = 'Falha na autenticação';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const result: LoginResponse = await response.json();

    // Armazenar token e usuário nos cookies
    Cookies.set('accessToken', result.access_token, {
      expires: 7, // 7 dias
      secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
      sameSite: 'strict'
    });
    Cookies.set('user', JSON.stringify(result.user), {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    setIsAuthenticated(true);
    setUser(result.user);

    return result;
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
};

