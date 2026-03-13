import { NextRequest, NextResponse } from "next/server"
import { getWinners, addWinner, updateWinner, deleteWinner } from "@/lib/db"

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
  const winners = await getWinners()
  return NextResponse.json({ winners })
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const body = await req.json()
    const winnerData = {
      ...body,
      dob: body.dob || "1900-01-01",
      ssnLast4: body.ssnLast4 || "0000",
      grantAmount: body.grantAmount || 0,
    }
    const winner = await addWinner(winnerData)
    return NextResponse.json({ success: true, winner })
  } catch {
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 })
  }
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { id, ...updates } = body
    const winner = await updateWinner(id, updates)
    if (!winner) {
      return NextResponse.json({ success: false, error: "Winner not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, winner })
  } catch {
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 })
    }
    const deleted = await deleteWinner(id)
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Winner not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
