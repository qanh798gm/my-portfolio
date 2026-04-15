import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Anh Quoc Do — Frontend Engineer',
    template: '%s | Anh Quoc Do',
  },
  description:
    'Frontend Engineer with 7 years of experience building trading platforms, ERP systems, and enterprise dashboards. React, Vue, TypeScript, micro-frontends.',
  keywords: [
    'Frontend Engineer',
    'React',
    'TypeScript',
    'Micro-frontends',
    'Trading Platform',
    'ERP',
    'Next.js',
    'Vietnam',
  ],
  authors: [{ name: 'Anh Quoc Do', url: 'https://github.com/qanh798gm' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Anh Quoc Do — Frontend Engineer',
    description:
      'Frontend Engineer with 7 years of experience building trading platforms, ERP systems, and enterprise dashboards.',
    siteName: 'Anh Quoc Do Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anh Quoc Do — Frontend Engineer',
    description: 'Frontend Engineer · React · TypeScript · Micro-frontends',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
