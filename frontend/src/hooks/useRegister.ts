'use client';

import { useState } from 'react';
import type { RegisterFormData, RegisterResponse } from '@/validations/registerSchema';
import { saveAuthData } from '@/utils/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const useRegister = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<RegisterResponse['user'] | null>(null);

  const register = async (data: RegisterFormData): Promise<RegisterResponse> => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorMessage = 'Falha ao criar conta';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const result: RegisterResponse = await response.json();

    // Armazenar token e usuário nos cookies
    saveAuthData(result.access_token, result.user);

    setIsAuthenticated(true);
    setUser(result.user);

    return result;
  };

  return {
    isAuthenticated,
    user,
    register,
  };
};

