"use client";

import React, { JSX, useState } from "react";

type Listing = {
  id: string;
  title: string;
  city: string;
  price: number;
  published: boolean;
};

const initialListings: Listing[] = [
  {
    id: "l1",
    title: "Old Dhaka Food Walk",
    city: "Dhaka",
    price: 18,
    published: true,
  },
  {
    id: "l2",
    title: "Sundarbans Wildlife Tour",
    city: "Khulna",
    price: 120,
    published: false,
  },
  {
    id: "l3",
    title: "Cox's Bazar Relaxed Beach Walk",
    city: "Cox's Bazar",
    price: 35,
    published: true,
  },
];

export default function DashboardListingsPage(): JSX.Element {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [search, setSearch] = useState<string>("");

  function handleDelete(id: string) {
    if (!confirm("Delete this listing? This action cannot be undone.")) return;
    setListings((prev) => prev.filter((l) => l.id !== id));
  }

  function togglePublished(id: string) {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, published: !l.published } : l))
    );
  }

  const filtered = listings.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your Listings</h1>
        <button
          onClick={() =>
            setListings((prev) => [
              ...prev,
              {
                id: `l${Date.now()}`,
                title: "New Listing",
                city: "Unknown",
                price: 0,
                published: false,
              },
            ])
          }
          className="px-3 py-2 rounded-md bg-indigo-600 text-white"
        >
          + New listing
        </button>
      </div>

      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search title or city..."
          className="w-full max-w-sm rounded-md border px-3 py-2"
        />
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No listings found.
                </td>
              </tr>
            )}
            {filtered.map((l) => (
              <tr key={l.id} className="border-b last:border-b-0">
                <td className="px-4 py-3">{l.title}</td>
                <td className="px-4 py-3">{l.city}</td>
                <td className="px-4 py-3">${l.price}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      l.published ? "bg-green-100" : "bg-yellow-100"
                    }`}
                  >
                    {l.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePublished(l.id)}
                      className="text-xs px-2 py-1 rounded border"
                      title="Publish / Unpublish"
                    >
                      {l.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => alert("Edit flow not implemented")}
                      className="text-xs px-2 py-1 rounded border"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(l.id)}
                      className="text-xs px-2 py-1 rounded border text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
