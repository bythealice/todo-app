'use client';

import { useState } from 'react';
import type { RegisterFormData, RegisterResponse } from '@/validations/registerSchema';

export const useRegister = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<RegisterResponse['user'] | null>(null);

  const register = async (data: RegisterFormData): Promise<RegisterResponse> => {
    const response = await fetch('http://localhost:4000/auth/register', {
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

    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('user', JSON.stringify(result.user));

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

