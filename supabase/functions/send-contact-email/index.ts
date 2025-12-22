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

// HTML escape function to prevent XSS in email templates
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
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
    // Log detailed error server-side only
    console.error("Resend API error details:", { status: res.status, response: json });
    throw new Error("Failed to send email");
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
    console.log("Raw body received, length:", rawBody.length);

    let payload: ContactFormRequest = {};
    if (rawBody) {
      try {
        payload = JSON.parse(rawBody);
      } catch (err) {
        // If parse fails, respond with a generic message (don't expose raw body)
        console.error("Failed to parse JSON body:", err);
        return new Response(JSON.stringify({
          error: "Invalid request format. Please try again."
        }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders }});
      }
    } else {
      return new Response(JSON.stringify({ error: "Empty request body" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders }});
    }

    const { name, email, subject, message } = payload;

    console.log("Received contact form submission");

    if (!name || !email || !subject || !message) {
      console.error("Missing required fields");
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Sanitize all user inputs to prevent XSS in email templates
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');

    // NOTE: Resend requires from to be a verified or allowed sender on your Resend account.
    // Use an address that is allowed by Resend.
    const FROM_ADDRESS = "Aditi Thakare <onboarding@resend.dev>";

    const notificationHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #8B5CF6;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 15px;">
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          </div>
        </body>
      </html>
    `;

    // Send notification to your verified email only (Resend restriction without verified domain)
    const notify = await sendEmail(["aditithakare960@gmail.com"], `New Contact: ${safeSubject}`, notificationHtml, FROM_ADDRESS);
    console.log("Email sent successfully");

    // Note: Confirmation email to sender requires a verified domain on Resend
    // Once you verify a domain at resend.com/domains, uncomment and update FROM_ADDRESS:
    // const confirmationHtml = `
    //   <html>
    //     <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    //       <h2 style="color: #8B5CF6;">Thanks for reaching out, ${safeName}! 💫</h2>
    //       <p>I received your message and will get back to you soon.</p>
    //     </body>
    //   </html>
    // `;
    // const confirm = await sendEmail([email], "Thanks for reaching out! 💫", confirmationHtml, FROM_ADDRESS);

    return new Response(JSON.stringify({ success: true, message: "Message received! We'll get back to you soon." }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    console.error("Handler error:", err);
    // Return generic error message to client
    return new Response(JSON.stringify({ error: "Failed to send message. Please try again later." }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
