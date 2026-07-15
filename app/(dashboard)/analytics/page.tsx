import Link from "next/link";
import { Send, MailOpen, MousePointerClick, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatCard } from "@/components/shared/stat-card";
import { CampaignStatusBadge } from "@/components/shared/campaign-status-badge";
import { PerformanceChart } from "@/components/shared/performance-chart";
import { AutoRefreshIndicator } from "@/components/shared/auto-refresh-indicator";
import { getOverallAnalytics } from "@/lib/mock-data";

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function AnalyticsPage() {
  const { totalSent, totalOpened, avgOpenRate, avgClickRate, performanceOverTime, topCampaigns } =
    getOverallAnalytics();

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Performance across all of your email campaigns
          </p>
        </div>
        <AutoRefreshIndicator />
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Emails Sent" value={formatNumber(totalSent)} icon={Send} />
        <StatCard label="Total Opened" value={formatNumber(totalOpened)} icon={MailOpen} />
        <StatCard label="Avg. Open Rate" value={`${avgOpenRate}%`} icon={TrendingUp} />
        <StatCard label="Avg. Click Rate" value={`${avgClickRate}%`} icon={MousePointerClick} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Performance over time */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Performance This Week</CardTitle>
            <CardDescription>Opens and clicks across all campaigns, by day</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceChart data={performanceOverTime} />
          </CardContent>
        </Card>

        {/* Top campaigns */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Top Campaigns</CardTitle>
            <CardDescription>Ranked by open rate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCampaigns.map((c, i) => (
              <Link
                key={c.id}
                href={`/campaigns/${c.id}/analytics`}
                className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-gray-50"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-600">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500">{formatNumber(c.recipients)} recipients</p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-gray-900">
                  {c.openRate}%
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Campaign performance table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Every sent campaign side by side</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Click Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCampaigns.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <Link
                      href={`/campaigns/${c.id}/analytics`}
                      className="font-medium text-gray-900 hover:text-primary-700 hover:underline"
                    >
                      {c.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <CampaignStatusBadge status={c.status} />
                  </TableCell>
                  <TableCell className="text-gray-600">{formatNumber(c.recipients)}</TableCell>
                  <TableCell className="font-medium text-gray-900">{c.openRate}%</TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {c.clickRate ?? "—"}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
