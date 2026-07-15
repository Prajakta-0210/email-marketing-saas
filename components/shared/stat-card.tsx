import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
}

export function StatCard({ label, value, change, trend = "up", icon: Icon }: StatCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-elevated">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50">
            <Icon className="h-[18px] w-[18px] text-primary-600" />
          </div>
        </div>
        <p className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">
          {value}
        </p>
        {change && (
          <div className="mt-2 flex items-center gap-1">
            {trend === "up" ? (
              <ArrowUpRight className="h-3.5 w-3.5 text-green-600" />
            ) : trend === "down" ? (
              <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
            ) : null}
            <span
              className={cn(
                "text-xs font-medium",
                trend === "up" && "text-green-600",
                trend === "down" && "text-red-500",
                trend === "neutral" && "text-gray-500"
              )}
            >
              {change}
            </span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
