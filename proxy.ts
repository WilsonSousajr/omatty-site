import { NextResponse, type NextRequest } from "next/server";
import { negotiateLocale } from "@/lib/locale";

/** "/" has no page of its own: send the visitor to their language. */
export function proxy(request: NextRequest): NextResponse {
  const locale = negotiateLocale(request.headers.get("accept-language"));
  const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
  response.headers.set("Vary", "Accept-Language");
  return response;
}

// /en and /pt are static files; only the bare root needs a decision.
export const config = { matcher: ["/"] };
