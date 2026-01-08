"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import API from "@/lib/api";
import Link from "next/link";

type GuideStats = {
  activeListings: number;
  upcomingTours: number;
  earnings: number;
  recentActivity: string[];
};

export default function GuideDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<GuideStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      if (!user) return;
      try {
        const res = await API.get(`/guide/stats/${user.id}`);
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [user]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-5 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="mt-2 text-gray-500 text-lg">
            Here’s what’s happening with your tours today.
          </p>
        </div>

        {/* Stats */}
        {loading ? (
          <p className="text-gray-600">Loading dashboard...</p>
        ) : (
          stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <StatCard
                title="Active Listings"
                value={stats.activeListings}
                href="/dashboard/listings"
                icon="📍"
              />
              <StatCard
                title="Upcoming Tours"
                value={stats.upcomingTours}
                href="/dashboard/bookings"
                icon="🧭"
              />
              <StatCard
                title="Total Earnings"
                value={`$${stats.earnings}`}
                href="/dashboard/earnings"
                icon="💰"
              />
            </div>
          )
        )}

        {/* Recent Activity */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm">
            {!stats || stats.recentActivity.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent activity yet.</p>
            ) : (
              <ul className="space-y-3">
                {stats.recentActivity.map((item, i) => (
                  <li
                    key={i}
                    className="text-gray-700 text-sm flex items-start"
                  >
                    <span className="mr-2">•</span> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  href,
  icon,
}: {
  title: string;
  value: string | number;
  href: string;
  icon: string;
}) {
  return (
    <Link href={href}>
      <div className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Icon bubble */}
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 text-2xl">
          {icon}
        </div>

        <h3 className="mt-5 text-gray-500 text-sm font-medium">{title}</h3>

        <div className="mt-1 text-3xl font-bold text-gray-900">{value}</div>

        <div className="mt-3 text-sm text-indigo-600 font-medium">View →</div>
      </div>
    </Link>
  );
}
