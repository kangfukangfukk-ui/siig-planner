'use client';

import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { PersonalInfoData } from '@/lib/schemas/factFindSchema';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

interface PersonalInfoStepProps {
  control: Control<any>;
  errors: any;
  register: any;
}

const nationalities = [
  { value: 'TH', label: 'ไทย' },
  { value: 'US', label: 'อเมริกัน' },
  { value: 'UK', label: 'อังกฤษ' },
  { value: 'JP', label: 'ญี่ปุ่น' },
  { value: 'CN', label: 'จีน' },
  { value: 'OTHER', label: 'อื่นๆ' },
];

const maritalStatuses = [
  { value: 'single', label: 'โสด' },
  { value: 'married', label: 'แต่งงาน' },
  { value: 'divorced', label: 'หย่า' },
  { value: 'widowed', label: 'เป็นม่าย' },
];

export function PersonalInfoStep({ control, errors, register }: PersonalInfoStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ข้อมูลส่วนตัว</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="ชื่อ"
          placeholder="กรุณากรอกชื่อ"
          register={register('personalInfo.firstName')}
          error={errors.personalInfo?.firstName?.message as string}
          required
        />
        <FormInput
          label="นามสกุล"
          placeholder="กรุณากรอกนามสกุล"
          register={register('personalInfo.lastName')}
          error={errors.personalInfo?.lastName?.message as string}
          required
        />
      </div>

      <FormInput
        label="อีเมล"
        type="email"
        placeholder="example@email.com"
        register={register('personalInfo.email')}
        error={errors.personalInfo?.email?.message as string}
        required
      />

      <FormInput
        label="เบอร์โทรศัพท์"
        type="tel"
        placeholder="0812345678"
        register={register('personalInfo.phone')}
        error={errors.personalInfo?.phone?.message as string}
        helperText="กรอก 10 หลัก"
      />

      <FormInput
        label="วันเกิด"
        type="date"
        register={register('personalInfo.birthDate')}
        error={errors.personalInfo?.birthDate?.message as string}
        required
      />

      <FormSelect
        label="สัญชาติ"
        options={nationalities}
        register={register('personalInfo.nationality')}
        error={errors.personalInfo?.nationality?.message as string}
        required
      />

      <FormInput
        label="เลขบัตรประชาชน"
        placeholder="0000000000000"
        register={register('personalInfo.idNumber')}
        error={errors.personalInfo?.idNumber?.message as string}
        required
        helperText="13 หลัก"
      />

      <FormSelect
        label="สถานภาพการสมรส"
        options={maritalStatuses}
        register={register('personalInfo.maritalStatus')}
        error={errors.personalInfo?.maritalStatus?.message as string}
        required
      />
    </div>
  );
}
