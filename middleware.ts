import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "snapdraken_admin";
const encoder = new TextEncoder();

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

function timingSafeEqual(left: string, right: string) {
  const length = Math.max(left.length, right.length);
  let mismatch = left.length ^ right.length;

  for (let index = 0; index < length; index += 1) {
    mismatch |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }

  return mismatch === 0;
}

async function isAdminSessionValid(token?: string) {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();

  if (!token || !secret) return false;

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

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`v1.${expiresAt}`),
  );
  const expectedSignature = toBase64Url(new Uint8Array(signature));

  return timingSafeEqual(providedSignature, expectedSignature);
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!(await isAdminSessionValid(token))) {
    const loginUrl = new URL("/admin", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/admin/site/:path*", "/about/:path*", "/work/:path*"],
};
