"use client";

import React, { useState, useEffect } from "react";
import HeaderLinks from "./HeaderLinks";
import HeaderIcons from "./HeaderIcons";
import { useAppContext } from "@/context/MainContext";
import { redirect, usePathname } from "next/navigation";
import { isLoggedIn } from "@/utils/util_client";
import Link from "next/link";

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const [loginFlag, setLoginFlag] = useState(true); 
  const path = usePathname()
  useAppContext();

  useEffect(() => {
    setLoginFlag(path != "/login" && path != "/register" && path != "/");
    setIsClient(true); // Ensures this is run only on the client
    if (path != "/login" && path != "/register" && path != "/") {
      if (!isLoggedIn()) {
        alert("You must login");
        redirect("/login");
      }
    }
  }, [path]);

  if (!isClient) {
    return null; // Prevents rendering client-specific content on the server
  }

  return (
    <>
      <nav className="w-full p-6 flex flex-col sm:flex-row justify-between gap-2 bg-green-400 dark:bg-green-800">
        {loginFlag? <HeaderLinks /> : <div className="flex justify-start gap-3 relative">
          <Link
        href="/"
        className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${path === "/" ? "bg-gray-200 dark:bg-gray-700 " : ""
          }`}
      >
        TouRingo
      </Link>
        <Link
        href="/login"
        className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${path === "/login" ? "bg-gray-200 dark:bg-gray-700 " : ""
          }`}
      >
        Login
      </Link>
      <Link
        href="/register"
        className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${path === "/register" ? "bg-gray-200 dark:bg-gray-700 " : ""
          }`}
      >
        Register
      </Link></div>}
        <HeaderIcons loginFlag={loginFlag} />
      </nav>
    </>
  );
}
