'use client';

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormCheckboxProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  sublabel?: string;
}

export function FormCheckbox({
  label,
  register,
  error,
  helperText,
  disabled = false,
  sublabel,
}: FormCheckboxProps) {
  return (
    <div className="mb-4">
      <div className="flex items-start">
        <input
          type="checkbox"
          disabled={disabled}
          {...register}
          className={`w-4 h-4 mt-1 rounded ${
            error
              ? 'border-red-500 accent-red-500'
              : 'border-gray-300 accent-blue-600'
          } focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
        />
        <div className="ml-3 flex-1">
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
          {sublabel && <p className="text-xs text-gray-500 mt-1">{sublabel}</p>}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1 ml-7">{error}</p>}
      {helperText && !error && <p className="text-gray-500 text-sm mt-1 ml-7">{helperText}</p>}
    </div>
  );
}
