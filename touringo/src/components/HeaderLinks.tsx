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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
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
    <div className="flex justify-start gap-3 relative">
      <HeaderItem href="/" text="🏙 TouRingo" />
      {loggedAccount ?
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${path === "/profile" || path === "/events" || path === "/bookings" ? "bg-gray-200 dark:bg-gray-700 " : ""
              }`}
          >
            {username}
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white dark:bg-gray-800 border rounded shadow-lg z-10">
              <Link
                href="/profile"
                className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-green-800 dark:text-green-400 whitespace-nowrap ${path === "/profile" ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                onClick={() => setIsDropdownOpen(false)}
              >
                My Profile
              </Link>
              <Link
                href="/myEvents"
                className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-green-800 dark:text-green-400 whitespace-nowrap ${path === "/myEvents" ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                onClick={() => setIsDropdownOpen(false)}
              >
                My Events
              </Link>
              <Link
                href="/bookings"
                className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-green-800 dark:text-green-400 whitespace-nowrap ${path === "/bookings" ? "bg-gray-100 dark:bg-gray-700" : ""
                  }`}
                onClick={() => setIsDropdownOpen(false)}
              >
                My Bookings
              </Link>
            </div>
          )}
        </div>
        : <>
        <HeaderItem href="/login" text="Login"/>
        <HeaderItem href="/register" text="Register"/>
        </>
      }
      <HeaderItem href="/about" text="About" />
    </div>
  );
}
