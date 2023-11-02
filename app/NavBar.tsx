"use client"
import Link from 'next/link'
import React from 'react'
import {FaBug} from "react-icons/fa"
import {usePathname} from "next/navigation"

const NavBar = () => {
    const currentPath = usePathname();
    const navItems = [{label: "Dashboard", href: "/"},{label: "Issues", href: "/issues"}]
  return (
    <div className='flex h-14 px-10 border-b-[1px] space-x-6 border-zinc-300 text-xl font-semibold items-center'>
        <Link href={"/"}> <FaBug/> </Link>
        <ul className='flex space-x-6'>
            {navItems.map(navItem => (

            <Link key={navItem.href} href={navItem.href} className={currentPath === navItem.href ? `text-zinc-800`:`text-zinc-500 hover:text-zinc-800 `}> {navItem.label}</Link>
            ))}
        </ul>
    </div>
  )
}

export default NavBar