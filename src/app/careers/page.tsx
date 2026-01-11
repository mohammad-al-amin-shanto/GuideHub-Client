export default function CareersPage() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-sky-50" />

      <div className="container mx-auto px-4 py-24">
        {/* HERO */}
        <section className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700">
            Careers at GuideHub
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Build tools that help people explore the world better
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            GuideHub is built with intention — clean design, thoughtful
            engineering, and a strong focus on real human experiences. If you
            enjoy solving meaningful problems and shipping quality work, you’ll
            fit right in.
          </p>
        </section>

        {/* DIVIDER */}
        <div className="my-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* CULTURE */}
        <section className="grid gap-10 md:grid-cols-3">
          <CultureCard
            title="How we think"
            icon="🧠"
            text="We value clarity over complexity. Decisions are guided by user needs, long-term impact, and clean engineering — not hype or shortcuts."
          />
          <CultureCard
            title="How we work"
            icon="🤝"
            text="Ownership, collaboration, and respectful feedback define our workflow. We trust each other and optimize for learning, not ego."
          />
          <CultureCard
            title="Growth mindset"
            icon="🌱"
            text="Great products come from people who keep improving. Curiosity, experimentation, and reflection are encouraged at every stage."
          />
        </section>

        {/* OPEN ROLES */}
        <section className="mt-24 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Open positions
          </h2>

          <p className="text-gray-600 mb-8">
            We’re not actively hiring at the moment, but we’re always happy to
            connect with thoughtful builders, designers, and problem-solvers.
          </p>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              Interested in GuideHub?
            </h3>

            <p className="mt-2 text-gray-600">
              Share your portfolio, GitHub, or a short note about what excites
              you. If there’s a fit, we’ll reach out.
            </p>

            <a
              href="mailto:careers@guidehub.app"
              className="inline-flex items-center justify-center mt-6 rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              Contact us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------------------------------
   Components
---------------------------------------- */

function CultureCard({
  title,
  icon,
  text,
}: {
  title: string;
  icon: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
