import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Formato de e-mail inválido')
    .trim(),
  password: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(100, 'A senha não deve exceder 100 caracteres')
    .trim(),
});

export const loginResponseSchema = z.object({
  access_token: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  }),
});

export const loginErrorSchema = z.object({
  message: z.string(),
  errors: z.array(z.string()).optional(),
  status: z.number().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type LoginError = z.infer<typeof loginErrorSchema>;