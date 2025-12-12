"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validateEmail(e: string) {
    return /\S+@\S+\.\S+/.test(e);
  }

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // demo-only: simulate submit
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setEmail("");
    alert("Thanks — you've been added to our newsletter (demo).");
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding & description */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold text-white mb-3">LocalGuide</h3>
          <p className="text-sm text-gray-300/90">
            Travel like a local. Discover authentic experiences led by real
            local guides — hand-picked and trusted.
          </p>

          <div className="mt-4">
            <a
              href="mailto:hello@localguide.example"
              className="text-sm text-gray-300 hover:text-white inline-block"
            >
              hello@localguide.example
            </a>
            <div className="text-xs text-gray-500 mt-2">
              Mon–Fri · 9:00–18:00
            </div>
          </div>
        </div>

        {/* Sitemap */}
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore" className="hover:text-white">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/top-guides" className="hover:text-white">
                  Top-rated
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy & terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Social */}
        <div className="md:col-span-1">
          <h4 className="text-sm font-semibold text-white mb-3">
            Stay in touch
          </h4>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>

            <div className="flex gap-2">
              <input
                id="footer-email"
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 rounded-md bg-white/5 border border-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label="Subscribe to newsletter"
              >
                {submitting ? "Joining…" : "Join"}
              </button>
            </div>

            <div className="text-xs text-gray-500">
              No spam — unsubscribe anytime.
            </div>
          </form>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-white mb-2">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-md hover:bg-white/5 transition"
              >
                {/* Facebook SVG */}
                <svg
                  className="w-5 h-5 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-2.9h2.2V9.2c0-2.2 1.3-3.4 3.3-3.4.95 0 1.95.17 1.95.17v2.15h-1.1c-1.08 0-1.42.67-1.42 1.36v1.64h2.42l-.39 2.9h-2.03v7A10 10 0 0022 12z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-md hover:bg-white/5 transition"
              >
                {/* Instagram SVG */}
                <svg
                  className="w-5 h-5 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M16 11.37a4 4 0 11-7.999.001A4 4 0 0116 11.37z"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M17.5 6.5h.01"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-md hover:bg-white/5 transition"
              >
                {/* Twitter SVG */}
                <svg
                  className="w-5 h-5 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M22 5.9a8.19 8.19 0 01-2.36.65 4.11 4.11 0 001.8-2.27 8.22 8.22 0 01-2.6.99 4.1 4.1 0 00-7 3.74A11.64 11.64 0 013 4.8a4.1 4.1 0 001.27 5.46 4.07 4.07 0 01-1.86-.51v.05a4.1 4.1 0 003.29 4.02 4.13 4.13 0 01-1.85.07 4.1 4.1 0 003.83 2.84A8.22 8.22 0 012 19.54 11.6 11.6 0 007.29 21c7.55 0 11.69-6.26 11.69-11.69v-.53A8.35 8.35 0 0022 5.9z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        <div>
          © {new Date().getFullYear()} LocalGuide — All rights reserved.
        </div>
        <div className="mt-1">
          <Link href="/terms" className="hover:text-white mr-3">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
