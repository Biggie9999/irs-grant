import { neon } from "@neondatabase/serverless"

function getSQL() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!url) {
    throw new Error("DATABASE_URL or POSTGRES_URL environment variable is not set")
  }
  return neon(url)
}

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

// ----- Winners -----

export async function getWinners(): Promise<Winner[]> {
  const sql = getSQL()
  const rows = await sql`SELECT * FROM winners ORDER BY created_at DESC`
  return rows.map(rowToWinner)
}

export async function getWinnerById(id: string): Promise<Winner | undefined> {
  const sql = getSQL()
  const rows = await sql`SELECT * FROM winners WHERE id = ${id}`
  return rows[0] ? rowToWinner(rows[0]) : undefined
}

export async function findWinner(
  firstName: string,
  lastName: string,
  dob: string,
  ssnLast4: string
): Promise<Winner | undefined> {
  const sql = getSQL()
  const rows = await sql`
    SELECT * FROM winners 
    WHERE LOWER(first_name) = ${firstName.toLowerCase()} 
    AND LOWER(last_name) = ${lastName.toLowerCase()} 
    AND dob = ${dob} 
    AND ssn_last4 = ${ssnLast4}
  `
  return rows[0] ? rowToWinner(rows[0]) : undefined
}

export async function addWinner(winner: Omit<Winner, "id" | "createdAt">): Promise<Winner> {
  const sql = getSQL()
  const rows = await sql`
    INSERT INTO winners (first_name, last_name, dob, ssn_last4, grant_amount, status)
    VALUES (${winner.firstName}, ${winner.lastName}, ${winner.dob}, ${winner.ssnLast4}, ${winner.grantAmount}, ${winner.status || "pending"})
    RETURNING *
  `
  return rowToWinner(rows[0])
}

export async function updateWinner(id: string, updates: Partial<Winner>): Promise<Winner | null> {
  const sql = getSQL()
  const current = await getWinnerById(id)
  if (!current) return null
  
  const firstName = updates.firstName ?? current.firstName
  const lastName = updates.lastName ?? current.lastName
  const dob = updates.dob ?? current.dob
  const ssnLast4 = updates.ssnLast4 ?? current.ssnLast4
  const grantAmount = updates.grantAmount ?? current.grantAmount
  const status = updates.status ?? current.status

  const rows = await sql`
    UPDATE winners 
    SET first_name = ${firstName}, last_name = ${lastName}, dob = ${dob}, 
        ssn_last4 = ${ssnLast4}, grant_amount = ${grantAmount}, status = ${status}
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0] ? rowToWinner(rows[0]) : null
}

export async function deleteWinner(id: string): Promise<boolean> {
  const sql = getSQL()
  const rows = await sql`DELETE FROM winners WHERE id = ${id} RETURNING id`
  return rows.length > 0
}

// ----- Claims -----

export async function getClaims(): Promise<Claim[]> {
  const sql = getSQL()
  const rows = await sql`SELECT * FROM claims ORDER BY submitted_at DESC`
  return rows.map(rowToClaim)
}

export async function addClaim(claim: Omit<Claim, "id" | "submittedAt" | "status">): Promise<Claim> {
  const sql = getSQL()
  const rows = await sql`
    INSERT INTO claims (winner_id, method, unique_code, amount, data, status)
    VALUES (${claim.winnerId}, ${claim.method}, ${claim.uniqueCode}, ${claim.amount}, ${JSON.stringify(claim.data)}, 'submitted')
    RETURNING *
  `
  return rowToClaim(rows[0])
}

// ----- Helpers -----

function rowToWinner(row: Record<string, unknown>): Winner {
  return {
    id: String(row.id),
    firstName: String(row.first_name),
    lastName: String(row.last_name),
    dob: String(row.dob).split("T")[0],
    ssnLast4: String(row.ssn_last4),
    grantAmount: Number(row.grant_amount),
    status: String(row.status) as Winner["status"],
    createdAt: String(row.created_at),
  }
}

function rowToClaim(row: Record<string, unknown>): Claim {
  return {
    id: String(row.id),
    winnerId: String(row.winner_id),
    method: String(row.method),
    uniqueCode: String(row.unique_code),
    amount: String(row.amount),
    data: (typeof row.data === "string" ? JSON.parse(row.data) : row.data) as Record<string, unknown>,
    submittedAt: String(row.submitted_at),
    status: String(row.status) as Claim["status"],
  }
}
