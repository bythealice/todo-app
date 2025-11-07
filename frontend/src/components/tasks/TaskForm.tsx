'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlignLeft, Flag } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { taskSchema, type TaskFormData, type Task } from '@/validations/taskSchema';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void | Promise<void>;
  onCancel: () => void;
  initialData?: Task;
  isLoading?: boolean;
}

const priorityOptions = [
  { value: 'low', label: '🟢 Baixa' },
  { value: 'medium', label: '🟡 Média' },
  { value: 'high', label: '🔴 Alta' },
];

export const TaskForm = ({ onSubmit, onCancel, initialData, isLoading = false }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema) as any,
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description || '',
      priority: initialData.priority,
      status: initialData.status,
    } : {
      title: '',
      description: '',
      priority: 'medium' as const,
      status: 'pending' as const,
    },
  });

  const handleFormSubmit = async (data: TaskFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        {...register('title')}
        type="text"
        placeholder="Título da tarefa"
        icon={<AlignLeft size={20} />}
        error={errors.title?.message}
        autoFocus
      />

      <Textarea
        {...register('description')}
        placeholder="Descrição (opcional)"
        rows={4}
        error={errors.description?.message}
      />

      <Select
        {...register('priority')}
        icon={<Flag size={20} />}
        options={priorityOptions}
        error={errors.priority?.message}
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          isLoading={isLoading}
        >
          {initialData ? 'Atualizar' : 'Criar Tarefa'}
        </Button>
      </div>
    </form>
  );
};

