"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useParams } from "next/navigation";
import Link from "next/link";

type GuideDetails = {
  id: string;
  name: string;
  location?: string;
  rating?: number;
  coverImage?: string;
  specialty?: string;
  bio?: string;
  pricePerHour?: number;
  routes?: string[];
  duration?: string;
};

export default function GuideDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [guide, setGuide] = useState<GuideDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGuide() {
      try {
        const res = await API.get(`/api/guides/${slug}`);
        setGuide(res.data.guide);
      } catch (e) {
        console.error("Failed to load guide", e);
      } finally {
        setLoading(false);
      }
    }
    loadGuide();
  }, [slug]);

  /* ---------------- Loading state ---------------- */
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="animate-pulse max-w-4xl space-y-6">
          <div className="h-64 rounded-2xl bg-gray-200" />
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Guide not found
        </h1>
        <p className="mt-2 text-gray-600">
          The guide you’re looking for doesn’t exist or was removed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-24 grid lg:grid-cols-3 gap-14">
        {/* ================= Main content ================= */}
        <div className="lg:col-span-2 space-y-14">
          {/* ================= Hero ================= */}
          <section className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
            {/* Image */}
            <div className="relative aspect-video">
              {guide.coverImage && (
                <Image
                  src={guide.coverImage}
                  alt={guide.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-top"
                  priority
                />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />

              {/* Name + location overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {guide.name}
                </h1>

                {guide.location && (
                  <p className="mt-1 text-sm sm:text-base text-white/90">
                    {guide.location}
                  </p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="relative p-8 sm:p-10">
              {/* subtle top divider */}
              <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

              {/* Specialty */}
              {guide.specialty && (
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  {guide.specialty}
                </div>
              )}

              {/* Bio */}
              {guide.bio && (
                <div className="mt-6 max-w-3xl">
                  <p className="text-gray-700 leading-relaxed text-[15.5px]">
                    {guide.bio}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ================= Tour details ================= */}
          <section className="rounded-3xl bg-white shadow-sm p-8 sm:p-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-10">
              Tour details
            </h2>

            <div className="grid gap-8 sm:grid-cols-3">
              {/* Duration */}
              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Duration
                </p>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {guide.duration || "Flexible"}
                </p>
              </div>

              {/* Routes */}
              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Routes
                </p>
                <p className="mt-2 text-sm font-medium text-gray-900 leading-relaxed">
                  {guide.routes?.join(", ") || "Custom routes available"}
                </p>
              </div>

              {/* Pricing */}
              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Pricing
                </p>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {guide.pricePerHour
                    ? `$${guide.pricePerHour} / hour`
                    : "Contact for pricing"}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ================= Booking sidebar ================= */}
        <aside className="lg:sticky lg:top-28 h-fit">
          <div className="rounded-3xl bg-white shadow-md p-8 sm:p-10">
            <p className="text-lg font-semibold text-gray-900">
              Book this guide
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Pay securely with Stripe. You won’t be charged until you confirm.
            </p>

            {/* Price highlight */}
            <div className="mt-6 rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-500">Starting from</p>
              <p className="text-2xl font-extrabold text-gray-900">
                {guide.pricePerHour
                  ? `$${guide.pricePerHour}/hr`
                  : "Custom pricing"}
              </p>
            </div>

            <Link
              href={`/checkout?guide=${guide.id}`}
              className="mt-6 block w-full rounded-xl bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              Check availability
            </Link>

            <div className="mt-5 text-center text-xs text-gray-500">
              Trusted guides · Transparent pricing · Secure checkout
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
