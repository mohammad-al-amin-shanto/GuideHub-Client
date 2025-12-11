import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <a className="font-bold text-lg">LocalGuide</a>
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/explore">
            <a>Explore Tours</a>
          </Link>
          <Link href="/register">
            <a className="hidden sm:inline">Become a Guide</a>
          </Link>
          <Link href="/login">
            <a className="btn">Login</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
