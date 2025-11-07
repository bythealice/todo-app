'use client';

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-600">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-xl
              ${icon ? 'pl-12' : ''}
              ${rightIcon ? 'pr-12' : ''}
              bg-white/60 backdrop-blur-sm
              border-2 border-transparent
              focus:border-violet-400 focus:outline-none
              placeholder:text-gray-400
              transition-all duration-200
              shadow-sm hover:shadow-md
              ${error ? 'border-violet-400' : ''}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-violet-600 cursor-pointer">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-violet-600 text-xs mt-1 ml-1 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

