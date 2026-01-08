"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import API from "@/lib/api";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: "tourist" | "guide" | "admin";
};

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refresh: async () => {},
  logout: async () => {},
});

/* -------------------------------------------
   HELPER: Convert unknown backend responses 
   into a clean AppUser object
-------------------------------------------- */

function toAppUser(obj: unknown): AppUser | null {
  if (!obj || typeof obj !== "object") return null;

  const raw = obj as Record<string, unknown>;

  const id = (raw.id as string) || (raw._id as string);

  const name = raw.name as string;
  const email = raw.email as string;
  const role = raw.role as AppUser["role"];

  if (!id || !name || !email || !role) return null;

  return { id, name, email, role };
}

/* Extract user from any shape API returns */
function normalizeUser(payload: unknown): AppUser | null {
  if (!payload || typeof payload !== "object") return null;

  const obj = payload as Record<string, unknown>;

  // Format 1: { user: {...} }
  if (obj.user) return toAppUser(obj.user);

  // Format 2: { data: {...} }
  if (obj.data) return toAppUser(obj.data);

  // Format 3: direct object
  const direct = toAppUser(obj);
  if (direct) return direct;

  // Format 4: nested unknown structures
  for (const v of Object.values(obj)) {
    const nested = toAppUser(v);
    if (nested) return nested;
  }

  return null;
}

/* -------------------------------------------
   PROVIDER
-------------------------------------------- */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await API.get("/api/auth/me");

      const parsed = normalizeUser(res.data);
      setUser(parsed ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await API.post("/api/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
