"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderLinks() {
  const path = usePathname();
  
  return (
    <div className="flex justify-start gap-3">
  <Link
    href="/"
    className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${
      path === "/" ? "bg-gray-200 dark:bg-gray-700 " : ""
    }`}
  >
    Attractions
  </Link>

  <Link
    href="/bookings"
    className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${
      path === "/bookings" ? "bg-gray-200  dark:bg-gray-700 " : ""
    }`}
  >
    Bookings
  </Link>

  <Link
    href="/profile"
    className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${
      path === "/profile" ? "bg-gray-200  dark:bg-gray-700 " : ""
    }`}
  >
    Profile
  </Link>

  <Link
    href="/about"
    className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${
      path === "/about" ? "bg-gray-200 dark:bg-gray-700 " : ""
    }`}
  >
    About
  </Link>

  <Link
    href="/login"
    className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-red-400 ${
      path === "/login" ? "bg-gray-200 dark:bg-gray-700 " : ""
    }`}
  >
    Log Out
  </Link>
</div>
  );
}
