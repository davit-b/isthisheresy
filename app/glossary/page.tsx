import { Metadata } from 'next';
import GlossaryContent from '@/components/GlossaryContent';

export const metadata: Metadata = {
  title: 'Glossary | Is This Heresy?',
  description: 'Definitions of health terms: antinutrients, glyphosate, atrazine, reverse osmosis, and more.',
};

export default function GlossaryPage() {
  return <GlossaryContent />;
}
