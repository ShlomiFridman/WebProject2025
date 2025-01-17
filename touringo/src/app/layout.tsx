"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";
import { AppProvider } from "@/context/MainContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { useEffect } from "react";

// TODO use reducer to get logged in user (state: username)
// TODO if username is null, Link to login page


export default function RootLayout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://bringthemhomenow.net/1.1.0/hostages-ticker.js";
    script.integrity = "sha384-DHuakkmS4DXvIW79Ttuqjvl95NepBRwfVGx6bmqBJVVwqsosq8hROrydHItKdsne";
    script.crossOrigin = "anonymous";
    script.async = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Cleanup on unmount
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>TouRingo</title>
      </head>
      <body
        className="max-w-[1000px] mx-auto py-2 flex flex-col min-h-[100vh] bg-white dark:bg-[#292b2f] text-black dark:text-white"
      >
        <div id="bthn" lang="he"></div>
        <AppProvider>
          <ThemeProvider>
            <Header />
            <main className="grow bg-gray-100 px-3 dark:bg-gray-600">{children}</main>
            <Footer />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
