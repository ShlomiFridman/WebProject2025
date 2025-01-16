"use client";

import { Account } from "./classes";

export const logAccount = (account: Account | null) => {
  if (typeof window === "undefined") return; // Prevent execution on the server

  if (account == null) {
    localStorage.removeItem("loggedAccount");
    console.log("Logged out account");
    return;
  }

  localStorage.setItem("loggedAccount", JSON.stringify(account));
  console.log(`Logged account: ${account.username}`);
};

export const getLoggedAccount = (): Account | null => {
  if (typeof window === "undefined") return null; // Prevent execution on the server

  const data = localStorage.getItem("loggedAccount");
  if (!data) return null;

  return Account.parseJSON(data);
};

export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false; // Prevent execution on the server

  return localStorage.getItem("loggedAccount") != null;
};
