"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  )
} 