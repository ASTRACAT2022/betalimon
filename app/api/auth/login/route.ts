import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const secretKey = process.env.JWT_SECRET || "your-super-secret-key"

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    const settings = await kv.get("settings")

    if (!settings) {
      return NextResponse.json({ success: false, message: "Settings not configured." }, { status: 500 })
    }

    const adminUser = (settings as any).admin
    const isPasswordValid = await bcrypt.compare(password, adminUser.password)

    if (username === adminUser.username && isPasswordValid) {
      const token = jwt.sign({ username: adminUser.username }, secretKey, { expiresIn: "1h" })
      const response = NextResponse.json({ success: true })
      response.cookies.set("token", token, { httpOnly: true, path: "/" })
      return response
    } else {
      return NextResponse.json({ success: false, message: "Invalid username or password" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "An internal server error occurred." }, { status: 500 })
  }
}
