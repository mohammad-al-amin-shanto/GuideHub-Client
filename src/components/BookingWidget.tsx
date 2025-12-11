"use client";
import { useState } from "react";
import axios from "axios";
import API from "@/src/lib/api";
import { toast } from "react-toastify";

type Props = { listingId: string; price?: number };

function getApiErrorMessage(data: unknown): string | undefined {
  if (typeof data === "object" && data !== null) {
    const d = data as Record<string, unknown>;
    const m = d["message"];
    if (typeof m === "string") return m;
  }
  return undefined;
}

export default function BookingWidget({ listingId, price = 20 }: Props) {
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!date) return toast.error("Please select a date");
    setLoading(true);
    try {
      await API.post("/bookings", { listingId, date, people });
      toast.success("Booking requested. Awaiting guide confirmation.");
    } catch (err: unknown) {
      let msg = "Booking failed";
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
    <form
      onSubmit={handleRequest}
      className="bg-white p-4 rounded shadow space-y-3"
    >
      <div className="text-lg font-semibold">Book this tour</div>
      <div className="text-sm text-gray-600">Price per person: ${price}</div>

      <label className="block">
        <span className="text-sm">Date</span>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="w-full p-2 border rounded mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm">People</span>
        <input
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          type="number"
          min={1}
          className="w-full p-2 border rounded mt-1"
        />
      </label>

      <button
        disabled={loading}
        className="w-full bg-indigo-600 text-white p-2 rounded"
      >
        {loading
          ? "Requesting..."
          : `Request booking — $${(price * people).toFixed(2)}`}
      </button>
    </form>
  );
}
