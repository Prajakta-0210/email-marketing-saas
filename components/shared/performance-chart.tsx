"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import type { DailyPerformancePoint } from "@/lib/mock-data";

export function PerformanceChart({ data }: { data: DailyPerformancePoint[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#f3f4f6" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={{ stroke: "#f3f4f6" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
            width={36}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 16px -4px rgba(0,0,0,0.08)",
              fontSize: 12,
            }}
            labelStyle={{ color: "#111827", fontWeight: 500 }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: "#6b7280" }}
          />
          <Line
            type="monotone"
            dataKey="opens"
            name="Opens"
            stroke="#9333ea"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#9333ea" }}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            name="Clicks"
            stroke="#22c55e"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#22c55e" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
