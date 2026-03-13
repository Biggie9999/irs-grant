import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#1b1b1b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/logo.png"
                alt="IRS Grant Program"
                width={28}
                height={28}
                className="brightness-200 invert rounded"
              />
              <span className="text-sm font-bold">IRS Grant Program</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              The IRS Federal Grant Program provides financial assistance to eligible senior citizens and disabled individuals across the United States.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Quick Links</h4>
            <ul className="space-y-1.5">
              {[
                { label: "Check Eligibility", href: "/check" },
                { label: "About the Program", href: "/" },
                { label: "Contact Us", href: "/" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Contact</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Internal Revenue Service<br />
              1111 Constitution Ave., NW<br />
              Washington, DC 20224
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] text-gray-500">
            &copy; {new Date().getFullYear()} Internal Revenue Service. All rights reserved.
          </p>
          <div className="flex gap-4 text-[11px] text-gray-500">
            <span>Privacy Policy</span>
            <span>Accessibility</span>
            <span>FOIA</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
