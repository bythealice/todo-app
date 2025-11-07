import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['pending', 'completed']),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export interface Task extends TaskFormData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

