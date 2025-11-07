const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const apiClient = {
  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));

        if (response.status === 401) {
          throw new Error('Email ou senha incorretos');
        }
        if (response.status === 409) {
          throw new Error('Este email já está cadastrado');
        }
        if (response.status === 400) {
          throw new Error('Verifique os dados informados');
        }
        if (response.status >= 500) {
          throw new Error('Erro no servidor. Tente novamente');
        }

        throw new Error(error.message || 'Erro ao processar requisição');
      }

      return response.json();
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Erro de conexão. Verifique sua internet');
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro inesperado. Tente novamente');
    }
  },

  async get<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },

  async post<T>(endpoint: string, data?: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },

  async patch<T>(endpoint: string, data?: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },

  async delete<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
};

