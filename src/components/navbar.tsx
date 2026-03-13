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
      <div className="bg-[#005086]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden w-[46px] h-[46px]">
              <Image
                src="/logo.png"
                alt="Grant Program Logo"
                fill
                sizes="46px"
                className="brightness-0 invert object-cover object-left"
              />
            </div>
            <span className="text-3xl font-serif font-bold text-white tracking-[0.15em] leading-none mt-1">
              GRANT
            </span>
          </Link>
          <div className="flex items-center gap-1 text-sm text-white/90">
            <button onClick={() => scrollToSection('faq')} className="px-2 py-1.5 sm:px-3 hover:text-white hover:bg-white/10 rounded transition-colors break-keep">
              Help
            </button>
            <span className="text-white/30 hidden sm:inline">|</span>
            <Link href="/check" className="px-2 py-1.5 sm:px-3 hover:text-white hover:bg-white/10 rounded transition-colors break-keep">
              Apply
            </Link>
            <span className="text-white/30 hidden sm:inline">|</span>
            <Link href="/admin" className="px-2 py-1.5 sm:px-3 hover:text-white hover:bg-white/10 rounded transition-colors break-keep">
              Sign in ▾
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary nav - lighter blue */}
      <div className="bg-[#0067a6] border-b border-[#007ac1]">
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
