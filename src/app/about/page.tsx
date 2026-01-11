export default function Page() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-50 via-white to-purple-50" />

      <div className="container mx-auto px-4 py-24">
        {/* Hero */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
            About GuideHub
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Experience cities the way locals truly live them
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            GuideHub is a platform for curious travelers who want more than
            surface-level itineraries. We connect you with real people, real
            stories, and real experiences — beyond tourist checklists.
          </p>
        </div>

        {/* Divider */}
        <div className="my-20 h-px w-full bg-linear-to-r from-transparent via-gray-300 to-transparent" />

        {/* Feature grid */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md">
            <div className="mb-4 text-3xl">🌍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Why GuideHub exists
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Most travel platforms highlight the same overcrowded spots.
              GuideHub focuses on what’s often overlooked — neighborhoods, local
              culture, hidden food gems, and stories you won’t find in
              brochures.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md">
            <div className="mb-4 text-3xl">🧭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              What makes us different
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We value clarity, trust, and simplicity. No clutter. No noise.
              Just carefully presented recommendations in a modern interface
              that respects your time and curiosity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md">
            <div className="mb-4 text-3xl">🚀</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Our vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We’re building a world where travel feels personal again —
              planning becomes exciting, discovery feels natural, and every city
              tells its own authentic story.
            </p>
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-24 max-w-2xl">
          <p className="text-2xl font-semibold text-gray-900 leading-snug">
            GuideHub isn’t about ticking places off a list.
          </p>
          <p className="mt-2 text-lg text-gray-600">
            It’s about understanding a place before you ever arrive.
          </p>
        </div>
      </div>
    </section>
  );
}
