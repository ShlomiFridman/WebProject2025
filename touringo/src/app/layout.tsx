"use client"

import { ThemeProvider } from "@/context/ThemeProvider";  // Import ThemeProvider
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const title = usePathname();

  // TODO use reducer to get logged in user (state: username)
  // TODO if username is null, Link to login page


  return (
    <html lang="en">
      <body className="max-w-[1000px] mx-auto py-2 flex flex-col min-h-[100vh]">
        {/* Wrap everything with ThemeProvider */}
        <ThemeProvider>
          <Header title={title} />
          <main className="grow">{children}</main>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
