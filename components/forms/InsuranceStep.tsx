'use client';

import React from 'react';
import { FieldErrors } from 'react-hook-form';
import { FormCheckbox } from './FormCheckbox';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

interface InsuranceStepProps {
  errors: any;
  register: any;
}

const healthInsuranceTypes = [
  { value: 'government', label: 'ประกันสุขภาพรัฐบาล' },
  { value: 'private', label: 'ประกันสุขภาพเอกชน' },
  { value: 'employer', label: 'ประกันสุขภาพจากบริษัท' },
  { value: 'multiple', label: 'หลายประเภท' },
];

export function InsuranceStep({ errors, register }: InsuranceStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ประกันภัย</h2>

      <div className="space-y-4 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800">ประกันภัยที่มีอยู่</h3>

        <FormCheckbox
          label="ประกันชีวิต"
          register={register('insurance.hasLifeInsurance')}
          error={errors.insurance?.hasLifeInsurance?.message as string}
        />

        {/* Life Insurance Coverage */}
        <FormInput
          label="ทุนประกันชีวิต (บาท)"
          type="number"
          placeholder="0"
          register={register('insurance.lifeInsuranceCoverage')}
          error={errors.insurance?.lifeInsuranceCoverage?.message as string}
          min="0"
          step="0.01"
        />

        <FormCheckbox
          label="ประกันสุขภาพ"
          register={register('insurance.hasHealthInsurance')}
          error={errors.insurance?.hasHealthInsurance?.message as string}
        />

        <FormSelect
          label="ประเภทประกันสุขภาพ"
          options={healthInsuranceTypes}
          register={register('insurance.healthInsuranceType')}
          error={errors.insurance?.healthInsuranceType?.message as string}
        />

        <FormCheckbox
          label="ประกันความพิการ"
          register={register('insurance.hasDisabilityInsurance')}
          error={errors.insurance?.hasDisabilityInsurance?.message as string}
        />

        <FormCheckbox
          label="ประกันทรัพย์สิน"
          register={register('insurance.hasPropertyInsurance')}
          error={errors.insurance?.hasPropertyInsurance?.message as string}
        />

        <FormCheckbox
          label="ประกันโรคร้ายแรง"
          register={register('insurance.hasCriticalIllness')}
          error={errors.insurance?.hasCriticalIllness?.message as string}
        />
      </div>

      <div className="space-y-4 bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800">ความต้องการประกันภัยเพิ่มเติม</h3>

        <FormInput
          label="ทุนประกันชีวิตที่ต้องการ (บาท)"
          type="number"
          placeholder="0"
          register={register('insurance.desiredLifeCoverage')}
          error={errors.insurance?.desiredLifeCoverage?.message as string}
          min="0"
          step="0.01"
        />

        <FormInput
          label="ทุนประกันสุขภาพที่ต้องการ (บาท)"
          type="number"
          placeholder="0"
          register={register('insurance.desiredHealthCoverage')}
          error={errors.insurance?.desiredHealthCoverage?.message as string}
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          หมายเหตุเกี่ยวกับประกันภัย
        </label>
        <textarea
          placeholder="บันทึกข้อมูลเพิ่มเติม"
          {...register('insurance.insuranceNotes')}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-colors ${
            errors.insurance?.insuranceNotes
              ? 'border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } focus:outline-none focus:ring-2 resize-none`}
          rows={4}
        />
      </div>
    </div>
  );
}
