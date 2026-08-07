export const ADMIN_COOKIE_NAME = "snapdraken_admin";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 8;

const encoder = new TextEncoder();

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() ?? "";
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function sha256(value: string) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

async function sign(value: string) {
  const secret = getSessionSecret();

  if (!secret) return "";

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return toBase64Url(new Uint8Array(signature));
}

function timingSafeEqual(left: string, right: string) {
  const length = Math.max(left.length, right.length);
  let mismatch = left.length ^ right.length;

  for (let index = 0; index < length; index += 1) {
    mismatch |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }

  return mismatch === 0;
}

export function isAdminAuthConfigured() {
  return Boolean(
    process.env.ADMIN_ACCESS_CODE?.trim() && process.env.ADMIN_SESSION_SECRET?.trim(),
  );
}

export async function verifyAdminCode(code: string) {
  const expected = process.env.ADMIN_ACCESS_CODE?.trim();

  if (!expected || !getSessionSecret()) return false;

  const [providedDigest, expectedDigest] = await Promise.all([
    sha256(code.trim()),
    sha256(expected),
  ]);

  return timingSafeEqual(toBase64Url(providedDigest), toBase64Url(expectedDigest));
}

export async function createAdminSession() {
  const expiresAt = Date.now() + ADMIN_SESSION_SECONDS * 1000;
  const payload = `v1.${expiresAt}`;
  const signature = await sign(payload);

  if (!signature) throw new Error("Admin session secret is not configured.");

  return `${expiresAt}.${signature}`;
}

export async function isAdminSessionValid(token?: string) {
  if (!token || !getSessionSecret()) return false;

  const [expiresAtValue, providedSignature, extra] = token.split(".");
  const expiresAt = Number(expiresAtValue);

  if (
    extra !== undefined ||
    !providedSignature ||
    !Number.isFinite(expiresAt) ||
    expiresAt <= Date.now()
  ) {
    return false;
  }

  const expectedSignature = await sign(`v1.${expiresAt}`);

  return timingSafeEqual(providedSignature, expectedSignature);
}
