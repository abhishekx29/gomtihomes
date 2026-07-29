import "./lib/error-capture";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import dotenv from "dotenv";
import { Resend } from "resend";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

dotenv.config();

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  message?: string;
};

type LeadRecord = LeadPayload & {
  submittedAt: string;
};

const LEADS_STORAGE_PATH = resolve(process.cwd(), "data", "leads.json");

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

async function persistLead(payload: LeadPayload): Promise<void> {
  try {
    await mkdir(dirname(LEADS_STORAGE_PATH), { recursive: true });

    let existing: LeadRecord[] = [];
    try {
      const existingText = await readFile(LEADS_STORAGE_PATH, "utf8");
      existing = JSON.parse(existingText) as LeadRecord[];
    } catch {
      existing = [];
    }

    existing.push({
      ...payload,
      submittedAt: new Date().toISOString(),
    });

    await writeFile(LEADS_STORAGE_PATH, JSON.stringify(existing, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to persist lead locally", error);
  }
}

async function parseLeadPayload(request: Request): Promise<LeadPayload> {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const rawBody = await request.text();
      if (!rawBody?.trim()) {
        return {};
      }

      return JSON.parse(rawBody) as LeadPayload;
    }

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      return {
        name: formData.get("name")?.toString().trim() || undefined,
        phone: formData.get("phone")?.toString().trim() || undefined,
        email: formData.get("email")?.toString().trim() || undefined,
        date: formData.get("date")?.toString().trim() || undefined,
        message: formData.get("message")?.toString().trim() || undefined,
      };
    }

    const rawBody = await request.text();
    if (!rawBody?.trim()) {
      return {};
    }

    try {
      return JSON.parse(rawBody) as LeadPayload;
    } catch {
      const params = new URLSearchParams(rawBody);
      return {
        name: params.get("name") ?? undefined,
        phone: params.get("phone") ?? undefined,
        email: params.get("email") ?? undefined,
        date: params.get("date") ?? undefined,
        message: params.get("message") ?? undefined,
      };
    }
  } catch {
    return {};
  }
}

function getRuntimeEnvValue(name: string, runtimeEnv: unknown): string | undefined {
  if (runtimeEnv && typeof runtimeEnv === "object") {
    const value = (runtimeEnv as Record<string, unknown>)[name];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return process.env[name]?.trim();
}

async function sendLeadViaResend(details: string, apiKey: string, fromAddress: string, targetEmail: string) {
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: fromAddress,
    to: [targetEmail],
    subject: "New Site Visit Request - Gomti Homes",
    text: details,
  });
}

async function sendLeadViaSendGrid(details: string, apiKey: string, fromAddress: string, targetEmail: string) {
  const body = {
    personalizations: [
      {
        to: [{ email: targetEmail }],
        subject: "New Site Visit Request - Gomti Homes",
      },
    ],
    from: { email: fromAddress },
    content: [{ type: "text/plain", value: details }],
  };

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`SendGrid email delivery failed: ${response.status} ${await response.text()}`);
  }
}

async function sendLeadViaFormSubmit(payload: LeadPayload, targetEmail: string) {
  const fallbackResponse = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(targetEmail), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    },
    body: new URLSearchParams({
      name: payload.name?.trim() || "Site Visit Lead",
      phone: payload.phone?.trim() || "",
      email: payload.email?.trim() || "",
      date: payload.date?.trim() || "",
      message: payload.message?.trim() || "",
      _subject: "New Site Visit Request - Gomti Homes",
    }).toString(),
  });

  if (!fallbackResponse.ok) {
    throw new Error(`FormSubmit fallback failed: ${fallbackResponse.status} ${await fallbackResponse.text()}`);
  }
}

async function handleLeadSubmission(request: Request, runtimeEnv: unknown): Promise<Response> {
  try {
    const payload = await parseLeadPayload(request);

    const details = [
      `Name: ${payload.name?.trim() || "Not provided"}`,
      `Phone: ${payload.phone?.trim() || "Not provided"}`,
      `Email: ${payload.email?.trim() || "Not provided"}`,
      `Preferred Visit Date: ${payload.date?.trim() || "Not provided"}`,
      `Message: ${payload.message?.trim() || "No additional message provided"}`,
    ].join("\n");

    const resendApiKey = getRuntimeEnvValue("RESEND_API_KEY", runtimeEnv);
    const sendGridApiKey = getRuntimeEnvValue("SENDGRID_API_KEY", runtimeEnv);
    const targetEmail = getRuntimeEnvValue("LEAD_EMAIL_TO", runtimeEnv) || "abhishek9621444444@gmail.com";
    const fromAddress =
      getRuntimeEnvValue("SENDGRID_FROM", runtimeEnv) ||
      getRuntimeEnvValue("RESEND_FROM", runtimeEnv) ||
      getRuntimeEnvValue("SMTP_FROM", runtimeEnv) ||
      "onboarding@resend.dev";

    console.log("Lead submission runtime env", {
      hasResendApiKey: Boolean(resendApiKey),
      hasSendGridApiKey: Boolean(sendGridApiKey),
      targetEmail,
      fromAddress,
    });

    let resendSuccess = false;
    let sendGridSuccess = false;
    let formSubmitSuccess = false;
    const methods: string[] = [];

    if (resendApiKey) {
      try {
        await sendLeadViaResend(details, resendApiKey, fromAddress, targetEmail);
        resendSuccess = true;
        methods.push("resend");
      } catch (error) {
        console.error("Lead email delivery failed with Resend", error);
      }
    } else {
      console.warn("Lead email not sent because Resend credentials are not configured.");
    }

    if (sendGridApiKey) {
      try {
        await sendLeadViaSendGrid(details, sendGridApiKey, fromAddress, targetEmail);
        sendGridSuccess = true;
        methods.push("sendgrid");
      } catch (error) {
        console.error("Lead email delivery failed with SendGrid", error);
      }
    } else {
      console.warn("Lead email not sent because SendGrid credentials are not configured.");
    }

    if (!resendSuccess && !sendGridSuccess) {
      try {
        await sendLeadViaFormSubmit(payload, targetEmail);
        formSubmitSuccess = true;
        methods.push("formsubmit");
      } catch (fallbackError) {
        console.error("FormSubmit fallback failed", fallbackError);
      }
    }

    if (resendSuccess || sendGridSuccess || formSubmitSuccess) {
      return new Response(JSON.stringify({ success: true, delivered: true, methods }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    await persistLead(payload);

    return new Response(
      JSON.stringify({ success: true, fallback: true, message: "Lead captured successfully. We will follow up shortly." }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Lead submission failed", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to process your request." }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const normalizedPathname = url.pathname.replace(/\/+$/, "") || "/";
      if (request.method === "POST" && normalizedPathname === "/api/submit-lead") {
        return handleLeadSubmission(request, env);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
