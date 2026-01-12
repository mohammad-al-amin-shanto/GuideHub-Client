"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  const linkClass = (active: boolean) =>
    active
      ? "font-semibold text-indigo-600 border-b-2 border-indigo-600"
      : "text-gray-600 hover:text-indigo-600";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          LocalGuide
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-md border border-gray-300"
        >
          ☰
        </button>

        {/* Right Side */}
        <div className="hidden md:flex gap-4 items-center relative">
          {/* Always visible */}
          <Link href="/explore" className={linkClass(isActive("/explore"))}>
            Explore Tours
          </Link>

          {!user && (
            <Link href="/register" className="hidden sm:inline">
              Become a Guide
            </Link>
          )}

          {/* Loading state */}
          {loading ? (
            <span className="text-gray-500 text-sm">Checking...</span>
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Dropdown button */}
              <button
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="px-3 py-1 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium flex items-center gap-1"
              >
                Hi, {user.name}
                <span className="text-sm">▼</span>
              </button>

              {/* Dropdown menu */}
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md border py-2 z-50">
                  {/* Tourist */}
                  {user.role === "tourist" && (
                    <>
                      <Link
                        href="/dashboard/tourist"
                        className={`block px-4 py-2 ${linkClass(
                          isActive("/dashboard/tourist")
                        )}`}
                        onClick={() => setOpen(false)}
                      >
                        My Bookings
                      </Link>
                    </>
                  )}

                  {/* Guide */}
                  {user.role === "guide" && (
                    <>
                      <Link
                        href="/dashboard/guide"
                        className={`block px-4 py-2 ${linkClass(
                          isActive("/dashboard/guide")
                        )}`}
                        onClick={() => setOpen(false)}
                      >
                        Guide Dashboard
                      </Link>
                      <Link
                        href="/dashboard/listings"
                        className={`block px-4 py-2 ${linkClass(
                          isActive("/dashboard/listings")
                        )}`}
                        onClick={() => setOpen(false)}
                      >
                        My Listings
                      </Link>
                    </>
                  )}

                  {/* Admin */}
                  {user.role === "admin" && (
                    <>
                      <Link
                        href="/dashboard/admin"
                        className={`block px-4 py-2 ${linkClass(
                          isActive("/dashboard/admin")
                        )}`}
                        onClick={() => setOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    </>
                  )}

                  {/* Common */}
                  <Link
                    href={`/profile/${user.id}`}
                    className={`block px-4 py-2 ${
                      pathname.startsWith("/profile")
                        ? "font-semibold text-indigo-600"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      setOpen(false);
                      logout().then(() => router.push("/"));
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="px-3 py-1 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-40 bg-white shadow-xl border-t">
          <div className="px-4 py-5 space-y-6">
            {/* Top quick actions */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/explore"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white py-3 font-semibold"
              >
                🌍 Explore Tours
              </Link>

              {!user && (
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-indigo-600 text-indigo-600 py-3 font-semibold"
                >
                  🧭 Become a Guide
                </Link>
              )}
            </div>

            {/* User section */}
            {user && (
              <div className="rounded-2xl bg-gray-50 p-4 space-y-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Account
                </p>

                {user.role === "tourist" && (
                  <Link
                    href="/dashboard/tourist"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white"
                  >
                    📅 My Bookings
                  </Link>
                )}

                {user.role === "guide" && (
                  <>
                    <Link
                      href="/dashboard/guide"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white"
                    >
                      🧑‍💼 Guide Dashboard
                    </Link>
                    <Link
                      href="/dashboard/listings"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white"
                    >
                      📍 My Listings
                    </Link>
                  </>
                )}

                {user.role === "admin" && (
                  <Link
                    href="/dashboard/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white"
                  >
                    🛠 Admin Dashboard
                  </Link>
                )}

                <Link
                  href={`/profile/${user.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white"
                >
                  👤 Profile
                </Link>
              </div>
            )}

            {/* Auth section */}
            {!user && (
              <div className="rounded-2xl bg-gray-50 p-4 space-y-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Account
                </p>

                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white"
                >
                  🔐 Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white"
                >
                  ✨ Create Account
                </Link>
              </div>
            )}

            {/* Logout */}
            {user && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  logout().then(() => router.push("/"));
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 text-red-600 py-3 font-semibold"
              >
                🚪 Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
