import { NextResponse } from "next/server";

// Lead-capture endpoint for the product brochure download.
//
// For now this only records the lead to the server logs (visible in the
// Vercel dashboard) so no leads are lost. Delivery to an inbox / sheet / CRM
// is intentionally deferred — wire it in at the marked spot below.
//
// To add email delivery later (e.g. Resend):
//   1. `npm i resend` and set RESEND_API_KEY + a verified sender in Vercel env.
//   2. In the marked block, send the email with the captured `mobile`/`email`.
// To forward to a Google Sheet / Zapier instead, POST to a webhook URL.

export async function POST(request: Request) {
  let mobile = "";
  let email = "";

  try {
    const body = await request.json();
    mobile = typeof body?.mobile === "string" ? body.mobile.trim() : "";
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!mobile || !email) {
    return NextResponse.json(
      { ok: false, error: "Mobile number and email are required." },
      { status: 422 }
    );
  }

  // --- Lead captured ---------------------------------------------------------
  // Recorded to logs for now. Replace this block with real delivery later.
  console.log("[brochure-lead]", JSON.stringify({ mobile, email }));
  // ---------------------------------------------------------------------------

  return NextResponse.json({ ok: true });
}
