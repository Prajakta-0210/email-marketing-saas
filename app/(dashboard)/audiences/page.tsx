import { AudienceCard } from "@/components/shared/audience-card";
import { CreateAudienceModal } from "@/components/shared/create-audience-modal";
import { audiences } from "@/lib/mock-data";

export default function AudiencesPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Audiences
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {audiences.length} audiences segmenting your contacts
          </p>
        </div>
        <CreateAudienceModal />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {audiences.map((audience) => (
          <AudienceCard key={audience.id} audience={audience} />
        ))}
      </div>
    </div>
  );
}
