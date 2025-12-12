"use client";

import React, { JSX, useMemo, useState } from "react";

type Guide = {
  id: string;
  name: string;
  city: string;
  short: string;
  price: number;
};

const MOCK_GUIDES: Guide[] = [
  {
    id: "g1",
    name: "Aisha Rahman",
    city: "Dhaka",
    short: "Local history & food",
    price: 18,
  },
  {
    id: "g2",
    name: "Carlos M.",
    city: "Madrid",
    short: "Tapas & hidden spots",
    price: 25,
  },
  {
    id: "g3",
    name: "Emma L.",
    city: "Paris",
    short: "Museum & architecture",
    price: 30,
  },
  {
    id: "g4",
    name: "Tariq",
    city: "Dhaka",
    short: "Photography walks",
    price: 22,
  },
  {
    id: "g5",
    name: "Sadia",
    city: "Cox's Bazar",
    short: "Coastal tours",
    price: 28,
  },
];

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
            g.short.toLowerCase().includes(query.toLowerCase()))
      ),
    [query, cityFilter]
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">Explore</h1>
      <p className="text-gray-600 mb-6">
        Find guides, cities and curated tours.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search guides, specialities..."
          className="w-full sm:w-1/2 rounded-md border px-3 py-2 mb-3 sm:mb-0"
        />
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="rounded-md border px-3 py-2"
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <div className="text-gray-500">
            No results. Try clearing filters or searching other keywords.
          </div>
        )}

        {filtered.map((g) => (
          <article
            key={g.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-500/80 text-white flex items-center justify-center font-semibold">
                {g.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{g.name}</h3>
                    <div className="text-xs text-gray-500">
                      {g.city} · {g.short}
                    </div>
                  </div>
                  <div className="text-sm font-medium">${g.price}</div>
                </div>

                <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">
                  {g.short} — book a private or group tour.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <button className="px-3 py-1 rounded-md border text-sm">
                    View profile
                  </button>
                  <button className="ml-auto px-3 py-1 rounded-md bg-indigo-600 text-white text-sm">
                    Book
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
