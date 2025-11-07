'use client';

import { forwardRef, SelectHTMLAttributes, ReactNode } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: ReactNode;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ icon, error, options, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-700 z-10">
              {icon}
            </div>
          )}
          <select
            ref={ref}
            className={`
              w-full px-4 py-3 rounded-xl
              ${icon ? 'pl-12' : ''}
              bg-white/80
              border-2 border-transparent
              focus:border-violet-400 focus:outline-none
              text-gray-800 font-medium
              transition-all duration-200
              shadow-sm hover:shadow-md
              cursor-pointer
              ${error ? 'border-violet-400' : ''}
              ${className}
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p className="text-violet-600 text-xs mt-1 ml-1 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

