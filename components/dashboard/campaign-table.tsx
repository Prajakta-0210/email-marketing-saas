const campaigns = [
  {
    name: "July Sale",
    status: "Sent",
    recipients: 250,
    sent: 250,
    opened: "119 (47%)",
  },
  {
    name: "Welcome Email",
    status: "Sent",
    recipients: 150,
    sent: 150,
    opened: "75 (50%)",
  },
  {
    name: "Diwali Offer",
    status: "Scheduled",
    recipients: 200,
    sent: "-",
    opened: "-",
  },
  {
    name: "Subscription Update",
    status: "Draft",
    recipients: 120,
    sent: "-",
    opened: "-",
  },
];

export default function CampaignTable() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Campaigns
        </h2>

        <button className="text-sm font-medium text-purple-600 hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-4">Campaign</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Recipients</th>
              <th className="pb-4">Sent</th>
              <th className="pb-4">Opened</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((campaign) => (
              <tr
                key={campaign.name}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <td className="py-4 font-medium">
                  {campaign.name}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      campaign.status === "Sent"
                        ? "bg-green-100 text-green-700"
                        : campaign.status === "Scheduled"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </td>

                <td>{campaign.recipients}</td>

                <td>{campaign.sent}</td>

                <td>{campaign.opened}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}