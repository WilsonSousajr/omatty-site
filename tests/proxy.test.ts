// @vitest-environment node
import { NextRequest } from "next/server";
import { describe, expect, test } from "vitest";
import { config, proxy } from "@/proxy";

function visit(acceptLanguage?: string): Response {
  const headers = acceptLanguage
    ? { "accept-language": acceptLanguage }
    : undefined;
  return proxy(new NextRequest("https://omatty.test/", { headers }));
}

describe("proxy", () => {
  test("sends a Portuguese browser to /pt", () => {
    const res = visit("pt-BR,pt;q=0.9");
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://omatty.test/pt");
  });

  test("sends everyone else to /en", () => {
    expect(visit("de-DE").headers.get("location")).toBe(
      "https://omatty.test/en",
    );
    expect(visit().headers.get("location")).toBe("https://omatty.test/en");
  });

  test("varies the redirect by Accept-Language, so a CDN does not cache one answer for all", () => {
    expect(visit("pt").headers.get("vary")).toContain("Accept-Language");
  });

  test("runs only on the bare root", () => {
    expect(config.matcher).toEqual(["/"]);
  });
});
