'use client'

import Navigation from "@/components/Navigation/Navigation"
import Footer from "@/components/Footer/Footer"
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </SessionProvider>
  )
} 