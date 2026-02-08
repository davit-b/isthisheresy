import type { Metadata } from 'next';
import InflationCalculatorWrapper from '@/components/InflationCalculatorWrapper';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://isthisheresy.com'),
  title: 'Three Inflation Calculators | Is This Heresy?',
  description:
    'Two inflations run simultaneously: consumer prices (~3-4%/yr) and asset prices (~6-7%/yr). Compare CPI, M2 money supply, and gold to see what your money really lost.',
  openGraph: {
    title: 'Three Inflation Calculators',
    description: 'Consumer inflation vs asset inflation. Compare CPI, M2 money supply, and gold.',
    type: 'website',
    siteName: 'Is This Heresy?',
    images: [
      {
        url: '/real-inflation/og',
        width: 1200,
        height: 630,
        alt: 'Three Inflation Calculators - CPI vs M2 vs Gold',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/real-inflation/og'],
  },
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RealInflationPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Parse query parameters with defaults
  const amount = typeof params.amount === 'string' ? params.amount : '65000';
  const startYear = typeof params.start === 'string' ? parseInt(params.start, 10) : 2005;
  const endYear = typeof params.end === 'string' ? parseInt(params.end, 10) : 2026;

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
      }}
    >
      {/* Back to home link */}
      <div
        style={{
          padding: '20px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <Link
          href="/"
          className="back-link"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ← Back to Is This Heresy?
        </Link>
      </div>

      <InflationCalculatorWrapper
        initialAmount={amount}
        initialStartYear={startYear}
        initialEndYear={endYear}
      />

      {/* Footer */}
      <footer
        style={{
          padding: '40px 20px',
          textAlign: 'center',
          borderTop: '1px solid #111',
          marginTop: '60px',
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            color: '#444',
            marginBottom: '8px',
          }}
        >
          Data sources: FRED (M2), BLS (CPI), World Gold Council
        </p>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: '#333',
          }}
        >
          For educational purposes. Verify all data independently.
        </p>
      </footer>
    </main>
  );
}
