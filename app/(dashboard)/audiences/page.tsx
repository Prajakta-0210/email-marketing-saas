"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { AudienceCard } from "@/components/shared/audience-card";
import { CreateAudienceModal } from "@/components/shared/create-audience-modal";
import { api } from "@/lib/api";

export default function AudiencesPage() {
  const [audiences, setAudiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/audiences")
      .then(setAudiences)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Audiences</h1>
          <p className="mt-1 text-sm text-gray-500">{audiences.length} audiences segmenting your contacts</p>
        </div>
        <CreateAudienceModal onCreated={(a) => setAudiences((prev) => [a, ...prev])} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading audiences…
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {audiences.map((audience) => (
            <AudienceCard key={audience.id} audience={audience} />
          ))}
        </div>
      )}
    </div>
  );
}