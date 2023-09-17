import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'labs | maximecd',
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
        <main className="mx-auto w-full max-w-[min(100%-48px,900px)]">
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
