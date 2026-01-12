"use client";
import Link from "next/link";
import Image from "next/image";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  price?: number;
  days?: number;
  hours?: number;
  img?: string;
};

export default function ListingCard({
  id,
  title,
  subtitle,
  price,
  days,
  hours,
  img = "/images/listing-placeholder.jpg",
}: Props) {
  return (
    <Link
      href={`/tours/${id}`}
      className="block border rounded-lg overflow-hidden hover:shadow"
    >
      <div className="relative h-44">
        <Image src={img} alt={title} fill className="object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 p-3 text-white">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="p-3 flex items-center justify-between text-sm">
        <div>
          {days
            ? `${days} day${days > 1 ? "s" : ""}`
            : hours
            ? `${hours} hrs`
            : "Flexible"}
        </div>

        <div className="font-semibold">${price ?? "20"}</div>
      </div>
    </Link>
  );
}
