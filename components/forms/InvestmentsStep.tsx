'use client';

import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { FormCheckbox } from './FormCheckbox';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

interface InvestmentsStepProps {
  errors: any;
  register: any;
}

const investmentTypes = [
  { value: 'stocks', label: 'หุ้น' },
  { value: 'bonds', label: 'พันธบัตร' },
  { value: 'mutual_funds', label: 'กองทุนรวม' },
  { value: 'real_estate', label: 'อสังหาริมทรัพย์' },
  { value: 'gold', label: 'ทองคำ' },
  { value: 'cryptocurrency', label: 'คริปโตเคอร์เรนซี' },
  { value: 'other', label: 'อื่นๆ' },
];

const riskTolerances = [
  { value: 'conservative', label: 'ระมัดระวัง (ต้องการความปลอดภัย)' },
  { value: 'moderate', label: 'ปานกลาง (ยอมรับความเสี่ยงปกติ)' },
  { value: 'aggressive', label: 'ก้าวร้าว (ยอมรับความเสี่ยงสูง)' },
];

const knowledgeLevels = [
  { value: 'beginner', label: 'มือใหม่' },
  { value: 'intermediate', label: 'ระดับกลาง' },
  { value: 'advanced', label: 'มีความเชี่ยวชาญ' },
];

const timeHorizons = [
  { value: 'short_term', label: 'ระยะสั้น (น้อยกว่า 3 ปี)' },
  { value: 'medium_term', label: 'ระยะกลาง (3-10 ปี)' },
  { value: 'long_term', label: 'ระยะยาว (มากกว่า 10 ปี)' },
];

export function InvestmentsStep({ errors, register }: InvestmentsStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">การลงทุน</h2>

      <FormCheckbox
        label="มีการลงทุนอยู่ในปัจจุบัน"
        register={register('investments.hasInvestments')}
        error={errors.investments?.hasInvestments?.message as string}
      />

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">ประเภทการลงทุน (เลือกได้มากกว่า 1 ประเภท)</h3>
        <div className="space-y-2">
          {investmentTypes.map((type) => (
            <div key={type.value} className="flex items-center">
              <input
                type="checkbox"
                id={type.value}
                value={type.value}
                {...register('investments.investmentTypes')}
                className="w-4 h-4 accent-blue-600"
              />
              <label htmlFor={type.value} className="ml-2 text-sm font-medium text-gray-700">
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <FormSelect
        label="ความโน้มเอียงต่อความเสี่ยง (Risk Tolerance)"
        options={riskTolerances}
        register={register('investments.riskTolerance')}
        error={errors.investments?.riskTolerance?.message as string}
        required
      />

      <FormSelect
        label="ระดับความรู้เรื่องการลงทุน"
        options={knowledgeLevels}
        register={register('investments.investmentKnowledge')}
        error={errors.investments?.investmentKnowledge?.message as string}
        required
      />

      <FormSelect
        label="ระยะเวลาการลงทุน"
        options={timeHorizons}
        register={register('investments.investmentTimeHorizon')}
        error={errors.investments?.investmentTimeHorizon?.message as string}
        required
      />

      <FormInput
        label="มูลค่าพอร์ตโฟลิโอปัจจุบัน (บาท)"
        type="number"
        placeholder="0"
        register={register('investments.currentPortfolioValue')}
        error={errors.investments?.currentPortfolioValue?.message as string}
        min="0"
        step="0.01"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          เป้าหมายการลงทุน
        </label>
        <textarea
          placeholder="เช่น ต้องการเลิกงาน, เลี้ยงดูครอบครัว, ซื้อที่ดิน"
          {...register('investments.investmentGoals')}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
            errors.investments?.investmentGoals
              ? 'border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } focus:outline-none focus:ring-2 resize-none`}
          rows={4}
        />
      </div>
    </div>
  );
}
