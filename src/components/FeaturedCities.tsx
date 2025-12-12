"use client";
import Link from "next/link";
import Image from "next/image";

const cities = [
  {
    name: "Dhaka",
    subtitle: "Street food & history",
    img: "https://res.cloudinary.com/dn2wb32gr/image/upload/v1765485904/Dhaka_gr7cgk.jpg",
  },
  {
    name: "Paris",
    subtitle: "Art & cafés",
    img: "https://res.cloudinary.com/dn2wb32gr/image/upload/v1765485903/Paris_nazrsa.jpg",
  },
  {
    name: "New York",
    subtitle: "Hidden neighborhoods",
    img: "https://res.cloudinary.com/dn2wb32gr/image/upload/v1765485903/New_York_yg2sdq.jpg",
  },
];

export default function FeaturedCities() {
  return (
    <div className="py-6">
      <h2 className="text-3xl font-bold mb-4">Featured cities</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((c) => (
          <Link
            key={c.name}
            href={`/explore?city=${encodeURIComponent(c.name)}`}
            className="block overflow-hidden rounded-lg shadow"
          >
            <div className="relative h-40 bg-gray-200">
              <Image
                src={c.img}
                alt={c.name}
                fill
                className="object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute left-4 bottom-4 text-white">
                <h3 className="font-semibold text-lg">{c.name}</h3>
                <p className="text-sm">{c.subtitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
