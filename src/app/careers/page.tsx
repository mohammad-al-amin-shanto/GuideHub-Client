export default function Page() {
  return (
    <div className="relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-100/30 via-transparent to-sky-100/40" />

      <div className="container mx-auto px-4 py-20">
        {/* Hero */}
        <div className="max-w-3xl">
          <span className="inline-block mb-4 rounded-full bg-black/5 px-4 py-1 text-sm font-medium text-gray-700">
            Careers at GuideHub
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            Build products that help people explore the world better
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            We’re building GuideHub with curiosity, craftsmanship, and care. If
            you enjoy solving meaningful problems and creating thoughtful user
            experiences, you’ll feel right at home here.
          </p>
        </div>

        {/* Divider */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Culture */}
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              🧠 How we think
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We value clarity over complexity. Decisions are guided by user
              needs, long-term thinking, and clean engineering — not hype or
              shortcuts.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              🤝 How we work
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Collaboration, ownership, and respectful feedback define our
              workflow. We trust each other and optimize for learning, not ego.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              🌱 Growth mindset
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We believe great products come from people who keep improving.
              Curiosity, experimentation, and reflection are encouraged at every
              stage.
            </p>
          </div>
        </div>

        {/* Open roles */}
        <div className="mt-20 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Open positions
          </h2>

          <p className="text-gray-600 mb-6">
            We’re not actively hiring right now, but we’re always happy to
            connect with passionate builders, designers, and problem-solvers.
          </p>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-gray-800 font-medium">
              Interested in joining GuideHub?
            </p>
            <p className="text-gray-600 mt-1">
              Send your portfolio, GitHub, or a short note about yourself — we’d
              love to hear from you.
            </p>

            <a
              href="mailto:careers@guidehub.app"
              className="inline-block mt-4 rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
            >
              Reach out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
