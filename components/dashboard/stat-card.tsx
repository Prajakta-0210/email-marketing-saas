import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>

          <p className="mt-2 text-sm text-green-600 font-medium">
            {change}
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
          <Icon className="h-7 w-7 text-purple-600" />
        </div>
      </div>
    </div>
  );
}