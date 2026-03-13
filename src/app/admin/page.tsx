"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import {
  Shield, Plus, Trash2, Users, FileText, Eye, EyeOff,
  Loader2, DollarSign, CheckCircle2, Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Winner {
  id: string
  firstName: string
  lastName: string
  dob: string
  ssnLast4: string
  grantAmount: number
  status: string
  createdAt: string
}

interface Claim {
  id: string
  winnerId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  ssnLast4: string
  notes: string
  submittedAt: string
  status: string
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [activeTab, setActiveTab] = useState<"winners" | "claims">("winners")
  const [winners, setWinners] = useState<Winner[]>([])
  const [claims, setClaims] = useState<Claim[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newWinner, setNewWinner] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    ssnLast4: "",
    grantAmount: "",
    status: "pending",
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [winnersRes, claimsRes] = await Promise.all([
        fetch("/api/admin/winners", { headers: { Authorization: `Bearer ${password}` } }),
        fetch("/api/admin/claims", { headers: { Authorization: `Bearer ${password}` } }),
      ])
      const winnersData = await winnersRes.json()
      const claimsData = await claimsRes.json()
      setWinners(winnersData.winners || [])
      setClaims(claimsData.claims || [])
    } catch (err) {
      console.error("Failed to fetch data:", err)
    } finally {
      setLoading(false)
    }
  }, [password])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    try {
      const res = await fetch("/api/admin/winners", {
        headers: { Authorization: `Bearer ${password}` },
      })
      if (res.ok) {
        setAuthenticated(true)
      } else {
        setAuthError("Invalid password")
      }
    } catch {
      setAuthError("Connection error")
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchData()
    }
  }, [authenticated, fetchData])

  const handleAddWinner = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/admin/winners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({
          ...newWinner,
          grantAmount: Number(newWinner.grantAmount),
        }),
      })
      if (res.ok) {
        setNewWinner({ firstName: "", lastName: "", dob: "", ssnLast4: "", grantAmount: "", status: "pending" })
        setShowAddForm(false)
        fetchData()
      }
    } catch (err) {
      console.error("Failed to add winner:", err)
    }
  }

  const handleDeleteWinner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this winner?")) return
    try {
      await fetch(`/api/admin/winners?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${password}` },
      })
      fetchData()
    } catch (err) {
      console.error("Failed to delete:", err)
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-muted/30 to-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm px-4">
          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Shield className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl">Admin Access</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminPass">Password</Label>
                  <Input
                    id="adminPass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                {authError && <p className="text-sm text-destructive">{authError}</p>}
                <Button type="submit" className="w-full">Sign In</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-muted/30 to-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage winners and view claims</p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Winner
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{winners.length}</div>
                <div className="text-sm text-muted-foreground">Total Winners</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{claims.length}</div>
                <div className="text-sm text-muted-foreground">Claims Submitted</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100">
                <DollarSign className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ${winners.reduce((sum, w) => sum + w.grantAmount, 0).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Grants</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Winner Form */}
        {showAddForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Add New Winner</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddWinner} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input value={newWinner.firstName} onChange={(e) => setNewWinner({ ...newWinner, firstName: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input value={newWinner.lastName} onChange={(e) => setNewWinner({ ...newWinner, lastName: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Input type="date" value={newWinner.dob} onChange={(e) => setNewWinner({ ...newWinner, dob: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Last 4 of SSN</Label>
                      <Input maxLength={4} value={newWinner.ssnLast4} onChange={(e) => setNewWinner({ ...newWinner, ssnLast4: e.target.value.replace(/\D/g, "").slice(0, 4) })} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Grant Amount ($)</Label>
                      <Input type="number" value={newWinner.grantAmount} onChange={(e) => setNewWinner({ ...newWinner, grantAmount: e.target.value })} required />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">Add Winner</Button>
                    <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={activeTab === "winners" ? "default" : "outline"}
            onClick={() => setActiveTab("winners")}
            className="gap-2"
          >
            <Users className="h-4 w-4" /> Winners
          </Button>
          <Button
            variant={activeTab === "claims" ? "default" : "outline"}
            onClick={() => setActiveTab("claims")}
            className="gap-2"
          >
            <FileText className="h-4 w-4" /> Claims
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : activeTab === "winners" ? (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">DOB</th>
                    <th className="px-4 py-3 text-left font-semibold">SSN Last 4</th>
                    <th className="px-4 py-3 text-left font-semibold">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                    <th className="px-4 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {winners.map((w) => (
                    <tr key={w.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{w.firstName} {w.lastName}</td>
                      <td className="px-4 py-3 text-muted-foreground">{w.dob}</td>
                      <td className="px-4 py-3 text-muted-foreground">***{w.ssnLast4}</td>
                      <td className="px-4 py-3 font-semibold text-green-600">${w.grantAmount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                          w.status === "claimed" ? "bg-green-100 text-green-700" :
                          w.status === "approved" ? "bg-blue-100 text-blue-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {w.status === "claimed" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          {w.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteWinner(w.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {winners.length === 0 && (
                    <tr><td colSpan={6} className="py-10 text-center text-muted-foreground">No winners added yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">Location</th>
                    <th className="px-4 py-3 text-left font-semibold">Submitted</th>
                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((c) => (
                    <tr key={c.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{c.firstName} {c.lastName}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.phone}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.city}, {c.state}</td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(c.submittedAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {claims.length === 0 && (
                    <tr><td colSpan={6} className="py-10 text-center text-muted-foreground">No claims submitted yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
