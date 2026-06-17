'use client';

import React from 'react';
import { FieldErrors, useFieldArray } from 'react-hook-form';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

interface GoalsStepProps {
  errors: any;
  register: any;
  control: any;
}

const goalTypes = [
  { value: 'education', label: 'การศึกษา' },
  { value: 'retirement', label: 'เกษียณอายุ' },
  { value: 'purchase', label: 'ซื้อของ/ทรัพย์สิน' },
  { value: 'emergency', label: 'กองทุนฉุกเฉิน' },
  { value: 'other', label: 'อื่นๆ' },
];

const priorities = [
  { value: 'high', label: 'สูง (ต้องการมาก)' },
  { value: 'medium', label: 'ปานกลาง' },
  { value: 'low', label: 'ต่ำ (ไม่ฉุกเฉิน)' },
];

export function GoalsStep({ errors, register, control }: GoalsStepProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'goals.goals',
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">เป้าหมายทางการเงิน</h2>

      <p className="text-sm text-gray-600 mb-4">
        กรุณาระบุเป้าหมายทางการเงินที่สำคัญต่อคุณ
      </p>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-800">เป้าหมาย #{index + 1}</h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  ลบ
                </button>
              )}
            </div>

            <FormSelect
              label="ประเภทเป้าหมาย"
              options={goalTypes}
              register={register(`goals.goals.${index}.goalType`)}
              error={errors.goals?.goals?.[index]?.goalType?.message as string}
              required
            />

            <FormInput
              label="รายละเอียดเป้าหมาย"
              placeholder="เช่น ซื้อบ้าน, เรียนต่อบุคคลที่สาม"
              register={register(`goals.goals.${index}.description`)}
              error={errors.goals?.goals?.[index]?.description?.message as string}
              required
            />

            <FormInput
              label="จำนวนเงินเป้าหมาย (บาท)"
              type="number"
              placeholder="0"
              register={register(`goals.goals.${index}.targetAmount`)}
              error={errors.goals?.goals?.[index]?.targetAmount?.message as string}
              required
              min="0"
              step="0.01"
            />

            <FormInput
              label="วันที่ต้องการให้บรรลุเป้าหมาย"
              type="date"
              register={register(`goals.goals.${index}.targetDate`)}
              error={errors.goals?.goals?.[index]?.targetDate?.message as string}
              required
            />

            <FormSelect
              label="ลำดับความสำคัญ"
              options={priorities}
              register={register(`goals.goals.${index}.priority`)}
              error={errors.goals?.goals?.[index]?.priority?.message as string}
              required
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          append({
            goalType: '',
            description: '',
            targetAmount: 0,
            targetDate: '',
            priority: 'medium',
          })
        }
        className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
      >
        + เพิ่มเป้าหมาย
      </button>

      {errors.goals?.goals?.message && (
        <p className="text-red-500 text-sm">{errors.goals.goals.message as string}</p>
      )}
    </div>
  );
}
