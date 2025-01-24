"use client";

import React, { useState, useEffect } from "react";
import HeaderLinks from "./HeaderLinks";
import HeaderIcons from "./HeaderIcons";
import { useAppContext } from "@/context/MainContext";
// import { useRouter, usePathname } from "next/navigation";
// import { isLoggedIn } from "@/utils/util_client";

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  // const [loginFlag, setLoginFlag] = useState(true);
  // const router = useRouter();
  // const path = usePathname()
  useAppContext();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevents rendering client-specific content on the server
  }

  return (
    <>
      <nav className="w-full h-16 p-4 flex flex-row sm:flex-row justify-between gap-2 bg-green-400 dark:bg-green-800">
        <HeaderLinks />
        <HeaderIcons />
      </nav>
    </>
  );
}