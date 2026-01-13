import { topics } from '@/data/topics';
import Brick from '@/components/Brick';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is This Heresy? | Health Information They Don\'t Teach You',
  description: 'Verify health claims about glycation, antinutrients, glyphosate, atrazine, water contamination, and food storage. Question everything. Verify with AI.',
  keywords: ['health', 'nutrition', 'glyphosate', 'atrazine', 'glycation', 'antinutrients', 'water filtration', 'food safety'],
  openGraph: {
    title: 'Is This Heresy?',
    description: 'Health information they don\'t teach you. Verify everything yourself.',
    url: 'https://isthisheresy.com',
    type: 'website',
    siteName: 'Is This Heresy?',
  },
  twitter: {
    card: 'summary',
    title: 'Is This Heresy?',
    description: 'Health information they don\'t teach you. Verify everything yourself.',
  },
};

export default function HomePage() {
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Is This Heresy?',
    url: 'https://isthisheresy.com',
    description: 'Health information they don\'t teach you. Verify everything yourself.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://isthisheresy.com/{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div
        className="homepage-container"
        style={{
          minHeight: '100vh',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        {/* Title */}
        <h1
          className="homepage-title"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '64px',
            fontWeight: '700',
            color: '#fff',
            letterSpacing: '8px',
            marginBottom: '40px',
            textAlign: 'center',
          }}
        >
          IS THIS HERESY?
        </h1>

        {/* Brick mosaic */}
        <div
          className="brick-grid"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            maxWidth: '900px',
          }}
        >
          {topics.map((topic) => (
            <Brick key={topic.id} topic={topic} />
          ))}
        </div>

        {/* Footer */}
        <footer
          className="homepage-footer"
          style={{
            marginTop: '60px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px',
            fontWeight: '400',
            color: '#666',
            letterSpacing: '1px',
            textAlign: 'center',
          }}
        >
          the only constant is change
        </footer>
      </div>
    </>
  );
}
