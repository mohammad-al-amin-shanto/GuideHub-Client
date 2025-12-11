"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          LocalGuide
        </Link>

        <div className="flex gap-4 items-center">
          <Link href="/explore">Explore Tours</Link>
          <Link href="/register" className="hidden sm:inline">
            Become a Guide
          </Link>
          <Link
            href="/login"
            className="px-3 py-1 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
