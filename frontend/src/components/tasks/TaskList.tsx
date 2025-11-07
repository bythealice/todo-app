'use client';

import { useState } from 'react';
import { Task } from '@/validations/taskSchema';
import { TaskCard } from './TaskCard';
import { Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

type FilterType = 'all' | 'pending' | 'completed';
type SortType = 'newest' | 'oldest' | 'priority';

export const TaskList = ({ tasks, onToggleStatus, onEdit, onDelete }: TaskListProps) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('newest');

  let filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  if (searchQuery) {
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  filteredTasks.sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Buscar tarefas..."
          icon={<Search size={20} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`
                px-4 py-2 rounded-xl font-medium text-sm transition-all
                ${filter === 'all'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/50'
                  : 'bg-white/80 text-gray-600 hover:bg-white'
                }
              `}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`
                px-4 py-2 rounded-xl font-medium text-sm transition-all
                ${filter === 'pending'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/50'
                  : 'bg-white/80 text-gray-600 hover:bg-white'
                }
              `}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`
                px-4 py-2 rounded-xl font-medium text-sm transition-all
                ${filter === 'completed'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/50'
                  : 'bg-white/80 text-gray-600 hover:bg-white'
                }
              `}
            >
              Concluídas
            </button>
          </div>

          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-4 py-2 rounded-xl bg-white/80 text-gray-700 font-medium text-sm border-2 border-transparent hover:border-violet-200 transition-all cursor-pointer"
            >
              <option value="newest">Mais recentes</option>
              <option value="oldest">Mais antigas</option>
              <option value="priority">Prioridade</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Filter size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 font-medium">
              {searchQuery ? 'Nenhuma tarefa encontrada' : 'Nenhuma tarefa ainda'}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {searchQuery ? 'Tente outro termo de busca' : 'Clique em "Nova Tarefa" para começar'}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

