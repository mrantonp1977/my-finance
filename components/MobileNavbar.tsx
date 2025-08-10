"use client"

import React, { useState } from "react"
import Logo from "./Logo"
import { items } from "@/constants"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./Mode-Toggle"
import { UserButton } from "@clerk/nextjs"
import { Menu, X } from "lucide-react"

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden border-b bg-background sticky top-0 z-50">
      <nav className="flex items-center justify-between h-[64px] px-4">
        
        {/* Left: Logo */}
        <Logo />

        {/* Right: Mode toggle + User + Hamburger */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <UserButton />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-md hover:bg-muted"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="bg-background border-t">
          <div className="flex flex-col">
            {items.map((item) => {
              const isActive = pathname === item.link
              return (
                <Link
                  key={item.label}
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium hover:bg-muted transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileNavbar
