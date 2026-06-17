'use client';

import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

interface ExpensesStepProps {
  errors: any;
  register: any;
}

const expensePeriods = [
  { value: 'monthly', label: 'รายเดือน' },
  { value: 'annually', label: 'รายปี' },
];

export function ExpensesStep({ errors, register }: ExpensesStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">รายจ่าย</h2>

      <p className="text-sm text-gray-600 mb-4">
        กรุณากรอกรายจ่ายโดยประมาณต่อเดือน
      </p>

      <FormInput
        label="ค่าที่อยู่อาศัย (บ้าน/อพาร์ท)"
        type="number"
        placeholder="0"
        register={register('expenses.housingExpense')}
        error={errors.expenses?.housingExpense?.message as string}
        required
        min="0"
        step="0.01"
      />

      <FormInput
        label="ค่าสาธารณูปโภค (ไฟ, น้ำ, เน็ต)"
        type="number"
        placeholder="0"
        register={register('expenses.utilities')}
        error={errors.expenses?.utilities?.message as string}
        min="0"
        step="0.01"
      />

      <FormInput
        label="ค่าอาหารและพยอก"
        type="number"
        placeholder="0"
        register={register('expenses.groceries')}
        error={errors.expenses?.groceries?.message as string}
        min="0"
        step="0.01"
      />

      <FormInput
        label="ค่าเดินทาง"
        type="number"
        placeholder="0"
        register={register('expenses.transportation')}
        error={errors.expenses?.transportation?.message as string}
        min="0"
        step="0.01"
      />

      <FormInput
        label="ค่าเลี้ยงดูเด็ก"
        type="number"
        placeholder="0"
        register={register('expenses.childcare')}
        error={errors.expenses?.childcare?.message as string}
        min="0"
        step="0.01"
      />

      <FormInput
        label="ค่าการศึกษา"
        type="number"
        placeholder="0"
        register={register('expenses.education')}
        error={errors.expenses?.education?.message as string}
        min="0"
        step="0.01"
      />

      <FormInput
        label="ค่าสาธารณสุขและการแพทย์"
        type="number"
        placeholder="0"
        register={register('expenses.healthcare')}
        error={errors.expenses?.healthcare?.message as string}
        min="0"
        step="0.01"
      />

      <FormInput
        label="ค่าประกันภัย"
        type="number"
        placeholder="0"
        register={register('expenses.insurance')}
        error={errors.expenses?.insurance?.message as string}
        min="0"
        step="0.01"
      />

      <FormInput
        label="ค่าบันเทิง"
        type="number"
        placeholder="0"
        register={register('expenses.entertainment')}
        error={errors.expenses?.entertainment?.message as string}
        min="0"
        step="0.01"
      />

      <FormInput
        label="รายจ่ายอื่นๆ"
        type="number"
        placeholder="0"
        register={register('expenses.otherExpenses')}
        error={errors.expenses?.otherExpenses?.message as string}
        min="0"
        step="0.01"
      />

      <FormSelect
        label="ระยะเวลา"
        options={expensePeriods}
        register={register('expenses.expensePeriod')}
        error={errors.expenses?.expensePeriod?.message as string}
        required
      />
    </div>
  );
}
