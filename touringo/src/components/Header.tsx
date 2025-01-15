"use client";

import React, { useState, useEffect } from "react";
import HeaderLinks from "./HeaderLinks";
import HeaderIcons from "./HeaderIcons";
import { useAppContext } from "@/context/MainContext";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/utils/util_client";

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  useAppContext();

  useEffect(() => {
    setIsClient(true); // Ensures this is run only on the client
    if (!isLoggedIn()){
      alert("You must login");
      redirect("/login");
    }
  }, []);

  if (!isClient) {
    return null; // Prevents rendering client-specific content on the server
  }

  return (
    <>

      <nav className="w-full p-6 flex flex-col sm:flex-row justify-between gap-2 bg-green-400 dark:bg-green-800">
        <HeaderLinks />
        <HeaderIcons />
      </nav>
    </>
  );
}
