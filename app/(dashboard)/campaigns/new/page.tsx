"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Send } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { RecipientsSelector } from "@/components/shared/recipients-selector";
import { SchedulePicker } from "@/components/shared/schedule-picker";

export default function NewCampaignPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState(
    "<p>Hi there,</p><p>Start writing your email here…</p>"
  );
  const [scheduleMode, setScheduleMode] = useState<"now" | "later">("now");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState<"draft" | "send" | null>(null);

  function handleAction(kind: "draft" | "send") {
    setSubmitting(kind);
    // Mock save/send — no backend wired up.
    setTimeout(() => {
      setSubmitting(null);
      router.push("/campaigns");
    }, 700);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Link
          href="/campaigns"
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to campaigns
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Create Campaign
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Compose your email, choose recipients, and schedule delivery.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign details</CardTitle>
          <CardDescription>Name your campaign and write the email content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input
                id="campaign-name"
                placeholder="e.g. August Product Update"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="campaign-subject">Subject</Label>
              <Input
                id="campaign-subject"
                placeholder="e.g. Here's what's new this month 🎉"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Email Body</Label>
            <RichTextEditor value={body} onChange={setBody} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recipients</CardTitle>
          <CardDescription>
            Send to an existing audience, or paste a list of emails and phone numbers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecipientsSelector />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery</CardTitle>
          <CardDescription>Choose when this campaign should go out</CardDescription>
        </CardHeader>
        <CardContent>
          <SchedulePicker
            mode={scheduleMode}
            onModeChange={setScheduleMode}
            date={date}
            onDateChange={setDate}
            time={time}
            onTimeChange={setTime}
          />
        </CardContent>
      </Card>

      <Separator />

      <div className="flex flex-col-reverse gap-3 pb-4 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          onClick={() => handleAction("draft")}
          disabled={submitting !== null}
        >
          <Save className="h-4 w-4" />
          {submitting === "draft" ? "Saving…" : "Save Draft"}
        </Button>
        <Button onClick={() => handleAction("send")} disabled={submitting !== null}>
          <Send className="h-4 w-4" />
          {submitting === "send"
            ? "Sending…"
            : scheduleMode === "later"
            ? "Schedule Campaign"
            : "Send Campaign"}
        </Button>
      </div>
    </div>
  );
}
