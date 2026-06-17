'use client';

import React, { useState } from 'react';
import { FieldErrors, useFieldArray, UseFormRegister } from 'react-hook-form';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

interface AssetsStepProps {
  errors: any;
  register: any;
  control: any;
}

const assetTypes = [
  { value: 'cash', label: 'เงินสด' },
  { value: 'savings', label: 'บัญชีออมทรัพย์' },
  { value: 'investment', label: 'หลักทรัพย์/กองทุน' },
  { value: 'property', label: 'ที่ดิน/อสังหาริมทรัพย์' },
  { value: 'vehicle', label: 'ยานพาหนะ' },
  { value: 'other', label: 'อื่นๆ' },
];

export function AssetsStep({ errors, register, control }: AssetsStepProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'assets.assets',
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">สินทรัพย์</h2>

      <p className="text-sm text-gray-600 mb-4">
        กรุณาระบุสินทรัพย์ทั้งหมดที่คุณมี
      </p>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-800">สินทรัพย์ที่ {index + 1}</h3>
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
              label="ประเภทสินทรัพย์"
              options={assetTypes}
              register={register(`assets.assets.${index}.type`)}
              error={(errors as any)?.assets?.assets?.[index]?.type?.message as string}
              required
            />

            <FormInput
              label="ชื่อ/รายละเอียด"
              placeholder="เช่น บ้านตัวเอง, รถยนต์"
              register={register(`assets.assets.${index}.name`)}
              error={(errors as any)?.assets?.assets?.[index]?.name?.message as string}
              required
            />

            <FormInput
              label="มูลค่า (บาท)"
              type="number"
              placeholder="0"
              register={register(`assets.assets.${index}.value`)}
              error={(errors as any)?.assets?.assets?.[index]?.value?.message as string}
              required
              min="0"
              step="0.01"
            />

            <FormInput
              label="หมายเหตุ"
              placeholder="เช่น วันซื้อ, สภาพ"
              register={register(`assets.assets.${index}.description`)}
              error={(errors as any)?.assets?.assets?.[index]?.description?.message as string}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          append({
            type: '',
            name: '',
            value: 0,
            description: '',
          })
        }
        className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors"
      >
        + เพิ่มสินทรัพย์
      </button>

      {(errors as any)?.assets?.assets?.message && (
        <p className="text-red-500 text-sm">{(errors as any)?.assets?.assets?.message as string}</p>
      )}
    </div>
  );
}
