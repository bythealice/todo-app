'use client';

import { useState } from 'react';
import type { LoginFormData, LoginResponse } from '@/validations/loginSchema';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);

  const login = async (data: LoginFormData): Promise<LoginResponse> => {
    const response = await fetch('http://localhost:4000/auth/login', {
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

    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('user', JSON.stringify(result.user));

    setIsAuthenticated(true);
    setUser(result.user);

    return result;
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
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

