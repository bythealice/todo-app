'use client';

import { useState, useEffect } from 'react';
import { CheckSquare, LogOut, Home, BarChart3, Settings, User as UserIcon } from 'lucide-react';
import { WavePattern } from './WavePattern';
import { useCurrentUser, useLogout } from '@/hooks/useAuthQueries';

export const Sidebar = () => {
  const [mounted, setMounted] = useState(false);
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: logout } = useLogout();

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Estatísticas', active: false },
    { icon: UserIcon, label: 'Perfil', active: false },
    { icon: Settings, label: 'Configurações', active: false },
  ];

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="w-72 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 opacity-30 -mt-8">
        <WavePattern className="w-full h-full rotate-180" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20 -mb-8">
        <WavePattern className="w-full h-full" />
      </div>

      <div className="absolute top-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-32 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="p-8 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <CheckSquare size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Todo App</h1>
              <p className="text-violet-100 text-sm">Organize sua vida</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${item.active
                      ? 'bg-white/20 backdrop-blur-sm shadow-lg'
                      : 'hover:bg-white/10'
                    }
                  `}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-3">
            {!mounted || isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-full flex items-center justify-center font-bold text-lg">
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">Usuário</p>
                  <p className="text-xs text-violet-100 truncate">Carregando...</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-full flex items-center justify-center font-bold text-lg">
                  {getInitials(user?.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{user?.name || 'Usuário'}</p>
                  <p className="text-xs text-violet-100 truncate">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 font-medium"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </div>
    </aside>
  );
};

