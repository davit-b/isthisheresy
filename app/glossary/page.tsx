import { Metadata } from 'next';
import GlossaryContent from '@/components/GlossaryContent';

export const metadata: Metadata = {
  title: 'Glossary | Is This Heresy?',
  description: 'Definitions of health terms: antinutrients, glyphosate, atrazine, reverse osmosis, and more.',
};

export default function GlossaryPage() {
  return <GlossaryContent />;
        <h1 style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '28px',
          fontWeight: '700',
          color: '#fff',
          letterSpacing: '2px',
          marginBottom: '40px',
        }}>
}
