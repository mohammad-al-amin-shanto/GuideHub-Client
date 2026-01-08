"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      console.log("Dashboard: still loading auth...");
      return;
    }

    if (!user) {
      console.log("Dashboard: no user → redirecting to login");
      router.replace("/login");
      return;
    }

    console.log("Dashboard: user loaded:", user);

    const role = user.role;
    console.log("Detected role:", role);

    if (!role) {
      console.log("ERROR: user.role is missing. Sending to login.");
      router.replace("/login");
      return;
    }

    switch (role) {
      case "admin":
        console.log("Redirect → /dashboard/admin");
        router.replace("/dashboard/admin");
        break;
      case "guide":
        console.log("Redirect → /dashboard/guide");
        router.replace("/dashboard/guide");
        break;
      case "tourist":
      default:
        console.log("Redirect → /dashboard/tourist");
        router.replace("/dashboard/tourist");
    }
  }, [loading, user, router]);

  return (
    <div className="text-center py-20 text-gray-500">
      Loading your dashboard…
    </div>
  );
}
