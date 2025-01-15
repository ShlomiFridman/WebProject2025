"use client";

import { Account } from "./classes";

export const logAccount = (account: Account|null) => {
    if (account == null){
      localStorage.removeItem("loggedAccount");
      console.log("Logged out account");
      return;
    }
    localStorage.setItem("loggedAccount", JSON.stringify(account));
    console.log(`Logged account: ${account?.username}`);
  }
  
  export const getLoggedAccount = () => {
    const data = localStorage.getItem("loggedAccount");
    if (data == null)
      return null;
    return Account.parseJSON(data);
  }
  
  export const isLoggedIn = (): boolean=> {
    return localStorage.getItem("loggedAccount") != null;
  }