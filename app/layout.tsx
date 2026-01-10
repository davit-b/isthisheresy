import type { Metadata } from 'next';
import './globals.css';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
