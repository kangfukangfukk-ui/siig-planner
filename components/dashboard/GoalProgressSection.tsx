'use client';

import React from 'react';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

interface GoalProgressSectionProps {
  goals: Goal[];
  title?: string;
}

const priorityConfig = {
  high: { color: '#ef4444', label: 'สูง' },
  medium: { color: '#f59e0b', label: 'ปานกลาง' },
  low: { color: '#3b82f6', label: 'ต่ำ' },
};

export function GoalProgressSection({
  goals,
  title = 'Financial Goals',
}: GoalProgressSectionProps) {
  const calculateDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedGoals = [...goals].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>

      <div className="space-y-6">
        {sortedGoals.length > 0 ? (
          sortedGoals.map((goal) => {
            const progressPercent = Math.min(
              (goal.currentAmount / goal.targetAmount) * 100,
              100
            );
            const daysRemaining = calculateDaysRemaining(goal.targetDate);
            const yearsRemaining = (daysRemaining / 365).toFixed(1);

            return (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl">{goal.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{goal.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Target: {goal.targetDate} ({yearsRemaining} years)
                      </p>
                    </div>
                  </div>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{
                      backgroundColor: priorityConfig[goal.priority].color,
                    }}
                  >
                    {priorityConfig[goal.priority].label}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {progressPercent.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Amount Info */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-50 rounded p-2">
                    <p className="text-xs text-gray-600">Current</p>
                    <p className="text-sm font-semibold text-gray-800">
                      ฿{(goal.currentAmount / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-600">Target</p>
                    <p className="text-sm font-semibold text-gray-800">
                      ฿{(goal.targetAmount / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="bg-green-50 rounded p-2">
                    <p className="text-xs text-gray-600">Remaining</p>
                    <p className="text-sm font-semibold text-gray-800">
                      ฿{((goal.targetAmount - goal.currentAmount) / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No financial goals yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
