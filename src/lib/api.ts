// src/lib/api.ts
import axios, { AxiosHeaders } from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// tiny type-guard to detect AxiosHeaders at runtime (no `any`)
function isAxiosHeaders(h: unknown): h is AxiosHeaders {
  const maybe = h as { set?: unknown } | null;
  return !!maybe && typeof maybe.set === "function";
}

// Attach token if present
API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Only run in browser (avoid SSR localStorage issues)
  if (typeof window !== "undefined") {
    try {
      const token = localStorage.getItem("lg_token");
      if (token) {
        // If headers is an AxiosHeaders-like instance, use .set(),
        // otherwise treat as a plain object and assign Authorization.
        if (!config.headers) {
          // create a plain object headers if missing (typed to axios internal headers)
          config.headers = {
            Authorization: `Bearer ${token}`,
          } as InternalAxiosRequestConfig["headers"];
        } else if (isAxiosHeaders(config.headers)) {
          config.headers.set("Authorization", `Bearer ${token}`);
        } else {
          // headers may be a plain object — mutate it
          const plain = config.headers as Record<string, unknown>;
          plain["Authorization"] = `Bearer ${token}`;
          // reassign back to ensure the config gets the updated headers
          config.headers = plain as InternalAxiosRequestConfig["headers"];
        }
      }
    } catch {
      // ignore localStorage errors (e.g., private mode or SSR)
    }
  }
  return config;
});

// Optional: centralize error message parsing
API.interceptors.response.use(
  (res) => res,
  (err: unknown) => {
    return Promise.reject(err);
  }
);

export default API;
