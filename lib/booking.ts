import { z } from "zod";

import { budgetRanges, eventTypes, venueTypes } from "@/data/events";

/** Today at midnight, local time — so "today" is still a valid booking date. */
function startOfToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name")
    .max(80, "That name is a little too long"),
  email: z.email("Please use a valid email address").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Please add a phone number we can reach you on")
    .max(30, "That phone number looks too long")
    .regex(/^[\d\s().+-]+$/, "Digits, spaces and + ( ) - only"),
  eventType: z.enum(eventTypes, { error: "Pick the closest event type" }),
  date: z
    .string()
    .min(1, "Please choose a date")
    .refine((value) => !Number.isNaN(Date.parse(value)), "That date doesn't look right")
    .refine((value) => new Date(value) >= startOfToday(), "Please choose a date in the future"),
  guests: z
    .number({ error: "Roughly how many guests?" })
    .int("Whole guests only, please")
    .min(1, "At least one guest")
    .max(5000, "That's a festival — email us directly and we'll plan it properly"),
  city: z
    .string()
    .trim()
    .min(2, "Which city are you in?")
    .max(80, "That city name is a little too long"),
  venue: z.enum(venueTypes, { error: "Indoor, outdoor, or both?" }),
  budget: z.enum(budgetRanges, { error: "Pick a rough budget so we can quote properly" }),
  notes: z.string().trim().max(2000, "Please keep notes under 2000 characters").optional(),
  /**
   * Honeypot. Real people never see this field, so anything in it is a bot.
   * Deliberately permissive: if the schema rejected a filled-in honeypot the
   * bot would get a validation error naming the trap. Instead it validates,
   * and the route answers exactly like a success while dropping the enquiry.
   */
  website: z.string().max(400).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const bookingDefaults: BookingInput = {
  name: "",
  email: "",
  phone: "",
  eventType: "Birthday",
  date: "",
  guests: 30,
  city: "",
  venue: "Indoor",
  budget: "Not sure yet",
  notes: "",
  website: "",
};

/** Field labels, reused by the form and the notification email. */
export const bookingLabels: Record<keyof Omit<BookingInput, "website">, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  eventType: "Event type",
  date: "Event date",
  guests: "Guests",
  city: "City",
  venue: "Indoor / outdoor",
  budget: "Budget",
  notes: "Notes",
};

export type BookingResponse =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Partial<Record<keyof BookingInput, string[]>> };
