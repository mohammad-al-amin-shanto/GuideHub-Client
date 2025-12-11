"use client";

import ProfileCard from "./ProfileCard";

const guides = [
  {
    id: "g1",
    name: "Aisha Rahman",
    location: "Dhaka",
    rating: 4.9,
    img: "/images/guide1.jpg",
  },
  {
    id: "g2",
    name: "Liam Carter",
    location: "New York",
    rating: 4.8,
    img: "/images/guide2.jpg",
  },
  {
    id: "g3",
    name: "Sofia Martin",
    location: "Paris",
    rating: 4.8,
    img: "/images/guide3.jpg",
  },
];

export default function TopGuides() {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-4">Top-rated guides</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((g) => (
          <ProfileCard key={g.id} {...g} />
        ))}
      </div>
    </div>
  );
}
