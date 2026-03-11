import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-gray-500">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-4 px-6 py-3 bg-black text-white rounded-md hover:opacity-80 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
