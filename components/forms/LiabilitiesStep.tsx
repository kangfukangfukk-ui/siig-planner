'use client';

import React from 'react';
import { FieldErrors, useFieldArray } from 'react-hook-form';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

interface LiabilitiesStepProps {
  errors: any;
  register: any;
  control: any;
}

const liabilityTypes = [
  { value: 'mortgage', label: 'สินเชื่อที่ดิน/บ้าน' },
  { value: 'personal_loan', label: 'สินเชื่อส่วนบุคคล' },
  { value: 'credit_card', label: 'บัตรเครดิต' },
  { value: 'car_loan', label: 'สินเชื่อรถยนต์' },
  { value: 'other', label: 'อื่นๆ' },
];

export function LiabilitiesStep({ errors, register, control }: LiabilitiesStepProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'liabilities.liabilities',
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">หนี้สิน</h2>

      <p className="text-sm text-gray-600 mb-4">
        กรุณาระบุหนี้สิ้นทั้งหมดที่คุณมี (ถ้าไม่มี ให้ข้ามขั้นตอนนี้)
      </p>

      {fields.length > 0 ? (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">หนี้สิน #{index + 1}</h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  ลบ
                </button>
              </div>

              <FormSelect
                label="ประเภทหนี้สิน"
                options={liabilityTypes}
                register={register(`liabilities.liabilities.${index}.type`)}
                error={errors.liabilities?.liabilities?.[index]?.type?.message as string}
                required
              />

              <FormInput
                label="ชื่อ/รายละเอียด"
                placeholder="เช่น สินเชื่อธนาคาร"
                register={register(`liabilities.liabilities.${index}.name`)}
                error={errors.liabilities?.liabilities?.[index]?.name?.message as string}
                required
              />

              <FormInput
                label="ยอดคงเหลือ (บาท)"
                type="number"
                placeholder="0"
                register={register(`liabilities.liabilities.${index}.balance`)}
                error={errors.liabilities?.liabilities?.[index]?.balance?.message as string}
                required
                min="0"
                step="0.01"
              />

              <FormInput
                label="อัตราดอกเบี้ย (%)"
                type="number"
                placeholder="0.00"
                register={register(`liabilities.liabilities.${index}.interestRate`)}
                error={errors.liabilities?.liabilities?.[index]?.interestRate?.message as string}
                min="0"
                step="0.01"
              />

              <FormInput
                label="ชำระเดือนละ (บาท)"
                type="number"
                placeholder="0"
                register={register(`liabilities.liabilities.${index}.monthlyPayment`)}
                error={errors.liabilities?.liabilities?.[index]?.monthlyPayment?.message as string}
                min="0"
                step="0.01"
              />

              <FormInput
                label="วันครบกำหนดชำระ"
                type="date"
                register={register(`liabilities.liabilities.${index}.maturityDate`)}
                error={errors.liabilities?.liabilities?.[index]?.maturityDate?.message as string}
              />

              <FormInput
                label="หมายเหตุ"
                placeholder="เช่น เริ่มต้นเมื่อ..."
                register={register(`liabilities.liabilities.${index}.description`)}
                error={errors.liabilities?.liabilities?.[index]?.description?.message as string}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-sm">ยังไม่มีหนี้สิน</p>
        </div>
      )}

      <button
        type="button"
        onClick={() =>
          append({
            type: '',
            name: '',
            balance: 0,
            interestRate: undefined,
            monthlyPayment: undefined,
            maturityDate: '',
            description: '',
          })
        }
        className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
      >
        + เพิ่มหนี้สิน
      </button>
    </div>
  );
}
