import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ContactFormRequest {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

async function sendEmail(to: string[], subject: string, html: string, from: string) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set in environment");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch (_) { json = text; }

  if (!res.ok) {
    throw new Error(`Resend API error (${res.status}): ${typeof json === "string" ? json : JSON.stringify(json)}`);
  }
  return json;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("=== send-contact-email invoked ===");

  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    // Log headers for debugging
    console.log("Request headers:", Object.fromEntries(req.headers.entries()));

    // Read raw text first for debugging (req.json() will fail if content-type is wrong)
    const rawBody = await req.text();
    console.log("Raw body text:", rawBody);

    let payload: ContactFormRequest = {};
    if (rawBody) {
      try {
        payload = JSON.parse(rawBody);
      } catch (err) {
        // If parse fails, respond with a helpful message
        console.error("Failed to parse JSON body:", err);
        return new Response(JSON.stringify({
          error: "Invalid JSON body. Make sure Content-Type is application/json and body is JSON.",
          rawBody
        }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders }});
      }
    } else {
      return new Response(JSON.stringify({ error: "Empty request body" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders }});
    }

    const { name, email, subject, message } = payload;

    console.log(`Parsed payload => name:${name}, email:${email}, subject:${subject}`);

    if (!name || !email || !subject || !message) {
      console.error("Missing required fields", { name, email, subject, message });
      return new Response(JSON.stringify({ error: "All fields (name, email, subject, message) are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // NOTE: Resend requires from to be a verified or allowed sender on your Resend account.
    // Use an address that is allowed by Resend.
    const FROM_ADDRESS = "Aditi Thakare <onboarding@resend.dev>"; // verify this in Resend dashboard

    const notificationHtml = `<html>...notification html with ${name} ...</html>`; // shorten here for brevity or reuse your HTML.
    const confirmationHtml = `<html>...confirmation html for ${name} ...</html>`;

    // Send notification to your verified email only (Resend restriction without verified domain)
    const notify = await sendEmail(["aditithakare960@gmail.com"], `New Contact: ${subject}`, notificationHtml, FROM_ADDRESS);
    console.log("Resend notify response:", notify);

    // Note: Confirmation email to sender requires a verified domain on Resend
    // Once you verify a domain at resend.com/domains, uncomment this:
    // const confirm = await sendEmail([email], "Thanks for reaching out! 💫", confirmationHtml, FROM_ADDRESS);
    // console.log("Resend confirm response:", confirm);

    return new Response(JSON.stringify({ success: true, message: "Message received! We'll get back to you soon." }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    console.error("Handler error:", err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
