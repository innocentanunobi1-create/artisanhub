import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'ArtisanHub | Find Trusted Artisans in Nigeria',
  description: 'Connect with verified plumbers, electricians, carpenters, and more in Port Harcourt and beyond.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
