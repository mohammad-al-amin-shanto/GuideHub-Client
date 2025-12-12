"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface Review {
  id: number | string;
  name: string;
  text: string;
  city?: string;
  rating?: number;
  date?: string;
  guideName?: string;
}

const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Maya",
    city: "Dhaka",
    date: "2025-10-14",
    rating: 5,
    text: "Our Old Dhaka walking tour with Aisha felt like stepping into a living documentary. Between the spice markets, tea stalls, and hidden courtyards, she painted the city with stories we would have completely missed on our own. Easily the highlight of our trip!",
  },
  {
    id: 2,
    name: "Carlos",
    city: "Madrid",
    date: "2025-09-02",
    rating: 5,
    text: "The Madrid tapas crawl wasn't just a food tour — it was a lesson in culture. Luis took us to small family-owned places we’d never find ourselves, and every stop came with a story. I still dream about the jamón he introduced us to!",
  },
  {
    id: 3,
    name: "Emma",
    city: "Paris",
    date: "2025-08-21",
    rating: 5,
    text: "Sophie gave us the most meaningful art tour I’ve ever experienced. She explained the hidden symbolism behind iconic paintings, showed us lesser-known galleries, and brought Parisian art to life in a way that felt personal and unforgettable.",
  },
  {
    id: 4,
    name: "Tariq",
    city: "Cox's Bazar",
    date: "2025-06-12",
    rating: 5,
    text: "Watching sunrise at Cox’s Bazar with a local expert was unreal. Rafi knew quiet, untouched spots where the light hit the waves just right. His storytelling added a whole new appreciation for the coastal lifestyle. A calming, beautiful escape.",
  },
  {
    id: 5,
    name: "Sadia",
    city: "Khulna",
    date: "2025-05-07",
    rating: 5,
    text: "Exploring the Sundarbans with Imran was magical. His deep respect for the mangroves, the wildlife, and the community made the experience much more meaningful. Easily one of the best eco-tours we’ve done.",
  },
];

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold">
      {initials}
    </div>
  );
}

function Stars({ value = 5 }: { value?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < value! ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials({
  reviews = defaultReviews,
}: {
  reviews?: Review[];
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollByCard = (dir: "left" | "right") => {
    const container = scrollRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const cardWidth = card.offsetWidth + 24; // 24px = gap-6
    container.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Traveler stories</h2>
            <p className="text-gray-500">
              Real, emotional experiences from travelers.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              disabled={!canLeft}
              onClick={() => scrollByCard("left")}
              className={`p-2 rounded border bg-white shadow-sm ${
                !canLeft && "opacity-40 cursor-not-allowed"
              }`}
            >
              ‹
            </button>

            <button
              disabled={!canRight}
              onClick={() => scrollByCard("right")}
              className={`p-2 rounded border bg-white shadow-sm ${
                !canRight && "opacity-40 cursor-not-allowed"
              }`}
            >
              ›
            </button>
          </div>
        </div>

        {/* HORIZONTAL SCROLLER */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              ref={index === 0 ? cardRef : null}
              className="w-[280px] sm:w-[340px] lg:w-[380px] 
             snap-start bg-white dark:bg-gray-900 
             rounded-2xl p-6 shadow hover:shadow-lg flex-shrink-0
             border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex gap-4 items-start">
                <Avatar name={review.name} />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {review.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {review.city} · {review.date}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <Stars value={review.rating} />
              </div>

              <p className="mt-4 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                {review.text}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  className="text-xs px-3 py-1 rounded-full border 
                 border-gray-300 dark:border-gray-600
                 text-gray-700 dark:text-gray-200
                 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Read more
                </button>

                <button
                  className="text-xs px-3 py-1 rounded-full 
                 bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Book a similar tour
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
