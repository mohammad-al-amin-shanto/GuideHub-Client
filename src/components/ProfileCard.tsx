"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export type Guide = {
  id: string;
  name: string;
  location?: string;
  rating?: number;
  img?: string;
  isTop?: boolean;
  specialty?: string; // optional short line (e.g., "History & food tours")
};

/** Deterministic pseudo-random reviews count based on id string.
 *  Produces a stable integer in [10, 130] so we avoid Math.random() in render.
 */
function getReviewsCount(id: string | undefined) {
  if (!id) return 24;
  // simple hash (djb2 variant)
  let hash = 5381;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 33) ^ id.charCodeAt(i);
  }
  // normalize to positive
  hash = Math.abs(hash);
  const min = 10;
  const max = 130;
  return (hash % (max - min + 1)) + min;
}

function Stars({ value = 0 }: { value?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = i + 1;
        const filled = idx <= full || (half && idx === full + 1);
        return (
          <svg
            key={i}
            className={
              filled
                ? "w-4 h-4 text-yellow-400"
                : "w-4 h-4 text-gray-300 dark:text-gray-600"
            }
            viewBox="0 0 20 20"
            fill={filled ? "currentColor" : "none"}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.92-.755 1.688-1.54 1.118l-3.376-2.455a1 1 0 00-1.175 0L5.2 17.96c-.784.57-1.84-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L1.408 8.3c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69l1.286-3.97z" />
          </svg>
        );
      })}
    </div>
  );
}

export default function ProfileCard({
  id,
  name,
  location,
  rating = 0,
  img,
  isTop = false,
  specialty,
}: Guide) {
  // generate initials (for fallback avatar)
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const reviewsCount = getReviewsCount(id);

  return (
    <article
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow transform hover:-translate-y-0.5 focus-within:-translate-y-0.5 border border-gray-100 dark:border-gray-800"
      aria-labelledby={`guide-${id}-name`}
      role="article"
    >
      {/* Image / visual */}
      <div className="relative h-44 bg-gray-50 dark:bg-gray-800">
        {img ? (
          // NOTE: add external domains to next.config.js images.domains if needed
          <Image
            src={img}
            alt={`${name} profile`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-semibold text-xl">
              {initials}
            </div>
          </div>
        )}

        {isTop && (
          <span className="absolute left-3 top-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            Top guide
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3
          id={`guide-${id}-name`}
          className="text-lg font-semibold text-gray-900 dark:text-white truncate"
        >
          {name}
        </h3>

        {/* Location + specialty */}
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {location}
        </div>
        {specialty && (
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {specialty}
          </div>
        )}

        {/* Rating row */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Stars value={rating} />
            <div className="text-sm text-gray-700 dark:text-gray-200 font-medium">
              {rating.toFixed(1)}
            </div>
            <div className="text-xs text-gray-400">•</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {reviewsCount} reviews
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${id}`}
              className="inline-flex items-center justify-center px-3 py-1 rounded-md text-sm font-medium border border-indigo-100 text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label={`View profile of ${name}`}
            >
              View
            </Link>

            <Link
              href={`/tours?guide=${id}`}
              className="inline-flex items-center justify-center px-3 py-1 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label={`Book a tour with ${name}`}
            >
              Book
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
