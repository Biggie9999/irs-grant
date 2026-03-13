"use client"

import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"

export function Navbar() {
  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Primary nav - dark blue IRS-style */}
      <div className="bg-[#1a1a5e]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Grant Program Logo"
              width={36}
              height={36}
              className="rounded brightness-200 invert"
            />
            <span className="text-xl font-bold text-white tracking-tight">
              Grant
            </span>
          </Link>
          <div className="flex items-center gap-1 text-sm text-white/90">
            <button onClick={() => scrollToSection('faq')} className="hidden sm:inline-flex px-3 py-1.5 hover:text-white hover:bg-white/10 rounded transition-colors">
              Help
            </button>
            <span className="hidden sm:inline text-white/30">|</span>
            <Link href="/check" className="hidden sm:inline-flex px-3 py-1.5 hover:text-white hover:bg-white/10 rounded transition-colors">
              Apply
            </Link>
            <span className="hidden sm:inline text-white/30">|</span>
            <Link href="/admin" className="hidden sm:inline-flex px-3 py-1.5 hover:text-white hover:bg-white/10 rounded transition-colors">
              Sign in ▾
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary nav - lighter blue */}
      <div className="bg-[#2b2b8b] border-b border-[#3d3da3]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <nav className="flex items-center gap-0 overflow-x-auto">
            <button onClick={() => scrollToSection('how-it-works')} className="whitespace-nowrap px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors border-b-2 border-transparent hover:border-white/50">
              Grants
            </button>
            <button onClick={() => scrollToSection('who-qualifies')} className="whitespace-nowrap px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors border-b-2 border-transparent hover:border-white/50">
              Eligibility
            </button>
            <button onClick={() => scrollToSection('faq')} className="whitespace-nowrap px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors border-b-2 border-transparent hover:border-white/50">
              Benefits
            </button>
            <Link href="/check" className="whitespace-nowrap px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors border-b-2 border-transparent hover:border-white/50">
              Apply Now
            </Link>
            <button onClick={() => scrollToSection('faq')} className="whitespace-nowrap px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors border-b-2 border-transparent hover:border-white/50">
              Contact Us
            </button>
          </nav>
          <div className="hidden sm:flex items-center gap-1">
            <input
              type="text"
              placeholder="Search"
              className="h-8 w-36 rounded-l border-0 bg-white px-3 text-sm text-[#1b1b1b] placeholder:text-gray-400 focus:outline-none focus:ring-0"
              readOnly
            />
            <button className="flex h-8 w-8 items-center justify-center rounded-r bg-[#0050aa] text-white hover:bg-[#003d7a] transition-colors">
              <Search className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
