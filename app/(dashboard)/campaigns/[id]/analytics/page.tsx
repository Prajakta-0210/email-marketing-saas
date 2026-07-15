import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Send, MailCheck, MousePointerClick, AlertTriangle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CampaignStatusBadge } from "@/components/shared/campaign-status-badge";
import { OpensChart } from "@/components/shared/opens-chart";
import { AutoRefreshIndicator } from "@/components/shared/auto-refresh-indicator";
import {
  campaigns,
  getCampaignAnalytics,
  campaignRecentActivity,
} from "@/lib/mock-data";

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  return `${hours}h ago`;
}

export default function CampaignAnalyticsPage({
  params,
}: {
  params: { id: string };
}) {
  const campaign = campaigns.find((c) => c.id === params.id);
  if (!campaign) notFound();

  const analytics = getCampaignAnalytics(campaign.id);

  const metrics = [
    { label: "Sent", value: analytics.sent, icon: Send, tint: "bg-primary-50 text-primary-600" },
    { label: "Delivered", value: analytics.delivered, icon: MailCheck, tint: "bg-green-50 text-green-600" },
    { label: "Opened", value: analytics.opened, icon: MousePointerClick, tint: "bg-blue-50 text-blue-600" },
    { label: "Bounced", value: analytics.bounced, icon: AlertTriangle, tint: "bg-red-50 text-red-600" },
  ];

  const progressRows = [
    { label: "Delivered rate", value: analytics.deliveredRate },
    { label: "Open rate", value: analytics.openRate },
    { label: "Click rate", value: analytics.clickRate },
    { label: "Bounce rate", value: analytics.bounceRate },
  ];

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div>
        <Link
          href="/campaigns"
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to campaigns
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                {campaign.name}
              </h1>
              <CampaignStatusBadge status={campaign.status} />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Campaign performance and delivery analytics
            </p>
          </div>
          <AutoRefreshIndicator />
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-gray-500">{m.label}</p>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${m.tint}`}>
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">
                  {formatNumber(m.value)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Opens over time */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Opens Over Time</CardTitle>
            <CardDescription>Hourly open activity since the campaign went out</CardDescription>
          </CardHeader>
          <CardContent>
            <OpensChart data={analytics.opensTimeline} />
          </CardContent>
        </Card>

        {/* Right column */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Performance</CardTitle>
              <CardDescription>Key rates for this campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {progressRows.map((row) => (
                <div key={row.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-gray-600">{row.label}</span>
                    <span className="font-medium text-gray-900">{row.value}%</span>
                  </div>
                  <Progress value={row.value} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Live updates for this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {campaignRecentActivity.map((item, idx) => (
                  <li key={item.id} className="relative flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-400" />
                      {idx !== campaignRecentActivity.length - 1 && (
                        <span className="mt-1 w-px flex-1 bg-gray-100" />
                      )}
                    </div>
                    <div className="pb-4 last:pb-0">
                      <p className="text-sm text-gray-700">{item.message}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{timeAgo(item.timestamp)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
