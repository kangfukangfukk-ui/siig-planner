'use client';

import React from 'react';
import { FieldValues, FieldPath, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'number' | 'tel' | 'date';
  register: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
}

export function FormInput({
  label,
  placeholder,
  type = 'text',
  register,
  error,
  required = false,
  helperText,
  disabled = false,
  min,
  max,
  step,
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        {...register}
        className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        } focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helperText && !error && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  );
}
