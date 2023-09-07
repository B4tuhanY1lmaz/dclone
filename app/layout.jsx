import '@/styles/globals.css'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ModalProvider } from '@/components/providers/modal-provider'
import { cn } from '@/lib/utils'

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Discord clone',
  description: 'A Discord clone app built by Batuhan Y. Yilmaz',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          inter.className, "bg-white dark:bg-[#313338]"
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            storageKey="discord-theme"
          >
            <ModalProvider />
              {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
