'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { WavePattern } from '@/components/ui/WavePattern';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex flex-col">
      <div className="relative h-32 overflow-hidden">
        <WavePattern className="absolute top-0 left-0 w-full h-full" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 -mt-16">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              404
            </h1>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Página não encontrada
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Ops! A página que você está procurando não existe ou foi movida.
            </p>

            <div className="my-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center">
                  <div className="text-6xl">🔍</div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-violet-500 rounded-full animate-ping"></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button className="flex items-center gap-2 min-w-[200px]">
                  <Home size={20} />
                  Ir para Início
                </Button>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-violet-600 text-violet-600 hover:bg-violet-50 transition-colors font-semibold min-w-[200px] justify-center"
              >
                <ArrowLeft size={20} />
                Voltar
              </button>
            </div>
          </div>

          <div className="text-gray-600 text-sm">
            <p>Você pode tentar:</p>
            <ul className="mt-2 space-y-1">
              <li>• Verificar se digitou o endereço corretamente</li>
              <li>• Voltar para a página anterior</li>
              <li>• Acessar a página inicial</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative h-32 overflow-hidden rotate-180">
        <WavePattern className="absolute top-0 left-0 w-full h-full" />
      </div>
    </div>
  );
}

