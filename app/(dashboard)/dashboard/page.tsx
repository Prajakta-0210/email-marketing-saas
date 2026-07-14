import Sidebar from "@/components/dashboard/sidebar";
import TopNavbar from "@/components/dashboard/top-navbar";
import StatCard from "@/components/dashboard/stat-card";
import CampaignTable from "@/components/dashboard/campaign-table";

import {
  Users,
  UserRoundCheck,
  Mail,
  Send,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <TopNavbar />

        <main className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Contacts"
              value="1,240"
              change="+12 this week"
              icon={Users}
            />

            <StatCard
              title="Total Audiences"
              value="18"
              change="+2 this week"
              icon={UserRoundCheck}
            />

            <StatCard
              title="Campaigns"
              value="32"
              change="+4 this week"
              icon={Mail}
            />

            <StatCard
              title="Emails Sent"
              value="18,540"
              change="+210 this week"
              icon={Send}
            />
          </div>

          {/* Recent Campaigns */}
          <div className="mt-8">
            <CampaignTable />
          </div>
        </main>
      </div>
    </div>
  );
}