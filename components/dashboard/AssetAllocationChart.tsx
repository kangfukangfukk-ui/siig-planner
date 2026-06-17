'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface AssetAllocationChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title?: string;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const total = payload.map((p: any) => p.value).reduce((a: number, b: number) => a + b, 0);
    const percentage = ((payload[0].value / total) * 100).toFixed(1);
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-semibold text-gray-800">{payload[0].name}</p>
        <p className="text-xs font-medium text-gray-700">
          ฿{(payload[0].value / 1000000).toFixed(2)}M ({percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export function AssetAllocationChart({
  data,
  title = 'Asset Allocation',
}: AssetAllocationChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Details */}
        <div className="w-full lg:w-1/2 space-y-3">
          <h4 className="font-semibold text-gray-800 mb-4">Asset Breakdown</h4>
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ฿{(item.value / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-xs text-gray-500">{percentage}%</p>
                </div>
              </div>
            );
          })}
          <div className="pt-4 border-t border-gray-200 mt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total Assets</span>
              <span className="font-bold text-lg text-blue-600">
                ฿{(total / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
