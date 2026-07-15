"use client";

import { Calendar, Clock, Zap } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SchedulePickerProps {
  mode: "now" | "later";
  onModeChange: (mode: "now" | "later") => void;
  date: string;
  onDateChange: (date: string) => void;
  time: string;
  onTimeChange: (time: string) => void;
}

export function SchedulePicker({
  mode,
  onModeChange,
  date,
  onDateChange,
  time,
  onTimeChange,
}: SchedulePickerProps) {
  return (
    <div className="space-y-3">
      <Label>Scheduling</Label>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onModeChange("now")}
          className={cn(
            "flex items-start gap-3 rounded-xl border p-3.5 text-left transition-colors",
            mode === "now"
              ? "border-primary-300 bg-primary-50/60 ring-1 ring-primary-200"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              mode === "now" ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-500"
            )}
          >
            <Zap className="h-[18px] w-[18px]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Send Now</p>
            <p className="text-xs text-gray-500">Deliver as soon as you hit send</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onModeChange("later")}
          className={cn(
            "flex items-start gap-3 rounded-xl border p-3.5 text-left transition-colors",
            mode === "later"
              ? "border-primary-300 bg-primary-50/60 ring-1 ring-primary-200"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              mode === "later" ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-500"
            )}
          >
            <Calendar className="h-[18px] w-[18px]" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Schedule for Later</p>
            <p className="text-xs text-gray-500">Pick a specific date and time</p>
          </div>
        </button>
      </div>

      {mode === "later" && (
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3.5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="schedule-date" className="text-xs text-gray-500">
              Date
            </Label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="schedule-date"
                type="date"
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
                className="bg-white pl-9"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="schedule-time" className="text-xs text-gray-500">
              Time
            </Label>
            <div className="relative">
              <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="schedule-time"
                type="time"
                value={time}
                onChange={(e) => onTimeChange(e.target.value)}
                className="bg-white pl-9"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
