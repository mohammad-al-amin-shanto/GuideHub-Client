"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
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
    } catch (err: unknown) {
      let msg = "Registration failed";
      if (axios.isAxiosError(err)) {
        const serverMsg = getApiErrorMessage(err.response?.data);
        msg = serverMsg ?? err.message ?? msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      toast.error(msg);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
      <form
        onSubmit={submit}
        className="max-w-md space-y-3"
        aria-label="Register form"
      >
        <input
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="w-full p-2 border rounded"
        />
        <input
          required
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          required
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              checked={role === "tourist"}
              onChange={() => setRole("tourist")}
              type="radio"
              name="role"
              value="tourist"
            />
            <span>Tourist</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              checked={role === "guide"}
              onChange={() => setRole("guide")}
              type="radio"
              name="role"
              value="guide"
            />
            <span>Guide</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
