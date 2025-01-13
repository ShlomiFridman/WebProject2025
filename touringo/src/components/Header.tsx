"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import HeaderLinks from "./HeaderLinks";
import HeaderIcons from "./HeaderIcons";

export default function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this is run only on the client
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
