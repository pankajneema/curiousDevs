import { createServerFn } from "@tanstack/react-start";
import { escapeHtml, sendMail } from "./email";

function row(label: string, value: string) {
  return `<tr><td style="padding:4px 12px 4px 0;color:#8a8f98;font:12px monospace;vertical-align:top;white-space:nowrap;">${escapeHtml(
    label,
  )}</td><td style="padding:4px 0;font:14px sans-serif;">${escapeHtml(value).replace(/\n/g, "<br/>")}</td></tr>`;
}

function table(rows: [string, string][]) {
  return `<table cellpadding="0" cellspacing="0">${rows.map(([l, v]) => row(l, v)).join("")}</table>`;
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator(
    (data: { name: string; email: string; company: string; surface: string; notes: string }) =>
      data,
  )
  .handler(async ({ data }) => {
    if (!data.name || !data.email) throw new Error("Name and email are required.");
    await sendMail({
      subject: `New contact — ${data.name} (${data.company || "no company given"})`,
      replyTo: data.email,
      html: table([
        ["Name", data.name],
        ["Email", data.email],
        ["Company", data.company],
        ["Securing", data.surface],
        ["Workflow", data.notes],
      ]),
    });
    return { ok: true as const };
  });

export const sendBookingRequest = createServerFn({ method: "POST" })
  .validator(
    (data: {
      name: string;
      email: string;
      company: string;
      surface: string;
      slot: string;
      notes: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    if (!data.name || !data.email) throw new Error("Name and email are required.");
    await sendMail({
      subject: `New booking request — ${data.name} (${data.company || "no company given"})`,
      replyTo: data.email,
      html: table([
        ["Name", data.name],
        ["Email", data.email],
        ["Company", data.company],
        ["Securing", data.surface],
        ["Preferred window", data.slot],
        ["Workflow", data.notes],
      ]),
    });
    return { ok: true as const };
  });

export const sendApplication = createServerFn({ method: "POST" })
  .validator((data: FormData) => data)
  .handler(async ({ data }) => {
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const role = String(data.get("role") ?? "");
    const link = String(data.get("link") ?? "");
    const notes = String(data.get("notes") ?? "");
    const resume = data.get("resume");

    if (!name || !email) throw new Error("Name and email are required.");

    const attachments: { filename: string; content: Buffer }[] = [];
    if (resume instanceof File && resume.size > 0) {
      if (resume.size > 8 * 1024 * 1024) throw new Error("Resume must be under 8MB.");
      attachments.push({
        filename: resume.name || "resume",
        content: Buffer.from(await resume.arrayBuffer()),
      });
    }

    await sendMail({
      subject: `New application — ${role} — ${name}`,
      replyTo: email,
      html: table([
        ["Name", name],
        ["Email", email],
        ["Role", role],
        ["Link", link],
        ["Why this role", notes],
        ["Resume", attachments.length ? attachments[0].filename : "not attached"],
      ]),
      attachments,
    });
    return { ok: true as const };
  });
