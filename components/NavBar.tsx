"use client";
import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";

const NavBar = () => {
  const currentPath = usePathname();
  const navItems = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  
  return (
    <div className="border-b-[1px] border-zinc-300 ">
      <div className="flex justify-between h-14 container mx-auto space-x-6 text-xl font-semibold items-center">
        <div className="flex items-center gap-4">
        <a href={"/"}>
          <FaBug className='text-foreground' />
        </a>
        <ul className="flex space-x-6">
          {navItems.map((navItem) => (
            <Link
              key={navItem.href}
              href={navItem.href}
              className={
                currentPath === navItem.href
                  ? `text-foreground`
                  : `text-secondary hover:text-foreground`
              }
            >
              {" "}
              {navItem.label}
            </Link>
          ))}
        </ul>

        </div>
        <div>

        <ModeToggle/>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
