import { TrendingUp } from "lucide-react";

interface StateCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

export function StatCard({ label, value, icon, trend, color }: StateCardProps) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-sm ${color} flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-shadow`}
    >
      <div className="flex justify-between items-start z-10">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {label}
          </p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-400 mt-2 z-10">
        <TrendingUp className="w-3 h-3" />
        <span>{trend}</span>
      </div>
    </div>
  );
}
