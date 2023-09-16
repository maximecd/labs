import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'maximecd - labs',
  description: 'React experiments by Maxime Condaminat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-slate-950 text-white ${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
