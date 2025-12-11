"use client";
import Link from "next/link";

const cats = [
  { id: "food", name: "Food & Drinks", icon: "🥘" },
  { id: "history", name: "History & Culture", icon: "🏛️" },
  { id: "photo", name: "Photography", icon: "📷" },
  { id: "night", name: "Nightlife", icon: "🌃" },
];

export default function Categories() {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-3">
        {cats.map((c) => (
          <Link
            key={c.id}
            href={`/explore?category=${c.id}`}
            className="flex items-center gap-3 px-4 py-2 bg-white rounded shadow-sm"
          >
            <span className="text-2xl">{c.icon}</span>
            <span className="font-medium">{c.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
