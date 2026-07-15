"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, Users } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { audiences, contacts } from "@/lib/mock-data";

function parseEntries(raw: string): string[] {
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function RecipientsSelector() {
  const [audienceId, setAudienceId] = useState<string>("");
  const [pasted, setPasted] = useState("");

  const entries = useMemo(() => parseEntries(pasted), [pasted]);

  const { matched, notFound } = useMemo(() => {
    const lookup = new Set(
      contacts.flatMap((c) => [c.email.toLowerCase(), c.phone.replace(/\s+/g, "")])
    );
    const matchedList: string[] = [];
    const notFoundList: string[] = [];
    for (const entry of entries) {
      const normalized = entry.toLowerCase();
      const phoneNormalized = entry.replace(/\s+/g, "");
      if (lookup.has(normalized) || lookup.has(phoneNormalized)) {
        matchedList.push(entry);
      } else {
        notFoundList.push(entry);
      }
    }
    return { matched: matchedList, notFound: notFoundList };
  }, [entries]);

  const selectedAudience = audiences.find((a) => a.id === audienceId);

  return (
    <div className="space-y-3">
      <Label>Recipients</Label>
      <Tabs defaultValue="audience">
        <TabsList>
          <TabsTrigger value="audience">Select Audience</TabsTrigger>
          <TabsTrigger value="paste">Paste Emails / Phone Numbers</TabsTrigger>
        </TabsList>

        <TabsContent value="audience">
          <Select value={audienceId} onValueChange={setAudienceId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an audience…" />
            </SelectTrigger>
            <SelectContent>
              {audiences.map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.name} · {a.contactCount.toLocaleString()} contacts
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedAudience && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary-50 px-3.5 py-2.5 text-sm text-primary-700">
              <Users className="h-4 w-4 shrink-0" />
              This campaign will be sent to{" "}
              <span className="font-medium">
                {selectedAudience.contactCount.toLocaleString()} contacts
              </span>{" "}
              in &quot;{selectedAudience.name}&quot;.
            </div>
          )}
        </TabsContent>

        <TabsContent value="paste">
          <Textarea
            value={pasted}
            onChange={(e) => setPasted(e.target.value)}
            placeholder={"jane@company.com\n+1 415 555 0132\nmark@company.com, +44 20 7946 0958"}
            className="min-h-[110px] font-mono text-xs"
          />

          {entries.length > 0 && (
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-100 p-3">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-green-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Matched Contacts
                  <Badge variant="success" className="ml-auto">
                    {matched.length}
                  </Badge>
                </div>
                {matched.length === 0 ? (
                  <p className="text-xs text-gray-400">No matches yet.</p>
                ) : (
                  <ul className="max-h-32 space-y-1 overflow-y-auto scrollbar-thin text-xs text-gray-600">
                    {matched.map((m) => (
                      <li key={m} className="truncate">{m}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-lg border border-gray-100 p-3">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                  <XCircle className="h-3.5 w-3.5" />
                  Not Found Contacts
                  <Badge variant="destructive" className="ml-auto">
                    {notFound.length}
                  </Badge>
                </div>
                {notFound.length === 0 ? (
                  <p className="text-xs text-gray-400">No unmatched entries.</p>
                ) : (
                  <ul className="max-h-32 space-y-1 overflow-y-auto scrollbar-thin text-xs text-gray-600">
                    {notFound.map((m) => (
                      <li key={m} className="truncate">{m}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
