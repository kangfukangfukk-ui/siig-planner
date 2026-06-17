'use client';

import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

interface IncomeStepProps {
  errors: any;
  register: any;
}

const incomeFrequencies = [
  { value: 'monthly', label: 'รายเดือน' },
  { value: 'quarterly', label: 'รายไตรมาส' },
  { value: 'annually', label: 'รายปี' },
];

const incomeStabilities = [
  { value: 'stable', label: 'มั่นคง (ไม่เปลี่ยนแปลง)' },
  { value: 'variable', label: 'เปลี่ยนแปลง (ขึ้นลง)' },
  { value: 'seasonal', label: 'ตามฤดูกาล' },
];

export function IncomeStep({ errors, register }: IncomeStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">รายได้</h2>

      <FormInput
        label="เงินเดือนรายเดือน"
        type="number"
        placeholder="0"
        register={register('income.monthlySalary')}
        error={errors.income?.monthlySalary?.message as string}
        required
        min="0"
        step="0.01"
      />

      <FormInput
        label="โบนัสประจำปี"
        type="number"
        placeholder="0"
        register={register('income.bonusAnnual')}
        error={errors.income?.bonusAnnual?.message as string}
        min="0"
        step="0.01"
      />

      <FormInput
        label="รายได้อื่นๆ (รายเดือน)"
        type="number"
        placeholder="0"
        register={register('income.otherIncomeMonthly')}
        error={errors.income?.otherIncomeMonthly?.message as string}
        min="0"
        step="0.01"
      />

      <FormInput
        label="รายละเอียดรายได้อื่นๆ"
        placeholder="เช่น ให้เช่า, ขายสินค้า"
        register={register('income.otherIncomeDescription')}
        error={errors.income?.otherIncomeDescription?.message as string}
      />

      <FormInput
        label="รายได้ของคู่สมรส (รายเดือน)"
        type="number"
        placeholder="0"
        register={register('income.spouseMonthlyIncome')}
        error={errors.income?.spouseMonthlyIncome?.message as string}
        min="0"
        step="0.01"
      />

      <FormInput
        label="รายได้จากการลงทุน (รายเดือน)"
        type="number"
        placeholder="0"
        register={register('income.investmentIncome')}
        error={errors.income?.investmentIncome?.message as string}
        min="0"
        step="0.01"
      />

      <FormInput
        label="รายได้จากการให้เช่า (รายเดือน)"
        type="number"
        placeholder="0"
        register={register('income.rentalIncome')}
        error={errors.income?.rentalIncome?.message as string}
        min="0"
        step="0.01"
      />

      <FormSelect
        label="ความถี่ของรายได้"
        options={incomeFrequencies}
        register={register('income.incomeFrequency')}
        error={errors.income?.incomeFrequency?.message as string}
        required
      />

      <FormSelect
        label="ความมั่นคงของรายได้"
        options={incomeStabilities}
        register={register('income.incomeStability')}
        error={errors.income?.incomeStability?.message as string}
        required
      />
    </div>
  );
}
