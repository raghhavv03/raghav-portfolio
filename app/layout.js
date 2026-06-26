import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { seo, personal } from '@/data/portfolio';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata = {
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: seo.url },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    siteName: personal.name,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    creator: seo.twitterHandle,
    images: [seo.ogImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
