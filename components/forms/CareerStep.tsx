'use client';

import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

interface CareerStepProps {
  errors: any;
  register: any;
}

const occupationTypes = [
  { value: 'employee', label: 'พนักงาน' },
  { value: 'self_employed', label: 'อิสระ/ธุรกิจส่วนตัว' },
  { value: 'business_owner', label: 'เจ้าของธุรกิจ' },
  { value: 'retired', label: 'เกษียณอายุแล้ว' },
  { value: 'student', label: 'นักเรียน/นักศึกษา' },
  { value: 'other', label: 'อื่นๆ' },
];

export function CareerStep({ errors, register }: CareerStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">อาชีพและงาน</h2>

      <FormSelect
        label="ประเภทการจ้างงาน"
        options={occupationTypes}
        register={register('career.occupationType')}
        error={(errors as any).career?.occupationType?.message as string}
        required
      />

      <FormInput
        label="ประเภทอุตสาหกรรม"
        placeholder="เช่น เทคโนโลยี, การเงิน, สุขภาพ"
        register={register('career.industry')}
        error={(errors as any).career?.industry?.message as string}
        required
      />

      <FormInput
        label="ตำแหน่งงาน"
        placeholder="เช่น วิศวกร, บัญชี, ผู้จัดการ"
        register={register('career.jobTitle')}
        error={(errors as any).career?.jobTitle?.message as string}
        required
      />

      <FormInput
        label="ปีที่ทำงานในตำแหน่งนี้"
        type="number"
        placeholder="0"
        register={register('career.yearsInJob')}
        error={(errors as any).career?.yearsInJob?.message as string}
        min="0"
        required
      />

      <FormInput
        label="ชื่อบริษัท/หน่วยงาน"
        placeholder="กรุณากรอกชื่อ"
        register={register('career.employerName')}
        error={(errors as any).career?.employerName?.message as string}
      />

      <FormInput
        label="เบอร์โทรศัพท์ที่ทำงาน"
        type="tel"
        placeholder="0812345678"
        register={register('career.workPhone')}
        error={(errors as any).career?.workPhone?.message as string}
        helperText="10 หลัก"
      />

      <FormInput
        label="ปีที่เหลือจนถึงเกษียณ"
        type="number"
        placeholder="0"
        register={register('career.yearsToRetirement')}
        error={(errors as any).career?.yearsToRetirement?.message as string}
        min="0"
      />

      <FormInput
        label="อายุที่คาดว่าจะเกษียณ"
        type="number"
        placeholder="60"
        register={register('career.expectedRetirementAge')}
        error={(errors as any).career?.expectedRetirementAge?.message as string}
        min="0"
      />
    </div>
  );
}
