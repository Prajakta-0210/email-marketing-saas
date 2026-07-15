"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import type { OpensDataPoint } from "@/lib/mock-data";

export function OpensChart({ data }: { data: OpensDataPoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="opensGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9333ea" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#9333ea" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f3f4f6" />
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={{ stroke: "#f3f4f6" }}
            interval={2}
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
          <Line
            type="monotone"
            dataKey="opens"
            stroke="#9333ea"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#9333ea" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
