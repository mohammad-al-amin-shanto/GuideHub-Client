export default function Page() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50/40 via-white to-slate-50/40" />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 mb-6 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-600">
            Privacy & Terms
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Your trust matters at GuideHub
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Transparency, security, and respect for your data are core to how
            GuideHub operates. This page outlines how we handle your information
            and the terms that apply when using our platform.
          </p>
        </div>

        {/* Divider */}
        <div className="my-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Content */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Privacy Policy */}
          <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 text-xl">
                🔒
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Privacy Policy
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              We collect only what’s necessary to deliver a reliable and
              personalized GuideHub experience — such as account details and
              essential usage data.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Your information is never sold. Ever. Data is used strictly to
              improve platform functionality, safety, and overall experience.
            </p>

            <p className="text-gray-600 leading-relaxed">
              You remain in control of your data and may request access,
              corrections, or deletion at any time.
            </p>
          </section>

          {/* Terms of Use */}
          <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 text-xl">
                📜
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Terms of Use</h2>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">
              By using GuideHub, you agree to act responsibly and respectfully.
              All shared content must be lawful, accurate, and aligned with our
              community standards.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              GuideHub is continuously evolving. Features may change as we grow,
              but our commitment to quality and trust remains constant.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Abuse, misuse, or attempts to compromise platform security may
              result in restricted access or account suspension.
            </p>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-24 max-w-2xl">
          <p className="text-sm text-gray-500 leading-relaxed">
            This page provides a simplified overview of our policies. As
            GuideHub grows, more detailed legal documentation may be introduced
            to reflect new features and regulations.
          </p>
        </div>
      </div>
    </div>
  );
}
