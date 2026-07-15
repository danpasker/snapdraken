import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const projectTypes = new Set([
  "Attraction",
  "Exhibit",
  "Set Build",
  "Brand Activation",
  "Mural",
  "Other",
]);

const budgetRanges = new Set([
  "Under $50k",
  "$50k-$250k",
  "$250k-$1M",
  "$1M+",
]);

const clean = (value: unknown, max = 2000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#039;",
        '"': "&quot;",
      })[character] ?? character,
  );

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const honeypot = clean(payload.website, 100);
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 120);
  const company = clean(payload.company, 160);
  const email = clean(payload.email, 200);
  const projectType = clean(payload.projectType, 80);
  const budget = clean(payload.budget, 80);
  const timeline = clean(payload.timeline, 160);
  const brief = clean(payload.brief, 5000);

  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !projectTypes.has(projectType) ||
    !budgetRanges.has(budget) ||
    !brief
  ) {
    return NextResponse.json(
      { message: "Please complete the required fields." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { message: "The project desk is not configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const bcc = process.env.CONTACT_BCC_EMAIL;

  const { error } = await resend.emails.send({
    from,
    to,
    ...(bcc ? { bcc } : {}),
    replyTo: email,
    subject: `New project brief — ${name} / ${projectType}`,
    text: [
      `Name: ${name}`,
      `Company: ${company || "Not provided"}`,
      `Email: ${email}`,
      `Project type: ${projectType}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline || "Not provided"}`,
      "",
      brief,
    ].join("\n"),
    html: `
      <h1>New project brief</h1>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(timeline || "Not provided")}</p>
      <h2>Brief</h2>
      <p>${escapeHtml(brief).replace(/\n/g, "<br />")}</p>
    `,
  });

  if (error) {
    console.error("Contact email failed", error);
    return NextResponse.json(
      { message: "The brief could not be sent. Please email the shop directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
