'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { registerSchema, type RegisterFormData } from '@/validations/registerSchema';
import { useSignup } from '@/hooks/useAuthQueries';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: signup, isPending, isError, error } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleFormSubmit = (data: RegisterFormData) => {
    const { name, email, password } = data;
    signup({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <Input
        {...register('name')}
        type="text"
        placeholder="Nome completo"
        icon={<User size={20} />}
        error={errors.name?.message}
        autoComplete="name"
      />

      <Input
        {...register('email')}
        type="email"
        placeholder="E-mail"
        icon={<Mail size={20} />}
        error={errors.email?.message}
        autoComplete="email"
      />

      <Input
        {...register('password')}
        type={showPassword ? 'text' : 'password'}
        placeholder="Senha"
        icon={<Lock size={20} />}
        rightIcon={
          showPassword ? (
            <EyeOff size={20} onClick={() => setShowPassword(false)} />
          ) : (
            <Eye size={20} onClick={() => setShowPassword(true)} />
          )
        }
        error={errors.password?.message}
        autoComplete="new-password"
      />

      <Input
        {...register('confirmPassword')}
        type={showConfirmPassword ? 'text' : 'password'}
        placeholder="Confirme sua senha"
        icon={<Lock size={20} />}
        rightIcon={
          showConfirmPassword ? (
            <EyeOff size={20} onClick={() => setShowConfirmPassword(false)} />
          ) : (
            <Eye size={20} onClick={() => setShowConfirmPassword(true)} />
          )
        }
        error={errors.confirmPassword?.message}
        autoComplete="new-password"
      />

      <Button type="submit" className="w-full" isLoading={isPending}>
        CRIAR CONTA
      </Button>

      {isError && (
        <p className="text-center text-sm text-red-600 font-medium">
          {error?.message || 'Erro ao criar conta'}
        </p>
      )}

      <p className="text-center text-sm text-gray-600">
        Já tem uma conta?{' '}
        <a
          href="/login"
          className="text-violet-600 hover:text-violet-700 font-semibold transition-colors"
        >
          Fazer login
        </a>
      </p>
    </form>
  );
};

