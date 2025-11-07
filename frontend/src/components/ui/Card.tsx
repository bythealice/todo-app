'use client';
import { ReactNode } from 'react';
interface CardProps {
  children: ReactNode;
  className?: string;
}
export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`
      bg-white/90 backdrop-blur-lg
      rounded-3xl shadow-2xl
      overflow-hidden
      ${className}
    `}>
      {children}
    </div>
  );
};
