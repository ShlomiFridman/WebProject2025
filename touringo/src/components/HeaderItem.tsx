"use client"; // Declares this as a client-side component

import Link from "next/link"; // Next.js Link for navigation
import { usePathname } from "next/navigation"; // Hook to access the current pathname
import React from "react";

// Type definition for HeaderItem props
type ItemProps = {
  href: string; // URL for the link
  text: string; // Text to display for the link
};

/**
 * A simple component to display a navigation link.
 * It highlights the active link based on the current pathname.
 */
const HeaderItem: React.FC<ItemProps> = ({ href, text }) => {
  const path = usePathname(); // Get the current path

  return (
    <Link
      href={href} // Sets the link destination
      className={`font-bold px-2 py-1 rounded hover:underline ${
        path === href ? "bg-gray-200 dark:bg-gray-700" : ""
      }`} // Conditional styling for the active path
    >
      {text} {/* Display link text */}
    </Link>
  );
}

export default HeaderItem;
