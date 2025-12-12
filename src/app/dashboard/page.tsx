import Link from "next/link";
import React, { JSX } from "react";

function SummaryCard({
  title,
  value,
  href,
}: {
  title: string;
  value: string | number;
  href?: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {href && (
        <div className="mt-3">
          <Link href={href} className="text-sm text-indigo-600 hover:underline">
            View
          </Link>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage(): JSX.Element {
  // Mock summary numbers
  const bookings = 14;
  const upcomingTours = 3;
  const earnings = "$1,240";

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Overview of your account and recent activity.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard
          title="Bookings (last 30d)"
          value={bookings}
          href="/dashboard/listings"
        />
        <SummaryCard
          title="Upcoming tours"
          value={upcomingTours}
          href="/dashboard/listings"
        />
        <SummaryCard
          title="Earnings"
          value={earnings}
          href="/dashboard/listings"
        />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent activity</h2>
          <Link
            href="/dashboard/listings"
            className="text-sm text-indigo-600 hover:underline"
          >
            Manage listings
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
            <li>• New booking: “Old Dhaka Food Walk” — 2 guests — Apr 22</li>
            <li>• Listing updated: “Chittagong City Tour” — price changed</li>
            <li>• Inquiry: “Private photography tour” — pending reply</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
