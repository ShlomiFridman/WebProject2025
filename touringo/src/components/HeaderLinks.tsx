"use client";

import Link from "next/link";

export default function HeaderLinks({ title }: { title: string }) {
  
  return (
    <div className="flex justify-start gap-3">
  <Link
    href="/"
    className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${
      title === "/" ? "bg-gray-200 dark:bg-gray-700 " : ""
    }`}
  >
    Attractions
  </Link>

  <Link
    href="/bookings"
    className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${
      title === "/bookings" ? "bg-gray-200  dark:bg-gray-700 " : ""
    }`}
  >
    Bookings
  </Link>

  <Link
    href="/profile"
    className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${
      title === "/profile" ? "bg-gray-200  dark:bg-gray-700 " : ""
    }`}
  >
    Profile
  </Link>

  <Link
    href="/about"
    className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${
      title === "/about" ? "bg-gray-200 dark:bg-gray-700 " : ""
    }`}
  >
    About
  </Link>
</div>
  );
}
