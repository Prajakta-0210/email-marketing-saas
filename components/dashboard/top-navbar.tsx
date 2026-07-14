"use client";

export default function TopNavbar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-6">
      {/* Left Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Welcome back, Prajakta 👋
        </p>
      </div>

      {/* Right Section */}
      <button className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-purple-700">
        + New Campaign
      </button>
    </header>
  );
}