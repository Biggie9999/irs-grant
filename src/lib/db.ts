import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")

export interface Winner {
  id: string
  firstName: string
  lastName: string
  dob: string
  ssnLast4: string
  grantAmount: number
  status: "pending" | "claimed" | "approved"
  createdAt: string
}

export interface Claim {
  id: string
  winnerId: string
  method: string
  uniqueCode: string
  amount: string
  data: Record<string, unknown>
  submittedAt: string
  status: "submitted" | "reviewed" | "approved" | "rejected"
}

function readJSON<T>(filename: string): T[] {
  const filePath = path.join(DATA_DIR, filename)
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8")
    return []
  }
  const data = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(data) as T[]
}

function writeJSON<T>(filename: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
}

export function getWinners(): Winner[] {
  return readJSON<Winner>("winners.json")
}

export function getWinnerById(id: string): Winner | undefined {
  return getWinners().find((w) => w.id === id)
}

export function findWinner(
  firstName: string,
  lastName: string,
  dob: string,
  ssnLast4: string
): Winner | undefined {
  const winners = getWinners()
  return winners.find(
    (w) =>
      w.firstName.toLowerCase() === firstName.toLowerCase() &&
      w.lastName.toLowerCase() === lastName.toLowerCase() &&
      w.dob === dob &&
      w.ssnLast4 === ssnLast4
  )
}

export function addWinner(winner: Omit<Winner, "id" | "createdAt">): Winner {
  const winners = getWinners()
  const newWinner: Winner = {
    ...winner,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  winners.push(newWinner)
  writeJSON("winners.json", winners)
  return newWinner
}

export function updateWinner(id: string, updates: Partial<Winner>): Winner | null {
  const winners = getWinners()
  const index = winners.findIndex((w) => w.id === id)
  if (index === -1) return null
  winners[index] = { ...winners[index], ...updates }
  writeJSON("winners.json", winners)
  return winners[index]
}

export function deleteWinner(id: string): boolean {
  const winners = getWinners()
  const filtered = winners.filter((w) => w.id !== id)
  if (filtered.length === winners.length) return false
  writeJSON("winners.json", filtered)
  return true
}

export function getClaims(): Claim[] {
  return readJSON<Claim>("claims.json")
}

export function addClaim(claim: Omit<Claim, "id" | "submittedAt" | "status">): Claim {
  const claims = getClaims()
  const newClaim: Claim = {
    ...claim,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: "submitted",
  }
  claims.push(newClaim)
  writeJSON("claims.json", claims)
  return newClaim
}
