"use client";
import Link from "next/link";
import Image from "next/image";

type Props = {
  id: string;
  name: string;
  location?: string;
  rating?: number;
  img?: string;
};

export default function ProfileCard({
  id,
  name,
  location,
  rating = 0,
  img = "/images/default-profile.jpg",
}: Props) {
  return (
    <Link
      href={`/profile/${id}`}
      className="block border rounded-lg p-4 hover:shadow"
    >
      <div className="flex items-center gap-4">
        <Image
          src={img}
          alt={name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{location}</p>
          <div className="text-sm mt-1">⭐ {rating.toFixed(1)}</div>
        </div>
      </div>
    </Link>
  );
}
