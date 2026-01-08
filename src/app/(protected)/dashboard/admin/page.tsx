"use client";

import { useAuth } from "@/context/AuthContext";
import SummaryCard from "../listings/page";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Admin Console — {user?.name}</h1>
      <p className="text-gray-600 mb-8">
        Manage the platform, users, and listings.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard title="Total Users" value={1200} href="/admin/users" />
        <SummaryCard title="Total Guides" value={320} href="/admin/guides" />
        <SummaryCard title="Reports" value={7} href="/admin/reports" />
      </div>

      <section>
        <h2 className="text-xl font-semibold">Recent admin activity</h2>
        <div className="bg-white dark:bg-gray-800 mt-4 p-4 rounded-lg shadow-sm">
          <ul className="text-sm space-y-2">
            <li>• Approved a new guide profile</li>
            <li>• Removed a fraudulent listing</li>
            <li>• Reviewed system usage analytics</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
