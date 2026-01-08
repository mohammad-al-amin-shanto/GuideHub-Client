export default function ToursPage({
  searchParams,
}: {
  searchParams?: { guide?: string };
}) {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Tours</h1>

      {searchParams?.guide && (
        <p className="text-gray-600">
          Showing tours for guide: {searchParams.guide}
        </p>
      )}
    </div>
  );
}
