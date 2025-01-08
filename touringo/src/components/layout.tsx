"use client"

import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header"

type MainLayoutProps = {
  children: ReactNode;
  title?: string;
};

export function MainLayout({ children, title = "Home" }: MainLayoutProps) {
  const pageTitle = `TouRingoApp${title ? " | " + title : ""}`;
  return (
    <div className="max-w-[1000px] mx-auto py-2 flex flex-col min-h-[100vh]">
        <Header title={pageTitle} />
        <main className="grow">{children}</main>
        <Footer />
    </div>
  );
}