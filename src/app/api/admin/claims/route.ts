import { NextRequest, NextResponse } from "next/server"
import { getClaims } from "@/lib/db"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization")
  if (!authHeader) return false
  const password = authHeader.replace("Bearer ", "")
  return password === ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const claims = getClaims()
  return NextResponse.json({ claims })
}
