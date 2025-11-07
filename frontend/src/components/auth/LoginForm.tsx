'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { loginSchema, type LoginFormData } from '@/validations/loginSchema';
import { useLogin } from '@/hooks/useAuthQueries';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, isError, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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
        autoComplete="current-password"
      />

      <div className="flex items-center justify-between">
        <Checkbox label="Lembrar-me" />
        <a
          href="/recuperar-senha"
          className="text-sm text-violet-600 hover:text-violet-700 transition-colors"
        >
          Esqueceu a senha?
        </a>
      </div>

      <Button type="submit" className="w-full" isLoading={isPending}>
        ENTRAR
      </Button>

      {isError && (
        <p className="text-center text-sm text-red-600 font-medium">
          {error?.message || 'Erro ao fazer login'}
        </p>
      )}

      <p className="text-center text-sm text-gray-600">
        Não tem uma conta?{' '}
        <a
          href="/register"
          className="text-violet-600 hover:text-violet-700 font-semibold transition-colors"
        >
          Criar conta
        </a>

      </p>
    </form>
  );
};

