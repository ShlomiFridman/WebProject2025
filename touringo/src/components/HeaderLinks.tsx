"use client"; // Declares this as a client-side component

import { getLoggedAccount } from "@/utils/util_client"; // Utility to fetch the currently logged-in account
import Link from "next/link"; // Next.js Link for navigation
import { usePathname } from "next/navigation"; // Hook for accessing the current pathname
import React, { useState, useEffect, useRef } from "react"; // React utilities for state, lifecycle, and DOM references
import HeaderItem from "./HeaderItem"; // Custom component for individual header items

/**
 * A component displaying navigation links and a user profile menu,
 * including responsive dropdown functionality and external links.
 */
export default function HeaderLinks() {
  // Define dropdown menu links
  const dropdownLinks = [
    { href: "/profile", text: "My Profile" },
    { href: "/myEvents", text: "My Events" },
    { href: "/bookings", text: "My Bookings" },
    { href: "/login", text: "Logout" },
  ];

  const linkClasses = "block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap";
  const path = usePathname(); // Current path
  const loggedAccount = getLoggedAccount(); // Logged account data
  const username = loggedAccount?.username || "Profile"; // Default to "Profile" if no username

  // State variables for toggling menus
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for detecting clicks outside the dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown open/close
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // Toggle menu open/close
  };

  // Close the dropdown if a click occurs outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick); // Attach listener

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="relative">
      {/* Hamburger menu button for mobile view */}
      <button
        className="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={toggleMenu}
      >
        <span className="sr-only">Open Main Menu</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Navigation links */}
      <div
        className={`flex flex-col gap-3 relative sm:flex-row sm:gap-6 bg-white dark:bg-gray-800 sm:bg-transparent dark:sm:bg-transparent ${
          isMenuOpen ? "block" : "hidden sm:flex"
        }`}
      >
        <HeaderItem href="/" text="🏙 TouRingo" /> {/* Home link */}
        {loggedAccount ? (
          // Dropdown menu for logged-in users
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={`font-bold px-2 py-1 rounded hover:underline ${
                path === "/profile" || path === "/myEvents" || path === "/bookings"
                  ? "bg-gray-200 dark:bg-gray-700"
                  : ""
              }`}
            >
              [{username}] {/* Display logged-in username */}
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border rounded shadow-lg z-10">
                {/* Render dropdown links */}
                {dropdownLinks.map(({ href, text }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`${linkClasses} ${
                      path === href ? "bg-gray-100 dark:bg-gray-700" : ""
                    }`}
                    aria-current={path === href ? "page" : undefined}
                    onClick={() => setIsDropdownOpen(false)} // Close dropdown on link click
                  >
                    {text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Links for unauthenticated users
          <>
            <HeaderItem href="/login" text="Login" />
            <HeaderItem href="/register" text="Register" />
          </>
        )}
        <HeaderItem href="/about" text="About" /> {/* About page link */}
      </div>
    </div>
  );
}
