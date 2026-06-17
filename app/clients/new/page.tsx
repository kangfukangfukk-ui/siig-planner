'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Resolver, Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { factFindFormSchema, FactFindFormData } from '@/lib/schemas/factFindSchema';

import { StepIndicator } from '@/components/forms/StepIndicator';
import { StepNavigation } from '@/components/forms/StepNavigation';
import { PersonalInfoStep } from '@/components/forms/PersonalInfoStep';
import { FamilyInfoStep } from '@/components/forms/FamilyInfoStep';
import { CareerStep } from '@/components/forms/CareerStep';
import { IncomeStep } from '@/components/forms/IncomeStep';
import { ExpensesStep } from '@/components/forms/ExpensesStep';
import { AssetsStep } from '@/components/forms/AssetsStep';
import { LiabilitiesStep } from '@/components/forms/LiabilitiesStep';
import { InsuranceStep } from '@/components/forms/InsuranceStep';
import { InvestmentsStep } from '@/components/forms/InvestmentsStep';
import { GoalsStep } from '@/components/forms/GoalsStep';

const STEPS = [
  'ข้อมูลส่วนตัว',
  'ข้อมูลครอบครัว',
  'อาชีพและงาน',
  'รายได้',
  'รายจ่าย',
  'สินทรัพย์',
  'หนี้สิน',
  'ประกันภัย',
  'การลงทุน',
  'เป้าหมายการเงิน',
];

const STORAGE_KEY = 'factFind_draft';
const SAVE_INTERVAL = 5000; // Auto-save every 5 seconds

export default function ClientsNewPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);

  const {
    control,
    register,
    formState: { errors, isDirty },
    watch,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(factFindFormSchema) as any,
    mode: 'onBlur',
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
        nationality: '',
        idNumber: '',
        maritalStatus: 'single',
      },
      familyInfo: {
        spouseName: '',
        spouseEmail: '',
        dependents: 0,
        childrenCount: 0,
        childrenAges: '',
        supportingFamily: false,
        familyNotes: '',
      },
      career: {
        occupationType: 'employee',
        industry: '',
        jobTitle: '',
        yearsInJob: 0,
        employerName: '',
        workPhone: '',
        yearsToRetirement: 0,
        expectedRetirementAge: 60,
      },
      income: {
        monthlySalary: 0,
        bonusAnnual: 0,
        otherIncomeMonthly: 0,
        otherIncomeDescription: '',
        spouseMonthlyIncome: 0,
        investmentIncome: 0,
        rentalIncome: 0,
        incomeFrequency: 'monthly',
        incomeStability: 'stable',
      },
      expenses: {
        housingExpense: 0,
        utilities: 0,
        groceries: 0,
        transportation: 0,
        childcare: 0,
        education: 0,
        healthcare: 0,
        insurance: 0,
        entertainment: 0,
        otherExpenses: 0,
        expensePeriod: 'monthly',
      },
      assets: {
        assets: [
          {
            type: 'savings',
            name: '',
            value: 0,
            description: '',
          },
        ],
      },
      liabilities: {
        liabilities: [],
      },
      insurance: {
        hasLifeInsurance: false,
        lifeInsuranceCoverage: 0,
        hasHealthInsurance: false,
        healthInsuranceType: '',
        hasDisabilityInsurance: false,
        hasPropertyInsurance: false,
        hasCriticalIllness: false,
        insuranceNotes: '',
        desiredLifeCoverage: 0,
        desiredHealthCoverage: 0,
      },
      investments: {
        hasInvestments: false,
        investmentTypes: [],
        riskTolerance: 'moderate',
        investmentKnowledge: 'beginner',
        investmentTimeHorizon: 'long_term',
        investmentGoals: '',
        currentPortfolioValue: 0,
      },
      goals: {
        goals: [
          {
            goalType: 'retirement',
            description: '',
            targetAmount: 0,
            targetDate: '',
            priority: 'high',
          },
        ],
      },
    },
  });

  const formData = watch();

  // Load draft from localStorage
  useEffect(() => {
    setIsMounted(true);
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        reset(parsed.data);
        setCurrentStep(parsed.step || 1);
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, [reset]);

  // Auto-save draft
  useEffect(() => {
    if (!isMounted) return;

    const timer = setTimeout(() => {
      if (isDirty) {
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              data: formData,
              step: currentStep,
              savedAt: new Date().toISOString(),
            })
          );
          setLastSaved(new Date());
          setShowSaveIndicator(true);
          
          // Hide save indicator after 2 seconds
          const hideTimer = setTimeout(() => {
            setShowSaveIndicator(false);
          }, 2000);
          
          return () => clearTimeout(hideTimer);
        } catch (error) {
          console.error('Failed to save draft:', error);
        }
      }
    }, SAVE_INTERVAL);

    return () => clearTimeout(timer);
  }, [formData, isDirty, isMounted, currentStep]);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitForm = async (data: any) => {
    setIsSubmitting(true);
    try {
      // TODO: Send data to API
      console.log('Form submitted:', data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Clear localStorage after successful submission
      localStorage.removeItem(STORAGE_KEY);
      
      // Show success message
      alert('บันทึกข้อมูลเสร็จสิ้น');
      
      // Redirect or reset form
      window.location.href = '/clients';
    } catch (error) {
      console.error('Failed to submit form:', error);
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            แบบฟอร์มวางแผนการเงิน
          </h1>
          <p className="text-gray-600">
            กรุณากรอกข้อมูลเพื่อสร้างแผนการเงินส่วนบุคคล
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />

        {/* Form */}
        <form onSubmit={handleSubmit(handleSubmitForm)} className="mb-8">
          <div className="mb-8">
            {currentStep === 1 && (
              <PersonalInfoStep
                control={control as Control<any>}
                errors={errors as FieldErrors<any>}
                register={register}
              />
            )}
            {currentStep === 2 && <FamilyInfoStep errors={errors as FieldErrors<any>} register={register} />}
            {currentStep === 3 && <CareerStep errors={errors as FieldErrors<any>} register={register} />}
            {currentStep === 4 && <IncomeStep errors={errors as FieldErrors<any>} register={register} />}
            {currentStep === 5 && <ExpensesStep errors={errors as FieldErrors<any>} register={register} />}
            {currentStep === 6 && (
              <AssetsStep
                control={control as Control<any>}
                errors={errors as FieldErrors<any>}
                register={register}
              />
            )}
            {currentStep === 7 && (
              <LiabilitiesStep
                control={control as Control<any>}
                errors={errors as FieldErrors<any>}
                register={register}
              />
            )}
            {currentStep === 8 && <InsuranceStep errors={errors as FieldErrors<any>} register={register} />}
            {currentStep === 9 && <InvestmentsStep errors={errors as FieldErrors<any>} register={register} />}
            {currentStep === 10 && (
              <GoalsStep
                control={control as Control<any>}
                errors={errors as FieldErrors<any>}
                register={register}
              />
            )}
          </div>

          {/* Navigation */}
          <StepNavigation
            currentStep={currentStep}
            totalSteps={STEPS.length}
            isSubmitting={isSubmitting}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit(handleSubmitForm)}
            canProceed={true}
            showSaveIndicator={showSaveIndicator}
          />
        </form>

        {/* Footer Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            {lastSaved && (
              <>
                บันทึกล่าสุด: {lastSaved.toLocaleTimeString('th-TH')}
                <br />
              </>
            )}
            ข้อมูลของคุณจะถูกบันทึกอัตโนมัติในขณะที่คุณกรอกแบบฟอร์ม
          </p>
        </div>
      </div>
    </div>
  );
}
