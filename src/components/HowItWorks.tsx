"use client";

import React from "react";

const steps = [
  {
    title: "Find your experience",
    desc: "Search by city or activity to discover unique tours hosted by real local experts.",
  },
  {
    title: "Choose your guide",
    desc: "Check profiles, see ratings, and pick the guide who fits your vibe and budget.",
  },
  {
    title: "Book with confidence",
    desc: "Send a request, chat with your guide, and get ready for an authentic local adventure.",
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
            role="article"
            aria-labelledby={`how-step-${i}-title`}
            tabIndex={0}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow focus-within:shadow-md focus-within:ring-2 focus-within:ring-indigo-200 dark:focus-within:ring-indigo-700 outline-none"
          >
            <div className="flex items-center gap-4">
              <div
                aria-hidden
                className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold shadow-sm"
              >
                {i + 1}
              </div>

              <h3
                id={`how-step-${i}-title`}
                className="font-semibold text-gray-900 dark:text-white text-base"
              >
                {s.title}
              </h3>
            </div>

            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {s.desc}
            </p>

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-xs font-medium text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded"
                aria-label={`Learn more about: ${s.title}`}
                onClick={() => {}}
              >
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
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
