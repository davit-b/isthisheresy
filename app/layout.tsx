import type { Metadata, Viewport } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// Use blue favicon in development to distinguish from production
const isDev = process.env.NODE_ENV === 'development';
const faviconPath = isDev ? '/favicon-dev.svg' : '/favicon.svg';

export const metadata: Metadata = {
  title: 'Is This Heresy?',
  description: 'Health information they don\'t teach you. Verify everything yourself.',
  icons: {
    icon: faviconPath,
    shortcut: faviconPath,
    apple: faviconPath,
  },
  openGraph: {
    title: 'Is This Heresy?',
    description: 'Health information they don\'t teach you. Verify everything yourself.',
    type: 'website',
    siteName: 'Is This Heresy?',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get GA measurement ID from environment variable
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

  return (
    <html lang="en">
      <body>
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        {children}
      </body>
    </html>
  );
}
