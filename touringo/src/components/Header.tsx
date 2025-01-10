"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head"; // Import the next/head component
import HeaderLinks from "./HeaderLinks";
import HeaderIcons from "./HeaderIcons";

export default function Header({ title }: { title: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this is run only on the client
  }, []);

  useEffect(() => {
    // Dynamically update the title when the `title` prop changes
    document.title = `${title} - TouRingo App`; // Adjust format as needed
  }, [title]); // Runs each time the title changes

  if (!isClient) {
    return null; // Prevents rendering client-specific content on the server
  }

  return (
    <>
      <Head>
        <title>{`${title} - TouRingo App`}</title>
      </Head>

      <nav className="w-full p-6 flex justify-between gap-2" style={{ backgroundColor: "var(--box-background)" }}>
        <HeaderLinks title={title} />
        <HeaderIcons />
      </nav>
    </>
  );
}
