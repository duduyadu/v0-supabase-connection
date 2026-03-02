import type { Metadata } from 'next'
import { Noto_Sans, Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _notoSans = Noto_Sans({ subsets: ['latin', 'vietnamese'], weight: ['300', '400', '500', '600', '700'] })
const _notoSansKR = Noto_Sans_KR({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Aju E&J - Du hoc Han Quoc',
  description: 'Cau noi an toan tu Viet Nam den Han Quoc. Tu van du hoc, dao tao TOPIK, ho tro visa va viec lam.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
