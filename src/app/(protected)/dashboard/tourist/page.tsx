"use client";

import { useAuth } from "@/context/AuthContext";
import SummaryCard from "../listings/page";

export default function TouristDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Hi, {user?.name}</h1>

      <p className="text-gray-600 mb-8">
        Here&apos;s what&apos;s happening with your tours.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard title="Upcoming tours" value={3} href="/tours" />
        <SummaryCard title="Bookings" value={14} href="/bookings" />
        <SummaryCard title="Reviews" value={5} href="/reviews" />
      </div>

      <section>
        <h2 className="text-xl font-semibold">Recent activity</h2>
        <div className="bg-white dark:bg-gray-800 mt-4 p-4 rounded-lg shadow-sm">
          <ul className="text-sm space-y-2">
            <li>• You booked “Cox’s Bazar Sunset Tour” — Apr 22</li>
            <li>• Your review on “Dhaka Food Walk” was posted</li>
            <li>• A guide replied to your inquiry</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
