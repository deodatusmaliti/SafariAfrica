import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT_EMAIL = "deodatusmaliti@yahoo.co.uk";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const type: string = body.type || "inquiry";

    let subject: string;
    let html: string;
    let text: string;

    if (type === "booking") {
      subject = `New Booking — ${body.reference} — ${body.traveler_name}`;
      html = `
        <h2>New Safari Booking</h2>
        <p><strong>Reference:</strong> ${body.reference}</p>
        <p><strong>Traveler:</strong> ${body.traveler_name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone || "—"}</p>
        <p><strong>Country:</strong> ${body.country || "—"}</p>
        <p><strong>Trip:</strong> ${body.packageName || "Custom safari"}</p>
        <p><strong>Adults:</strong> ${body.adults} | <strong>Children:</strong> ${body.children}</p>
        <p><strong>Start date:</strong> ${body.start_date || "—"}</p>
        <p><strong>Accommodation:</strong> ${body.accommodation}</p>
        <p><strong>Destinations:</strong> ${(body.custom_destinations || []).join(", ") || "—"}</p>
        <p><strong>Add-ons:</strong> ${(body.add_ons || []).join(", ") || "—"}</p>
        <p><strong>Total (USD):</strong> $${body.total_usd}</p>
        <hr /><p style="color:#888">Reply to the traveler at ${body.email}</p>
      `;
      text = `New Safari Booking\nReference: ${body.reference}\nTraveler: ${body.traveler_name}\nEmail: ${body.email}\nPhone: ${body.phone || "—"}\nTrip: ${body.packageName || "Custom"}\nTotal: $${body.total_usd}`;
    } else {
      subject = `New Inquiry — ${body.subject} — ${body.name}`;
      const safeMessage = (body.message || "").replace(/\n/g, "<br>");
      html = `
        <h2>New Website Inquiry</h2>
        <p><strong>From:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone || "—"}</p>
        <p><strong>Subject:</strong> ${body.subject}</p>
        <hr /><p><strong>Message:</strong></p><p>${safeMessage}</p>
        <hr /><p style="color:#888">Reply to the sender at ${body.email}</p>
      `;
      text = `New Website Inquiry\nFrom: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone || "—"}\nSubject: ${body.subject}\n\n${body.message}`;
    }

    const accessKey = body.access_key || Deno.env.get("WEB3FORMS_ACCESS_KEY") || "";

    if (!accessKey) {
      return new Response(
        JSON.stringify({ success: false, reason: "no_email_service", subject, text, recipient: RECIPIENT_EMAIL }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: "Safari Tanzania Website",
        to: RECIPIENT_EMAIL,
        replyto: body.email || RECIPIENT_EMAIL,
        html,
        text,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return new Response(
        JSON.stringify({ success: false, reason: "email_api_error", message: result.message, subject, text, recipient: RECIPIENT_EMAIL }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, reason: "server_error", message: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
