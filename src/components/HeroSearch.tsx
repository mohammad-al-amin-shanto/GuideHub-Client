"use client";

import React, { useRef, useState } from "react";

export default function HeroSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [q, setQ] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // lightweight mock suggestions based on typed text
  const SUGGESTIONS = [
    "Dhaka",
    "Cox's Bazar",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
  ];
  const filteredSuggestions =
    q.length > 0
      ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(q.toLowerCase()))
      : [];

  const onSearch = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    // replace with your router / API call
    alert(`Searching for: ${q || "Anywhere"}`);
  };

  // focus input on hover (visual + real focus) — helpful for quick interactions
  const onMouseEnterContainer = () => {
    inputRef.current?.focus();
  };
  const onMouseLeaveContainer = () => {
    // don't blur if user typed or focused manually; only blur if input is empty
    if (document.activeElement === inputRef.current && q === "") {
      inputRef.current?.blur();
    }
  };

  return (
    <section className="bg-linear-to-r from-indigo-600 to-indigo-400 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 drop-shadow-sm text-center">
          Explore like a local
        </h1>
        <p className="mb-6 max-w-2xl text-indigo-50/90 mx-auto text-center">
          Find local guides & unique experiences hand-crafted for curious
          travelers.
        </p>

        {/* center the form */}
        <form
          onSubmit={onSearch}
          className="relative max-w-3xl mx-auto"
          onMouseEnter={onMouseEnterContainer}
          onMouseLeave={onMouseLeaveContainer}
          aria-labelledby="explore-search"
        >
          <span id="explore-search" className="sr-only">
            Search destinations, guides, or tags
          </span>

          <div className="bg-white rounded-lg p-2 flex flex-col sm:flex-row sm:items-center gap-2 shadow-md transition-shadow duration-150 hover:shadow-lg">
            {/* Location icon */}
            <div className="px-2 flex items-center text-gray-400" aria-hidden>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 11.5c0 5.25-8 9.5-8 9.5S4 16.75 4 11.5a8 8 0 1116 0z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => {
                const v = e.target.value;
                setQ(v);
                // only show suggestions when there's something typed
                setShowSuggestions(v.length > 0);
              }}
              onFocus={() => {
                // focus shouldn't automatically open suggestions unless there's text
                if (q.length > 0) setShowSuggestions(true);
              }}
              onBlur={() => {
                // small delay so click on suggestion registers before hiding
                setTimeout(() => setShowSuggestions(false), 150);
              }}
              aria-label="Where are you going?"
              placeholder="Where are you going? (e.g. Dhaka, Cox's Bazar)"
              className="w-full sm:flex-1 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none
                         focus:ring-2 focus:ring-indigo-500 transition-colors
                         caret-indigo-600"
            />

            {/* Clear button (appears when text present) */}
            {q ? (
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  inputRef.current?.focus();
                  setShowSuggestions(false);
                }}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Clear search"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            ) : null}

            <div className="hidden sm:block border-l h-8 border-gray-200" />

            {/* Search button */}
            <button
              type="submit"
              className="w-full sm:w-auto ml-0 sm:ml-2 px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Search"
            >
              Search
            </button>
          </div>

          {/* Suggestions dropdown: only appears when user typed something */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul
              role="listbox"
              aria-label="Search suggestions"
              className="absolute left-0 right-0 mt-2 bg-white rounded-md shadow-lg z-20 max-h-44 overflow-auto"
            >
              {filteredSuggestions.map((s) => (
                <li
                  key={s}
                  role="option"
                  aria-selected="false"
                  tabIndex={0}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setQ(s);
                    setShowSuggestions(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setQ(s);
                      setShowSuggestions(false);
                      inputRef.current?.focus();
                    }
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-indigo-50"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* subtle helper text */}
        <div className="mt-3 text-sm text-indigo-50/80 max-w-3xl mx-auto text-center">
          Tip: hover the search bar to quickly start typing. Use city names or
          tags for best results.
        </div>
      </div>
    </section>
  );
}
