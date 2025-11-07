export const WavePattern = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path
        d="M0,0 C150,60 350,0 600,40 C850,80 1050,20 1200,60 L1200,120 L0,120 Z"
        fill="url(#waveGradient)"
        opacity="0.9"
      />
      <path
        d="M0,20 C200,80 400,20 600,60 C800,100 1000,40 1200,80 L1200,120 L0,120 Z"
        fill="url(#waveGradient)"
        opacity="0.6"
      />
      <path
        d="M0,40 C250,90 450,40 600,70 C750,100 950,50 1200,90 L1200,120 L0,120 Z"
        fill="url(#waveGradient)"
        opacity="0.4"
      />
    </svg>
  );
};