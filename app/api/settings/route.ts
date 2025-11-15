import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function GET() {
  try {
    const settings = await kv.get("settings")
    if (!settings) {
      return NextResponse.json({ success: false, message: "Settings not found." }, { status: 404 })
    }
    // Omit password from the response for security
    const { password, ...adminWithoutPassword } = (settings as any).admin
    return NextResponse.json({ ...(settings as any), admin: adminWithoutPassword })
  } catch (error) {
    console.error("Error reading settings:", error)
    return NextResponse.json({ success: false, message: "An internal server error occurred." }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const newSettings = await req.json()
    const currentSettings = await kv.get("settings")

    // Preserve the hashed password if it's not being changed
    if (currentSettings && !newSettings.admin.password) {
      newSettings.admin.password = (currentSettings as any).admin.password
    }

    await kv.set("settings", newSettings)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error writing settings:", error)
    return NextResponse.json({ success: false, message: "An internal server error occurred." }, { status: 500 })
  }
}
