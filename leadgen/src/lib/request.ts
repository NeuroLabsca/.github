import type { NextRequest } from "next/server";

export function clientIp(req: NextRequest) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? req.headers.get("cf-connecting-ip") ?? "0.0.0.0";
}

export function userAgent(req: NextRequest) {
  return req.headers.get("user-agent") ?? "";
}
