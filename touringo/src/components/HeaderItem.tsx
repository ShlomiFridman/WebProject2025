"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
type ItemProps = {
  href: string;
  text: string;
};

const HeaderItem: React.FC<ItemProps> = ({ href, text }) => {
  const path = usePathname();

    return (
      <Link
        href={href}
        className={`font-bold px-2 py-1 rounded hover:underline text-green-800 dark:text-green-400 ${path === href ? "bg-gray-200 dark:bg-gray-700 " : ""
          }`}
      >
        {text}
      </Link>
    );
}

export default HeaderItem;