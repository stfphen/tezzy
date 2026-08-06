"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Send } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/Button";
import { budgetRanges, eventTypes, venueTypes } from "@/data/events";
import { type BookingInput, type BookingResponse, bookingDefaults, bookingSchema } from "@/lib/booking";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const fieldBase =
  "w-full rounded-2xl border bg-white/85 px-4 py-3 text-[0.95rem] text-cocoa shadow-sm transition-colors " +
  "placeholder:text-mocha/50 focus:bg-white focus:outline-none";

function fieldClasses(invalid: boolean) {
  return cn(fieldBase, invalid ? "border-berry" : "border-white/90 hover:border-candy/70");
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline gap-2 font-display text-sm font-bold text-cocoa">
      {children}
      {optional ? <span className="text-xs font-semibold text-mocha">optional</span> : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-xs font-semibold text-berry">
      {message}
    </p>
  );
}

export function BookingForm({ className }: { className?: string }) {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [minDate, setMinDate] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: bookingDefaults,
    mode: "onBlur",
  });

  // Computed after mount so the server and client agree on the markup.
  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setMinDate(now.toISOString().slice(0, 10));
  }, []);

  const fieldId = (name: keyof BookingInput) => `${uid}-${name}`;
  const errorId = (name: keyof BookingInput) => `${uid}-${name}-error`;
  const describedBy = (name: keyof BookingInput) => (errors[name] ? errorId(name) : undefined);

  async function onSubmit(values: BookingInput) {
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as BookingResponse;

      if (!response.ok || !data.ok) {
        if (!data.ok && data.fieldErrors) {
          for (const [field, messages] of Object.entries(data.fieldErrors)) {
            if (messages?.[0]) {
              setError(field as keyof BookingInput, { type: "server", message: messages[0] });
            }
          }
        }
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message);
      reset(bookingDefaults);
    } catch {
      setStatus("error");
      setMessage(
        `We couldn't reach the server. Please email ${site.bookingEmail} and we'll pick it up from there.`,
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 rounded-card border border-white/70 bg-shell/95 p-10 text-center shadow-soft",
          className,
        )}
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-candy text-white">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="text-2xl">Enquiry sent!</h3>
        <p role="status" className="max-w-md text-mocha">
          {message}
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "rounded-card border border-white/70 bg-shell/95 p-6 shadow-soft sm:p-8 lg:p-10",
        className,
      )}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={fieldId("name")}>Your name</Label>
          <input
            id={fieldId("name")}
            type="text"
            autoComplete="name"
            placeholder="Sam Lee"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={fieldClasses(Boolean(errors.name))}
            {...register("name")}
          />
          <FieldError id={errorId("name")} message={errors.name?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={fieldId("email")}>Email</Label>
          <input
            id={fieldId("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="sam@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={fieldClasses(Boolean(errors.email))}
            {...register("email")}
          />
          <FieldError id={errorId("email")} message={errors.email?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={fieldId("phone")}>Phone</Label>
          <input
            id={fieldId("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(416) 555-0134"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            className={fieldClasses(Boolean(errors.phone))}
            {...register("phone")}
          />
          <FieldError id={errorId("phone")} message={errors.phone?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={fieldId("eventType")}>Event type</Label>
          <select
            id={fieldId("eventType")}
            aria-invalid={Boolean(errors.eventType)}
            aria-describedby={describedBy("eventType")}
            className={fieldClasses(Boolean(errors.eventType))}
            {...register("eventType")}
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <FieldError id={errorId("eventType")} message={errors.eventType?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={fieldId("date")}>Event date</Label>
          <input
            id={fieldId("date")}
            type="date"
            min={minDate}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={describedBy("date")}
            className={fieldClasses(Boolean(errors.date))}
            {...register("date")}
          />
          <FieldError id={errorId("date")} message={errors.date?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={fieldId("guests")}>Guest count</Label>
          <input
            id={fieldId("guests")}
            type="number"
            inputMode="numeric"
            min={1}
            max={5000}
            step={1}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={describedBy("guests")}
            className={fieldClasses(Boolean(errors.guests))}
            {...register("guests", { valueAsNumber: true })}
          />
          <FieldError id={errorId("guests")} message={errors.guests?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={fieldId("city")}>City</Label>
          <input
            id={fieldId("city")}
            type="text"
            autoComplete="address-level2"
            placeholder={site.city}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={describedBy("city")}
            className={fieldClasses(Boolean(errors.city))}
            {...register("city")}
          />
          <FieldError id={errorId("city")} message={errors.city?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={fieldId("venue")}>Indoor or outdoor</Label>
          <select
            id={fieldId("venue")}
            aria-invalid={Boolean(errors.venue)}
            aria-describedby={describedBy("venue")}
            className={fieldClasses(Boolean(errors.venue))}
            {...register("venue")}
          >
            {venueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <FieldError id={errorId("venue")} message={errors.venue?.message} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor={fieldId("budget")}>Budget</Label>
          <select
            id={fieldId("budget")}
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={describedBy("budget")}
            className={fieldClasses(Boolean(errors.budget))}
            {...register("budget")}
          >
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <FieldError id={errorId("budget")} message={errors.budget?.message} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor={fieldId("notes")} optional>
            Anything else we should know?
          </Label>
          <textarea
            id={fieldId("notes")}
            rows={4}
            placeholder="Theme, colours, venue quirks, a drink you'd love us to make…"
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={describedBy("notes")}
            className={cn(fieldClasses(Boolean(errors.notes)), "resize-y")}
            {...register("notes")}
          />
          <FieldError id={errorId("notes")} message={errors.notes?.message} />
        </div>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("website")}>Website</label>
        <input id={fieldId("website")} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={isSubmitting} className="shrink-0 whitespace-nowrap">
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send my enquiry
              <Send aria-hidden="true" className="h-4 w-4" />
            </>
          )}
        </Button>

        <p className="text-xs leading-relaxed text-mocha">
          We reply within one business day. No mailing list, no sharing your details — see our{" "}
          <a href="/privacy" className="font-semibold text-berry underline underline-offset-2">
            privacy notice
          </a>
          .
        </p>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "mt-4 text-sm font-semibold",
          status === "error" ? "text-berry" : "sr-only",
        )}
      >
        {status === "error" ? message : ""}
      </p>
    </form>
  );
}
