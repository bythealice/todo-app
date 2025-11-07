'use client';

import { LucideIcon } from 'lucide-react';
import { MiniChart } from '@/components/ui/MiniChart';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'violet' | 'yellow' | 'green';
  chartData: number[];
}

const colorClasses = {
  violet: {
    gradient: 'from-violet-50 to-purple-50',
    border: 'border-violet-100',
    text: 'text-violet-600',
    valueText: 'text-violet-700',
    icon: 'bg-violet-100 text-violet-600',
  },
  yellow: {
    gradient: 'from-yellow-50 to-orange-50',
    border: 'border-yellow-100',
    text: 'text-yellow-600',
    valueText: 'text-yellow-700',
    icon: 'bg-yellow-100 text-yellow-600',
  },
  green: {
    gradient: 'from-green-50 to-emerald-50',
    border: 'border-green-100',
    text: 'text-green-600',
    valueText: 'text-green-700',
    icon: 'bg-green-100 text-green-600',
  },
};

export const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  chartData,
}: StatCardProps) => {
  const colors = colorClasses[color];

  return (
    <div className={`
      bg-gradient-to-br ${colors.gradient} rounded-2xl p-6
      border ${colors.border} shadow-sm hover:shadow-md
      transition-all duration-200
    `}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className={`text-sm font-medium mb-1 ${colors.text}`}>{title}</p>
          <p className={`text-4xl font-bold ${colors.valueText}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colors.icon}`}>
          <Icon size={24} />
        </div>
      </div>

      <div className="mt-4">
        <MiniChart data={chartData} color={color} />
      </div>
    </div>
  );
};

