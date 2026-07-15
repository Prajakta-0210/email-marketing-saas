"use client";

import { Layers, MoreHorizontal, Pencil, Trash2, Users } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Audience } from "@/types";

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function AudienceCard({ audience }: { audience: Audience }) {
  return (
    <Card className="flex flex-col transition-shadow hover:shadow-elevated">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
            <Layers className="h-[18px] w-[18px] text-primary-600" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-gray-900">{audience.name}</p>
            <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">
              {audience.description}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="shrink-0 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Audience actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600 [&_svg]:text-red-500">
              <Trash2 /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between pt-0">
        <div className="flex flex-wrap gap-1.5">
          {audience.filters.map((filter) => (
            <Badge key={filter} variant="gray" className="font-normal">
              {filter}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3.5">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-900">
              {formatNumber(audience.contactCount)}
            </span>
            contacts
          </div>
          <span className="text-xs text-gray-400">
            Updated {formatDate(audience.updatedAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
