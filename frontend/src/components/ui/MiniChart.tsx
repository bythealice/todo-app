'use client';

interface MiniChartProps {
  data: number[];
  color?: 'violet' | 'yellow' | 'green';
}

const colors = {
  violet: {
    line: '#8b5cf6',
    gradient: 'from-violet-500/20 to-transparent',
  },
  yellow: {
    line: '#f59e0b',
    gradient: 'from-yellow-500/20 to-transparent',
  },
  green: {
    line: '#10b981',
    gradient: 'from-green-500/20 to-transparent',
  },
};

export const MiniChart = ({ data, color = 'violet' }: MiniChartProps) => {
  const max = Math.max(...data);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (value / max) * 100;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full h-16"
    >
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors[color].line} stopOpacity="0.3" />
          <stop offset="100%" stopColor={colors[color].line} stopOpacity="0" />
        </linearGradient>
      </defs>

      <polygon
        points={areaPoints}
        fill={`url(#gradient-${color})`}
      />

      <polyline
        points={points}
        fill="none"
        stroke={colors[color].line}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
