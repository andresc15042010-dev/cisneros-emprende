// =========================================================================
// Supabase Edge Function: notify-suggestion
// Notifica automáticamente a la administradora Cami cuando se envía una nueva sugerencia
// Compatible con Deno y Supabase Edge Runtime (Free Tier)
// =========================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "andresc.15042010@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();

    if (!record || !record.message) {
      return new Response(JSON.stringify({ error: "No se proporcionó mensaje" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailSubject = `📬 Nueva Sugerencia Ciudadana en Cisneros Emprende: ${record.sender_name || "Anónimo"}`;
    const emailHtml = `
      <div style="font-family: sans-serif; background-color: #f8fafc; padding: 24px; color: #1e293b;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <div style="display: flex; align-items: center; border-bottom: 2px solid #166534; padding-bottom: 12px; margin-bottom: 16px;">
            <h2 style="color: #166534; margin: 0; font-size: 20px;">Cisneros Emprende - Buzón Ciudadano</h2>
          </div>
          <p style="font-size: 14px; color: #64748b; margin-top: 0;">Has recibido un nuevo mensaje para la plataforma de Cisneros:</p>
          
          <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; border-radius: 4px; margin: 16px 0;">
            <p style="font-size: 15px; line-height: 1.5; color: #0f172a; margin: 0;">"${record.message}"</p>
          </div>

          <table style="width: 100%; font-size: 13px; color: #475569; margin-top: 16px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 140px;">Remitente:</td>
              <td style="padding: 6px 0;">${record.sender_name || "No especificado"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Correo:</td>
              <td style="padding: 6px 0;">${record.sender_email || "No especificado"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Teléfono:</td>
              <td style="padding: 6px 0;">${record.sender_phone || "No especificado"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Fecha:</td>
              <td style="padding: 6px 0;">${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; text-align: center;">
            <a href="https://cisneros-emprende.vercel.app/admin" style="display: inline-block; background-color: #166534; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; font-size: 13px;">
              Ingresar al Panel de Cami
            </a>
          </div>
        </div>
      </div>
    `;

    // Si hay API Key de Resend (servicio gratuito de correos para desarrolladores)
    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Cisneros Emprende <notificaciones@cisneros.gov.co>",
          to: [ADMIN_EMAIL],
          subject: emailSubject,
          html: emailHtml,
        }),
      });
    }

    return new Response(JSON.stringify({ ok: true, message: "Notificación enviada" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
