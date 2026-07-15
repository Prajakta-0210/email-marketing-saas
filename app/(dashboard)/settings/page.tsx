"use client";

import { useState } from "react";
import { Camera, LogOut, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { currentUser } from "@/lib/mock-data";

const notificationPrefs = [
  {
    id: "campaign-sent",
    label: "Campaign sent",
    description: "Get notified when a campaign finishes sending",
    defaultChecked: true,
  },
  {
    id: "weekly-summary",
    label: "Weekly summary",
    description: "A digest of opens, clicks, and new contacts every Monday",
    defaultChecked: true,
  },
  {
    id: "bounce-alerts",
    label: "Bounce alerts",
    description: "Get notified when bounce rate crosses 5% on a campaign",
    defaultChecked: false,
  },
  {
    id: "product-updates",
    label: "Product updates",
    description: "Occasional news about new Pulse features",
    defaultChecked: false,
  },
];

export default function SettingsPage() {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [saving, setSaving] = useState(false);

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 700);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account, notifications, and security preferences.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <form onSubmit={handleSaveProfile}>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 text-base">
                  <AvatarFallback>{currentUser.avatarInitials}</AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-white hover:bg-gray-700"
                  aria-label="Change avatar"
                >
                  <Camera className="h-3 w-3" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="settings-name">Full name</Label>
                <Input
                  id="settings-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="settings-email">Email address</Label>
                <Input
                  id="settings-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t border-gray-100 pt-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what you want to be notified about</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {notificationPrefs.map((pref, idx) => (
            <div key={pref.id}>
              <div className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">{pref.label}</p>
                  <p className="text-xs text-gray-500">{pref.description}</p>
                </div>
                <Switch defaultChecked={pref.defaultChecked} />
              </div>
              {idx !== notificationPrefs.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Update your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input id="current-password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end border-t border-gray-100 pt-4">
          <Button variant="outline">Update password</Button>
        </CardFooter>
      </Card>

      {/* Danger zone */}
      <Card className="border-red-100">
        <CardHeader>
          <CardTitle className="text-red-600">Danger zone</CardTitle>
          <CardDescription>Irreversible actions for your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start justify-between gap-3 rounded-lg border border-red-100 bg-red-50/50 p-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-gray-900">Delete account</p>
              <p className="text-xs text-gray-500">
                Permanently remove your account and all associated data.
              </p>
            </div>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-3.5 w-3.5" />
              Delete account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Log out (mirrors sidebar / topbar logout) */}
      <div className="flex justify-end pb-4">
        <Button variant="ghost" asChild className="text-gray-500 hover:text-gray-900">
          <a href="/login">
            <LogOut className="h-4 w-4" />
            Log out
          </a>
        </Button>
      </div>
    </div>
  );
}
