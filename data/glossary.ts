/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * GLOSSARY DATA - Is This Heresy?
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This file defines all glossary terms displayed at /glossary.
 * It can be edited by Claude Desktop (content context) or Claude Code (dev context).
 *
 * ─────────────────────────────────────────────────────────────────────────────────
 * FIELD REFERENCE
 * ─────────────────────────────────────────────────────────────────────────────────
 *
 *   term            The glossary term/phrase (displayed as heading)
 *
 *   definition      Clear, concise explanation of the term (1-3 sentences)
 *                   Should be understandable without reading the related infographic
 *
 *   relatedTopics   Array of topic IDs from data/topics.ts
 *                   These render as clickable links below the definition
 *                   Example: ['glyphosate', 'antinutrients']
 *
 * ─────────────────────────────────────────────────────────────────────────────────
 * ADDING NEW ENTRIES
 * ─────────────────────────────────────────────────────────────────────────────────
 *
 *   1. Add a new object to the glossaryEntries array below
 *   2. Entries are auto-sorted alphabetically on the page
 *   3. Ensure relatedTopics IDs match existing topic IDs in data/topics.ts
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export interface GlossaryEntry {
  term: string;
  definition: string;
  relatedTopics: string[];
}

export const glossaryEntries: GlossaryEntry[] = [
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

// Helper to get sorted glossary entries
export function getSortedGlossary(): GlossaryEntry[] {
  return [...glossaryEntries].sort((a, b) => a.term.localeCompare(b.term));
}
