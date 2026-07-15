export type CampaignStatus = "Draft" | "Scheduled" | "Sending" | "Sent" | "Paused";

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  recipients: number;
  sent: number;
  openRate: number; // percentage
  clickRate?: number;
  scheduledDate: string; // ISO date
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: "Subscribed" | "Unsubscribed" | "Bounced";
  createdAt: string;
  customFields?: Record<string, string>;
}

export interface Audience {
  id: string;
  name: string;
  description: string;
  filters: string[];
  contactCount: number;
  updatedAt: string;
}

export interface ActivityItem {
  id: string;
  type: "campaign_sent" | "contact_added" | "audience_created" | "campaign_opened" | "contact_imported";
  message: string;
  timestamp: string;
  actor?: string;
}
