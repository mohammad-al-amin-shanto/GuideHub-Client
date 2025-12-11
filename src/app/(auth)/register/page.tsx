"use client";
import { useState } from "react";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import API from "@/src/lib/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"tourist" | "guide">("tourist");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem("lg_token", data.token);
      toast.success("Welcome! Registration successful.");
      router.push("/dashboard");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Registration failed";
      toast.error(msg);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
      <form onSubmit={submit} className="max-w-md space-y-3">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="w-full p-2 border rounded"
        />
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2">
          <label>
            <input
              checked={role === "tourist"}
              onChange={() => setRole("tourist")}
              type="radio"
            />{" "}
            Tourist
          </label>
          <label>
            <input
              checked={role === "guide"}
              onChange={() => setRole("guide")}
              type="radio"
            />{" "}
            Guide
          </label>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
