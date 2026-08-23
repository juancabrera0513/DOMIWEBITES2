const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_ywkf6l7";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_68t4i9b";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "QomFGcKltdQDXhSSp";

export function normalizeWebsite(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(candidate);
    if (!url.hostname.includes(".") || /\s/.test(url.hostname)) return "";
    return url.toString();
  } catch {
    return "";
  }
}

export function buildAuditEmailParams({ name, email, website, message }) {
  const normalizedWebsite = normalizeWebsite(website);
  const hostname = new URL(normalizedWebsite).hostname.replace(/^www\./i, "");
  const details = message.trim() || "No additional priorities provided.";

  return {
    fullName: name.trim(),
    email: email.trim(),
    phone: "",
    subject: `Free website audit request: ${hostname}`,
    message: `Website: ${normalizedWebsite}\n\nWhat they would like to improve:\n${details}`,
    reply_to: email.trim(),
    website_url: normalizedWebsite,
  };
}

export async function sendAuditRequest(form) {
  const emailjs = (await import("@emailjs/browser")).default;
  const params = buildAuditEmailParams(form);
  await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
  return params;
}
