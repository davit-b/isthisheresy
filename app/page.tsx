import { topics } from '@/data/topics';
import Brick from '@/components/Brick';
import { Metadata } from 'next';
import { SECTION_ORDER, SECTION_COLORS } from '@/lib/sections';

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

  // Group topics by section
  const groupedTopics: { [key: string]: typeof topics } = {};
  topics.forEach(t => {
    const section = t.section || 'Other';
    if (!groupedTopics[section]) {
      groupedTopics[section] = [];
    }
    groupedTopics[section].push(t);
  });

  const sortedSections = Object.entries(groupedTopics).sort(([a], [b]) => {
    const aIndex = SECTION_ORDER.indexOf(a);
    const bIndex = SECTION_ORDER.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

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
          padding: '40px 20px',
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
            marginBottom: '100px',
            textAlign: 'center',
          }}
        >
          IS THIS HERESY?
        </h1>

        {/* Sections */}
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          {sortedSections.map(([sectionName, sectionTopics], index) => {
            const accentColor = SECTION_COLORS[sectionName] || '#888';

            return (
              <div key={sectionName} style={{ marginBottom: '80px' }}>
                {/* Section header */}
                <h2
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '32px',
                    fontWeight: '400',
                    color: '#fff',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    marginBottom: '32px',
                    marginTop: index === 0 ? '0' : '48px',
                    paddingBottom: '16px',
                    borderBottom: `2px solid ${accentColor}`,
                  }}
                >
                  {sectionName}
                </h2>

                {/* Bricks in this section */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    justifyContent: 'flex-start',
                  }}
                >
                  {sectionTopics.map((topic) => (
                    <Brick key={topic.id} topic={topic} sectionColor={accentColor} />
                  ))}
                </div>

                {/* Divider line between sections (except last) */}
                {index < sortedSections.length - 1 && (
                  <div
                    style={{
                      marginTop: '64px',
                      height: '1px',
                      background: 'linear-gradient(to right, transparent, #333, transparent)',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <footer
          className="homepage-footer"
          style={{
            marginTop: '40px',
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
