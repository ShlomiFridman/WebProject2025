"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";
import { AppProvider } from "@/context/MainContext";
import { ThemeProvider } from "@/context/ThemeProvider";

// TODO use reducer to get logged in user (state: username)
// TODO if username is null, Link to login page


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <html lang="en">
      <head>
        <title>TouRingo</title>
      </head>
      <body
        className="max-w-[1000px] mx-auto py-2 flex flex-col min-h-[100vh] bg-white dark:bg-[#292b2f] text-black dark:text-white"
      >
        <AppProvider>
          <ThemeProvider>
            {path != "/login" && path != "/register" ? <Header /> : <></>}
            <main className="grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
