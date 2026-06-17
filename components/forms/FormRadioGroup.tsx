'use client';

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface FormRadioGroupProps {
  label: string;
  register: UseFormRegisterReturn;
  options: RadioOption[];
  error?: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export function FormRadioGroup({
  label,
  register,
  options,
  error,
  required = false,
  helperText,
  disabled = false,
}: FormRadioGroupProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-start">
            <input
              type="radio"
              value={option.value}
              disabled={disabled}
              {...register}
              className={`w-4 h-4 mt-1 ${
                error ? 'accent-red-500' : 'accent-blue-600'
              } focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:cursor-not-allowed`}
            />
            <div className="ml-3 flex-1">
              <label className="text-sm font-medium text-gray-700">
                {option.label}
              </label>
              {option.description && (
                <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {helperText && !error && <p className="text-gray-500 text-sm mt-2">{helperText}</p>}
    </div>
  );
}
