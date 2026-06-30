import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        <Compass size={32} className="text-blue-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800">404 — Page Not Found</h1>
      <p className="max-w-md text-center text-sm text-gray-500">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
