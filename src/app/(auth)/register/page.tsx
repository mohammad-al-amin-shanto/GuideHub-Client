"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import API from "@/src/lib/api";

function getApiErrorMessage(data: unknown): string | undefined {
  if (typeof data === "object" && data !== null) {
    const d = data as Record<string, unknown>;
    const m = d["message"];
    if (typeof m === "string") return m;
  }
  return undefined;
}

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"tourist" | "guide">("tourist");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function validateEmail(e: string) {
    return /\S+@\S+\.\S+/.test(e);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("Please fill out all required fields.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      });

      // store token (demo)
      try {
        localStorage.setItem("lg_token", data.token);
      } catch {
        // ignore storage errors in strict environments
      }

      toast.success("Welcome! Registration successful.");
      router.push("/dashboard");
    } catch (err: unknown) {
      let msg = "Registration failed";
      if (axios.isAxiosError(err)) {
        const serverMsg = getApiErrorMessage(err.response?.data);
        msg = serverMsg ?? err.message ?? msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-gray-200/40 dark:border-gray-700/40 transition">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Create account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Join LocalGuide — create an account to book or list tours.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-5"
          aria-label="Register form"
          noValidate
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-300 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-300 outline-none"
              required
            />
          </div>

          {/* Password with reveal */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 pr-10 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-300 outline-none"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 dark:text-gray-300 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Minimum 6 characters
            </div>
          </div>

          {/* Role */}
          <fieldset className="mt-1">
            <legend className="sr-only">Account role</legend>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="tourist"
                  checked={role === "tourist"}
                  onChange={() => setRole("tourist")}
                  className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-400"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Tourist
                </span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="guide"
                  checked={role === "guide"}
                  onChange={() => setRole("guide")}
                  className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-400"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Guide
                </span>
              </label>
            </div>
          </fieldset>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md transition disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-700"></span>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                or
              </span>
            </div>
          </div>

          {/* OAuth placeholder */}
          <button
            type="button"
            className="w-full py-2.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition"
            onClick={() => toast.info("OAuth signup is a demo in this build.")}
          >
            Continue with Google
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
