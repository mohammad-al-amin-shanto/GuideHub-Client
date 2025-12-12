"use client";

import ProfileCard from "./ProfileCard";

const guides = [
  {
    id: "g1",
    name: "Aisha Rahman",
    location: "Dhaka, Bangladesh",
    rating: 4.9,
    img: "https://res.cloudinary.com/dn2wb32gr/image/upload/c_pad,b_gen_fill,w_1920,h_1080/v1765486972/Aisha_Rahman_zf0ffv.png",
  },
  {
    id: "g2",
    name: "Liam Carter",
    location: "New York, USA",
    rating: 4.8,
    img: "https://res.cloudinary.com/dn2wb32gr/image/upload/c_pad,b_gen_fill,w_1920,h_1080/v1765486987/Liam_Carter_bnnfcz.png",
  },
  {
    id: "g3",
    name: "Sofia Martin",
    location: "Paris, France",
    rating: 4.8,
    img: "https://res.cloudinary.com/dn2wb32gr/image/upload/c_pad,b_gen_fill,w_1920,h_1080/v1765486972/Sofia_Martin_rq4jvj.png",
  },
];

export default function TopGuides() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Top-rated guides</h2>
        <a
          href="/guides"
          className="text-sm text-indigo-600 hover:underline"
          aria-label="See all guides"
        >
          See all guides →
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g, i) => (
          <ProfileCard key={g.id} {...g} isTop={i === 0} />
        ))}
      </div>
    </section>
  );
}
