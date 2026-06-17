'use client';

import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { FormInput } from './FormInput';
import { FormCheckbox } from './FormCheckbox';

interface FamilyInfoStepProps {
  errors: any;
  register: any;
}

export function FamilyInfoStep({ errors, register }: FamilyInfoStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ข้อมูลครอบครัว</h2>

      <FormInput
        label="ชื่อคู่สมรส (ถ้ามี)"
        placeholder="กรุณากรอกชื่อ"
        register={register('familyInfo.spouseName')}
        error={errors.familyInfo?.spouseName?.message as string}
      />

      <FormInput
        label="อีเมลคู่สมรส"
        type="email"
        placeholder="example@email.com"
        register={register('familyInfo.spouseEmail')}
        error={errors.familyInfo?.spouseEmail?.message as string}
      />

      <FormInput
        label="จำนวนผู้อาศัยอยู่"
        type="number"
        placeholder="0"
        register={register('familyInfo.dependents')}
        error={errors.familyInfo?.dependents?.message as string}
        min="0"
      />

      <FormInput
        label="จำนวนบุตร"
        type="number"
        placeholder="0"
        register={register('familyInfo.childrenCount')}
        error={errors.familyInfo?.childrenCount?.message as string}
        min="0"
      />

      <FormInput
        label="อายุของบุตร"
        placeholder="เช่น 5, 8, 12"
        register={register('familyInfo.childrenAges')}
        error={errors.familyInfo?.childrenAges?.message as string}
        helperText="แยกด้วยลูกน้อย"
      />

      <FormCheckbox
        label="มีการสนับสนุนครอบครัวอื่นหรือไม่?"
        register={register('familyInfo.supportingFamily')}
        error={errors.familyInfo?.supportingFamily?.message as string}
      />

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          หมายเหตุเพิ่มเติมเกี่ยวกับครอบครัว
        </label>
        <textarea
          placeholder="บันทึกข้อมูลเพิ่มเติม"
          {...register('familyInfo.familyNotes')}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
            errors.familyInfo?.familyNotes
              ? 'border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } focus:outline-none focus:ring-2 resize-none`}
          rows={4}
        />
      </div>
    </div>
  );
}
