"use client";

const steps = [
  { title: "Search", desc: "Tell us where you're going and what you love." },
  { title: "Pick a guide", desc: "Browse expert profiles and reviews." },
  {
    title: "Book & enjoy",
    desc: "Secure payment and a memorable local experience.",
  },
];

export default function HowItWorks() {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-6">How it works</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {steps.map((s, i) => (
          <div key={s.title} className="bg-white p-6 rounded-lg shadow">
            <div className="text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {i + 1}
            </div>
            <h3 className="font-semibold mt-4">{s.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
