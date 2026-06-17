'use client';

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormSelectProps {
  label: string;
  register: UseFormRegisterReturn;
  options: Array<{ value: string; label: string }>;
  error?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
}

export function FormSelect({
  label,
  register,
  options,
  error,
  required = false,
  placeholder = 'กรุณาเลือก',
  helperText,
  disabled = false,
}: FormSelectProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        disabled={disabled}
        {...register}
        className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        } focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed bg-white`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helperText && !error && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  );
}
