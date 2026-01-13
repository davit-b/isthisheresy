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
  // ═══════════════════════════════════════════════════════════════════════════════
  // A
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Advanced Glycation End Products (AGEs)',
    definition: 'Harmful compounds formed when sugars bond to proteins or fats without enzymatic control. AGEs accumulate in tissues, damage arterial walls, and contribute to aging, diabetes complications, and chronic disease. The process is similar to caramelization.',
    relatedTopics: ['glycation'],
  },
  {
    term: 'ALA (Alpha-Linolenic Acid)',
    definition: 'A plant-based omega-3 fatty acid found in flaxseed, chia, and walnuts. Must be converted to EPA and DHA to be useful, but conversion efficiency is only 5-10%. Not equivalent to fish oil despite marketing claims.',
    relatedTopics: ['fat-101', 'omega-confusion'],
  },
  {
    term: 'Alkaloids',
    definition: 'Nitrogen-containing neurotoxic compounds found in nightshade plants (tomatoes, potatoes, peppers, eggplants). Includes solanine, tomatine, and capsaicin. Interfere with nerve signal transmission and can damage gut lining.',
    relatedTopics: ['antinutrients', 'alkaloids', 'nightshades'],
  },
  {
    term: 'Antinutrients',
    definition: 'Chemical compounds in plants that interfere with nutrient absorption or cause damage to the body. Includes lectins, oxalates, phytic acid, goitrogens, alkaloids, and phytoestrogens. Plants evolved these as defense mechanisms against being eaten.',
    relatedTopics: ['antinutrients'],
  },
  {
    term: 'Aromatase',
    definition: 'An enzyme that converts testosterone to estrogen. Disruption of this pathway by chemicals like atrazine causes hormonal imbalances, feminization, and reproductive problems.',
    relatedTopics: ['atrazine'],
  },
  {
    term: 'Atrazine',
    definition: 'A widely-used herbicide that enters groundwater and disrupts the aromatase pathway. Banned in the EU for 20+ years but still heavily used in the US. Famous for feminizing male frogs at parts-per-billion concentrations in Tyrone Hayes\' studies.',
    relatedTopics: ['atrazine', 'reverse-osmosis'],
  },
  {
    term: 'Azodicarbonamide',
    definition: 'A chemical dough conditioner used in American bread, also used to make yoga mats and shoe soles. Banned in the EU and Australia. Creates urethane (a carcinogen) when baked.',
    relatedTopics: ['american-wheat', 'wheat-chemicals'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // B
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Bamboo Rayon',
    definition: 'A chemically processed fabric made from bamboo pulp using carbon disulfide and sodium hydroxide. Despite "bamboo" marketing, it\'s a synthetic viscose/rayon, not natural bamboo fiber. Classic greenwashing.',
    relatedTopics: ['plastic-fabrics'],
  },
  {
    term: 'Beta-Hydroxybutyrate (BHB)',
    definition: 'The primary ketone body produced during ketosis. An efficient fuel source for the brain and muscles. Elevated levels indicate the body is successfully burning fat for fuel.',
    relatedTopics: ['fuel-systems', 'keto-adaptation'],
  },
  {
    term: 'Bioavailability',
    definition: 'The proportion of a nutrient that is actually absorbed and used by the body. Plant proteins have lower bioavailability than animal proteins due to antinutrients and fiber matrix.',
    relatedTopics: ['protein-101', 'protein-volume'],
  },
  {
    term: 'Biohydrogenation',
    definition: 'The process by which ruminant animals (cows, sheep, goats) convert unsaturated fats to saturated fats in their rumen before absorption. This is why beef fat is safe even if cows eat some PUFA-containing plants.',
    relatedTopics: ['fat-101', 'animal-fat-contamination'],
  },
  {
    term: 'Biological Value',
    definition: 'A measure of how efficiently dietary protein is converted into body protein. Whole eggs have the highest biological value (100) and are used as the reference standard. Plant proteins score lower.',
    relatedTopics: ['protein-101'],
  },
  {
    term: 'BPA (Bisphenol A)',
    definition: 'A synthetic estrogen used in plastics and can linings. Binds to estrogen receptors, causing hormonal disruption. "BPA-free" products often contain BPS or BPF, which have similar effects.',
    relatedTopics: ['hidden-plastic', 'clean-storage'],
  },
  {
    term: 'BPS/BPF (Bisphenol S/F)',
    definition: 'BPA replacements used in "BPA-free" products. Have the same estrogen-mimicking mechanism as BPA. The replacement was for marketing, not safety.',
    relatedTopics: ['hidden-plastic', 'clean-storage'],
  },
  {
    term: 'Bromate (Potassium Bromate)',
    definition: 'A flour additive that strengthens dough and allows faster rising. Classified as a possible carcinogen. Banned in the EU, UK, Canada, Brazil, and China, but still used in American bread.',
    relatedTopics: ['american-wheat', 'wheat-chemicals'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // C
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Capsaicin',
    definition: 'The alkaloid that makes peppers "hot." Triggers pain receptors (TRPV1), which is why it burns. The pain response is not a flavor - it\'s your body warning you of a chemical irritant.',
    relatedTopics: ['antinutrients', 'alkaloids', 'nightshades'],
  },
  {
    term: 'Cardiolipin',
    definition: 'A phospholipid found in mitochondrial membranes, essential for energy production. Its fatty acid composition reflects dietary fat intake. High linoleic acid in cardiolipin impairs mitochondrial function.',
    relatedTopics: ['fat-101', 'linoleic-acid'],
  },
  {
    term: 'Chelation',
    definition: 'The binding of minerals by another compound, making them unavailable for absorption. Glyphosate chelates manganese, zinc, and iron. Phytic acid chelates calcium, iron, and zinc.',
    relatedTopics: ['glyphosate', 'antinutrients', 'phytic-acid'],
  },
  {
    term: 'Complete Protein',
    definition: 'A protein source containing all nine essential amino acids in adequate proportions. Animal proteins (meat, eggs, dairy) are complete. Plant proteins are typically incomplete, with one or more limiting amino acids.',
    relatedTopics: ['protein-101'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // D
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'DATEM',
    definition: 'Diacetyl Tartaric Acid Esters of Monoglycerides. An emulsifier used in commercial bread to improve texture and shelf life. One of many additives in American bread that don\'t exist in traditional recipes.',
    relatedTopics: ['american-wheat'],
  },
  {
    term: 'Desiccation',
    definition: 'The practice of spraying herbicide (usually glyphosate) on mature crops 7-14 days before harvest to kill and dry them for easier harvesting. Results in maximum contamination of the food supply. Common in Canada and the UK.',
    relatedTopics: ['glyphosate', 'desiccation', 'american-wheat'],
  },
  {
    term: 'DHA (Docosahexaenoic Acid)',
    definition: 'An omega-3 fatty acid essential for brain function and found in fatty fish and fish oil. Cannot be efficiently obtained from plant sources - ALA conversion to DHA is only 2-5%.',
    relatedTopics: ['fat-101', 'omega-confusion'],
  },
  {
    term: 'Dwarf Wheat',
    definition: 'Modern wheat varieties developed during the Green Revolution (1960s-70s) with shorter stalks and higher yields. Has 42 chromosomes versus 14-28 in heritage wheat, with altered gluten protein structure.',
    relatedTopics: ['american-wheat'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // E
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Elastane',
    definition: 'Another name for spandex/Lycra. A polyurethane-based synthetic fiber added to clothing for stretch. Even "cotton" underwear typically contains 5-10% elastane woven throughout.',
    relatedTopics: ['plastic-fabrics'],
  },
  {
    term: 'Emulsifiers',
    definition: 'Additives that help oil and water mix. Industrial bread contains multiple emulsifiers (DATEM, SSL, mono/diglycerides) that can damage gut lining. Traditional bread has none.',
    relatedTopics: ['american-wheat'],
  },
  {
    term: 'Endocrine Disruptors',
    definition: 'Chemicals that interfere with the hormone system. Include BPA, phthalates, atrazine, and phytoestrogens. Cause reproductive problems, developmental issues, and metabolic dysfunction.',
    relatedTopics: ['atrazine', 'hidden-plastic', 'plastic-fabrics', 'phytoestrogens'],
  },
  {
    term: 'EPA (Eicosapentaenoic Acid)',
    definition: 'An omega-3 fatty acid with anti-inflammatory effects, found in fatty fish and fish oil. Plant-based ALA converts to EPA at only 5-10% efficiency.',
    relatedTopics: ['fat-101', 'omega-confusion'],
  },
  {
    term: 'Epoxy Resin',
    definition: 'A plastic coating used inside metal cans to prevent corrosion. Contains BPA or BPA alternatives that leach into food. Your canned food contacts plastic, not metal.',
    relatedTopics: ['hidden-plastic'],
  },
  {
    term: 'Essential Amino Acids',
    definition: 'The nine amino acids the body cannot synthesize and must obtain from food: histidine, isoleucine, leucine, lysine, methionine, phenylalanine, threonine, tryptophan, and valine.',
    relatedTopics: ['protein-101'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // F
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Fat Adaptation',
    definition: 'The metabolic state where muscles efficiently burn fat for fuel. Takes 3-4+ months of consistent low-carb eating to fully develop. Most people quit before reaching this state.',
    relatedTopics: ['fuel-systems', 'keto-adaptation'],
  },
  {
    term: 'Fleece',
    definition: 'A synthetic fabric made from polyester (PET plastic). Sheds microplastics when washed and worn. "Cozy" and "sherpa" fabrics are also polyester fleece.',
    relatedTopics: ['plastic-fabrics', 'fabric-switches'],
  },
  {
    term: 'Fluoride',
    definition: 'A halogen added to municipal water supplies. Accumulates in bones, thyroid, and pineal gland. Not removed by standard filtration - requires reverse osmosis.',
    relatedTopics: ['reverse-osmosis'],
  },
  {
    term: 'Formaldehyde',
    definition: 'A known human carcinogen (IARC Group 1) used in adhesives for plywood, MDF, and particle board. Continuously off-gasses from furniture into indoor air for years.',
    relatedTopics: ['wood-bamboo', 'wood-glue', 'clean-storage'],
  },
  {
    term: 'Fumigation',
    definition: 'Treatment of materials with chemical gases (methyl bromide, phosphine) to kill pests. ISPM-15 requires fumigation of imported wood products. Residues remain in treated products.',
    relatedTopics: ['wood-bamboo'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // G
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Gliadin',
    definition: 'The problematic protein fraction in gluten. Modern dwarf wheat has higher gliadin content than heritage varieties. Resistant to digestion and triggers immune responses in sensitive individuals.',
    relatedTopics: ['american-wheat'],
  },
  {
    term: 'Glucosinolates',
    definition: 'Compounds in cruciferous vegetables that convert to goitrogens when the plant is damaged (chewing, cutting). Give broccoli and cabbage their bitter taste.',
    relatedTopics: ['antinutrients', 'goitrogens'],
  },
  {
    term: 'Gluten',
    definition: 'A protein complex in wheat, barley, and rye that gives bread its elasticity. Modern wheat has altered gluten structure. Long fermentation breaks down gluten; industrial bread-making doesn\'t.',
    relatedTopics: ['american-wheat', 'international-wheat'],
  },
  {
    term: 'Glycogen',
    definition: 'The storage form of glucose in muscles and liver. Total capacity is only ~1,500-2,000 calories. When depleted during exercise, athletes "hit the wall" if not fat-adapted.',
    relatedTopics: ['fuel-systems'],
  },
  {
    term: 'Glyphosate',
    definition: 'The active ingredient in Roundup herbicide. Patented as an antibiotic (US Patent 7,771,736). Sprayed on GMO crops and as a pre-harvest desiccant. Destroys gut microbiota and chelates essential minerals.',
    relatedTopics: ['glyphosate', 'desiccation', 'american-wheat'],
  },
  {
    term: 'Glycation',
    definition: 'The non-enzymatic bonding of sugar molecules to proteins or fats. High blood sugar causes glycation damage to arteries, kidneys, eyes, and nerves. Essentially "caramelizing" your tissues from the inside.',
    relatedTopics: ['glycation'],
  },
  {
    term: 'Goitrogens',
    definition: 'Compounds that interfere with thyroid function by blocking iodine uptake. Found in cruciferous vegetables (broccoli, kale, cabbage) and soy. Named because they can cause goiter (enlarged thyroid).',
    relatedTopics: ['antinutrients', 'goitrogens'],
  },
  {
    term: 'Gore-Tex',
    definition: 'A "breathable waterproof" membrane made from PTFE (Teflon) - a PFAS forever chemical. Marketed as high-tech outdoor gear but is essentially plastic containing forever chemicals.',
    relatedTopics: ['plastic-fabrics', 'natural-fabrics'],
  },
  {
    term: 'Green Revolution',
    definition: 'The 1960s-70s agricultural initiative that developed high-yield dwarf wheat varieties. Increased food production but created wheat with altered protein structure and different nutritional properties.',
    relatedTopics: ['american-wheat'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // H
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Heritage Wheat',
    definition: 'Traditional wheat varieties (einkorn, emmer, spelt) with 14-28 chromosomes versus 42 in modern wheat. Simpler gluten structure, lower gliadin content, better tolerated by many people.',
    relatedTopics: ['international-wheat', 'traditional-bread'],
  },
  {
    term: '4-HNE (4-Hydroxynonenal)',
    definition: 'A toxic aldehyde produced when polyunsaturated fats oxidize. Damages proteins and DNA. Created when you heat seed oils or when PUFAs oxidize inside your body.',
    relatedTopics: ['fat-101', 'pufa-oxidation'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // I
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Insulin',
    definition: 'A hormone that regulates blood sugar by signaling cells to absorb glucose. Also blocks fat release from adipose tissue. Chronic elevation from frequent carb consumption prevents fat burning.',
    relatedTopics: ['glycation', 'fuel-systems', 'metabolic-comparison'],
  },
  {
    term: 'Intestinal Permeability',
    definition: 'The degree to which substances can pass through the gut lining. Increased permeability ("leaky gut") allows undigested proteins and toxins into the bloodstream, triggering immune responses.',
    relatedTopics: ['antinutrients', 'lectins', 'glyphosate'],
  },
  {
    term: 'Isoflavones',
    definition: 'Phytoestrogens found in soy (genistein, daidzein). Bind to estrogen receptors and have hormonal effects. Infant soy formula delivers doses equivalent to multiple birth control pills daily.',
    relatedTopics: ['antinutrients', 'phytoestrogens'],
  },
  {
    term: 'ISPM-15',
    definition: 'International Standards for Phytosanitary Measures No. 15. Requires wood packaging materials to be heat-treated or fumigated before international shipment. Why imported wood products contain chemical residues.',
    relatedTopics: ['wood-bamboo'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // K
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Keto Flu',
    definition: 'Temporary symptoms (fatigue, headache, brain fog) experienced during the transition to ketosis. Caused by electrolyte shifts and the body adapting to fat-burning. Passes within 1-2 weeks.',
    relatedTopics: ['fuel-systems', 'keto-adaptation'],
  },
  {
    term: 'Ketones',
    definition: 'Molecules produced by the liver from fatty acids during low-carb/fasting states. Include beta-hydroxybutyrate, acetoacetate, and acetone. Efficient fuel for brain and muscles.',
    relatedTopics: ['fuel-systems', 'keto-adaptation'],
  },
  {
    term: 'Ketosis',
    definition: 'A metabolic state where the body primarily burns fat and produces ketones for fuel. Occurs when carbohydrate intake is very low (~20-50g/day) or during extended fasting.',
    relatedTopics: ['fuel-systems', 'keto-adaptation', 'metabolic-comparison'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // L
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Lavash',
    definition: 'Traditional Armenian flatbread made with only flour, water, and salt. UNESCO Intangible Cultural Heritage. Example of how simple real bread can be.',
    relatedTopics: ['international-wheat', 'traditional-bread'],
  },
  {
    term: 'Leaky Gut',
    definition: 'Colloquial term for increased intestinal permeability. The gut lining becomes damaged, allowing particles to enter the bloodstream. Caused by lectins, glyphosate, and other gut irritants.',
    relatedTopics: ['antinutrients', 'lectins', 'glyphosate'],
  },
  {
    term: 'Lectins',
    definition: 'Carbohydrate-binding proteins that attach to gut cell membranes, causing inflammation and increased permeability. Found in legumes, grains, and nightshades. Raw kidney beans can cause severe poisoning.',
    relatedTopics: ['antinutrients', 'lectins', 'nightshades'],
  },
  {
    term: 'Limiting Amino Acid',
    definition: 'The essential amino acid present in the lowest amount relative to the body\'s needs, which limits how much of the protein can actually be used. Lysine is limiting in grains; methionine in legumes.',
    relatedTopics: ['protein-101'],
  },
  {
    term: 'Linoleic Acid',
    definition: 'An omega-6 polyunsaturated fatty acid that comprises 50-70% of seed oils. Has ~40x the oxidation susceptibility of saturated fat. Accumulates in tissues and increases oxidative damage.',
    relatedTopics: ['fat-101', 'linoleic-acid', 'pufa-oxidation'],
  },
  {
    term: 'Lipid Peroxidation',
    definition: 'The oxidative degradation of fats, particularly polyunsaturated fats. Creates toxic aldehydes (4-HNE, MDA) that damage cells. Happens both during cooking and inside the body.',
    relatedTopics: ['fat-101', 'pufa-oxidation', 'linoleic-acid'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // M
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'MDA (Malondialdehyde)',
    definition: 'A toxic aldehyde produced when polyunsaturated fats oxidize. A biomarker for oxidative stress. Damages DNA and proteins. Elevated in people with high PUFA intake.',
    relatedTopics: ['fat-101', 'pufa-oxidation'],
  },
  {
    term: 'MDF (Medium-Density Fiberboard)',
    definition: 'Engineered wood made from wood fibers bonded with formaldehyde-based adhesives. Common in furniture and cabinetry. Continuously off-gasses formaldehyde into indoor air.',
    relatedTopics: ['wood-bamboo', 'wood-glue'],
  },
  {
    term: 'Merino Wool',
    definition: 'Fine wool from Merino sheep. Natural temperature regulation, moisture-wicking, odor-resistant. The natural alternative to synthetic base layers and activewear.',
    relatedTopics: ['plastic-fabrics', 'natural-fabrics', 'fabric-switches'],
  },
  {
    term: 'Methyl Bromide',
    definition: 'A fumigation chemical used to treat imported wood, soil, and agricultural products. An ozone-depleting substance. Residues remain in treated products.',
    relatedTopics: ['wood-bamboo'],
  },
  {
    term: 'Microfiber',
    definition: 'A synthetic fabric made from polyester and/or polyamide (nylon). Sheds massive amounts of microplastics during washing. "Microfiber cloths" release plastic particles onto surfaces.',
    relatedTopics: ['plastic-fabrics', 'fabric-bedding'],
  },
  {
    term: 'Microplastics',
    definition: 'Plastic particles smaller than 5mm. Found in blood, placenta, breast milk, and brain tissue. Sources include bottled water, food packaging, synthetic clothing, and degrading plastic products.',
    relatedTopics: ['hidden-plastic', 'plastic-fabrics', 'salt-scam'],
  },
  {
    term: 'Monounsaturated Fat',
    definition: 'Fatty acids with one double bond. Relatively stable compared to polyunsaturated fats. Found in olive oil, avocados, and animal fats. Generally considered safe.',
    relatedTopics: ['fat-101'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // N
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Nanoplastics',
    definition: 'Plastic particles smaller than 1 micrometer. Can cross cell membranes and the blood-brain barrier. A single plastic tea bag releases billions of nanoplastics into hot water.',
    relatedTopics: ['hidden-plastic'],
  },
  {
    term: 'Nightshades',
    definition: 'The Solanaceae plant family including tomatoes, potatoes, peppers, eggplants, and tobacco. Contains both lectins and alkaloids - a double mechanism of gut and nervous system damage.',
    relatedTopics: ['antinutrients', 'alkaloids', 'nightshades'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // O
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Omega-3',
    definition: 'A class of polyunsaturated fatty acids. Includes ALA (plant-based) and EPA/DHA (fish-based). Plant and fish sources are NOT equivalent due to poor ALA conversion rates.',
    relatedTopics: ['fat-101', 'omega-confusion'],
  },
  {
    term: 'Omega-6',
    definition: 'A class of polyunsaturated fatty acids, primarily linoleic acid. Dominant in seed oils. Pro-inflammatory when consumed in excess. Modern diets have omega-6:omega-3 ratios of 20:1 or higher.',
    relatedTopics: ['fat-101', 'linoleic-acid'],
  },
  {
    term: 'Oxalates',
    definition: 'Compounds that bind to calcium, magnesium, and iron, forming insoluble crystals. Cause ~80% of kidney stones. Accumulate in joints, thyroid, and other tissues. High in spinach, rhubarb, and almonds.',
    relatedTopics: ['antinutrients', 'oxalates'],
  },
  {
    term: 'Oxidation',
    definition: 'A chemical reaction involving oxygen that damages molecules. Polyunsaturated fats are highly susceptible. Creates toxic byproducts. Happens during cooking and inside the body.',
    relatedTopics: ['fat-101', 'pufa-oxidation', 'linoleic-acid'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // P
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'PFAS',
    definition: 'Per- and polyfluoroalkyl substances, called "forever chemicals" because they don\'t break down. Used in non-stick coatings, food packaging, and waterproof fabrics. Persist in water and the body indefinitely.',
    relatedTopics: ['reverse-osmosis', 'hidden-plastic', 'pfas-recycling'],
  },
  {
    term: 'Phthalates',
    definition: 'Plasticizers that make plastic flexible. Endocrine disruptors that leach from plastic containers, especially with heat or fat contact. Found in PVC, food packaging, and personal care products.',
    relatedTopics: ['hidden-plastic', 'plastic-fabrics'],
  },
  {
    term: 'Phytase',
    definition: 'An enzyme that breaks down phytic acid. Humans produce very little. Traditional food preparation (soaking, sprouting, fermenting) activates phytase in grains and legumes.',
    relatedTopics: ['antinutrients', 'phytic-acid'],
  },
  {
    term: 'Phytic Acid',
    definition: 'An antinutrient that strongly binds zinc, iron, calcium, and magnesium in the digestive tract, preventing absorption. Found in grains, legumes, nuts, and seeds. Reduced by traditional preparation methods.',
    relatedTopics: ['antinutrients', 'phytic-acid'],
  },
  {
    term: 'Phytoestrogens',
    definition: 'Plant compounds structurally similar to estrogen that bind to estrogen receptors. Found in soy (isoflavones), flax (lignans), and hops. Have hormonal effects, especially concerning for infants and developing children.',
    relatedTopics: ['antinutrients', 'phytoestrogens'],
  },
  {
    term: 'Polyester',
    definition: 'Polyethylene terephthalate (PET) - the same plastic as water bottles, made into fabric. The dominant material in modern clothing. Sheds microplastics and contains chemical additives.',
    relatedTopics: ['plastic-fabrics'],
  },
  {
    term: 'Polyethylene (PE)',
    definition: 'A common plastic used to line "paper" cups, milk cartons, and juice boxes. Your beverage contacts plastic, not paper. Releases microplastics when exposed to hot liquids.',
    relatedTopics: ['hidden-plastic'],
  },
  {
    term: 'Polypropylene',
    definition: 'A plastic used in tea bags, food containers, and packaging. A single plastic tea bag releases 11+ billion microplastics into hot water.',
    relatedTopics: ['hidden-plastic'],
  },
  {
    term: 'PTFE (Polytetrafluoroethylene)',
    definition: 'Teflon. A PFAS forever chemical used in non-stick coatings, Gore-Tex, and dental floss coatings. Off-gasses toxic fumes when overheated. Doesn\'t break down in the environment or body.',
    relatedTopics: ['natural-fabrics', 'reverse-osmosis'],
  },
  {
    term: 'PUFA (Polyunsaturated Fatty Acid)',
    definition: 'Fatty acids with multiple double bonds, making them highly prone to oxidation. Include omega-3 and omega-6 fats. Seed oils are 50-70% PUFA. Integrate into cell membranes and continue oxidizing.',
    relatedTopics: ['fat-101', 'pufa-oxidation', 'linoleic-acid'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // R
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Reverse Osmosis',
    definition: 'A water filtration method that forces water through a semipermeable membrane, removing contaminants including atrazine, PFAS, fluoride, pharmaceuticals, heavy metals, and microplastics that standard filters miss.',
    relatedTopics: ['reverse-osmosis', 'atrazine'],
  },
  {
    term: 'Ruminants',
    definition: 'Animals with a rumen (specialized stomach) including cattle, sheep, goats, and bison. Biohydrogenate dietary PUFAs to saturated fat before absorption, making their fat safe regardless of feed.',
    relatedTopics: ['fat-101', 'animal-fat-contamination'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // S
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Saturated Fat',
    definition: 'Fatty acids with no double bonds - chemically stable and resistant to oxidation. Found in animal fats, coconut oil, and butter. The saturated fat → heart disease hypothesis has been repeatedly challenged.',
    relatedTopics: ['fat-101'],
  },
  {
    term: 'Seed Oils',
    definition: 'Industrial vegetable oils extracted from seeds using heat and chemical solvents. Include soybean, corn, canola, sunflower, and safflower oils. High in oxidation-prone linoleic acid.',
    relatedTopics: ['fat-101', 'linoleic-acid', 'pufa-oxidation'],
  },
  {
    term: 'Shikimate Pathway',
    definition: 'A metabolic pathway in bacteria and plants (but not humans) that glyphosate disrupts. Your gut bacteria have this pathway, which is why glyphosate acts as an antibiotic in your gut.',
    relatedTopics: ['glyphosate'],
  },
  {
    term: 'Solanine',
    definition: 'A toxic glycoalkaloid in potatoes, especially when green or sprouted. A neurotoxin that inhibits acetylcholinesterase. Survives cooking.',
    relatedTopics: ['antinutrients', 'alkaloids', 'nightshades'],
  },
  {
    term: 'Sourdough',
    definition: 'Traditional bread made with a fermented starter culture over 12-48 hours. Long fermentation breaks down gluten and phytic acid, making nutrients more available and the bread easier to digest.',
    relatedTopics: ['international-wheat', 'traditional-bread'],
  },
  {
    term: 'Spandex',
    definition: 'A polyurethane-based synthetic fiber (also called Lycra or elastane) that provides stretch. Present in most modern clothing including "cotton" underwear. Cannot be separated from blended fabric.',
    relatedTopics: ['plastic-fabrics'],
  },
  {
    term: 'Styrene',
    definition: 'A carcinogen that leaches from polystyrene (Styrofoam) into food, especially hot or fatty foods. Those white meat trays at the grocery store are leaching styrene into your food.',
    relatedTopics: ['hidden-plastic'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // T
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'The Wall',
    definition: 'The sudden exhaustion experienced by endurance athletes when glycogen stores are depleted (~mile 18-20 of a marathon). Fat-adapted athletes don\'t hit the wall because they access fat stores continuously.',
    relatedTopics: ['fuel-systems'],
  },
  {
    term: 'Tomatine',
    definition: 'A toxic glycoalkaloid in tomatoes, highest in green tomatoes and leaves. Part of the nightshade family\'s chemical defense system.',
    relatedTopics: ['antinutrients', 'alkaloids', 'nightshades'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // U
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Urea-Formaldehyde',
    definition: 'The most common adhesive used in plywood, MDF, and particle board. Continuously releases formaldehyde (a carcinogen) into indoor air. The source of "new furniture smell."',
    relatedTopics: ['wood-bamboo', 'wood-glue'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // V
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'VOCs (Volatile Organic Compounds)',
    definition: 'Chemicals that easily become gases at room temperature. Include formaldehyde, benzene, and toluene. Off-gas from furniture, finishes, and synthetic materials into indoor air.',
    relatedTopics: ['wood-bamboo', 'wood-finish'],
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // W
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    term: 'Waxed Canvas',
    definition: 'Cotton canvas treated with wax (beeswax or paraffin) for water resistance. Traditional, plastic-free alternative to Gore-Tex and synthetic waterproof fabrics. Used for centuries.',
    relatedTopics: ['plastic-fabrics', 'natural-fabrics'],
  },
  {
    term: 'Weck Jars',
    definition: 'Glass canning jars that use natural rubber gaskets instead of the plastic/BPA-lined lids of standard Mason jars. A safer option for food storage.',
    relatedTopics: ['clean-storage'],
  },
  {
    term: 'WGA (Wheat Germ Agglutinin)',
    definition: 'A lectin in wheat that survives cooking and digestion. Binds to gut cells and can cross the intestinal barrier, triggering inflammation.',
    relatedTopics: ['antinutrients', 'lectins', 'american-wheat'],
  },
];

// Helper to get sorted glossary entries
export function getSortedGlossary(): GlossaryEntry[] {
  return [...glossaryEntries].sort((a, b) => a.term.localeCompare(b.term));
}