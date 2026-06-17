'use client';

import React from 'react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  canProceed?: boolean;
  showSaveIndicator?: boolean;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  isSubmitting = false,
  onPrevious,
  onNext,
  onSubmit,
  canProceed = true,
  showSaveIndicator = false,
}: StepNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="mt-8 flex flex-col gap-3">
      {/* Save Indicator */}
      {showSaveIndicator && (
        <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>บันทึกอัตโนมัติ</span>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 sm:gap-4">
        {!isFirstStep && (
          <button
            onClick={onPrevious}
            disabled={isSubmitting}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            ← ย้อนกลับ
          </button>
        )}

        {isLastStep ? (
          <button
            onClick={onSubmit}
            disabled={isSubmitting || !canProceed}
            className="flex-1 px-4 sm:px-8 py-2 sm:py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>กำลังบันทึก...</span>
              </>
            ) : (
              <>
                <span>✓ บันทึกเสร็จสิ้น</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={isSubmitting || !canProceed}
            className="flex-1 px-4 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            ถัดไป →
          </button>
        )}
      </div>

      {/* Step Counter on Mobile */}
      <div className="md:hidden text-center text-xs text-gray-600">
        ขั้นตอนที่ {currentStep} จาก {totalSteps}
      </div>
    </div>
  );
}
