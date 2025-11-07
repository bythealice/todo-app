'use client';

import { CheckCircle2, Circle, Pencil, Trash2, Flag } from 'lucide-react';
import { Task } from '@/validations/taskSchema';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: 'text-green-600 bg-green-50',
  medium: 'text-yellow-600 bg-yellow-50',
  high: 'text-red-600 bg-red-50',
};

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};

export const TaskCard = ({ task, onToggleStatus, onEdit, onDelete }: TaskCardProps) => {
  const isCompleted = task.status === 'completed';

  return (
    <div className={`
      bg-white/80 backdrop-blur-sm rounded-2xl p-5
      border-2 border-transparent hover:border-violet-200
      shadow-sm hover:shadow-md
      transition-all duration-200
      ${isCompleted ? 'opacity-75' : ''}
    `}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggleStatus(task.id)}
          className="flex-shrink-0 mt-1 text-violet-600 hover:text-violet-700 transition-colors"
        >
          {isCompleted ? (
            <CheckCircle2 size={24} className="fill-current" />
          ) : (
            <Circle size={24} />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`
            text-lg font-semibold text-gray-800 mb-1
            ${isCompleted ? 'line-through text-gray-500' : ''}
          `}>
            {task.title}
          </h3>

          {task.description && (
            <p className={`
              text-sm text-gray-600 mb-3 line-clamp-2
              ${isCompleted ? 'text-gray-400' : ''}
            `}>
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-3">
            <span className={`
              inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold
              ${priorityColors[task.priority]}
            `}>
              <Flag size={12} />
              {priorityLabels[task.priority]}
            </span>

            <span className="text-xs text-gray-400">
              {new Date(task.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors"
            title="Editar"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            title="Excluir"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

