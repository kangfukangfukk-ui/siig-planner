import React from "react";

export interface KpiCardProps {
  title: string;
  value: number;
  unit: string;
  status: "ok" | "warning" | "danger";
  message: string;
  icon?: React.ReactNode;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  unit,
  status,
  message,
  icon,
}) => {
  const statusColors = {
    ok: "border-l-4 border-l-green-500 bg-green-50",
    warning: "border-l-4 border-l-yellow-500 bg-yellow-50",
    danger: "border-l-4 border-l-red-500 bg-red-50",
  };

  const textColors = {
    ok: "text-green-700",
    warning: "text-yellow-700",
    danger: "text-red-700",
  };

  const badgeColors = {
    ok: "bg-green-200 text-green-800",
    warning: "bg-yellow-200 text-yellow-800",
    danger: "bg-red-200 text-red-800",
  };

  const statusLabels = {
    ok: "Healthy",
    warning: "Caution",
    danger: "Critical",
  };

  const formattedValue = new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return (
    <div className={`rounded-lg border p-4 shadow-sm transition-all ${statusColors[status]}`}>
      {/* Header: Title and Status Badge */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          {icon && <div className="text-xl">{icon}</div>}
          <h3 className="text-sm font-semibold text-gray-700 md:text-base">{title}</h3>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs font-medium ${badgeColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>

      {/* Value Display */}
      <div className="mb-3">
        <div className={`text-2xl font-bold ${textColors[status]} md:text-3xl`}>
          {formattedValue}
          <span className="ml-1 text-lg text-gray-500">{unit}</span>
        </div>
      </div>

      {/* Message */}
      <p className="text-xs text-gray-600 md:text-sm">{message}</p>
    </div>
  );
};
