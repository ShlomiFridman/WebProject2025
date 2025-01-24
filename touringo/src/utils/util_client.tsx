"use client";

import { useEffect, useState } from "react";
import { Account } from "./classes";
import Image from "next/image";

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

export const ImageElement: React.FC<{ src: string; title: string; className?: string }> = ({ src, title, className = "" }) => {
  const [isValidSrc, setIsValidSrc] = useState<boolean>(false);
  const [altText, setAltText] = useState<string>(title);

  // Validate the src based on the allowed prefixes
  useEffect(() => {
    const isValid = src.startsWith("data:image") || src.startsWith("https://") || src.startsWith("/");
    setIsValidSrc(isValid);
  }, [src]);

  const handleImageError = () => {
    setAltText("404: invalid URL");
  };

  // Render only if the URL is valid
  if (!isValidSrc) {
    return <span>Invalid image URL</span>;
  }

  return (
    <Image
      unoptimized
      src={src}
      alt={altText}
      title={title}
      className={className}
      width={150}
      height={100}
      loading="lazy"
      placeholder="blur"
      blurDataURL={"\\event_images\\gala.jpg"}
      onError={handleImageError}
    />
  );
};

export const InfoElement: React.FC<{ infoMap: Map<string, string> }> = ({ infoMap }) => {
  return (
    <div>
      {Array.from(infoMap.entries()).map(([key, val], ind) => (
        <div key={ind}>
          <strong>{key}:</strong> {val}
        </div>
      ))}
    </div>
  );
};