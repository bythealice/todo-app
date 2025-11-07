'use client';

import { Card } from '@/components/ui/Card';
import { WavePattern } from '@/components/ui/WavePattern';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import type { LoginFormData } from '@/validations/loginSchema';

export default function LoginPage() {
  const { login } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data);
      // TODO: Redirecionar para dashboard após login bem-sucedido
      // router.push('/dashboard');
      console.log('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // TODO: Mostrar mensagem de erro para o usuário
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-5xl grid md:grid-cols-2 gap-0 relative">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Olá!
            </h1>
            <p className="text-gray-600">
              Entre na sua conta
            </p>
          </div>

          <LoginForm onSubmit={handleLogin} />
        </div>

        <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 md:p-12 flex flex-col justify-center items-center text-white overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-24 -mt-1">
            <WavePattern className="w-full h-full rotate-180" />
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Bem-vindo de volta!
            </h2>
            <p className="text-violet-100 text-lg leading-relaxed">
              Organize suas tarefas de forma simples e eficiente.
              Gerencie seu dia a dia, acompanhe seu progresso e
              alcance seus objetivos com facilidade.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 -mb-1">
            <WavePattern className="w-full h-full" />
          </div>

          <div className="absolute top-20 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>
      </Card>
    </div>
  );
}

