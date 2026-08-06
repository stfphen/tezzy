import { NextResponse } from "next/server";

import { type BookingResponse, bookingSchema } from "@/lib/booking";
import { notifyBooking } from "@/lib/notify";
import { check, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUCCESS = "Thank you! We've got your details and will reply within one business day.";

export async function POST(request: Request): Promise<NextResponse<BookingResponse>> {
  const limit = check(clientKey(request.headers));
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "That's a few enquiries in a row — please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "We couldn't read that request." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Some details need a second look.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const { website, ...booking } = parsed.data;

  // Honeypot tripped: answer exactly like a success so the bot stops retrying.
  if (website?.trim()) {
    return NextResponse.json({ ok: true, message: SUCCESS });
  }

  const result = await notifyBooking({ ...booking, website: "" });

  if (!result.delivered) {
    console.error("[tezzy] Booking delivery failed:", result.errors.join(" | "));
    return NextResponse.json(
      {
        ok: false,
        message:
          "We couldn't send that just now. Please email us and we'll pick it up straight away.",
      },
      { status: 502 },
    );
  }

  if (result.errors.length > 0) {
    // One transport worked, another didn't — the enquiry is safe, but log it.
    console.warn("[tezzy] Partial booking delivery:", result.errors.join(" | "));
  }

  return NextResponse.json({ ok: true, message: SUCCESS });
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: false, message: "POST a booking enquiry here." }, { status: 405 });
}
