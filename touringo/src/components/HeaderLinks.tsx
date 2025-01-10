"use client";

import Link from "next/link";

export default function HeaderLinks({ title }: { title: string }) {
  console.log(title)
  
  return (
    <div className="flex justify-start gap-3">
  <Link
    href="/"
    className="text-green-800 font-bold hover:underline px-2 py-1 rounded"
    style={{
      color: 'var(--header-links)', 
      backgroundColor: title === "/" ? "var(--background)" : ""
    }}
  >
    Attractions
  </Link>

  <Link
    href="/bookings"
    className="text-green-800 font-bold hover:underline px-2 py-1 rounded"
    style={{
      color: 'var(--header-links)', 
      backgroundColor: title === "/bookings" ? "var(--background)" : ""
    }}
  >
    Bookings
  </Link>

  <Link
    href="/profile"
    className="text-green-800 font-bold hover:underline px-2 py-1 rounded"
    style={{
      color: 'var(--header-links)', 
      backgroundColor: title === "/profile" ? "var(--background)" : ""
    }}
  >
    Profile
  </Link>

  <Link
    href="/about"
    className="text-green-800 font-bold hover:underline px-2 py-1 rounded"
    style={{
      color: 'var(--header-links)', 
      backgroundColor: title === "/about" ? "var(--background)" : ""
    }}
  >
    About
  </Link>
</div>
  );
}
