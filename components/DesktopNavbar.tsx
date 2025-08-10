"use client"

import React from "react"
import Logo from "./Logo"
import { items } from "@/constants"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
import { ModeToggle } from "./Mode-Toggle"
import {  UserButton } from "@clerk/nextjs"

const DesktopNavbar = () => {
  return (
    <div className="hidden border-b bg-background md:block sticky top-0 z-50">
      <nav className="relative flex items-center h-[80px] px-8 w-full">
        
        {/* Left: Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Center: Navigation Links (pixel-perfect center) */}
        <div className="absolute left-1/2 -translate-x-1/2  flex items-center gap-x-6">
          {items.map((item) => (
            <NavbarItem key={item.label} link={item.link} label={item.label} />
          ))}
        </div>

        {/* Right: Mode toggle + User button */}
        <div className="flex items-center gap-6 ml-auto px-5">
          <ModeToggle />
          <UserButton />
        </div>

      </nav>
    </div>
  )
}

const NavbarItem = ({ link, label }: { link: string; label: string }) => {
  const pathname = usePathname()
  const isActive = pathname === link

  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "font-medium text-lg text-muted-foreground hover:text-foreground transition-colors",
          isActive && "text-foreground"
        )}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-amber-300 md:block" />
      )}
    </div>
  )
}

export default DesktopNavbar
