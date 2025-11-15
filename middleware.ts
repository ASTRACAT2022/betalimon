import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "your-super-secret-key")

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  try {
    await jwtVerify(token, secretKey)
    return NextResponse.next()
  } catch (err) {
    return NextResponse.redirect(new URL("/admin", req.url))
  }
}

export const config = {
  matcher: "/admin/dashboard/:path*",
}
