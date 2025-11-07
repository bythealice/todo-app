'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-white/80
            border-2 border-transparent
            focus:border-violet-400 focus:outline-none
            placeholder:text-gray-400
            text-gray-800 font-medium
            transition-all duration-200
            shadow-sm hover:shadow-md
            resize-none
            ${error ? 'border-violet-400' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-violet-600 text-xs mt-1 ml-1 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

