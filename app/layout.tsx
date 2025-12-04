import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Leo Song',
  description: 'Leo Song is an interaction designer based in California, focused on blending interaction design with immersive storytelling.',
  keywords: ['Leo Song', 'Leo Song Design', 'Leo Song Work', 'interaction design', 'UX', 'user experience', 'user experience design', 'UI', 'user interface', 'user interface design', 'creative', 'ArtCenter', 'portfolio'],
  authors: [{ name: 'Leo Song' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Leo Song — Interaction Designer',
    description: 'Blending interaction design with immersive storytelling.',
    images: ['https://leosong.org/images/preview.jpg'],
    url: 'https://leosong.org',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leo Song — Interaction Designer',
    description: 'Blending interaction design with immersive storytelling.',
    images: ['https://leosong.org/images/preview.jpg'],
  },
  icons: {
    icon: [
      { url: '/media/favicon/favicon.ico' },
      { url: '/media/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/media/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/media/favicon/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/media/favicon/site.webmanifest',
  appleWebApp: {
    title: 'leosong',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

