'use client';

import { useState } from 'react';
import type { LoginFormData, LoginResponse } from '@/validations/loginSchema';
import { saveAuthData, clearAuth } from '@/utils/auth';

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

    saveAuthData(result.access_token, result.user);

    setIsAuthenticated(true);
    setUser(result.user);

    return result;
  };

  const logout = () => {
    clearAuth();
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

