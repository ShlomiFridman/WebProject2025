"use client";

import React, { useState, useEffect } from "react";
import HeaderLinks from "./HeaderLinks";
import HeaderIcons from "./HeaderIcons";
import { useAppContext } from "@/context/MainContext";
import { myStyles } from "./styles";

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  useAppContext();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevents rendering client-specific content on the server
  }

  return (
    <>
      <nav className={myStyles.headerContainer_green}>
        <HeaderLinks />
        <HeaderIcons />
      </nav>
    </>
  );
}