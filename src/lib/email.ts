// Server-only. Only ever imported from inside a createServerFn handler
// (see src/lib/actions.ts) so this — and the nodemailer dependency — never
// reaches the client bundle.
import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | undefined;

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 587);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

export async function sendMail(opts: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}) {
  const to = process.env.CONTACT_EMAIL || process.env.SMTP_EMAIL;
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD || !to) {
    throw new Error("Email is not configured on the server (missing SMTP_* / CONTACT_EMAIL env vars).");
  }
  await getTransporter().sendMail({
    from: `"CuriousDevs Website" <${process.env.SMTP_EMAIL}>`,
    to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
    attachments: opts.attachments,
  });
}
