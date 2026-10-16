import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { escapeHtml, sendMail } from "./email";

function row(label: string, value: string) {
  return `<tr><td style="padding:4px 12px 4px 0;color:#8a8f98;font:12px monospace;vertical-align:top;white-space:nowrap;">${escapeHtml(
    label,
  )}</td><td style="padding:4px 0;font:14px sans-serif;">${escapeHtml(value).replace(/\n/g, "<br/>")}</td></tr>`;
}

function table(rows: [string, string][]) {
  return `<table cellpadding="0" cellspacing="0">${rows.map(([l, v]) => row(l, v)).join("")}</table>`;
}

/** A single line: trimmed, length-capped, with no line breaks (used in the subject). */
const line = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v.replace(/[\r\n]+/g, " "));

/**
 * Validated again on the server: the browser-side schema in ContactForm is a
 * convenience, not a guarantee, because this endpoint can be called directly.
 */
const contactSchema = z.object({
  name: line(200).pipe(z.string().min(1)),
  email: z.string().trim().email().max(320),
  company: line(200).optional(),
  area: line(200).optional(),
  timeline: line(200).optional(),
  building: z.string().trim().min(1).max(4000),
  source: line(100).optional(),
  /** Honeypot. Hidden from people; bots that fill every field fill this too. */
  website: z.string().max(500).optional(),
  /** Milliseconds between the form rendering and being sent. */
  elapsedMs: z.number().int().nonnegative().optional(),
});

/** Anything sent faster than this after the form appeared was not typed by a person. */
const MIN_FILL_MS = 3000;

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((data: z.input<typeof contactSchema>) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Spam is accepted silently so the sender learns nothing from the response.
    if (data.website || (data.elapsedMs ?? 0) < MIN_FILL_MS) return { ok: true as const };

    const optional: [string, string | undefined][] = [
      ["Company", data.company],
      ["Area of interest", data.area],
      ["What happens today", data.building],
      ["Timeline", data.timeline],
      ["Source", data.source],
    ];
    await sendMail({
      subject: `New conversation — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      replyTo: data.email,
      html: table([
        ["Name", data.name],
        ["Email", data.email],
        ...optional.filter((entry): entry is [string, string] => Boolean(entry[1])),
      ]),
    });
    return { ok: true as const };
  });
