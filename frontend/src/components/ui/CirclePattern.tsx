export const CirclePattern = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#circleGradient)" />
      <circle cx="100" cy="100" r="60" fill="none" stroke="#8b5cf6" strokeOpacity="0.1" strokeWidth="1" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="#a855f7" strokeOpacity="0.1" strokeWidth="1" />
    </svg>
  );
};

