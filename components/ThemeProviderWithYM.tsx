"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { useEffect } from "react"
import { initYM } from "@/utils/ym"

export default function ThemeProviderWithYM({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initYM(98811523)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
