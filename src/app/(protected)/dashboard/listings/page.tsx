import Link from "next/link";

export default function SummaryCard({
  title,
  value,
  href,
}: {
  title: string;
  value: string | number;
  href?: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>

      {href && (
        <div className="mt-3">
          <Link href={href} className="text-sm text-indigo-600 hover:underline">
            View →
          </Link>
        </div>
      )}
    </div>
  );
}
