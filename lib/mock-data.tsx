import type { Campaign, Contact, Audience, ActivityItem } from "@/types";

export const currentUser = {
  name: "Ava Whitfield",
  email: "ava@pulsemail.io",
  role: "Marketing Lead",
  avatarInitials: "AW",
};

export const dashboardStats = {
  totalContacts: 12480,
  totalAudiences: 18,
  totalCampaigns: 64,
  emailsSent: 284120,
  contactsGrowth: "+8.2%",
  audiencesGrowth: "+2",
  campaignsGrowth: "+5 this month",
  emailsSentGrowth: "+12.4%",
};

export const campaigns: Campaign[] = [
  {
    id: "cmp_001",
    name: "Summer Sale — 30% Off",
    status: "Sent",
    recipients: 8420,
    sent: 8420,
    openRate: 42.3,
    clickRate: 12.1,
    scheduledDate: "2026-07-10T09:00:00Z",
  },
  {
    id: "cmp_002",
    name: "Product Launch: Pulse AI",
    status: "Sending",
    recipients: 15200,
    sent: 9840,
    openRate: 31.7,
    clickRate: 8.4,
    scheduledDate: "2026-07-15T14:00:00Z",
  },
  {
    id: "cmp_003",
    name: "July Newsletter",
    status: "Scheduled",
    recipients: 12100,
    sent: 0,
    openRate: 0,
    scheduledDate: "2026-07-18T08:00:00Z",
  },
  {
    id: "cmp_004",
    name: "Re-engagement Campaign",
    status: "Draft",
    recipients: 3200,
    sent: 0,
    openRate: 0,
    scheduledDate: "2026-07-22T10:00:00Z",
  },
  {
    id: "cmp_005",
    name: "Customer Feedback Survey",
    status: "Sent",
    recipients: 6040,
    sent: 6040,
    openRate: 55.6,
    clickRate: 22.9,
    scheduledDate: "2026-07-05T11:00:00Z",
  },
  {
    id: "cmp_006",
    name: "Webinar Reminder",
    status: "Paused",
    recipients: 4100,
    sent: 1200,
    openRate: 18.4,
    scheduledDate: "2026-07-12T16:00:00Z",
  },
];

export const contacts: Contact[] = [
  { id: "ct_001", name: "Liam Carter", email: "liam.carter@example.com", phone: "+1 415 555 0132", city: "San Francisco", status: "Subscribed", createdAt: "2026-05-01" },
  { id: "ct_002", name: "Sophia Martinez", email: "sophia.m@example.com", phone: "+1 212 555 0198", city: "New York", status: "Subscribed", createdAt: "2026-05-03" },
  { id: "ct_003", name: "Noah Bennett", email: "noah.bennett@example.com", phone: "+44 20 7946 0958", city: "London", status: "Unsubscribed", createdAt: "2026-05-06" },
  { id: "ct_004", name: "Emma Robinson", email: "emma.r@example.com", phone: "+1 312 555 0110", city: "Chicago", status: "Subscribed", createdAt: "2026-05-10" },
  { id: "ct_005", name: "Oliver Scott", email: "oliver.scott@example.com", phone: "+61 2 5550 1234", city: "Sydney", status: "Bounced", createdAt: "2026-05-12" },
  { id: "ct_006", name: "Ava Thompson", email: "ava.thompson@example.com", phone: "+1 646 555 0177", city: "Austin", status: "Subscribed", createdAt: "2026-05-15" },
  { id: "ct_007", name: "Ethan Wright", email: "ethan.wright@example.com", phone: "+91 98 1234 5678", city: "Mumbai", status: "Subscribed", createdAt: "2026-05-18" },
  { id: "ct_008", name: "Isabella Young", email: "isabella.y@example.com", phone: "+1 305 555 0166", city: "Miami", status: "Subscribed", createdAt: "2026-05-20" },
];

