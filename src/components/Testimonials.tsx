"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Review {
  id: number | string;
  name: string;
  text: string;
  city?: string;
  rating?: number;
  date?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Maya",
    city: "Dhaka",
    date: "2025-10-14",
    rating: 5,
    text: "Our Old Dhaka walking tour with Aisha felt like stepping into a living documentary. Between spice markets and tea stalls, she revealed stories we never would have found alone.",
  },
  {
    id: 2,
    name: "Carlos",
    city: "Madrid",
    date: "2025-09-02",
    rating: 5,
    text: "The tapas crawl was more than food — it was culture. Every stop came with a story and flavors I still dream about.",
  },
  {
    id: 3,
    name: "Emma",
    city: "Paris",
    date: "2025-08-21",
    rating: 5,
    text: "Sophie made art feel alive. From hidden galleries to symbolism, Paris unfolded like a storybook.",
  },
  {
    id: 4,
    name: "Tariq",
    city: "Cox's Bazar",
    date: "2025-06-12",
    rating: 5,
    text: "Sunrise on the beach with a local guide was unreal. Quiet spots, perfect light, unforgettable calm.",
  },
  {
    id: 5,
    name: "Sadia",
    city: "Khulna",
    date: "2025-05-07",
    rating: 5,
    text: "The Sundarbans felt magical with someone who truly respected the land and its wildlife.",
  },
];

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">
      {initials}
    </div>
  );
}

function Stars({ value = 5 }: { value?: number }) {
  return (
    <div className="flex gap-1 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < value ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border w-full">
      <div className="flex items-center gap-4">
        <Avatar name={r.name} />
        <div>
          <h3 className="font-semibold text-lg">{r.name}</h3>
          <p className="text-xs text-gray-500">
            {r.city} · {r.date}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <Stars value={r.rating} />
      </div>

      <p className="mt-4 text-gray-700 leading-relaxed">{r.text}</p>

      <div className="mt-6 flex justify-between items-center text-sm">
        <span className="text-gray-400">Verified traveler</span>
        <span className="text-indigo-600 font-medium cursor-pointer">
          View tour →
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(reviews.length / 2);

  const next = () => setPage((p) => (p + 1) % totalPages);
  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);

  const first = reviews[page * 2];
  const second = reviews[(page * 2 + 1) % reviews.length];

  return (
    <section className="py-8 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Traveler stories</h2>
            <p className="text-gray-500">
              Real experiences from people who’ve been there.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white shadow hover:shadow-md border flex items-center justify-center"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white shadow hover:shadow-md border flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative h-60">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <ReviewCard r={first} />
              <ReviewCard r={second} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
