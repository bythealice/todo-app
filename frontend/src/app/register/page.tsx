'use client';

import { Card } from '@/components/ui/Card';
import { WavePattern } from '@/components/ui/WavePattern';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-5xl grid md:grid-cols-2 gap-0 relative">
        <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 md:p-12 flex flex-col justify-center items-center text-white overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-24 -mt-1">
            <WavePattern className="w-full h-full rotate-180" />
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Comece agora!
            </h2>
            <p className="text-violet-100 text-lg leading-relaxed">
              Junte-se a outros usuários que já estão organizando
              suas tarefas de forma eficiente. Transforme sua produtividade
              e alcance seus objetivos.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 -mb-1">
            <WavePattern className="w-full h-full" />
          </div>

          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Criar Conta
            </h1>
            <p className="text-gray-600">
              Preencha seus dados para começar
            </p>
          </div>

          <RegisterForm />
        </div>
      </Card>
    </div>
  );
}

