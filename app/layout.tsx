import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { kv } from "@vercel/kv"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ASTRACAT WARP V2",
  description: "Generate WARP configurations",
}

async function getDesignSettings() {
  try {
    const settings = await kv.get("settings")
    return (settings as any)?.design || { backgroundColor: "#000000" }
  } catch (error) {
    console.error("Could not read design settings, falling back to default.", error)
    return { backgroundColor: "#000000" }
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const design = await getDesignSettings()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} style={{ backgroundColor: design.backgroundColor }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
