import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

async function sendEmail(to: string[], subject: string, html: string, from: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-contact-email function");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactFormRequest = await req.json();

    console.log(`Processing contact form submission from ${name} (${email})`);

    // Validate input
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send notification email to Aditi
    const notificationResult = await sendEmail(
      ["aditithakare02@gmail.com"],
      `New Contact: ${subject}`,
      `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #1a0a2e; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .card { background: linear-gradient(135deg, #2d1b4e 0%, #1a0a2e 100%); border-radius: 16px; padding: 32px; border: 1px solid rgba(0, 255, 200, 0.2); }
              h1 { color: #00d4aa; margin: 0 0 24px 0; font-size: 24px; }
              .field { margin-bottom: 20px; }
              .label { color: #a0a0a0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
              .value { color: #ffffff; font-size: 16px; }
              .message-box { background: rgba(0, 212, 170, 0.1); border-radius: 8px; padding: 16px; margin-top: 24px; }
              .message-text { color: #e0e0e0; line-height: 1.6; white-space: pre-wrap; }
              .footer { text-align: center; margin-top: 32px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="card">
                <h1>✨ New Contact Form Submission</h1>
                <div class="field">
                  <div class="label">From</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${email}" style="color: #00d4aa;">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Subject</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="message-box">
                  <div class="label">Message</div>
                  <div class="message-text">${message}</div>
                </div>
              </div>
              <div class="footer">
                Sent from your portfolio contact form
              </div>
            </div>
          </body>
        </html>
      `,
      "Portfolio Contact <onboarding@resend.dev>"
    );

    console.log("Notification email sent:", notificationResult);

    // Send confirmation email to the sender
    const confirmationResult = await sendEmail(
      [email],
      "Thanks for reaching out! 💫",
      `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #1a0a2e; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .card { background: linear-gradient(135deg, #2d1b4e 0%, #1a0a2e 100%); border-radius: 16px; padding: 32px; border: 1px solid rgba(0, 255, 200, 0.2); }
              h1 { color: #00d4aa; margin: 0 0 16px 0; font-size: 28px; }
              p { color: #e0e0e0; line-height: 1.8; margin: 0 0 16px 0; }
              .highlight { color: #ffd700; }
              .signature { margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); }
              .name { color: #00d4aa; font-size: 18px; font-weight: 600; }
              .title { color: #a0a0a0; font-size: 14px; }
              .links { margin-top: 16px; }
              .links a { color: #00d4aa; text-decoration: none; margin-right: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="card">
                <h1>Hey ${name}! 👋</h1>
                <p>Thank you so much for reaching out! I've received your message and I'm excited to connect with you.</p>
                <p>I typically respond within <span class="highlight">24-48 hours</span>. In the meantime, feel free to check out my projects or connect with me on LinkedIn!</p>
                <p>Looking forward to our conversation! ✨</p>
                <div class="signature">
                  <div class="name">Aditi Thakare</div>
                  <div class="title">Web Developer | Front-End Specialist</div>
                  <div class="links">
                    <a href="https://github.com/Aditi960">GitHub</a>
                    <a href="https://www.linkedin.com/in/aditi-thakare-9aa5831b0/">LinkedIn</a>
                    <a href="https://aditithakare.netlify.app/">Portfolio</a>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      "Aditi Thakare <onboarding@resend.dev>"
    );

    console.log("Confirmation email sent:", confirmationResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
