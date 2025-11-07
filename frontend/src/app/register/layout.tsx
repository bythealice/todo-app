import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Criar Conta - Todo App',
  description: 'Crie sua conta e comece a organizar suas tarefas hoje mesmo',
};

export default function RegisterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {children}
    </div>
  );
}

