import { NextResponse, type NextRequest } from "next/server";

/**
 * The iRobot brand page used to live at the mixed-case /brands/iRobot.
 * next.config redirects match case-insensitively (they looped on
 * /brands/irobot), so the legacy URL is matched here by exact string.
 */
export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/brands/iRobot") {
    return NextResponse.redirect(new URL("/brands/irobot", req.url), 308);
  }
  return NextResponse.next();
}

export const config = { matcher: "/brands/:path*" };
