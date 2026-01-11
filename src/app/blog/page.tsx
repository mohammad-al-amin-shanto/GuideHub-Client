"use client";

import { useState, useEffect } from "react";

type BlogPost = {
  title: string;
  tag: string;
  hook: string;
  content: string;
  accent: string;
};

const POSTS: BlogPost[] = [
  {
    title: "How locals experience a city differently",
    tag: "Travel",
    accent: "bg-indigo-100 text-indigo-700",
    hook: "Tourists see highlights. Locals see patterns, rhythms, and quiet moments most people miss.",
    content: `
Traveling like a local isn’t about knowing secret spots — it’s about understanding pace.

Locals don’t rush from landmark to landmark. They notice the coffee shop where the barista remembers names. 
They choose streets based on shade, not Google ratings.

Cities reveal themselves slowly. When you move with intention, you start seeing how people actually live — not just where they take photos.

That’s the experience GuideHub exists to unlock.
    `,
  },
  {
    title: "Why slower travel leads to better memories",
    tag: "Philosophy",
    accent: "bg-sky-100 text-sky-700",
    hook: "The trips you remember most aren’t packed with places — they’re packed with moments.",
    content: `
Fast travel creates noise. Slow travel creates meaning.

When you stay longer, you stop consuming experiences and start participating in them.
You learn which bakery opens early. You recognize faces. You feel grounded.

Memories don’t come from checklists.
They come from presence.
    `,
  },
  {
    title: "Designing GuideHub: clarity over complexity",
    tag: "Product",
    accent: "bg-violet-100 text-violet-700",
    hook: "We intentionally avoided features that didn’t help travelers make better decisions.",
    content: `
GuideHub wasn’t designed to impress — it was designed to feel obvious.

Every decision asked one question:
Does this help a traveler trust a guide more?

We removed clutter. We simplified flows. We focused on human signals.
Because travel is emotional — and good products respect that.
    `,
  },
];

export default function Page() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activePost ? "hidden" : "auto";
  }, [activePost]);

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-sky-50" />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700">
            GuideHub Blog
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-gray-900">
            Stories that help you
            <span className="block text-indigo-600">travel like a local</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Insights about travel, culture, and building meaningful experiences.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <article
              key={i}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${post.accent}`}
              >
                {post.tag}
              </span>

              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                {post.title}
              </h3>

              <p className="mt-3 text-sm text-gray-600">{post.hook}</p>

              <button
                onClick={() => setActivePost(post)}
                className="mt-6 text-sm font-medium text-indigo-600 hover:underline"
              >
                Read article →
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">
            <button
              onClick={() => setActivePost(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>

            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${activePost.accent}`}
            >
              {activePost.tag}
            </span>

            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              {activePost.title}
            </h2>

            <div className="prose prose-gray mt-6 max-w-none whitespace-pre-line">
              {activePost.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
