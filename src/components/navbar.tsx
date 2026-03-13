"use client"

import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="IRS Grant Program Logo"
            width={44}
            height={44}
            className="rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight tracking-tight">IRS Grant</span>
            <span className="text-[10px] font-medium text-muted-foreground leading-tight uppercase tracking-widest">Federal Program</span>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-accent"
          >
            Home
          </Link>
          <Link
            href="/check"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            Check Eligibility
          </Link>
        </div>
      </div>
    </nav>
  )
}
