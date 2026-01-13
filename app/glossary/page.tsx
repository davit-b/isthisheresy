import { Metadata } from 'next';
import Link from 'next/link';
import LeftRail from '@/components/LeftRail';
import { topics, getTopicUrl, getTopicById } from '@/data/topics';

export const metadata: Metadata = {
  title: 'Glossary | Is This Heresy?',
  description: 'Definitions of health terms: antinutrients, glyphosate, atrazine, reverse osmosis, and more.',
};

// Glossary entries - extracted and defined from topic content
const glossaryEntries = [
  {
    term: 'Advanced Glycation End Products (AGEs)',
    definition: 'Harmful compounds formed when sugars bond to proteins or fats without enzymatic control. AGEs accumulate in tissues and contribute to aging and chronic disease.',
    relatedTopics: ['glycation'],
  },
  {
    term: 'Alkaloids',
    definition: 'Nitrogen-containing compounds found in nightshade plants (tomatoes, potatoes, peppers, eggplants) that can damage the nervous system and gut lining.',
    relatedTopics: ['antinutrients', 'alkaloids', 'nightshades'],
  },
  {
    term: 'Antinutrients',
    definition: 'Chemical compounds in plants that interfere with nutrient absorption or cause damage to the body. Plants evolved these as defense mechanisms against being eaten.',
    relatedTopics: ['antinutrients'],
  },
  {
    term: 'Aromatase',
    definition: 'An enzyme that converts testosterone to estrogen. Disruption of this pathway by chemicals like atrazine can cause hormonal imbalances.',
    relatedTopics: ['atrazine'],
  },
  {
    term: 'Atrazine',
    definition: 'A widely-used herbicide that enters groundwater and disrupts the aromatase pathway. Banned in the EU but still used in the US. Known to feminize male frogs at trace concentrations.',
    relatedTopics: ['atrazine', 'reverse-osmosis'],
  },
  {
    term: 'Desiccant',
    definition: 'A drying agent. Glyphosate is sprayed as a desiccant on crops before harvest to dry them out, resulting in direct contamination of the food supply.',
    relatedTopics: ['glyphosate'],
  },
  {
    term: 'Formaldehyde',
    definition: 'A known carcinogen used in adhesives for wood products like MDF and particle board. Off-gasses from furniture and cutting boards into homes.',
    relatedTopics: ['wood-bamboo', 'clean-storage'],
  },
  {
    term: 'Fumigation',
    definition: 'Treatment of materials with chemical gases to kill pests. ISPM-15 requires fumigation of imported wood products, leaving chemical residues.',
    relatedTopics: ['wood-bamboo'],
  },
  {
    term: 'Glyphosate',
    definition: 'The active ingredient in Roundup herbicide. Patented as an antibiotic (US Patent 7,771,736). Sprayed on GMO crops and as a desiccant, destroying gut microbiota.',
    relatedTopics: ['glyphosate'],
  },
  {
    term: 'Glycation',
    definition: 'The non-enzymatic bonding of sugar molecules to proteins or fats. High blood sugar causes glycation, essentially "caramelizing" your tissues from the inside.',
    relatedTopics: ['glycation'],
  },
  {
    term: 'Goitrogens',
    definition: 'Compounds that interfere with thyroid function by blocking iodine uptake. Found in cruciferous vegetables like broccoli, cauliflower, and kale.',
    relatedTopics: ['antinutrients', 'goitrogens'],
  },
  {
    term: 'ISPM-15',
    definition: 'International Standards for Phytosanitary Measures No. 15. Requires wood packaging materials to be treated (usually fumigated) before international shipment.',
    relatedTopics: ['wood-bamboo'],
  },
  {
    term: 'Leaky Gut',
    definition: 'A condition where the intestinal lining becomes permeable, allowing undigested food particles and toxins to enter the bloodstream. Caused by lectins and other antinutrients.',
    relatedTopics: ['antinutrients', 'lectins'],
  },
  {
    term: 'Lectins',
    definition: 'Proteins that bind to cell membranes in the gut, causing inflammation and increased intestinal permeability (leaky gut). Found in legumes, grains, and nightshades.',
    relatedTopics: ['antinutrients', 'lectins', 'nightshades'],
  },
  {
    term: 'Methyl Bromide',
    definition: 'A fumigation chemical used to treat imported wood and other materials. Residues remain in treated products.',
    relatedTopics: ['wood-bamboo'],
  },
  {
    term: 'Nightshades',
    definition: 'A plant family (Solanaceae) including tomatoes, potatoes, peppers, and eggplants. Contains both lectins and alkaloids, causing dual damage to gut and nervous system.',
    relatedTopics: ['antinutrients', 'alkaloids', 'nightshades'],
  },
  {
    term: 'Oxalates',
    definition: 'Compounds that bind to minerals like calcium, forming crystals that accumulate in kidneys (kidney stones) and joints. Found in spinach, rhubarb, and almonds.',
    relatedTopics: ['antinutrients', 'oxalates'],
  },
  {
    term: 'PFAS',
    definition: 'Per- and polyfluoroalkyl substances, also called "forever chemicals." Persist in water supplies and the human body. Not removed by standard water filtration.',
    relatedTopics: ['reverse-osmosis'],
  },
  {
    term: 'Phytic Acid',
    definition: 'An antinutrient that binds to minerals (iron, zinc, calcium) in the digestive tract, preventing their absorption. Found in grains, legumes, nuts, and seeds.',
    relatedTopics: ['antinutrients', 'phytic-acid'],
  },
  {
    term: 'Phytoestrogens',
    definition: 'Plant compounds that mimic estrogen in the body, disrupting hormonal balance. Found primarily in soy products.',
    relatedTopics: ['antinutrients', 'phytoestrogens'],
  },
  {
    term: 'Reverse Osmosis',
    definition: 'A water filtration method that forces water through a semipermeable membrane, removing contaminants including atrazine, PFAS, fluoride, pharmaceuticals, and heavy metals.',
    relatedTopics: ['reverse-osmosis', 'atrazine'],
  },
];

// Sort alphabetically
const sortedGlossary = [...glossaryEntries].sort((a, b) =>
  a.term.localeCompare(b.term)
);

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
