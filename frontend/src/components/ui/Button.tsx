'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: `
      bg-gradient-to-r from-violet-600 to-purple-600
      hover:from-violet-700 hover:to-purple-700
      text-white font-semibold
      shadow-lg shadow-violet-500/50
      hover:shadow-xl hover:shadow-violet-600/50
    `,
    secondary: `
      bg-white/80 backdrop-blur-sm
      hover:bg-white
      text-violet-600 font-semibold
      border-2 border-violet-200
      hover:border-violet-300
    `,
    ghost: `
      bg-transparent
      hover:bg-violet-50
      text-violet-600
    `,
  };

  return (
    <button
      className={`
        px-6 py-3 rounded-full
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${variants[variant]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

