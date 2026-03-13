import { NextRequest, NextResponse } from "next/server"
import { findWinner } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, dob, ssnLast4 } = await req.json()

    if (!firstName || !lastName || !dob || !ssnLast4) {
      return NextResponse.json(
        { found: false, error: "All fields are required" },
        { status: 400 }
      )
    }

    const winner = findWinner(firstName, lastName, dob, ssnLast4)

    if (winner) {
      return NextResponse.json({
        found: true,
        winner: {
          id: winner.id,
          grantAmount: winner.grantAmount,
          firstName: winner.firstName,
          lastName: winner.lastName,
        },
      })
    }

    return NextResponse.json({ found: false })
  } catch {
    return NextResponse.json(
      { found: false, error: "Server error" },
      { status: 500 }
    )
  }
}
