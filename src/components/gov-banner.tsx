"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Building2, Lock } from "lucide-react"

export function GovBanner() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-[#f0f0f0] text-[#1b1b1b] text-xs border-b border-[#dfe1e2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center gap-2 py-1">
          <span className="text-[11px] mt-0.5">🇺🇸</span>
          <span className="font-normal text-[11px]">
            An official website of the United States government
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#005ea2] hover:text-[#1a4480] cursor-pointer"
          >
            Here&apos;s how you know
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>
        {expanded && (
          <div className="pb-3 pt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-3xl">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-[#005ea2] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-[11px]">Official websites use .gov</p>
                <p className="text-[11px] text-[#5c5c5c] leading-relaxed">
                  A <strong>.gov</strong> website belongs to an official government organization in the United States.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-[#538200] mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-[11px]">Secure .gov websites use HTTPS</p>
                <p className="text-[11px] text-[#5c5c5c] leading-relaxed">
                  A <strong>lock</strong> or <strong>https://</strong> means you&apos;ve safely connected to the .gov website.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
