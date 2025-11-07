'use client';

import { useState, useMemo } from 'react';
import { Plus, ListTodo, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Sidebar } from '@/components/ui/Sidebar';
import { WavePattern } from '@/components/ui/WavePattern';
import { StatCard } from '@/components/dashboard/StatCard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskList } from '@/components/tasks/TaskList';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask, useToggleTaskStatus } from '@/hooks/useTaskQueries';
import type { Task } from '@/services/taskService';
import type { TaskFormData } from '@/validations/taskSchema';

export default function DashboardPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { data: tasks = [] } = useTasks();
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: toggleStatus } = useToggleTaskStatus();

  const handleCreateTask = (data: TaskFormData) => {
    createTask(data, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
      },
    });
  };

  const handleEditTask = (data: TaskFormData) => {
    if (selectedTask) {
      updateTask({ id: selectedTask.id, data }, {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        },
      });
    }
  };

  const handleOpenEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      deleteTask(id);
    }
  };

  const handleToggleStatus = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      toggleStatus({ id, status: task.status });
    }
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  const chartDataTotal = useMemo(() => [5, 8, 6, 9, 12, 10, stats.total], [stats.total]);
  const chartDataPending = useMemo(() => [8, 6, 9, 5, 7, 4, stats.pending], [stats.pending]);
  const chartDataCompleted = useMemo(() => [2, 4, 3, 5, 7, 8, stats.completed], [stats.completed]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-auto relative">
        <div className="fixed top-0 right-0 w-1/2 h-64 opacity-10 pointer-events-none">
          <WavePattern className="w-full h-full rotate-180" />
        </div>
        <div className="fixed bottom-0 left-72 w-1/2 h-64 opacity-10 pointer-events-none">
          <WavePattern className="w-full h-full" />
        </div>

        <div className="fixed top-20 right-20 w-64 h-64 bg-violet-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-32 right-40 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Gerencie suas tarefas e acompanhe seu progresso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total de Tarefas"
              value={stats.total}
              icon={ListTodo}
              color="violet"
              chartData={chartDataTotal}
              trend="up"
              trendValue="+12% esta semana"
            />
            <StatCard
              title="Pendentes"
              value={stats.pending}
              icon={Clock}
              color="yellow"
              chartData={chartDataPending}
              trend="down"
              trendValue="-8% esta semana"
            />
            <StatCard
              title="Concluídas"
              value={stats.completed}
              icon={CheckCircle2}
              color="green"
              chartData={chartDataCompleted}
              trend="up"
              trendValue="+23% esta semana"
            />
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Minhas Tarefas
            </h2>

            <Button
              variant="primary"
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 shadow-lg shadow-violet-500/30"
            >
              <Plus size={20} />
              Nova Tarefa
            </Button>
          </div>

          <TaskList
            tasks={tasks}
            onToggleStatus={handleToggleStatus}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTask}
          />
        </div>
      </main>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Nova Tarefa"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isCreating}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        title="Editar Tarefa"
      >
        {selectedTask && (
          <TaskForm
            onSubmit={handleEditTask}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedTask(null);
            }}
            initialData={selectedTask}
            isLoading={isUpdating}
          />
        )}
      </Modal>
    </div>
  );
}

