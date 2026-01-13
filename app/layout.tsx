import type { Metadata } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'Is This Heresy?',
  description: 'Health information they don\'t teach you. Verify everything yourself.',
  openGraph: {
    title: 'Is This Heresy?',
    description: 'Health information they don\'t teach you. Verify everything yourself.',
    type: 'website',
    siteName: 'Is This Heresy?',
  },
  twitter: {
    card: 'summary_large_image',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
