"use client";

import { getLoggedAccount } from "@/utils/util_client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import HeaderItem from "./HeaderItem";

export default function HeaderLinks() {
  const path = usePathname();
  const loggedAccount = getLoggedAccount();
  const username = loggedAccount?.username || "Profile";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        className="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={toggleMenu}
      >
        <span className="sr-only">Open Main Menu</span>
        <svg
          className="w-6 h-6 text-green-800 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Links Container */}
      <div
        className={`sm:flex flex-col sm:flex-row justify-start gap-3 relative bg-white dark:bg-gray-800 sm:bg-transparent dark:sm:bg-transparent ${
          isMenuOpen ? "block" : "hidden sm:block"
        }`}
      >
        <HeaderItem href="/" text="🏙 TouRingo" />
        {loggedAccount ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${
                path === "/profile" || path === "/events" || path === "/bookings"
                  ? "bg-gray-200 dark:bg-gray-700 "
                  : ""
              }`}
            >
              [{username}]
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-30 mt-2 bg-white dark:bg-gray-800 border rounded shadow-lg z-10">
                <Link
                  href="/profile"
                  className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-green-800 dark:text-green-400 whitespace-nowrap ${
                    path === "/profile" ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/myEvents"
                  className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-green-800 dark:text-green-400 whitespace-nowrap ${
                    path === "/myEvents" ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Events
                </Link>
                <Link
                  href="/bookings"
                  className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-green-800 dark:text-green-400 whitespace-nowrap ${
                    path === "/bookings" ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Bookings
                </Link>
                <Link
                  href="/login"
                  className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-green-800 dark:text-green-400 whitespace-nowrap ${
                    path === "/bookings" ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <HeaderItem href="/login" text="Login" />
            <HeaderItem href="/register" text="Register" />
          </>
        )}
        <HeaderItem href="/about" text="About" />
      </div>
    </div>
  );
}