export const audiences: Audience[] = [
  { id: "aud_001", name: "Active Customers", description: "Purchased in the last 90 days", filters: ["Purchased: last 90 days", "Status: Subscribed"], contactCount: 4820, updatedAt: "2026-07-08" },
  { id: "aud_002", name: "Newsletter Subscribers", description: "Opted in to weekly newsletter", filters: ["Tag: newsletter", "Status: Subscribed"], contactCount: 9210, updatedAt: "2026-07-11" },
  { id: "aud_003", name: "High-Value Leads", description: "Engagement score above 80", filters: ["Score: > 80", "Country: US"], contactCount: 1340, updatedAt: "2026-07-01" },
  { id: "aud_004", name: "Cart Abandoners", description: "Added to cart but didn't purchase", filters: ["Event: cart_add", "Event: purchase = false"], contactCount: 2670, updatedAt: "2026-07-09" },
  { id: "aud_005", name: "Inactive 60 Days", description: "No opens or clicks in the last 60 days", filters: ["Last open: > 60 days", "Status: Subscribed"], contactCount: 3105, updatedAt: "2026-06-28" },
];

export const activityFeed: ActivityItem[] = [
  { id: "act_001", type: "campaign_sent", message: "Campaign \"Summer Sale — 30% Off\" was sent to 8,420 contacts", timestamp: "2026-07-15T09:02:00Z", actor: "Ava Whitfield" },
  { id: "act_002", type: "contact_imported", message: "312 new contacts imported via CSV", timestamp: "2026-07-15T07:45:00Z", actor: "Marcus Lee" },
  { id: "act_003", type: "audience_created", message: "New audience \"High-Value Leads\" created", timestamp: "2026-07-14T16:20:00Z", actor: "Ava Whitfield" },
  { id: "act_004", type: "campaign_opened", message: "Open rate for \"Customer Feedback Survey\" crossed 50%", timestamp: "2026-07-14T11:10:00Z" },
  { id: "act_005", type: "contact_added", message: "5 contacts manually added to \"Newsletter Subscribers\"", timestamp: "2026-07-13T13:35:00Z", actor: "Priya Patel" },
];

// ---- Campaign analytics (derived mock data) ----

export interface OpensDataPoint {
  hour: string;
  opens: number;
}

export interface CampaignAnalytics {
  sent: number;
  delivered: number;
  opened: number;
  bounced: number;
  deliveredRate: number;
  openRate: number;
  bounceRate: number;
  clickRate: number;
  opensTimeline: OpensDataPoint[];
}

export function getCampaignAnalytics(campaignId: string): CampaignAnalytics {
  const campaign = campaigns.find((c) => c.id === campaignId) ?? campaigns[0];
  const sent = campaign.sent > 0 ? campaign.sent : campaign.recipients;
  const bounced = Math.round(sent * 0.021);
  const delivered = sent - bounced;
  const opened = Math.round(delivered * (campaign.openRate / 100 || 0.28));

  // Deterministic pseudo-random hourly distribution so charts look organic
  // but stay stable across renders.
  const shape = [4, 9, 18, 30, 45, 62, 78, 92, 100, 88, 70, 54, 40, 28, 20, 14, 10, 7];
  const peak = Math.max(...shape);
  const opensTimeline: OpensDataPoint[] = shape.map((v, i) => ({
    hour: `${(9 + i) % 24}:00`,
    opens: Math.round((v / peak) * opened * 0.09),
  }));

  return {
    sent,
    delivered,
    opened,
    bounced,
    deliveredRate: Math.round((delivered / sent) * 1000) / 10,
    openRate: Math.round((opened / delivered) * 1000) / 10,
    bounceRate: Math.round((bounced / sent) * 1000) / 10,
    clickRate: campaign.clickRate ?? Math.round((campaign.openRate ?? 0) * 0.32 * 10) / 10,
    opensTimeline,
  };
}

export const campaignRecentActivity = [
  { id: "cra_001", message: "142 recipients opened the email in the last hour", timestamp: "2026-07-15T13:40:00Z" },
  { id: "cra_002", message: "8 recipients clicked the main CTA button", timestamp: "2026-07-15T13:12:00Z" },
  { id: "cra_003", message: "3 emails bounced (invalid address)", timestamp: "2026-07-15T12:55:00Z" },
  { id: "cra_004", message: "1 recipient unsubscribed after opening", timestamp: "2026-07-15T12:20:00Z" },
  { id: "cra_005", message: "Delivery to all recipients completed", timestamp: "2026-07-15T11:05:00Z" },
];
