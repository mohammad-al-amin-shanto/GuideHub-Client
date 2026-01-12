"use client";

import React from "react";

const steps = [
  {
    title: "Find your experience",
    desc: "Search by city or activity to discover unique tours hosted by real local experts.",
    icon: "🔍",
  },
  {
    title: "Choose your guide",
    desc: "Check profiles, see ratings, and pick the guide who fits your vibe and budget.",
    icon: "🧭",
  },
  {
    title: "Book with confidence",
    desc: "Send a request, chat with your guide, and get ready for an authentic local adventure.",
    icon: "📅",
  },
];

export default function HowItWorks() {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6">How GuideHub Works</h2>

      <div className="grid sm:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="relative rounded-2xl border border-gray-200/60 dark:border-gray-700 
             bg-linear-to-br from-white via-indigo-50/40 to-white 
             dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
             shadow-[0_10px_25px_-10px_rgba(79,70,229,0.15)]
             hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.25)]
             transition-all hover:-translate-y-1 p-7"
          >
            {/* Icon + step */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
                {s.icon}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  Step {i + 1}
                </p>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {s.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {s.desc}
            </p>

            {/* CTA */}
            <div className="mt-5">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-indigo-600">
                Learn more
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
