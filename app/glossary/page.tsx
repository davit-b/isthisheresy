import { Metadata } from 'next';
import Link from 'next/link';
import LeftRail from '@/components/LeftRail';
import { getTopicUrl, getTopicById } from '@/data/topics';
import { getSortedGlossary } from '@/data/glossary';

export const metadata: Metadata = {
  title: 'Glossary | Is This Heresy?',
  description: 'Definitions of health terms: antinutrients, glyphosate, atrazine, reverse osmosis, and more.',
};

const sortedGlossary = getSortedGlossary();

// Create a fake topic for LeftRail (it expects a currentTopic)
const glossaryTopic = {
  id: 'glossary',
  brickTitle: 'GLOSSARY',
  longTitle: 'Glossary',
  shareSnippet: '',
  verifyPrompt: '',
  tags: [],
  section: 'Other',
};

export default function GlossaryPage() {
  return (
    <div style={{
      height: '100vh',
      background: '#000',
      display: 'flex',
      overflow: 'hidden',
    }}>
      <LeftRail currentTopic={glossaryTopic as any} />

      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '40px',
        paddingBottom: '100px',
      }}>
        <h1 style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '28px',
          fontWeight: '700',
          color: '#fff',
          letterSpacing: '2px',
          marginBottom: '40px',
        }}>
          GLOSSARY
        </h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxWidth: '800px',
        }}>
          {sortedGlossary.map((entry) => {
            // Get valid topic objects for related topics
            const relatedTopicObjects = entry.relatedTopics
              .map(id => getTopicById(id))
              .filter((t): t is NonNullable<typeof t> => t !== undefined);

            return (
              <div key={entry.term} style={{
                borderBottom: '1px solid #222',
                paddingBottom: '24px',
              }}>
                <dt style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#dc2626',
                  letterSpacing: '1px',
                  marginBottom: '8px',
                }}>
                  {entry.term}
                </dt>
                <dd style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#ccc',
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {entry.definition}
                </dd>
                {relatedTopicObjects.length > 0 && (
                  <div style={{
                    marginTop: '12px',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '12px',
                    color: '#888',
                  }}>
                    <span>See: </span>
                    {relatedTopicObjects.map((topic, index) => (
                      <span key={topic.id}>
                        <Link
                          href={getTopicUrl(topic)}
                          style={{
                            color: '#d4af37',
                            textDecoration: 'none',
                          }}
                        >
                          {topic.brickTitle}
                        </Link>
                        {index < relatedTopicObjects.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
