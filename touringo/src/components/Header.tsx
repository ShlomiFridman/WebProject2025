import React, { useState, useEffect } from "react";
// import Head from "next/head";
import Link from "next/link";
import HeaderLinks from "./HeaderLinks";
import HeaderIcons from "./HeaderIcons";


export default function Header({ title }: { title: string }) {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this is run only on the client
  }, []);

  // const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!isClient) {
    return null; // Prevents rendering client-specific content on the server
  }

  // TODO add link to alerts

  return (
    <nav className="w-full p-6 flex justify-between gap-2"
         style={{ backgroundColor: 'var(--box-background)' }}>
      
      <HeaderLinks title={title}/>
      
      <HeaderIcons/>
    </nav>
  )
}
