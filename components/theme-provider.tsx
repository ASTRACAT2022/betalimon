"use client"

import { useEffect } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.design?.backgroundColor) {
          document.body.style.backgroundColor = data.design.backgroundColor
        }
      })
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
