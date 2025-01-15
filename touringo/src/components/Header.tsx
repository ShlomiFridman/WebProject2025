"use client";

import React, { useEffect } from "react";
import HeaderLinks from "./HeaderLinks";
import HeaderIcons from "./HeaderIcons";
import { useAppContext } from "@/context/MainContext";
import { redirect } from "next/navigation";

export default function Header() {
  const {state} = useAppContext();

  useEffect(() => {
    if (state.loggedAccount == null){
      alert("You must login first");
      redirect("/login");
    }
  }, [state]);

  return (
    <>

      <nav className="w-full p-6 flex flex-col sm:flex-row justify-between gap-2 bg-green-400 dark:bg-green-800">
        <HeaderLinks />
        <HeaderIcons />
      </nav>
    </>
  );
}
