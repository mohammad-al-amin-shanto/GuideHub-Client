"use client";

import React, { JSX, useMemo, useState } from "react";

type Guide = {
  id: string;
  name: string;
  city: string;
  short: string;
  price: number;
  rating?: number;
  reviews?: number;
  tags?: string[];
};

const MOCK_GUIDES: Guide[] = [
  {
    id: "g1",
    name: "Aisha Rahman",
    city: "Dhaka",
    short: "Local history & food",
    price: 18,
    rating: 4.9,
    reviews: 42,
    tags: ["history", "food"],
  },
  {
    id: "g2",
    name: "Carlos M.",
    city: "Madrid",
    short: "Tapas & hidden spots",
    price: 25,
    rating: 4.7,
    reviews: 19,
    tags: ["food", "walking"],
  },
  {
    id: "g3",
    name: "Emma L.",
    city: "Paris",
    short: "Museum & architecture",
    price: 30,
    rating: 4.8,
    reviews: 55,
    tags: ["museums", "architecture"],
  },
  {
    id: "g4",
    name: "Tariq",
    city: "Dhaka",
    short: "Photography walks",
    price: 22,
    rating: 4.6,
    reviews: 12,
    tags: ["photography"],
  },
  {
    id: "g5",
    name: "Sadia",
    city: "Cox's Bazar",
    short: "Coastal tours",
    price: 28,
    rating: 4.9,
    reviews: 28,
    tags: ["beach", "nature"],
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatPrice(n: number) {
  return `$${n.toFixed(0)}`;
}

export default function ExplorePage(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [cityFilter, setCityFilter] = useState<string>("");

  const cities = useMemo(
    () => Array.from(new Set(MOCK_GUIDES.map((g) => g.city))),
    []
  );

  const filtered = useMemo(
    () =>
      MOCK_GUIDES.filter(
        (g) =>
          (cityFilter === "" || g.city === cityFilter) &&
          (g.name.toLowerCase().includes(query.toLowerCase()) ||
            g.short.toLowerCase().includes(query.toLowerCase()) ||
            (g.tags || []).some((t) =>
              t.toLowerCase().includes(query.toLowerCase())
            ))
      ),
    [query, cityFilter]
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold leading-tight">
          Explore Guides & Tours
        </h1>
        <p className="text-gray-600 mt-1">
          Find local experts, curated tours and unique experiences — filter by
          city or search by speciality.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex-1 flex gap-3">
          <label htmlFor="search" className="sr-only">
            Search guides
          </label>
          <input
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, tags, or specialties (e.g. 'food', 'museum')"
            className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            aria-label="Filter by city"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 bg-white shadow-sm"
          >
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2 sm:mt-0 flex items-center gap-3">
          <button
            onClick={() => {
              setQuery("");
              setCityFilter("");
            }}
            className="text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
          >
            Clear
          </button>
          <div className="text-sm text-gray-500">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <main>
        {filtered.length === 0 ? (
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center text-gray-600">
            No results. Try different keywords or clear the filters.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((g) => (
              <article
                key={g.id}
                className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-150"
                aria-labelledby={`guide-${g.id}-name`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-14 h-14 rounded-lg flex items-center justify-center text-white font-semibold text-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(99,102,241,1) 0%, rgba(79,70,229,1) 100%)",
                    }}
                    aria-hidden
                  >
                    {initials(g.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3">
                      <div className="min-w-0">
                        <h3
                          id={`guide-${g.id}-name`}
                          className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate"
                          style={{ lineHeight: 1.15 }}
                        >
                          {g.name}
                        </h3>

                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-300 truncate">
                          <span className="font-medium text-gray-800 dark:text-gray-100">
                            {g.city}
                          </span>
                          <span className="mx-2 text-gray-400">·</span>
                          <span className="italic text-gray-600 dark:text-gray-300">
                            {g.short}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {(g.tags || []).slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="ml-auto flex flex-col items-end">
                        <div className="inline-flex items-baseline gap-1">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatPrice(g.price)}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            /hr
                          </span>
                        </div>

                        <div className="mt-2 text-sm">
                          {g.rating ? (
                            <span className="inline-flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded-md text-yellow-700 dark:text-yellow-300">
                              <svg
                                className="w-4 h-4"
                                viewBox="0 0 20 20"
                                aria-hidden
                              >
                                <path
                                  fill="currentColor"
                                  d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.562-.953L10 0l2.948 5.957 6.562.953-4.755 4.635 1.123 6.545z"
                                />
                              </svg>
                              <span className="font-medium text-sm">
                                {g.rating.toFixed(1)}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({g.reviews ?? 0})
                              </span>
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              No ratings
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-gray-700 dark:text-gray-200 leading-relaxed line-clamp-3">
                      {g.short} — {g.city} local guide offering private and
                      group tours. Friendly, knowledgeable and flexible.
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        className="px-3 py-1.5 rounded-md border border-gray-200 dark:border-slate-700 
             text-sm text-gray-800 dark:text-gray-100 
             bg-white dark:bg-slate-900 
             hover:bg-gray-100 hover:text-gray-900 
             dark:hover:bg-slate-800 dark:hover:text-white"
                        aria-label={`View profile of ${g.name}`}
                      >
                        View profile
                      </button>

                      <button
                        className="ml-auto px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        aria-label={`Book ${g.name}`}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
