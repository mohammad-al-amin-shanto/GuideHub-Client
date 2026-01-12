"use client";

import { useEffect, useState } from "react";
import ProfileCard, { Guide } from "./ProfileCard";
import API from "@/lib/api";
import Link from "next/link";

type GuideFromApi = {
  _id: string;
  slug: string;
  name: string;
  city?: string;
  country?: string;
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  coverImage?: string;
  avatar?: string;
  specialty?: string;

  tourStats?: {
    totalKm: number;
    travelHours: number;
    visitHours: number;
    totalHours: number;
    recommendedDays: number;
  };
};

export default function TopGuides() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTopGuides() {
      try {
        const res = await API.get("/api/guides?top=true");

        const normalized: Guide[] = (res.data.guides as GuideFromApi[])
          .map((g) => ({
            id: g._id,
            slug: g.slug,
            name: g.name,
            city: g.city,
            country: g.country,
            rating: g.rating ?? 0,
            reviewCount: g.reviewCount,
            isVerified: g.isVerified,
            coverImage: g.coverImage,
            avatar: g.avatar,
            specialty: g.specialty,
            tourStats: g.tourStats,
          }))

          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);

        setGuides(normalized);
      } catch (e) {
        console.error("Failed to load top guides", e);
      } finally {
        setLoading(false);
      }
    }

    loadTopGuides();
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <p className="text-gray-500">Loading top guides…</p>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Top-rated guides</h2>
        <Link
          href="/guides"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          See all guides →
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g, i) => (
          <ProfileCard key={g.id} {...g} isTop={i === 0} />
        ))}
      </div>
    </section>
  );
}
