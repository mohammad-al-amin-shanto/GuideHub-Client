export default function HeroSearch() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Explore like a local</h1>
        <p className="mb-6 max-w-2xl">
          Find local guides & unique experiences hand-crafted for curious
          travelers.
        </p>
        <div className="bg-white rounded-lg p-4 flex gap-2 items-center">
          <input
            placeholder="Where are you going?"
            className="flex-1 p-2 rounded"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
