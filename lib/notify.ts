import { type BookingInput, bookingLabels } from "@/lib/booking";
import { site } from "@/lib/site";

/**
 * Delivery for booking enquiries.
 *
 * Two interchangeable transports, both optional and both configured purely with
 * environment variables (see .env.example):
 *
 *   RESEND_API_KEY + BOOKING_TO_EMAIL   → email via Resend's REST API
 *   BOOKING_WEBHOOK_URL                 → POST the JSON payload anywhere
 *                                         (Zapier, Make, Slack, a CRM, …)
 *
 * With neither set — a fresh clone, or local development — the enquiry is
 * logged to the server console and the visitor still gets a success response,
 * so the form is testable before any account exists.
 */

export type NotifyResult = {
  delivered: boolean;
  transports: string[];
  errors: string[];
};

function plainText(booking: BookingInput): string {
  const rows = (Object.keys(bookingLabels) as (keyof typeof bookingLabels)[])
    .map((key) => {
      const value = booking[key];
      if (value === undefined || value === "") return null;
      return `${bookingLabels[key]}: ${value}`;
    })
    .filter(Boolean);

  return [`New event enquiry for ${site.name}`, "", ...rows].join("\n");
}

function html(booking: BookingInput): string {
  const rows = (Object.keys(bookingLabels) as (keyof typeof bookingLabels)[])
    .map((key) => {
      const value = booking[key];
      if (value === undefined || value === "") return "";
      return `<tr>
        <td style="padding:8px 16px 8px 0;color:#96574d;font-size:13px;white-space:nowrap;vertical-align:top">${bookingLabels[key]}</td>
        <td style="padding:8px 0;color:#7b3b2f;font-size:14px;font-weight:600">${escapeHtml(String(value))}</td>
      </tr>`;
    })
    .join("");

  return `<div style="font-family:ui-rounded,'Segoe UI',system-ui,sans-serif;background:#fdf4f2;padding:32px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:24px;padding:32px">
      <h1 style="margin:0 0 4px;color:#7b3b2f;font-size:22px">New event enquiry</h1>
      <p style="margin:0 0 24px;color:#96574d;font-size:14px">Someone would like to book ${site.name}.</p>
      <table style="width:100%;border-collapse:collapse">${rows}</table>
      <p style="margin:24px 0 0;color:#96574d;font-size:12px">Sent from the booking form on ${site.domain}</p>
    </div>
  </div>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendWithResend(booking: BookingInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.BOOKING_FROM_EMAIL ?? `${site.name} <bookings@${site.domain}>`,
      to: [process.env.BOOKING_TO_EMAIL ?? site.bookingEmail],
      reply_to: booking.email,
      subject: `Event enquiry — ${booking.eventType} in ${booking.city} (${booking.guests} guests)`,
      text: plainText(booking),
      html: html(booking),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

async function sendToWebhook(booking: BookingInput): Promise<void> {
  const url = process.env.BOOKING_WEBHOOK_URL;
  if (!url) throw new Error("BOOKING_WEBHOOK_URL is not set");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: `${site.domain}/events#book`,
      receivedAt: new Date().toISOString(),
      booking,
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`);
  }
}

export async function notifyBooking(booking: BookingInput): Promise<NotifyResult> {
  const transports: string[] = [];
  const errors: string[] = [];

  if (process.env.RESEND_API_KEY) {
    try {
      await sendWithResend(booking);
      transports.push("resend");
    } catch (error) {
      errors.push(`resend: ${(error as Error).message}`);
    }
  }

  if (process.env.BOOKING_WEBHOOK_URL) {
    try {
      await sendToWebhook(booking);
      transports.push("webhook");
    } catch (error) {
      errors.push(`webhook: ${(error as Error).message}`);
    }
  }

  if (transports.length === 0 && errors.length === 0) {
    console.info(
      "[tezzy] No booking transport configured — logging the enquiry instead.\n" + plainText(booking),
    );
    transports.push("console");
  }

  return { delivered: transports.length > 0, transports, errors };
}
