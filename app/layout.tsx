import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Krones International Raw Materials Trading FZ LLC',
  description: 'Trusted Source for Raw Materials',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}