import { apiClient } from './api';
import { authService } from './authService';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'pending' | 'completed';
}

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const token = authService.getToken();
    if (!token) throw new Error('Token não encontrado');
    return apiClient.get<Task[]>('/tasks', token);
  },

  async createTask(data: CreateTaskRequest): Promise<Task> {
    const token = authService.getToken();
    if (!token) throw new Error('Token não encontrado');
    return apiClient.post<Task>('/tasks', data, token);
  },

  async updateTask(id: string, data: UpdateTaskRequest): Promise<Task> {
    const token = authService.getToken();
    if (!token) throw new Error('Token não encontrado');
    return apiClient.patch<Task>(`/tasks/${id}`, data, token);
  },

  async deleteTask(id: string): Promise<void> {
    const token = authService.getToken();
    if (!token) throw new Error('Token não encontrado');
    return apiClient.delete<void>(`/tasks/${id}`, token);
  },

  async toggleTaskStatus(id: string, currentStatus: 'pending' | 'completed'): Promise<Task> {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    return this.updateTask(id, { status: newStatus });
  },
};

