'use client'

import { useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import { ClerkProvider } from '@clerk/nextjs'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import { ToastProvider } from '@/components/providers/toaster-provider'

function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      let systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeWatcher />
        <ConfettiProvider />
        <ToastProvider />
        {children}
      </ThemeProvider>
    </ClerkProvider>
  )
}
