import { Badge } from "@/components/ui/badge";
import type { CampaignStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<CampaignStatus, string> = {
  Sent: "bg-green-100 text-green-700",
  Sending: "bg-primary-100 text-primary-700",
  Scheduled: "bg-blue-100 text-blue-700",
  Draft: "bg-gray-100 text-gray-600",
  Paused: "bg-amber-100 text-amber-700",
};

const statusDot: Record<CampaignStatus, string> = {
  Sent: "bg-green-500",
  Sending: "bg-primary-500 animate-pulse",
  Scheduled: "bg-blue-500",
  Draft: "bg-gray-400",
  Paused: "bg-amber-500",
};

export function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  return (
    <Badge className={cn("border-transparent", statusStyles[status])}>
      <span className={cn("h-1.5 w-1.5 rounded-full", statusDot[status])} />
      {status}
    </Badge>
  );
}
