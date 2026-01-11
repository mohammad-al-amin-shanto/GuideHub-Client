"use client";

import { useEffect, useState, useMemo } from "react";
import ProfileCard, { Guide } from "@/components/ProfileCard";
import API from "@/lib/api";

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
};

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadGuides() {
      try {
        const res = await API.get("/api/guides");

        const normalized: Guide[] = (res.data.guides as GuideFromApi[]).map(
          (g) => ({
            id: g._id,
            slug: g.slug,

            name: g.name,
            city: g.city,
            country: g.country,

            rating: g.rating,
            reviewCount: g.reviewCount,
            isVerified: g.isVerified,

            coverImage: g.coverImage,
            avatar: g.avatar,

            specialty: g.specialty,
          })
        );

        setGuides(normalized);
      } catch (err) {
        console.error("Failed to load guides", err);
      } finally {
        setLoading(false);
      }
    }
    loadGuides();
  }, []);

  const filteredGuides = useMemo(() => {
    if (!query) return guides;
    const q = query.toLowerCase();
    return guides.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.city?.toLowerCase().includes(q) ||
        g.country?.toLowerCase().includes(q) ||
        g.specialty?.toLowerCase().includes(q)
    );
  }, [query, guides]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-14">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Explore Local Guides
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600 text-lg">
            Discover trusted local guides, handpicked for unforgettable
            experiences.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-xl">
            <input
              type="text"
              placeholder="Search by name, city, or specialty…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <SkeletonGrid />
        ) : filteredGuides.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <ProfileCard
                key={guide.id}
                {...guide}
                isTop={guide.rating ? guide.rating >= 4.8 : false}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* -----------------------------
   Loading Skeletons
------------------------------ */
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border bg-white overflow-hidden"
        >
          {/* Image skeleton – matches ProfileCard */}
          <div className="relative w-full aspect-4/3 bg-gray-200" />

          {/* Content skeleton */}
          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="flex gap-3 mt-4">
              <div className="h-8 bg-gray-200 rounded w-20" />
              <div className="h-8 bg-gray-200 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* -----------------------------
   Empty State
------------------------------ */
function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
        🧭
      </div>
      <h3 className="mt-6 text-xl font-semibold text-gray-900">
        No guides found
      </h3>
      <p className="mt-2 text-gray-500">
        Try adjusting your search or check back later.
      </p>
    </div>
  );
}
