/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TOPICS DATA - Is This Heresy?
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This file is the single source of truth for all infographic topics.
 * It can be edited by Claude Desktop (content context) or Claude Code (dev context).
 *
 * ─────────────────────────────────────────────────────────────────────────────────
 * PROJECT STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────────
 *
 *   isthisheresy-next/
 *   ├── data/
 *   │   └── topics.ts              ← YOU ARE HERE
 *   ├── dev/
 *   │   └── native-png/
 *   │       └── english/           ← Source PNGs go here (e.g., glyphosate.png)
 *   ├── public/
 *   │   └── images/                ← Generated WebP files (created by convert script)
 *   │       ├── {name}-thumb.webp
 *   │       ├── {name}-medium.webp
 *   │       ├── {name}-large.webp
 *   │       └── {name}-original.webp
 *   └── scripts/
 *       └── convert-images.mjs     ← Run: npm run convert-images
 *
 * ─────────────────────────────────────────────────────────────────────────────────
 * WORKFLOW FOR NEW INFOGRAPHICS
 * ─────────────────────────────────────────────────────────────────────────────────
 *
 *   1. Drop PNG in dev/native-png/english/
 *   2. Run: npm run convert-images (incremental - only converts new/changed)
 *   3. Add topic entry below with all required fields
 *   4. The imageName must match the PNG filename (without extension, lowercase)
 *
 * ─────────────────────────────────────────────────────────────────────────────────
 * FIELD REFERENCE
 * ─────────────────────────────────────────────────────────────────────────────────
 *
 * REQUIRED FIELDS:
 *   id            URL slug (e.g., "glyphosate" → isthisheresy.com/glyphosate)
 *                 Should match imageName for standalone topics
 *
 *   brickTitle    One word for homepage mosaic brick (UPPERCASE)
 *                 Keep it punchy: "GLYCATION", "ATRAZINE", "SALT"
 *
 *   longTitle     Full descriptive title for the infographic page and social sharing
 *                 Format: "Topic: Subtitle" (e.g., "Glycation: Caramelizing From the Inside")
 *
 *   shareSnippet  Short description for social sharing/OpenGraph (under 160 chars)
 *                 Should hook readers and summarize the key claim
 *
 *   verifyPrompt  Full prompt for AI verification buttons (ChatGPT, Gemini, Grok)
 *                 Should list specific claims to verify and ask for honest reasoning
 *                 End with: "Be honest and reason from first principles..."
 *
 *   tags          Array for special behaviors: ["start-here"], [], ["featured"]
 *                 Use empty array [] for normal topics
 *
 * OPTIONAL FIELDS:
 *   imageName     Base filename of the image (without extension or size suffix)
 *                 Example: "glycation" → looks for glycation-medium.webp etc.
 *                 OMIT for virtual anchors (they use their host's image)
 *
 *   icon          Lucide icon name for the brick (e.g., "Flame", "Droplets", "Filter")
 *                 Browse icons at: https://lucide.dev/icons
 *
 *   section       Groups topics in the left rail (e.g., "Health Basics", "Water Contamination")
 *                 NOTE: Section ORDER is controlled by lib/sections.ts SECTION_ORDER array,
 *                 NOT by the order of topics in this file!
 *
 * VIRTUAL ANCHOR FIELDS (for multi-section infographics):
 *   groupHost     ID of the parent topic this anchors to
 *   groupOrder    Position within the group (1, 2, 3...)
 *   scrollOffset  Vertical position in host image (0.0 to 1.0)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export interface Topic {
  id: string;
  brickTitle: string;
  longTitle: string;
  shareSnippet: string;
  imageName?: string; // Optional - virtual anchors use host's image
  verifyPrompt: string;
  tags: string[];
  icon?: string;
  section?: string; // Optional section grouping for left rail
  groupHost?: string; // If set, this topic renders on the groupHost's page with anchor
  groupOrder?: number; // Order within the group (1, 2, 3...) - host is always first
  scrollOffset?: number; // 0-1 percentage offset within host's image (for virtual anchors)
}

export const topics: Topic[] = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // BURIED CORONARY SCIENCE - Diet-Heart Trials (6 pages: 3 hosts + 3 anchors)
  // ═══════════════════════════════════════════════════════════════════════════════
  // SYDNEY DIET HEART STUDY - Part 1 (Host)
  {
    id: 'sydney-diet-heart-study',
    brickTitle: 'SYDNEY',
    longTitle: 'Sydney Diet Heart Study: Heart Attack Survivors on Vegetable Oil',
    shareSnippet: '458 heart attack survivors randomized to safflower oil. Result: 74% MORE cardiac deaths than control group.',
    imageName: 'sydney_diet_heart_study',
    verifyPrompt: `Verify these claims about the Sydney Diet Heart Study:
1. The study ran from 1966-1973 in Sydney, Australia
2. It enrolled 458 men aged 30-59 who had ALREADY survived a heart attack (secondary prevention)
3. The intervention replaced saturated fat with safflower oil, which is 75% linoleic acid (omega-6)
4. The control group ate their normal diet with no restrictions
5. Follow-up continued for up to 7 years per participant
6. All-cause mortality was 17.6% in safflower group vs 11.8% in control - 62% higher
7. Cardiovascular mortality was 17.2% vs 11.0% - 70% higher in safflower group
8. Coronary heart disease mortality was 16.3% vs 10.1% - 74% higher in safflower group
9. This was the ideal test population - men at highest risk who should benefit most from intervention
10. The "heart healthy" vegetable oil killed these high-risk patients faster than their normal diet

Be honest and reason from first principles. If safflower oil increased cardiac death by 74% in men who had already survived heart attacks, what does this suggest about recommending vegetable oils to the general population?`,
    tags: [],
    icon: 'HeartPulse',
    section: 'Buried Coronary Science'
  },

  // SYDNEY DIET HEART STUDY - Part 2 (Anchor)
  {
    id: 'sydney-diet-heart-study-burial',
    brickTitle: 'SDHS BURIAL',
    longTitle: 'Sydney Diet Heart Study: 35 Years of Silence',
    shareSnippet: 'Study ended 1973. Only all-cause mortality published. CVD breakdown hidden 35 years until Ramsden recovered it.',
    verifyPrompt: `Verify these claims about the burial and recovery of the Sydney Diet Heart Study:
1. The study ended in 1973 but the cardiovascular mortality breakdown wasn't published until 2013 - 35 years
2. A 1978 paper in Medical Journal of Australia reported only all-cause mortality, not the CVD breakdown
3. The cardiovascular outcomes - the entire point of the study - were never published by original investigators
4. Original researchers cited "lack of funding" for not completing the analysis
5. Christopher Ramsden at NIH tracked down the surviving data between 2010-2013
6. The recovered data revealed the 74% increase in CHD mortality that had never been published
7. The full analysis was published in BMJ on February 5, 2013
8. Citation: BMJ 2013;346:e8707, PMID 23386268
9. The same scientist (Ramsden) later recovered the Minnesota Coronary Experiment data (published 2016)
10. Both buried studies, recovered by the same researcher, published in the same journal, showed the same result: vegetable oil increased death

Be honest and reason from first principles. The Sydney study recruited heart attack survivors specifically because they were at highest risk and most likely to benefit. If the intervention increased their death rate by 74%, what does "ran out of funding" really explain?`,
    tags: [],
    section: 'Buried Coronary Science',
    groupHost: 'sydney-diet-heart-study',
    groupOrder: 1,
    scrollOffset: 0.5
  },

  // MINNESOTA CORONARY EXPERIMENT - Part 1 (Host)
  {
    id: 'minnesota-coronary-experiment',
    brickTitle: 'MINNESOTA',
    longTitle: 'Minnesota Coronary Experiment: The Largest Diet-Heart Trial',
    shareSnippet: '9,423 participants. Double-blind RCT. Corn oil lowered cholesterol 13.8%. Death risk increased 22% per cholesterol drop.',
    imageName: 'minnesota_coronary_experiment',
    verifyPrompt: `Verify these claims about the Minnesota Coronary Experiment:
1. The study ran from 1968-1973 and enrolled 9,423 men and women
2. It was a double-blind randomized controlled trial - the gold standard of evidence
3. Participants were residents of 6 mental hospitals and 1 nursing home in Minnesota
4. The intervention replaced saturated fat with corn oil and corn oil margarine
5. Lead investigator was Ivan Frantz Jr. M.D.; Ancel Keys Ph.D. was a co-investigator
6. The intervention successfully lowered cholesterol by 13.8% in the corn oil group
7. Despite lower cholesterol, there was NO mortality benefit - trend toward harm
8. Hazard ratio showed 22% increased death risk for every 30 mg/dL cholesterol reduction
9. Autopsy data showed the corn oil group had MORE atherosclerotic plaques and nearly 2x heart attacks
10. The study was funded by the NIH (National Heart Institute)

Be honest and reason from first principles. If lowering cholesterol with corn oil increased death risk by 22% per 30-point drop, and autopsies showed MORE heart disease in the corn oil group, what does that say about the mechanism?`,
    tags: [],
    icon: 'FlaskConical',
    section: 'Buried Coronary Science'
  },

  // MINNESOTA CORONARY EXPERIMENT - Part 2 (Anchor)
  {
    id: 'minnesota-coronary-experiment-burial',
    brickTitle: 'MCE BURIAL',
    longTitle: 'Minnesota Coronary Experiment: 43 Years Buried',
    shareSnippet: 'Study ended 1973. Mortality data published 2016. Found in boxes in investigator\'s basement.',
    verifyPrompt: `Verify these claims about the burial and recovery of the Minnesota Coronary Experiment:
1. The study ended in 1973 but full mortality data wasn't published until 2016 - a 43-year gap
2. A partial publication appeared in Arteriosclerosis journal in 1989, reporting cholesterol reduction but not mortality breakdown
3. Lead investigator Ivan Frantz died in 2009 with the full data still unpublished
4. In 2011, his son Robert Frantz (a Mayo Clinic cardiologist) found the original data in his father's basement
5. The data included old IBM data tapes and yellowed paper records
6. When asked why results weren't published, Ivan Frantz reportedly said they were "disappointed in the way it came out"
7. Christopher Ramsden at NIH was contacted to analyze and publish the recovered data
8. The full study was published in BMJ (British Medical Journal) on April 12, 2016
9. The paper's citation is BMJ 2016;353:i1246, PMID 27071971
10. The full text is free and open access - anyone can read Table 2 (mortality) and Table 3 (hazard ratios)

Be honest and reason from first principles. If the data supported the diet-heart hypothesis, would it have sat in a basement for 43 years while the co-investigator built dietary guidelines on the assumption it proved his theory?`,
    tags: [],
    section: 'Buried Coronary Science',
    groupHost: 'minnesota-coronary-experiment',
    groupOrder: 1,
    scrollOffset: 0.5
  },

  // BURIED TRIALS COMBINED - Part 1 (Host)
  {
    id: 'buried-trials-combined',
    brickTitle: 'BURIED TRIALS',
    longTitle: 'Two Buried Studies, One Truth: The Diet-Heart Evidence',
    shareSnippet: 'The only two large RCTs testing vegetable oil vs saturated fat both found HARM. Both were buried 30+ years. Same scientist exposed both.',
    imageName: 'buried_trial_combined',
    verifyPrompt: `Verify these claims about the Minnesota Coronary Experiment and Sydney Diet Heart Study:
1. The Minnesota Coronary Experiment (1968-1973) enrolled 9,423 participants in a double-blind RCT
2. The Sydney Diet Heart Study (1966-1973) enrolled 458 men who had already survived heart attacks
3. Minnesota tested corn oil replacing saturated fat; Sydney tested safflower oil (75% linoleic acid)
4. Both studies found that the vegetable oil intervention INCREASED mortality rather than decreasing it
5. Sydney found 74% higher CHD death in the safflower oil group vs control
6. Minnesota found 22% increased death risk per 30 mg/dL cholesterol reduction
7. Both studies had their mortality data withheld from publication for over 30 years
8. Christopher Ramsden, an NIH scientist, recovered the buried data from both studies
9. Both recovered datasets were published in the BMJ (British Medical Journal) - Sydney in 2013, Minnesota in 2016
10. When Ramsden combined all RCTs testing linoleic acid substitution, zero showed mortality benefit

Be honest and reason from first principles. If the diet-heart hypothesis was well-supported, why would the two largest RCTs testing it both show harm and both be buried for decades?`,
    tags: [],
    icon: 'FileWarning',
    section: 'Buried Coronary Science'
  },

  // BURIED TRIALS COMBINED - Part 2 (Anchor)
  {
    id: 'buried-trials-combined-recovery',
    brickTitle: 'THE RECOVERY',
    longTitle: 'Buried Trials: The 30-Year Suppression & Recovery',
    shareSnippet: 'Two studies. Two continents. Same silence. One NIH scientist exposed both. Both published in BMJ.',
    verifyPrompt: `Verify these claims about the suppression and recovery of the buried diet-heart trials:
1. The Sydney Diet Heart Study ended in 1973 but cardiovascular mortality breakdown wasn't published until 2013 (35 years)
2. The Minnesota Coronary Experiment ended in 1973 but full mortality data wasn't published until 2016 (43 years)
3. Sydney researchers cited "lack of funding" for not publishing the cardiovascular breakdown
4. Minnesota co-investigator Ivan Frantz said they were "disappointed in the way it came out"
5. Ancel Keys was a co-investigator on the Minnesota Coronary Experiment
6. The Minnesota data was literally found in boxes in Ivan Frantz's basement by his son in 2011
7. Christopher Ramsden M.D. Ph.D. works at the National Institute on Aging (part of NIH)
8. Both recovered studies were published in the BMJ, a top-5 medical journal with impact factor ~93
9. Ramsden's meta-analysis of all linoleic acid substitution RCTs found zero mortality benefit across 5 trials
10. Both papers are free and open access via PubMed (PMID 23386268 and 27071971)

Be honest and reason from first principles. Is "we were disappointed in the way it came out" a scientifically valid reason to withhold mortality data from the largest diet-heart trial ever conducted?`,
    tags: [],
    section: 'Buried Coronary Science',
    groupHost: 'buried-trials-combined',
    groupOrder: 1,
    scrollOffset: 0.5
  },

  // SATURATED FAT STUDIES (Standalone)
  {
    id: 'saturated-fat-studies',
    brickTitle: 'FAT SCAM',
    longTitle: 'The Saturated Fat Scam: How 5 "Landmark Studies" Built a 60-Year Medical Myth',
    shareSnippet: 'The diet-heart hypothesis was never proven. Intervention trials showed replacing saturated fat with vegetable oil INCREASED mortality. The data was buried for 40 years.',
    imageName: 'saturated_fat_studies',
    verifyPrompt: `Verify these claims about the saturated fat hypothesis:
1. Ancel Keys' Seven Countries Study had data for 22 countries but published only 7 that supported his hypothesis
2. France had high saturated fat intake and low heart disease rates but was excluded from the Seven Countries Study
3. The Framingham Heart Study found no correlation between dietary fat and blood cholesterol in data collected 1955-1960
4. Framingham dietary data was never published in a peer-reviewed journal, only in a privately-printed 1970 monograph
5. William Castelli, director of Framingham 1979-1995, stated that higher saturated fat intake correlated with LOWER serum cholesterol
6. The Minnesota Coronary Experiment (1968-1973) was a randomized controlled trial with 9,423 participants
7. Minnesota Coronary Experiment found that for every 30-point drop in cholesterol, there was 22% higher mortality risk
8. The Minnesota Coronary Experiment was co-led by Ancel Keys and the full data wasn't published until BMJ 2016
9. The Sydney Diet Heart Study found 62% higher all-cause mortality in the group replacing saturated fat with safflower oil
10. Sydney Diet Heart Study data was buried until 2013 when Ramsden et al. recovered and published it
11. No randomized controlled trial has ever shown that replacing saturated fat with vegetable oil reduces all-cause mortality
12. "Healthy user bias" confounds all observational nutrition studies because health-conscious people who avoid red meat differ systematically in smoking, exercise, and socioeconomic status

Be honest and reason from first principles. If the intervention trials consistently showed no benefit or increased mortality, why did the hypothesis persist? What does it mean when researchers bury data that contradicts their hypothesis?`,
    tags: [],
    icon: 'FileWarning',
    section: 'Buried Coronary Science'
  },

  // FOOD INDUSTRY INTEGRATION (Standalone)
  {
    id: 'food-industry',
    brickTitle: 'BIG AG',
    longTitle: 'The Integrated Food Economy: How Agribusiness Profits From Both Sides',
    shareSnippet: 'Cargill processes 22% of US meat AND crushes soybeans into oil. The same companies profit whether you eat beef or vegetable oil. Consumer debates miss corporate integration.',
    imageName: 'food_industry',
    verifyPrompt: `Verify these claims about modern agribusiness integration:
1. Cargill has $154B annual revenue and processes approximately 22% of US meat
2. Cargill is the #1 animal feed producer globally and a top grain exporter (25% of US grain)
3. ADM has $85B revenue with 75% coming from oilseeds and grains, and also sells animal feed
4. Bunge ($50B revenue) is the world's largest oilseed processor and produces protein meal for animal feed
5. Tyson Foods ($53B) is the #1 US meat processor and buys feed from grain companies
6. JBS ($75B) is the world's largest meat processor
7. The US Farm Bill allocates approximately $428 billion over 5 years
8. From 1997-2005, below-market feed prices saved US meatpackers an estimated $2.59 billion in production costs
9. Four companies (JBS, Tyson, Cargill, National Beef) control 85% of US beef market
10. Four companies control 67% of US pork market
11. Four grain traders (ADM, Bunge, Cargill, Louis Dreyfus) control 70%+ of global grain trade
12. The Beef Checkoff program collects ~$40M/year, Soy Checkoff ~$100M/year, Pork Checkoff ~$60M/year
13. Oilseed crushing produces BOTH cooking oil for humans AND protein meal for animal feed from the same crop
14. Government commodity subsidies ($6-15B/year) allow farmers to sell corn and soybeans at or below production cost

Be honest and reason from first principles. If the same companies profit from both meat production and vegetable oil sales, and grain subsidies lower costs for both industries, what does this mean for consumer debates about "choosing sides" in dietary recommendations?`,
    tags: [],
    icon: 'Building2',
    section: 'Buried Coronary Science'
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // HOW AI WORKS - LLM Infographic Series (15 pages: 5 hosts + 10 anchors)
  // ═══════════════════════════════════════════════════════════════════════════════
  // GROUP 1: The Basics - Tokens, Loop, Output
  {
    id: 'what-is-a-token',
    brickTitle: 'TOKENS',
    longTitle: "What's a Token? The Vocabulary of AI",
    shareSnippet: 'LLMs don\'t see words - they see numbers from a fixed 100K vocabulary decided before training ever began.',
    imageName: 'ai_pt1',
    verifyPrompt: `Verify these claims about LLM tokenization:
1. LLMs convert text to numerical token IDs before processing
2. The vocabulary is fixed before training begins (typically ~100K tokens)
3. Byte Pair Encoding (BPE) creates tokens based on frequency in training data
4. Common words like "the" get single tokens, rare words split into multiple
5. Tokenization varies by language - non-English often requires more tokens
6. Numbers tokenize inconsistently (1000 vs 1001 may differ)
7. The model only outputs tokens that exist in its pre-defined vocabulary
8. Code and programming patterns get their own efficient token encodings

Be honest and reason from first principles. If vocabulary is fixed before training, what does that imply about the model's ability to "learn" new words?`,
    tags: [],
    icon: 'Hash',
    section: 'How AI Works'
  },
  {
    id: 'the-loop',
    brickTitle: 'THE LOOP',
    longTitle: 'The Loop: One Token at a Time',
    shareSnippet: 'Every single token requires running the entire model. A 500-word response means 650+ full model runs.',
    verifyPrompt: `Verify these claims about autoregressive generation:
1. LLMs generate one token at a time, not words or sentences
2. Each token requires a full forward pass through all model layers
3. The new token is appended to input, then the entire model runs again
4. A 500-word response requires ~650 separate model runs
5. Generation stops when model predicts an end-of-sequence token
6. Tokens cannot be generated in parallel due to sequential dependencies
7. Each model run involves billions of matrix multiplications
8. The "streaming" effect is literally watching this loop execute hundreds of times

Be honest and reason from first principles. Why can't we parallelize token generation if each depends on all previous tokens?`,
    tags: [],
    section: 'How AI Works',
    groupHost: 'what-is-a-token',
    groupOrder: 1,
    scrollOffset: 0.333
  },
  {
    id: 'what-model-outputs',
    brickTitle: 'PROBABILITIES',
    longTitle: 'What the Model Actually Outputs: 100K Scores',
    shareSnippet: 'The model doesn\'t output "the answer" - it outputs 100,000 probability scores, one for every possible next token.',
    verifyPrompt: `Verify these claims about LLM output:
1. Models output a probability distribution over the entire vocabulary (~100K scores)
2. All probabilities sum to exactly 1.0 (100%)
3. The model never outputs a single "answer" - someone must pick from the distribution
4. High confidence shows as a spike (e.g., "Paris" at 97%)
5. Uncertainty shows as a flat distribution across many tokens
6. The shape of the distribution indicates model confidence
7. Sampling (picking the actual token) is a separate step from model inference
8. "Greedy" decoding always picks highest probability; stochastic sampling adds randomness

Be honest and reason from first principles. If the model outputs probabilities, not answers, what does that mean for claims about AI "knowing" things?`,
    tags: [],
    section: 'How AI Works',
    groupHost: 'what-is-a-token',
    groupOrder: 2,
    scrollOffset: 0.666
  },
  // GROUP 2: Sampling, Black Box, Attention
  {
    id: 'sampling-temperature',
    brickTitle: 'SAMPLING',
    longTitle: 'Sampling: Temperature, Top-p, and Randomness',
    shareSnippet: 'AI creativity comes from how we pick from 100K probabilities. Temperature reshapes the distribution before rolling the dice.',
    imageName: 'ai_pt2',
    verifyPrompt: `Verify these claims about LLM sampling:
1. Temperature rescales the probability distribution before sampling
2. Temperature 0 = always pick highest probability (deterministic)
3. Higher temperature flattens distribution, increasing randomness
4. Top-p (nucleus) sampling limits choices to tokens covering p% of probability mass
5. Top-k sampling limits choices to the k highest-probability tokens
6. The randomness comes from a pseudo-random number generator, not the model
7. Same prompt + same seed + temperature 0 = identical output
8. "Creativity" is controlled randomness in token selection, not model behavior

Be honest and reason from first principles. If randomness comes from sampling, not the model, what does that imply about AI "creativity"?`,
    tags: [],
    icon: 'Dices',
    section: 'How AI Works'
  },
  {
    id: 'inside-black-box',
    brickTitle: 'BLACK BOX',
    longTitle: 'Inside the Black Box: Layers of Math',
    shareSnippet: 'The "intelligence" is billions of numbers multiplied together. Each layer transforms the input, building toward the output.',
    verifyPrompt: `Verify these claims about neural network architecture:
1. Models consist of 100+ stacked layers of matrix multiplication
2. Parameters are the learned numbers (weights) in these matrices
3. GPT-4 class models have hundreds of billions of parameters
4. Each layer transforms the representation of the input
5. Information flows forward through all layers sequentially
6. The same architecture processes any input - only weights differ between models
7. "Understanding" emerges from patterns in these matrix multiplications
8. No one fully understands why specific weight configurations produce intelligence

Be honest and reason from first principles. If intelligence emerges from matrix multiplication, what does that say about the nature of understanding?`,
    tags: [],
    section: 'How AI Works',
    groupHost: 'sampling-temperature',
    groupOrder: 1,
    scrollOffset: 0.333
  },
  {
    id: 'attention-mechanism',
    brickTitle: 'ATTENTION',
    longTitle: 'Attention: How Tokens Talk to Each Other',
    shareSnippet: 'Attention lets any token look at any other token. This is why context matters - and why long contexts are expensive.',
    verifyPrompt: `Verify these claims about attention mechanisms:
1. Attention allows each token to "attend to" every other token in the context
2. Computational cost scales quadratically with context length
3. The 2017 paper "Attention Is All You Need" introduced the Transformer architecture
4. Self-attention computes relevance scores between all token pairs
5. Multi-head attention runs multiple attention patterns in parallel
6. Attention is why models can connect ideas across long documents
7. The KV cache stores attention computations to avoid redundant work
8. Context window limits exist partly due to attention's quadratic scaling

Be honest and reason from first principles. If attention is quadratic, what happens as we push toward million-token contexts?`,
    tags: [],
    section: 'How AI Works',
    groupHost: 'sampling-temperature',
    groupOrder: 2,
    scrollOffset: 0.666
  },
  // GROUP 3: Training, Chip Supply Chain, Chip Census
  {
    id: 'training-gradient-descent',
    brickTitle: 'TRAINING',
    longTitle: 'Training: From Garbage to Genius',
    shareSnippet: 'Models start outputting noise. Gradient descent nudges billions of parameters toward slightly less wrong, trillions of times.',
    imageName: 'ai_pt3',
    verifyPrompt: `Verify these claims about LLM training:
1. Models initialize with random weights and output garbage
2. Gradient descent computes how to adjust each parameter to reduce error
3. Training involves trillions of parameter updates over months
4. The loss function measures how wrong the model's predictions are
5. Backpropagation calculates gradients through all layers
6. Learning rate controls how much weights change per update
7. Models learn to predict the next token from internet-scale text data
8. Training a frontier model costs $50-100+ million in compute

Be honest and reason from first principles. If training is just minimizing prediction error, how does "understanding" emerge from that process?`,
    tags: [],
    icon: 'TrendingUp',
    section: 'How AI Works'
  },
  {
    id: 'chip-supply-chain',
    brickTitle: 'SUPPLY CHAIN',
    longTitle: 'The Chip Supply Chain: Three Companies Rule AI',
    shareSnippet: 'NVIDIA designs, TSMC manufactures, ASML makes the machines. This fragile chain runs through one island 110 miles from China.',
    verifyPrompt: `Verify these claims about the AI chip supply chain:
1. NVIDIA holds ~90% market share in AI training chips
2. TSMC manufactures 90%+ of advanced AI chips (including for NVIDIA)
3. ASML has 100% monopoly on EUV lithography machines
4. EUV machines cost $200-400 million each
5. TSMC is located in Taiwan, 110 miles from mainland China
6. No other company can currently mass-produce sub-7nm chips
7. The entire AI industry depends on this three-company chain
8. A Taiwan disruption would halt global AI chip production

Be honest and reason from first principles. What does single-point-of-failure concentration mean for AI's future?`,
    tags: [],
    section: 'How AI Works',
    groupHost: 'training-gradient-descent',
    groupOrder: 1,
    scrollOffset: 0.333
  },
  {
    id: 'how-many-chips',
    brickTitle: 'CHIP CENSUS',
    longTitle: 'How Many AI Chips Exist? The Global Inventory',
    shareSnippet: '~8-10 million AI chips power Western AI. Microsoft and Meta each have more GPU compute than most nations.',
    verifyPrompt: `Verify these claims about global AI chip inventory:
1. Approximately 8-10 million AI chips (H100 equivalents) exist globally
2. Microsoft has ~700K chips (including OpenAI allocation)
3. Meta has ~600K chips for AI training
4. Google has ~1M chips (400K NVIDIA + TPU equivalents)
5. Amazon has ~250K NVIDIA chips plus custom Trainium
6. xAI built a 100K chip "Colossus" cluster
7. China has limited access to advanced chips due to export controls
8. New chip production is measured in millions per year, not billions

Be honest and reason from first principles. If all AI runs on ~10 million chips, what constrains AI scaling?`,
    tags: [],
    section: 'How AI Works',
    groupHost: 'training-gradient-descent',
    groupOrder: 2,
    scrollOffset: 0.666
  },
  // GROUP 4: Ownership, Inference, Space
  {
    id: 'ai-ownership-web',
    brickTitle: 'OWNERSHIP',
    longTitle: 'The Web of Ownership: Who Owns AI?',
    shareSnippet: 'Microsoft owns 27% of OpenAI. Amazon invested $8B in Anthropic. Google owns 14% of Anthropic AND 7% of SpaceX.',
    imageName: 'ai_pt4',
    verifyPrompt: `Verify these claims about AI company ownership:
1. Microsoft owns approximately 27% of OpenAI (valued at ~$135B)
2. Microsoft invested $13.8B total in OpenAI
3. Amazon has invested $8B in Anthropic (capped at <33% ownership)
4. Google owns ~14% of Anthropic
5. Google/Alphabet owns ~7% of SpaceX
6. The same companies that fund AI also control cloud infrastructure
7. OpenAI's valuation reached $500B in 2025
8. These cross-ownership structures create complex competitive dynamics

Be honest and reason from first principles. When the same companies fund competing AI labs, what does that mean for actual competition?`,
    tags: [],
    icon: 'Network',
    section: 'How AI Works'
  },
  {
    id: 'age-of-inference',
    brickTitle: 'INFERENCE',
    longTitle: 'The Age of Inference: When Electricity Becomes the Limit',
    shareSnippet: 'Training happens once. Inference happens millions of times daily. AI could consume 12% of US electricity by 2028.',
    verifyPrompt: `Verify these claims about AI energy consumption:
1. US data centers consume ~4.4% of national electricity (2024)
2. Projections show 12% of US electricity to data centers by 2028
3. Virginia data centers already use 26% of state electricity
4. Inference (running models) accounts for 90% of AI energy lifecycle
5. Training happens once; inference happens millions of times per day
6. Google's Ironwood TPU is designed specifically for inference workloads
7. AI servers now consume ~21% of data center power, rising to 44% by 2030
8. Microsoft, Google, and Amazon are all investing in nuclear power

Be honest and reason from first principles. If inference scales with users and training is one-time, what does that imply about future energy demands?`,
    tags: [],
    section: 'How AI Works',
    groupHost: 'ai-ownership-web',
    groupOrder: 1,
    scrollOffset: 0.333
  },
  {
    id: 'space-data-centers',
    brickTitle: 'SPACE',
    longTitle: 'Space Data Centers: When Earth Isn\'t Enough',
    shareSnippet: 'Starship can deliver 300-500 GW of solar-powered compute to orbit per year. The first H100 went to space in 2024.',
    verifyPrompt: `Verify these claims about space-based AI infrastructure:
1. Starcloud launched the first H100 GPU to space in November 2024
2. Elon Musk claims Starship can deliver 300-500 GW annually to orbit
3. US average electricity consumption is approximately 500 GW
4. Google's Project Suncatcher plans orbital TPU demo in 2027
5. Jeff Bezos announced plans for "gigawatt data centers in space"
6. Geostationary orbit provides 24/7 uninterrupted solar power
7. Space eliminates cooling costs (vacuum is perfect thermal radiator)
8. Latency to geostationary orbit is ~120ms round-trip

Be honest and reason from first principles. Is space-based compute actually more efficient, or is this hype masking real engineering challenges?`,
    tags: [],
    section: 'How AI Works',
    groupHost: 'ai-ownership-web',
    groupOrder: 2,
    scrollOffset: 0.666
  },
  // GROUP 5: Thermodynamic, Complete Picture, China
  {
    id: 'thermodynamic-computing',
    brickTitle: 'THERMODYNAMIC',
    longTitle: 'Thermodynamic Computing: Using Physics, Not Fighting It',
    shareSnippet: 'Digital computers fight noise. Thermodynamic chips use noise AS the computation. P-bits fluctuate naturally to sample probabilities.',
    imageName: 'ai_pt5',
    verifyPrompt: `Verify these claims about thermodynamic computing:
1. Traditional digital computing uses energy to suppress thermal noise
2. GPUs convert 70%+ of electricity into waste heat
3. P-bits (probabilistic bits) naturally fluctuate between 0 and 1
4. Thermodynamic chips use thermal noise to perform probabilistic computation
5. Extropic claims 100-1000x energy efficiency for certain AI operations
6. P-bits work at room temperature (unlike quantum computing)
7. Thermodynamic computing is well-suited for sampling operations
8. Matrix multiplication (bulk of LLM compute) still requires traditional hardware

Be honest and reason from first principles. If LLMs are 99% matrix multiplication and 1% sampling, how much can thermodynamic computing actually help?`,
    tags: [],
    icon: 'Flame',
    section: 'How AI Works'
  },
  {
    id: 'complete-picture',
    brickTitle: 'FULL STACK',
    longTitle: 'The Complete Picture: Token to Terawatt',
    shareSnippet: 'When you chat with AI, you trigger a cascade spanning Taiwanese fabs, Dutch lithography, and Virginian power grids.',
    verifyPrompt: `Verify these claims about the full AI stack:
1. A single 500-word response requires ~650 full model runs
2. Each response involves roughly 1 quadrillion mathematical operations
3. The chip supply chain spans ASML (Netherlands), TSMC (Taiwan), NVIDIA (US)
4. Your message travels through global fiber optic cables to reach data centers
5. Data centers consume millions of gallons of water for cooling
6. The same companies that build AI also fund it and provide cloud infrastructure
7. AI inference is growing faster than training as a compute workload
8. The entire system is more complex than any technology humans have built

Be honest and reason from first principles. What does this level of infrastructure concentration mean for AI accessibility and control?`,
    tags: [],
    section: 'How AI Works',
    groupHost: 'thermodynamic-computing',
    groupOrder: 1,
    scrollOffset: 0.333
  },
  {
    id: 'china-ai-ecosystem',
    brickTitle: 'CHINA',
    longTitle: 'What About China? The Parallel AI Universe',
    shareSnippet: 'No EUV access, inferior chips, but DeepSeek trained a frontier model for $6M. China is winning the software war while losing the hardware war.',
    verifyPrompt: `Verify these claims about China's AI ecosystem:
1. China has zero access to ASML EUV lithography machines
2. SMIC achieved 7nm using DUV with 34 patterning steps (vs 9 with EUV)
3. SMIC yields for advanced nodes are 30-40% vs TSMC's 60%+
4. DeepSeek trained V3 for ~$6M vs $80-100M for GPT-4
5. DeepSeek used 2,000 H800s (crippled chips) vs 16,000+ H100s for comparable models
6. Qwen is the most downloaded model family globally
7. Chinese open-source models account for 17.1% of global downloads (#1 worldwide)
8. Huawei plans to produce 1.6 million Ascend dies in 2026

Be honest and reason from first principles. If algorithmic efficiency can compensate for hardware disadvantage, what does that mean for the effectiveness of chip export controls?`,
    tags: [],
    section: 'How AI Works',
    groupHost: 'thermodynamic-computing',
    groupOrder: 2,
    scrollOffset: 0.666
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // SLEEP TIMING - Circadian Alignment (1 page)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'sleep-non-fungibility',
    brickTitle: 'SLEEP TIMING',
    longTitle: 'Not All Sleep Hours Are Equal: The Circadian Alignment Secret',
    shareSnippet: '6 hours from 9 PM-3 AM beats 8 hours from 1 AM-9 AM. Sleep hours are not fungible - the WHEN matters as much as the HOW LONG.',
    imageName: 'right_sleep',
    verifyPrompt: `Verify these claims about circadian-aligned sleep:
1. Deepest slow-wave sleep (SWS) occurs in the first 3-4 hours after sleep onset, but only if onset aligns with circadian night
2. Growth hormone releases primarily during the early deep sleep window (roughly 10 PM - 2 AM)
3. Core body temperature drops to its lowest point around 3-4 AM
4. Sleep starting at 9 PM rides the natural temperature decline; sleep starting at 1 AM fights a body already expecting sleep
5. Cortisol naturally begins rising around 4-5 AM to prepare for waking
6. Waking at 3 AM aligns with natural cortisol rise (alert); waking at 7 AM is after the optimal window (groggy)
7. Melatonin peaks around 2-3 AM
8. Falling asleep at 9 PM means sleeping during the rising melatonin wave; falling asleep at 1 AM means trying to sleep near the peak
9. 6 hours of circadian-aligned sleep produces better subjective restoration than 8 hours of misaligned sleep
10. The "golden state" of sustained high energy requires 6+ consecutive days of circadian-aligned sleep, not a single good night
11. Each late night resets the compound sleep accumulation counter to zero

Be honest and reason from first principles. If deep sleep and growth hormone release are front-loaded in the night, what happens when you delay sleep onset by 4 hours? Can you "make up" missed biological windows?`,
    tags: [],
    icon: 'Moon',
    section: 'Health Basics'
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // FETAL DISRUPTION SERIES - Phthalates/AGD + Environment → Autism + Geography (3 pages)
  // ═══════════════════════════════════════════════════════════════════════════════
  // HOST TOPIC - Fetal Disruption (Phthalates/AGD)
  {
    id: 'fetal-disruption',
    brickTitle: 'FETAL DISRUPTION',
    longTitle: 'The Phthalate Crisis: Endocrine Disruption and Fetal Development',
    shareSnippet: 'Plasticizers in everyday products block testosterone synthesis during the critical 8-14 week masculinization window. The effects are permanent and measurable.',
    imageName: 'autism',
    verifyPrompt: `Verify these claims about phthalates and fetal development:
1. Phthalates are anti-androgenic compounds that inhibit testosterone synthesis in fetal Leydig cells
2. The critical masculinization window occurs at weeks 8-14 of gestation
3. Phthalates cross the placenta freely and concentrate in amniotic fluid
4. Shanna Swan's research documented correlation between maternal phthalate levels and reduced prenatal androgen exposure in male offspring
5. Phthalates are detectable in 99% of Americans tested
6. American male sperm counts have declined approximately 53% from 1973 to 2023 (99M/ml to 47M/ml)
7. Testosterone levels in American males have been declining at roughly 1% per year
8. Phthalates are found in food packaging, personal care products, vinyl flooring, medical tubing, and soft plastics
9. "Fragrance" on ingredient labels often indicates phthalate content
10. Cord blood samples show phthalates present in 100% of samples tested
11. The developmental effects of inadequate prenatal testosterone exposure are permanent and cannot be reversed after birth

Be honest and reason from first principles. If phthalates block testosterone during a one-time developmental window, what would you expect the population-level consequences to be over 50 years of increasing exposure?`,
    tags: [],
    icon: 'Baby',
    section: 'Autism'
  },
  // ANCHOR 1 - Environment → Autism
  {
    id: 'environment-autism',
    brickTitle: 'ENVIRONMENT → AUTISM',
    longTitle: 'The Environmental Case for Autism: Multiple Insults, Corrupted Development',
    shareSnippet: 'Autism rates went from 1 in 10,000 to 1 in 31. When rates correlate with physical birth defects, the "better diagnosis" explanation collapses.',
    verifyPrompt: `Verify these claims about environmental factors and autism:
1. Autism prevalence increased from approximately 1 in 10,000 (1970s) to 1 in 31 (2022)
2. Maternal immune activation during pregnancy correlates with autism-like behaviors in offspring (reproducible in animal models)
3. Inflammatory cytokines IL-6 and IL-17 can cross the placental barrier and affect fetal brain development
4. Approximately 30% of American women enter pregnancy in an obese state, which creates chronic inflammation
5. C-section rates in America are approximately 32%, which bypasses vaginal microbiome colonization
6. The gut-brain axis is established - gut bacteria produce neurotransmitters and influence neural development
7. Autism rates correlate geographically with rates of objectively measurable developmental abnormalities in newborn males
8. The "assortative mating" hypothesis (tech workers pairing) cannot explain autism increases across all demographics including rural and working-class populations
9. Early antibiotic use disrupts the developing infant microbiome during critical neurodevelopmental windows
10. Seed oil (PUFA) consumption has increased dramatically and PUFAs incorporate into cell membranes where they can oxidize
11. The developing brain uses approximately 20% of the body's oxygen, making it highly vulnerable to oxidative damage

Be honest and reason from first principles. If the "true rate" of autism was always 1%, why wouldn't we see that rate uniformly across history and across traditional societies? What would have to be true for diagnostic expansion alone to explain a 300x increase?`,
    tags: [],
    section: 'Autism',
    groupHost: 'fetal-disruption',
    groupOrder: 1,
    scrollOffset: 0.333
  },
  // ANCHOR 2 - Geography of Autism
  {
    id: 'geography-autism',
    brickTitle: 'GEOGRAPHY OF AUTISM',
    longTitle: 'Geographic Patterns in Autism: What the County-Level Data Reveals',
    shareSnippet: 'University of Chicago analyzed 100M medical records: every 1% increase in developmental abnormalities = 283% increase in autism. The environmental signal is undeniable.',
    verifyPrompt: `Verify these claims about geographic patterns in autism prevalence:
1. The Rzhetsky et al. study analyzed approximately 100 million U.S. medical records
2. Every 1% increase in male developmental abnormalities at the county level was associated with a 283% increase in autism in that county
3. Environmental predictors were approximately 3x more influential than state-level diagnostic/regulatory differences
4. Autism hotspots include Mid-Atlantic (4.38% prevalence), Massachusetts (2.42%), Virginia (2.41%), New Jersey (2.37%)
5. Autism cold spots include West South Central region (TX, OK, LA, AR) at 2.71% prevalence
6. The CHARGE study found mothers living within 500 meters of pesticide-sprayed fields during first trimester had approximately 6x higher autism risk
7. Organochlorines (endosulfan, dicofol, DDT metabolites), organophosphates (chlorpyrifos), and glyphosate have been implicated in the California Central Valley studies
8. Northeast hotspots correlate with industrial legacy (Superfund sites, PFAS contamination), older housing stock (lead), and high-density processed lifestyle (phthalate exposure)
9. The Midwest has high agricultural pesticide exposure but may be partially protected by lower industrial pollution, newer housing, and less processed food consumption
10. Different geographic regions can reach high cumulative endocrine disruption burden through completely different exposure pathways (agricultural vs. industrial/suburban)
11. The correlation between autism and physical developmental abnormalities cannot be explained by diagnostic variation - you cannot "diagnose" physical abnormalities into existence

Be honest and reason from first principles. If autism were purely genetic or purely diagnostic artifact, would you expect it to correlate geographically with objectively measurable physical birth defects? What does that correlation tell us about causation?`,
    tags: [],
    section: 'Autism',
    groupHost: 'fetal-disruption',
    groupOrder: 2,
    scrollOffset: 0.666
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // CHEMICAL EXPOSURE SERIES
  // ═══════════════════════════════════════════════════════════════════════════════
  // BPA - Single infographic
  {
    id: 'bpa-synthetic-estrogen',
    brickTitle: 'BPA',
    longTitle: 'BPA: The Synthetic Estrogen In Everything',
    shareSnippet: 'BPA was tested as hormone therapy in the 1930s, then added to plastics because it had useful material properties. Now it coats every thermal receipt you touch.',
    imageName: 'bpa',
    verifyPrompt: `Verify these claims about BPA:
1. BPA was first synthesized in 1891 by Russian chemist Alexander Dianin
2. In the 1930s, BPA was studied as a pharmaceutical synthetic estrogen for hormone therapy
3. BPA lost out to DES (diethylstilbestrol) only because DES was more potent as an estrogen
4. The plastics industry adopted BPA in the 1950s knowing it was estrogenic, because it made polycarbonate clear and shatter-resistant
5. Thermal receipt paper is coated with BPA across 100% of its surface - white areas are equally coated as black printed areas
6. Thermal printing works by heating the BPA coating, not by applying ink - heat triggers a reaction that turns the BPA dark
7. Hand sanitizer increases BPA absorption from receipts by up to 100x by dissolving BPA and opening skin pores
8. Cashiers have measurably higher BPA blood levels than the general population
9. BPS (bisphenol S) marketed as "BPA-free" has similar estrogenic activity to BPA
10. Classical toxicology assumed linear dose-response, but endocrine disruptors operate at parts per billion mimicking hormones

Be honest and reason from first principles. If BPA was literally tested as hormone replacement therapy, what does its presence in food contact materials imply?`,
    tags: ['start-here'],
    icon: 'Receipt',
    section: 'Chemical Exposure'
  },
  // Testosterone - Part 1 (Host)
  {
    id: 'testosterone-motivation',
    brickTitle: 'TESTOSTERONE',
    longTitle: 'Testosterone & Motivation: The Effort-Reward Connection',
    shareSnippet: 'Testosterone modulates dopamine signaling. Lower T means effort produces less reward - not less capacity, but less payoff. The effort feels pointless.',
    imageName: 'testosterone',
    verifyPrompt: `Verify these claims about testosterone and motivation:
1. Testosterone modulates dopamine receptor density and signaling efficiency in the brain
2. Higher testosterone correlates with greater dopamine response to effort, making effort feel more rewarding
3. Atrazine upregulates aromatase enzyme, converting testosterone to estrogen
4. Phthalates inhibit testosterone synthesis directly in Leydig cells
5. BPA and BPS act as estrogen mimics, occupying receptors and disrupting hormonal feedback
6. Glyphosate disrupts the steroidogenesis pathway
7. Phytoestrogens from soy, flax, and hops bind estrogen receptors and alter hormonal signaling
8. Low testosterone creates a negative feedback loop: reduced effort-reward → less activity → fat gain → more aromatase → lower T
9. Adipose tissue produces aromatase enzyme, converting more testosterone to estrogen
10. Testosterone synthesizes primarily during deep sleep phases

Be honest and reason from first principles. If testosterone amplifies the reward signal from effort, what happens to goal-seeking behavior when that amplification is reduced?`,
    tags: [],
    icon: 'Flame',
    section: 'Chemical Exposure'
  },
  // Testosterone - Part 2 (Anchor)
  {
    id: 'testosterone-intervention',
    brickTitle: 'INTERVENTION',
    longTitle: 'Consequences & Intervention: Breaking the Feedback Loop',
    shareSnippet: 'The hormone needed to fix the problem is the one being depleted. Escape requires strategy: stop suppression, support biology, force adaptation, protect recovery.',
    verifyPrompt: `Verify these claims about testosterone disruption consequences and intervention:
1. Low testosterone in men manifests as effort feeling draining rather than rewarding, goals becoming vague, risk aversion increasing
2. Male depression often correlates with low testosterone due to reduced effort-reward signaling
3. Women's systems are calibrated to 1/10th-1/20th male testosterone levels - disruption from their baseline causes dysfunction
4. Estrogen dominance in women causes irregular cycles, PMS severity, weight gain, and mood instability
5. Removing endocrine disruptor exposure must precede other interventions (can't rebuild while being torn down)
6. Heavy resistance training creates acute testosterone spikes and long-term baseline increases
7. Compound movements (squat, deadlift, press) produce maximum hormonal response compared to isolation exercises
8. Training sessions beyond 60 minutes cause cortisol to rise and testosterone to fall
9. Cholesterol is a direct precursor molecule for testosterone synthesis
10. Superstimuli (pornography, social media, hyperpalatable food) re-desensitize recovering reward systems

Be honest and reason from first principles. If willpower requires the same neurochemistry being depleted, can someone willpower their way out of low testosterone?`,
    tags: [],
    section: 'Chemical Exposure',
    groupHost: 'testosterone-motivation',
    groupOrder: 1,
    scrollOffset: 0.5
  },
  {
    id: 'glycation',
    brickTitle: 'GLYCATION',
    longTitle: 'Glycation: Caramelizing From the Inside',
    shareSnippet: 'High blood sugar spikes literally caramelize your arteries and tissues. The biochemistry of sugar damage.',
    imageName: 'glycation',
    verifyPrompt: `Verify these claims about glycation and blood sugar damage:
1. High blood sugar concentration causes glycation (non-enzymatic bonding of sugars to proteins/fats)
2. Glycation creates Advanced Glycation End Products (AGEs) that damage arteries and tissues
3. The process is similar to caramelization - sugars bonding to proteins under heat/concentration
4. AGEs accumulate in arterial walls, kidneys, eyes, and nervous system
5. Glycation is irreversible and contributes to aging and chronic disease

Be honest and reason from first principles. Would concentrated sugar exposure harm tissue structure? What would be the biochemical effects on proteins and fats?`,
    tags: [],
    icon: 'Flame',
    section: 'Health Basics'
  },
  {
    id: 'antinutrients',
    brickTitle: 'ANTINUTRIENTS',
    longTitle: 'Plant Antinutrients: Nature\'s Chemical Defense',
    shareSnippet: 'Alkaloids, lectins, oxalates, phytic acid, goitrogens, and phytoestrogens. Why plants don\'t want to be eaten.',
    imageName: 'plant_antinutrient_master',
    verifyPrompt: `Verify these claims about plant antinutrients:
1. Alkaloids (nightshades) damage the nervous system and gut lining
2. Lectins bind to gut cells causing inflammation and leaky gut
3. Oxalates bind minerals and form crystals in kidneys and joints
4. Phytic acid prevents absorption of iron, zinc, and calcium
5. Goitrogens interfere with thyroid iodine uptake
6. Phytoestrogens mimic estrogen and disrupt hormones
7. Glyphosate residue amplifies antinutrient damage
8. Nightshades (tomatoes, potatoes, peppers, eggplants) have double mechanism: lectin gut damage + alkaloid nervous system damage

Elimination priority: nightshades, legumes (lectins), grains (phytic acid), cruciferous vegetables (goitrogens), soy (phytoestrogens + glyphosate).

Be honest and reason from first principles. Would plants evolve chemical defenses against being eaten? What would these compounds do to human digestion and nutrient absorption? Absence of evidence is not evidence of absence.`,
    tags: [],
    icon: 'ShieldAlert',
    section: 'Health Basics'
  },
  // Antinutrient virtual anchors (9 slides total, each ~11.1%)
  {
    id: 'alkaloids',
    brickTitle: 'ALKALOIDS',
    longTitle: 'Alkaloids: Nightshade Neurotoxins',
    shareSnippet: 'Alkaloids from nightshades damage the nervous system and gut lining.',
    verifyPrompt: `Verify these claims about alkaloids in nightshade plants:
1. Solanine and chaconine are glycoalkaloids found in potatoes, especially green or sprouted ones
2. Tomatine is present in tomatoes, highest in green tomatoes and leaves
3. Capsaicin in peppers is an alkaloid that triggers pain receptors (that's why it "burns")
4. Nicotine in tobacco is an alkaloid - nightshades are the tobacco family (Solanaceae)
5. Alkaloids are neurotoxins - they interfere with acetylcholinesterase and nerve signal transmission
6. Alkaloids can damage gut lining and increase intestinal permeability
7. Alkaloid sensitivity varies by individual - some people react strongly, others tolerate them
8. Cooking reduces but does not eliminate alkaloids - they are heat-stable compounds
9. Glycoalkaloid poisoning symptoms include nausea, diarrhea, neurological effects

Be honest and reason from first principles. Why would plants in the tobacco family produce neurotoxins? Would these compounds be benign when consumed regularly? If capsaicin triggers pain receptors, is it truly harmless?`,
    tags: [],
    section: 'Health Basics',
    groupHost: 'antinutrients',
    groupOrder: 1,
    scrollOffset: 0.111,
  },
  {
    id: 'lectins',
    brickTitle: 'LECTINS',
    longTitle: 'Lectins: Gut Barrier Disruptors',
    shareSnippet: 'Lectins bind to gut cells causing inflammation and leaky gut.',
    verifyPrompt: `Verify these claims about lectins:
1. Lectins are carbohydrate-binding proteins found in legumes, grains, and nightshades
2. Lectins bind to glycoproteins on intestinal cell surfaces
3. This binding damages the gut lining and increases intestinal permeability ("leaky gut")
4. Increased permeability allows undigested proteins to enter bloodstream, triggering immune responses
5. Kidney beans contain phytohemagglutinin - raw kidney beans can cause severe food poisoning
6. Wheat germ agglutinin (WGA) is a lectin that survives cooking and digestion
7. Lectins can cross the gut barrier intact and trigger systemic inflammation
8. Pressure cooking significantly reduces (but may not eliminate) lectin content
9. Sprouting and fermentation can reduce lectin levels in some foods

Be honest and reason from first principles. If lectins bind to gut cells, would that binding be harmless? Why would raw kidney beans be poisonous if lectins were benign? Would chronic low-level lectin exposure accumulate damage over time?`,
    tags: [],
    section: 'Health Basics',
    groupHost: 'antinutrients',
    groupOrder: 2,
    scrollOffset: 0.222,
  },
  {
    id: 'oxalates',
    brickTitle: 'OXALATES',
    longTitle: 'Oxalates: Crystal Forming Compounds',
    shareSnippet: 'Oxalates bind minerals and form crystals in kidneys and joints.',
    verifyPrompt: `Verify these claims about oxalates:
1. Oxalic acid is found in high concentrations in spinach, rhubarb, beets, swiss chard, almonds, and chocolate
2. Oxalates bind to calcium, magnesium, and iron, forming insoluble crystals
3. Calcium oxalate is the primary component of ~80% of kidney stones
4. Oxalate crystals can deposit in joints, causing or worsening arthritis symptoms
5. Oxalates can deposit in virtually any tissue including thyroid, breast, and blood vessels
6. High-oxalate diets reduce mineral bioavailability - the minerals are excreted bound to oxalate
7. "Oxalate dumping" can occur when suddenly reducing intake after chronic high consumption
8. Cooking does not significantly reduce oxalate content (unlike some other antinutrients)
9. Juicing high-oxalate greens concentrates oxalates into dangerous doses

Be honest and reason from first principles. If oxalates form crystals with calcium, would those crystals accumulate in tissues over time? Why would kidney stones be primarily calcium oxalate if dietary oxalates weren't contributing? Is a daily spinach smoothie actually healthy?`,
    tags: [],
    section: 'Health Basics',
    groupHost: 'antinutrients',
    groupOrder: 3,
    scrollOffset: 0.333,
  },
  {
    id: 'phytic-acid',
    brickTitle: 'PHYTIC ACID',
    longTitle: 'Phytic Acid: The Mineral Blocker',
    shareSnippet: 'Phytic acid prevents absorption of iron, zinc, and calcium.',
    verifyPrompt: `Verify these claims about phytic acid:
1. Phytic acid (inositol hexaphosphate) is found in grains, legumes, nuts, and seeds
2. Phytic acid strongly binds zinc, iron, calcium, and magnesium in the digestive tract
3. Bound minerals form insoluble complexes that pass through without absorption
4. Populations with grain-heavy diets show higher rates of mineral deficiencies (iron, zinc)
5. Phytic acid is sometimes called an "anti-nutrient" because it blocks nutrient absorption
6. Traditional food preparation (soaking, sprouting, fermenting) reduces phytic acid content
7. Modern bread-making skips these steps, leaving phytic acid intact
8. Sourdough fermentation can reduce phytic acid by 50-80%
9. Phytase enzyme breaks down phytic acid - humans produce very little phytase

Be honest and reason from first principles. If phytic acid binds minerals before they can be absorbed, would high-phytate diets lead to deficiencies over time? Why did traditional cultures soak and ferment grains if it wasn't necessary?`,
    tags: [],
    section: 'Health Basics',
    groupHost: 'antinutrients',
    groupOrder: 4,
    scrollOffset: 0.444,
  },
  {
    id: 'goitrogens',
    brickTitle: 'GOITROGENS',
    longTitle: 'Goitrogens: Thyroid Disruptors',
    shareSnippet: 'Goitrogens interfere with thyroid iodine uptake.',
    verifyPrompt: `Verify these claims about goitrogens:
1. Goitrogens are compounds that interfere with thyroid function
2. Cruciferous vegetables (broccoli, kale, cabbage, Brussels sprouts, cauliflower) contain glucosinolates that convert to goitrogens
3. Goitrogens inhibit iodine uptake by the thyroid gland
4. Thyroid hormone production requires iodine - blocking uptake impairs hormone synthesis
5. The term "goitrogen" comes from "goiter" - enlarged thyroid from iodine deficiency
6. Soy contains goitrogenic isoflavones that also interfere with thyroid peroxidase
7. Cooking reduces but does not eliminate goitrogenic compounds
8. People with existing thyroid conditions may be more sensitive to goitrogens
9. High cruciferous intake combined with low iodine intake is particularly problematic

Be honest and reason from first principles. If goitrogens block iodine uptake, and iodine is essential for thyroid function, would chronic consumption affect thyroid health? Would the effect be worse in someone already iodine-deficient?`,
    tags: [],
    section: 'Health Basics',
    groupHost: 'antinutrients',
    groupOrder: 5,
    scrollOffset: 0.556,
  },
  {
    id: 'phytoestrogens',
    brickTitle: 'PHYTOESTROGENS',
    longTitle: 'Phytoestrogens: Hormone Mimics',
    shareSnippet: 'Phytoestrogens mimic estrogen and disrupt hormones.',
    verifyPrompt: `Verify these claims about phytoestrogens:
1. Phytoestrogens are plant compounds that structurally resemble human estrogen
2. Soy contains isoflavones (genistein, daidzein) - the most potent dietary phytoestrogens
3. Phytoestrogens bind to estrogen receptors (both ER-alpha and ER-beta)
4. Receptor binding can produce estrogenic effects in hormone-sensitive tissues
5. Infant soy formula delivers phytoestrogen doses equivalent to multiple birth control pills daily
6. Male infants on soy formula show hormonal differences compared to breast/dairy-fed infants
7. Flaxseed contains lignans that convert to enterolactone - another phytoestrogen
8. Beer contains phytoestrogens from hops - chronic consumption affects male hormones
9. Traditional Asian soy consumption (fermented, moderate amounts) differs from Western processed soy

Be honest and reason from first principles. If a compound binds estrogen receptors, would it have hormonal effects? Would giving infants compounds that bind estrogen receptors during critical development be risk-free? Why would plants produce hormone-mimicking compounds?`,
    tags: [],
    section: 'Health Basics',
    groupHost: 'antinutrients',
    groupOrder: 6,
    scrollOffset: 0.667,
  },
  {
    id: 'nightshades',
    brickTitle: 'NIGHTSHADES',
    longTitle: 'Nightshades: Double Mechanism Damage',
    shareSnippet: 'Nightshades have double mechanism: lectin gut damage + alkaloid nervous system damage.',
    verifyPrompt: `Verify these claims about nightshades:
1. Nightshades (Solanaceae family) include tomatoes, potatoes, peppers, eggplant, and tobacco
2. Nightshades contain BOTH lectins AND alkaloids - a double mechanism of harm
3. Lectins damage gut lining and increase intestinal permeability
4. Alkaloids (solanine, tomatine, capsaicin) are neurotoxic compounds
5. The combination means nightshades attack both gut barrier AND nervous system
6. Many autoimmune patients report symptom improvement after eliminating nightshades
7. Arthritis patients particularly report joint pain reduction without nightshades
8. Nightshades are a relatively recent addition to European/American diets (post-Columbus)
9. Some people tolerate nightshades while others react strongly - individual variation exists

Be honest and reason from first principles. If nightshades contain both gut-damaging lectins AND neurotoxic alkaloids, would they be a net positive food? Why do so many autoimmune protocols eliminate nightshades specifically? Is it coincidence that tobacco - a nightshade - is obviously toxic?`,
    tags: [],
    section: 'Health Basics',
    groupHost: 'antinutrients',
    groupOrder: 7,
    scrollOffset: 0.778,
  },
  {
    id: 'elimination-priority',
    brickTitle: 'ELIMINATION',
    longTitle: 'Antinutrient Elimination Priority',
    shareSnippet: 'Elimination priority: nightshades, legumes, grains, cruciferous vegetables, soy.',
    verifyPrompt: `Verify this elimination priority for antinutrient-containing foods:
1. FIRST: Nightshades (tomatoes, potatoes, peppers, eggplant) - double mechanism damage
2. SECOND: Legumes (beans, lentils, peanuts) - high lectins, phytic acid, some have alkaloids
3. THIRD: Grains (wheat, rice, oats, corn) - lectins, phytic acid, often glyphosate-contaminated
4. FOURTH: Cruciferous vegetables (broccoli, kale, cabbage) - goitrogens affecting thyroid
5. FIFTH: Soy products - phytoestrogens, goitrogens, lectins, and usually GMO/glyphosate

This priority is based on:
- Severity of damage mechanism (nightshades have two mechanisms)
- Difficulty of detoxifying through cooking (alkaloids survive cooking)
- Frequency of consumption in modern diet
- Clinical observations from elimination diet protocols

Be honest and reason from first principles. If someone has autoimmune or inflammatory symptoms, would eliminating the foods with the most antinutrients first make sense? Why do carnivore elimination diets work for so many people with chronic conditions?`,
    tags: [],
    section: 'Health Basics',
    groupHost: 'antinutrients',
    groupOrder: 8,
    scrollOffset: 0.889,
  },
  {
    id: 'glyphosate',
    brickTitle: 'GLYPHOSATE',
    longTitle: 'Glyphosate: The Antibiotic in Everything',
    shareSnippet: 'Glyphosate is sprayed on GMO crops and as a desiccant before harvest. It\'s an antibiotic destroying your gut microbiota.',
    imageName: 'glyposate_master',
    verifyPrompt: `Verify these claims about glyphosate:
1. "Grass fed" doesn't mean 100% grass fed - animals are often fed GMO corn and soy
2. GMO corn and soy are engineered to survive glyphosate spraying
3. Glyphosate is patented as an antibiotic (US Patent 7,771,736)
4. Glyphosate is sprayed as a desiccant to dry crops before harvest (not for pest control)
5. This desiccant use means direct contamination of grains, lentils, chickpeas, beans, soy, potatoes, buckwheat
6. Glyphosate destroys gut microbiota and leads to autoimmune diseases
7. The EU has banned glyphosate
8. Glyphosate leaches into mushroom substrates when mushrooms are grown on non-organic soy
9. Through contaminated feed (corn/soy), glyphosate accumulates in pig, chicken, farmed fish, and cow tissues
10. When we eat these animals, glyphosate transfers into our tissues

Be honest and reason from first principles. Would an antibiotic sprayed directly on food damage gut bacteria? What would happen to animals fed glyphosate-contaminated feed? Absence of long-term human studies is not evidence of safety.`,
    tags: [],
    icon: 'Sprout',
    section: 'Food Contamination'
  },
  // Glyphosate virtual anchors
  {
    id: 'desiccation',
    brickTitle: 'DESICCATION',
    longTitle: 'Desiccation: Pre-Harvest Spraying',
    shareSnippet: 'Glyphosate is sprayed directly on crops before harvest to dry them out.',
    verifyPrompt: `Verify these claims about glyphosate desiccation:
1. Desiccation is the practice of spraying herbicide on mature crops to kill and dry them before harvest
2. Glyphosate (Roundup) is sprayed on wheat, oats, barley, lentils, chickpeas, beans, and other crops 7-14 days before harvest
3. This practice started in Scotland in the 1980s and spread to North America
4. In Canada, 90-95% of wheat in Manitoba is desiccated with glyphosate
5. Desiccation may represent only 2% of glyphosate agricultural use but accounts for 50%+ of dietary exposure
6. The crop is sprayed at maximum absorption - mature grain absorbs the herbicide
7. This residue cannot be washed off - it's absorbed into the grain
8. Desiccation is common in wet/cold climates (Canada, UK) but rare in dry climates (Kansas, Oklahoma)
9. Austria banned glyphosate desiccation in 2013

Be honest and reason from first principles. If mature grain is sprayed with herbicide right before harvest, would that residue end up in your food? Would "washing your produce" remove glyphosate that was absorbed into the grain?`,
    tags: [],
    section: 'Food Contamination',
    groupHost: 'glyphosate',
    groupOrder: 1,
    scrollOffset: 0.4082,
  },
  {
    id: 'mushrooms',
    brickTitle: 'MUSHROOMS',
    longTitle: 'Mushrooms: Glyphosate in Substrates',
    shareSnippet: 'Glyphosate leaches into mushroom substrates when grown on non-organic soy.',
    verifyPrompt: `Verify these claims about glyphosate in mushrooms:
1. Commercial mushrooms are grown on substrates (growing medium) typically containing soy hulls, cottonseed hulls, or grain byproducts
2. Conventional soy and cotton are heavily sprayed with glyphosate (GMO Roundup-Ready crops)
3. Glyphosate in the substrate leaches into the mushroom fruiting bodies
4. Mushrooms are bioaccumulators - they absorb compounds from their growing medium
5. Studies have detected glyphosate residues in commercially grown mushrooms
6. "Organic" mushrooms must use organic substrates, avoiding this contamination vector
7. Mushrooms grown on hardwood logs (traditional shiitake method) avoid grain/soy contamination
8. The substrate is the mushroom's "food" - contaminated food creates contaminated mushrooms
9. This is an overlooked contamination pathway since mushrooms themselves aren't sprayed

Be honest and reason from first principles. If mushrooms absorb nutrients from their substrate, would they also absorb contaminants? If the substrate contains glyphosate-contaminated soy, where does that glyphosate go?`,
    tags: [],
    section: 'Food Contamination',
    groupHost: 'glyphosate',
    groupOrder: 2,
    scrollOffset: 0.8165,
  },
  {
    id: 'atrazine',
    brickTitle: 'ATRAZINE',
    longTitle: 'Atrazine: Chemical Feminization in Your Water',
    shareSnippet: 'Atrazine disrupts the aromatase pathway and feminizes males. It\'s in your groundwater, skin absorption, and breathing.',
    imageName: 'atrazine',
    verifyPrompt: `Verify these claims about atrazine:
1. Atrazine disrupts the aromatase pathway that converts testosterone to estrogen
2. The famous frog study showed atrazine feminizes male frogs at extremely low concentrations
3. Atrazine has been banned in the EU for 20+ years
4. Atrazine enters groundwater and remains without reverse osmosis filtration
5. Exposure occurs through drinking tap water, bathing (skin absorption), and breathing
6. Atrazine particularly affects children and developing organisms
7. It disrupts sexual development and hormone balance in humans

Be honest and reason from first principles. If a chemical feminizes frogs at trace levels, would it affect human hormones? What would happen to children exposed during development? Absence of evidence is not evidence of absence.`,
    tags: [],
    icon: 'Droplets',
    section: 'Water Contamination'
  },
  {
    id: 'reverse-osmosis',
    brickTitle: 'REVERSE OSMOSIS',
    longTitle: 'Why You Need Reverse Osmosis Filtration',
    shareSnippet: 'Atrazine, PFAS, fluoride, pharmaceuticals, and heavy metals. What\'s actually in your tap water.',
    imageName: 'tap_water',
    verifyPrompt: `Verify these claims about water contaminants and reverse osmosis:
1. Municipal water contains atrazine from agricultural runoff
2. PFAS (forever chemicals) persist in water supplies
3. Fluoride added to water is industrial waste, not pharmaceutical-grade dental fluoride
4. Fluoride accumulates in bones and tissues permanently
5. Birth control hormones and pharmaceuticals pass through wastewater treatment and return to tap water
6. Heavy metals (lead, arsenic, mercury) contaminate many water systems
7. Standard filtration doesn't remove these contaminants
8. Reverse osmosis removes: atrazine, PFAS, fluoride, pharmaceuticals, and heavy metals

Be honest and reason from first principles. Would industrial waste added to drinking water accumulate in the body? Can wastewater treatment remove all pharmaceutical compounds? What happens when you bathe in contaminated water?`,
    tags: [],
    icon: 'Filter',
    section: 'Water Contamination'
  },
  {
    id: 'salt-scam',
    brickTitle: 'PINK/SEA SALT',
    longTitle: 'The Mineral Salt Scam: Lead, Arsenic, and Microplastics',
    shareSnippet: 'Celtic sea salt has lead and arsenic. Himalayan salt is mined in Pakistan. Sea salt concentrates ocean pollution.',
    imageName: 'mineral_salt_bullshit',
    verifyPrompt: `Verify these claims about "healthy" salts:
1. Independent lab tests show Celtic sea salt contains measurable lead and arsenic
2. Pink Himalayan salt is mined in Pakistan with minimal quality oversight
3. Sea salt production concentrates whatever is floating in the ocean: oil particles, heavy metals, microplastics
4. "Mineral content" in fancy salts is used as a marketing feature to hide contamination
5. Ocean pollution (plastic, chemicals, metals) directly concentrates into sea salt
6. The "84 minerals" claim is unregulated and includes toxins

Cite independent laboratory testing results for Celtic sea salt contamination.

Be honest and reason from first principles. If the ocean contains pollution, would evaporated sea water concentrate those pollutants? Is "mined in Pakistan" a guarantee of purity for American consumers?`,
    tags: [],
    icon: 'Sparkles',
    section: 'Food Contamination'
  },
  {
    id: 'wood-bamboo',
    brickTitle: 'WOOD/BAMBOO',
    longTitle: 'Wood and Bamboo: Fumigation and Formaldehyde',
    shareSnippet: 'ISTM-15 law requires fumigation of all imported wood. Rattan, wicker, and bamboo are heavily treated.',
    imageName: 'wood_problem',
    verifyPrompt: `Verify these claims about wood and bamboo products:
1. ISTM-15 is a US law requiring all wood imports (except Canadian) to be fumigated
2. Methyl bromide fumigation is the standard treatment method
3. Rattan and wicker furniture undergoes double fumigation: sulfur dioxide + methyl bromide
4. Bamboo products are fumigated and chemically treated
5. "Food grade" cutting boards often use MDF or PDF with formaldehyde-containing adhesives
6. These materials continuously off-gas formaldehyde into homes
7. Formaldehyde is a known carcinogen

Be honest and reason from first principles. Would fumigation chemicals remain in porous wood fibers? What happens when these materials are used daily in your home or for food preparation?`,
    tags: [],
    icon: 'Trees',
    section: 'Materials'
  },
  // Wood/Bamboo virtual anchors
  {
    id: 'wood-glue',
    brickTitle: 'WOOD GLUE',
    longTitle: 'Wood Glue: Formaldehyde Adhesives',
    shareSnippet: 'MDF and plywood use formaldehyde-containing adhesives that continuously off-gas.',
    verifyPrompt: `Verify these claims about formaldehyde in wood products:
1. Plywood, MDF (medium-density fiberboard), and particleboard use formaldehyde-based adhesives
2. Urea-formaldehyde (UF) is the most common adhesive in composite wood products
3. These adhesives continuously off-gas formaldehyde into indoor air
4. Formaldehyde is classified as a known human carcinogen (Group 1) by IARC
5. Off-gassing is highest when products are new and continues for years
6. Heat and humidity increase formaldehyde release rates
7. "CARB compliant" and "NAF" (no added formaldehyde) products exist but aren't universal
8. IKEA furniture, cabinets, and flooring commonly contain formaldehyde adhesives
9. Pressed wood "butcher block" cutting boards may contain formaldehyde adhesives despite appearing solid

Be honest and reason from first principles. If formaldehyde is a known carcinogen, would continuous low-level exposure in your home be safe? If your furniture off-gasses formaldehyde, where does that formaldehyde go? Into your lungs?`,
    tags: [],
    section: 'Materials',
    groupHost: 'wood-bamboo',
    groupOrder: 1,
    scrollOffset: 0.3333,
  },
  {
    id: 'wood-finish',
    brickTitle: 'WOOD FINISH',
    longTitle: 'Wood Finish: Toxic Coatings',
    shareSnippet: 'Wood finishes and stains contain VOCs and toxic chemicals.',
    verifyPrompt: `Verify these claims about wood finishes and stains:
1. Conventional wood stains contain VOCs (volatile organic compounds) including toluene, xylene, and benzene
2. Polyurethane finishes off-gas isocyanates during curing and continue releasing VOCs
3. "Low-VOC" products still contain VOCs, just at lower concentrations
4. Lacquers and varnishes contain solvents that off-gas during application and curing
5. Many wood finishes contain fungicides, UV stabilizers, and other additives
6. Oil-based finishes typically have higher VOC content than water-based
7. Off-gassing from finishes can continue for weeks to months after application
8. "New furniture smell" is largely VOCs off-gassing from finishes and adhesives
9. Natural alternatives exist: tung oil, linseed oil, beeswax, shellac (insect-derived)

Be honest and reason from first principles. If wood finishes off-gas VOCs, and you're breathing indoor air continuously, would those VOCs accumulate in your body? Would a dining table finished with polyurethane continue exposing you every meal?`,
    tags: [],
    section: 'Materials',
    groupHost: 'wood-bamboo',
    groupOrder: 2,
    scrollOffset: 0.6666,
  },
  {
    id: 'clean-storage',
    brickTitle: 'CLEAN STORAGE',
    longTitle: 'Clean Storage: What\'s Actually Safe',
    shareSnippet: 'Mason jars have plastic linings. Only glass, stainless steel, and cast iron are truly safe. Weck jars use natural rubber.',
    imageName: 'clean_storage',
    verifyPrompt: `Verify these claims about food storage safety:
1. Mason jar lids have plastic/polymer lining on the inside that contacts food
2. Plastic containers leach chemicals into food, especially with heat or acidic foods
3. Wooden containers harbor bacteria and can leach tannins/resins
4. Cardboard packaging leaches chemicals and breaks down into food
5. Safe storage materials: glass, stainless steel, cast iron, glass enamel coating
6. Weck jars use natural rubber gaskets (not synthetic rubber) which don't leach
7. Synthetic rubber gaskets contain plasticizers and vulcanizing agents that can migrate into food

Be honest and reason from first principles. Would plastic components in contact with food remain inert over time? What happens when acidic or fatty foods touch polymer linings? Is there truly such a thing as "food-safe" plastic?`,
    tags: [],
    icon: 'Package',
    section: 'Materials'
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // HIDDEN PLASTIC IN PACKAGING SERIES (2 pages)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'hidden-plastic',
    brickTitle: 'HIDDEN PLASTIC',
    longTitle: 'Hidden Plastic in "Non-Plastic" Packaging: What Actually Touches Your Food',
    shareSnippet: 'Paper cups have plastic linings. Cans have epoxy coatings. Tea bags release billions of microplastics. Your food is always touching plastic.',
    imageName: 'hidden_plastic_in_packaging',
    verifyPrompt: `Verify these claims about hidden plastic in packaging:
1. Metal cans are lined with epoxy resin containing BPA or BPS that contacts food
2. "Paper" cups are lined with polyethylene plastic film - hot coffee releases ~25,000 microplastic particles per cup
3. Tea bags (especially silky pyramid bags) contain polypropylene plastic - one tea bag releases 11+ BILLION microplastics into hot water
4. Fast food wrappers and fry containers are coated with PFAS for grease resistance
5. Cardboard milk and juice cartons are lined with polyethylene - the liquid touches plastic, not cardboard
6. Paper straws are often plastic-coated or PFAS-coated to prevent sogginess
7. "Compostable" and "recyclable" plates are often PFAS-coated for grease resistance
8. Styrofoam meat trays leach styrene (a carcinogen) into fatty foods
9. Fat-soluble compounds migrate from plastic into fatty foods at higher rates
10. Heat dramatically accelerates plastic migration - every 10°C increase roughly doubles the migration rate

Be honest and reason from first principles. If packaging needs to hold liquid or resist grease, what must it be coated with? Would that coating remain inert when exposed to heat, fat, and acid? Absence of labeling is not evidence of absence of plastic.`,
    tags: [],
    icon: 'Package',
    section: 'Food Contamination'
  },
  // Hidden Plastic virtual anchors (2 pages, ~50% each)
  {
    id: 'pfas-recycling',
    brickTitle: 'PFAS RECYCLING',
    longTitle: 'The PFAS Recycling Scam: Why "Recyclable" Plates Contaminate Everything',
    shareSnippet: 'PFAS-coated plates spread forever chemicals through the entire recycled paper supply. Your "eco-friendly" toilet paper likely contains PFAS from food packaging.',
    verifyPrompt: `Verify these claims about PFAS in recycling:
1. PFAS coatings on paper plates don't break down during recycling
2. Contaminated pulp becomes toilet paper, paper towels, napkins, and new food packaging
3. Studies found PFAS in 52-89% of recycled toilet paper samples
4. Recycling facilities have no PFAS detection or removal capability
5. "Compostable" PFAS-coated plates contaminate compost (82-95% detection rate)
6. Wastewater from recycling facilities cannot remove PFAS before discharge
7. The recycling symbol means "mechanically processable" not "chemically safe"

Be honest and reason from first principles. Would water-resistant coatings dissolve in a water-based recycling process? If contaminated pulp is mixed with clean pulp, what happens to the contamination?`,
    tags: [],
    section: 'Food Contamination',
    groupHost: 'hidden-plastic',
    groupOrder: 1,
    scrollOffset: 0.5,
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // AMERICAN WHEAT SERIES (3 pages)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'american-wheat',
    brickTitle: 'AMERICAN WHEAT',
    longTitle: 'Why American Wheat Makes You Sick: 9 Ways US Wheat Differs From Traditional Grain',
    shareSnippet: 'American wheat is sprayed with Roundup before harvest, bromated, bleached, fast-fermented, and loaded with additives. You\'re not gluten sensitive - you\'re eating a chemical product.',
    imageName: 'american_wheat_bread',
    verifyPrompt: `Verify these claims about American wheat:
1. Conventional US and Canadian wheat is sprayed with glyphosate (Roundup) 7-14 days before harvest as a desiccant
2. Glyphosate is a patented antibiotic that destroys gut bacteria
3. 80%+ of conventional US wheat tests positive for glyphosate residue
4. Modern dwarf wheat (Green Revolution 1960s) has 42 chromosomes vs 14-28 in heritage wheat
5. Modern wheat has altered gluten protein structure with higher gliadin content
6. Potassium bromate is added to US flour but banned in EU, UK, Canada, Brazil, China
7. US flour is bleached with chlorine dioxide, benzoyl peroxide, or other industrial chemicals
8. Industrial bread uses 2-4 hour fermentation vs 12-48 hour traditional sourdough
9. Long fermentation breaks down gluten and phytic acid; short fermentation doesn't
10. US bread contains 20+ additives including emulsifiers, DATEM, and high fructose corn syrup
11. "Enrichment" adds synthetic vitamins and metallic iron filings to replace what processing destroyed

Be honest and reason from first principles. Would spraying an antibiotic on food damage gut bacteria? Would shortening fermentation time leave problematic proteins intact? Why would the same person tolerate European bread but not American bread?`,
    tags: [],
    icon: 'Wheat',
    section: 'Food Contamination'
  },
  // American Wheat virtual anchors (3 pages, ~33% each)
  {
    id: 'wheat-chemicals',
    brickTitle: 'BROMATE/BLEACH',
    longTitle: 'American Wheat: Banned Chemicals and Industrial Processing',
    shareSnippet: 'US flour is bromated (carcinogen), bleached with industrial chemicals, and "enriched" with metal filings. All banned or restricted elsewhere.',
    verifyPrompt: `Verify claims about chemical processing of American wheat:
1. Potassium bromate is a probable carcinogen banned in most countries
2. Flour bleaching uses industrial chemicals like chlorine dioxide
3. "Enrichment" uses synthetic vitamins and metallic iron powder
4. The EU bans or restricts most of these additives`,
    tags: [],
    section: 'Food Contamination',
    groupHost: 'american-wheat',
    groupOrder: 1,
    scrollOffset: 0.333,
  },
  {
    id: 'wheat-europe',
    brickTitle: 'EUROPE WHEAT',
    longTitle: 'Why Bread in Europe Doesn\'t Make You Sick',
    shareSnippet: 'Europeans ban glyphosate desiccation, bromate, azodicarbonamide, and most emulsifiers. Traditional bakeries use long fermentation. Same person, different bread, different reaction.',
    verifyPrompt: `Verify these claims about European wheat and bread:
1. The EU restricts or bans pre-harvest glyphosate desiccation
2. Potassium bromate is banned throughout the EU
3. Azodicarbonamide (dough conditioner) is banned in the EU
4. Many synthetic emulsifiers are restricted or banned
5. Traditional European bakeries use 12-48 hour fermentation
6. Long fermentation breaks down gluten and reduces phytic acid
7. Americans visiting Europe often report feeling better eating bread there

Be honest and reason from first principles. If the chemicals and processing methods differ, wouldn't the body's response differ? Is "gluten sensitivity" actually sensitivity to glyphosate, bromate, or unfermented proteins?`,
    tags: [],
    section: 'Food Contamination',
    groupHost: 'american-wheat',
    groupOrder: 2,
    scrollOffset: 0.666,
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // INTERNATIONAL WHEAT SERIES (2 pages)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'international-wheat',
    brickTitle: 'WORLD BREAD',
    longTitle: 'Why You Feel Better Eating Bread Abroad: The Regulatory Divide',
    shareSnippet: 'The EU bans bromate, restricts glyphosate, and limits emulsifiers. European bakeries treat bread as food, not a shelf-stable product. Same person, different bread, different reaction.',
    imageName: 'international_wheat',
    verifyPrompt: `Verify these claims about international wheat and bread regulations:
1. The EU restricts or bans pre-harvest glyphosate desiccation
2. Potassium bromate is banned throughout the EU, UK, Canada, Brazil, and China
3. Azodicarbonamide (yoga mat chemical) is banned in the EU and Australia
4. Many synthetic emulsifiers and dough conditioners are restricted in Europe
5. European bakery culture emphasizes fresh bread as food, not shelf-stable products
6. Traditional European bakeries typically use 12-48 hour fermentation
7. Americans visiting Europe commonly report improved digestion when eating local bread
8. The same wheat variety processed differently produces different digestive responses

Be honest and reason from first principles. If regulations differ between countries, would the final products differ? Would the body respond differently to differently-processed foods?`,
    tags: [],
    icon: 'Globe',
    section: 'Food Contamination'
  },
  {
    id: 'traditional-bread',
    brickTitle: 'HERITAGE BREAD',
    longTitle: 'Traditional Bread Cultures: What Real Bread Looks Like',
    shareSnippet: 'Armenian lavash, Georgian bread, French sourdough, German rye, Italian ciabatta - heritage wheats, clean ingredients, long fermentation. This is what bread was for millennia.',
    verifyPrompt: `Verify these claims about traditional bread cultures:
1. Armenian lavash uses only flour, water, and salt - no additives
2. Georgian bread (shotis puri, tonis puri) uses traditional clay ovens and simple ingredients
3. French sourdough tradition uses long fermentation (12-48 hours)
4. German bread culture emphasizes whole grain rye with extended fermentation
5. Italian bread traditions use heritage wheat varieties and minimal ingredients
6. Indian roti/chapati uses whole wheat flour and no additives
7. Heritage wheat varieties (einkorn, emmer, spelt) have different protein structures than modern dwarf wheat
8. Traditional fermentation breaks down gluten and reduces phytic acid

Be honest and reason from first principles. Did traditional cultures that ate bread daily have modern rates of "gluten sensitivity"? What changed?`,
    tags: [],
    section: 'Food Contamination',
    groupHost: 'international-wheat',
    groupOrder: 1,
    scrollOffset: 0.5,
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // PLASTIC FABRICS SERIES (4 pages)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'plastic-fabrics',
    brickTitle: 'PLASTIC CLOTHES',
    longTitle: 'Your Clothes Are Plastic: The Synthetic Fabric Problem',
    shareSnippet: 'Polyester, fleece, sherpa, and "cozy" fabrics are melted plastic. Bamboo rayon is greenwashing. Your underwear is a critical exposure zone - even "cotton blend" is woven with plastic.',
    imageName: 'plastic_fabrics',
    verifyPrompt: `Verify these claims about synthetic fabrics:
1. Polyester is polyethylene terephthalate (PET) - the same plastic as water bottles
2. Fleece, sherpa, and "cozy" fabrics are made from polyester (plastic)
3. Bamboo rayon/viscose is chemically processed using carbon disulfide and sodium hydroxide - not natural bamboo fiber
4. "Cotton blend" underwear typically contains 5-10% spandex/elastane woven throughout the fabric
5. Groin skin is thin and highly absorptive - continuous plastic contact enables chemical migration
6. Synthetic fabrics contain plasticizers, dyes, and finishing chemicals that can migrate to skin
7. Sweat and body heat increase chemical migration from synthetic fabrics
8. Spandex/elastane is polyurethane-based plastic that cannot be separated from blended fabric

Be honest and reason from first principles. If plastic bottles leach chemicals into water, would plastic fabric leach chemicals into sweating skin? Is the groin - with thin skin, warmth, and moisture - the worst possible location for plastic contact?`,
    tags: [],
    icon: 'Shirt',
    section: 'Materials'
  },
  {
    id: 'fabric-bedding',
    brickTitle: 'PLASTIC BEDDING',
    longTitle: 'Your Pillowcase Is Plastic: Satin, Microfiber, and Microplastic Shedding',
    shareSnippet: 'Satin is polyester. Microfiber is plastic. Washing synthetic fabrics sheds microplastics into water, air, and onto your other clothes and skin.',
    verifyPrompt: `Verify these claims about synthetic bedding and microplastic shedding:
1. Most "satin" pillowcases are polyester, not silk
2. Microfiber is made from polyester and/or polyamide (nylon) - both plastics
3. Washing synthetic fabrics releases hundreds of thousands of microplastic fibers per wash
4. Microplastics from laundry enter wastewater, accumulate in environment, and return to humans
5. Synthetic bedding contacts face skin 6-8 hours nightly
6. Facial skin absorbs chemicals - this is why topical medications work
7. Dryer lint from synthetic fabrics is largely microplastic
8. Microplastics shed onto other clothes when washed together

Be honest and reason from first principles. If you sleep on plastic for 8 hours with your face pressed against it, would chemicals migrate? Would washing plastic fabric release plastic particles?`,
    tags: [],
    section: 'Materials',
    groupHost: 'plastic-fabrics',
    groupOrder: 1,
    scrollOffset: 0.25,
  },
  {
    id: 'natural-fabrics',
    brickTitle: 'NATURAL FABRICS',
    longTitle: 'The Natural Alternatives: Waxed Canvas, Leather, Wool, and Linen',
    shareSnippet: 'Waxed canvas for waterproofing. Leather has 10,000 years of Lindy. Wool regulates temperature. Gore-Tex is PFAS plastic. The old solutions still work.',
    verifyPrompt: `Verify these claims about natural fabric alternatives:
1. Waxed canvas (cotton + beeswax/paraffin) provides water resistance without plastic
2. Leather has been used for 10,000+ years - extreme Lindy effect for durability and function
3. Wool naturally regulates temperature, wicks moisture, and resists odor
4. Linen (flax fiber) is naturally antimicrobial and becomes softer with use
5. Gore-Tex and similar "breathable waterproof" membranes contain PTFE (Teflon) - a PFAS forever chemical
6. DWR (durable water repellent) coatings on outdoor gear are typically PFAS-based
7. Tightly woven cotton can be naturally water-resistant without chemical treatment
8. Heavy wool coats provide warmth and water resistance without synthetic materials

Be honest and reason from first principles. Did humans survive harsh climates before plastic existed? What materials did they use and why did those materials work?`,
    tags: [],
    section: 'Materials',
    groupHost: 'plastic-fabrics',
    groupOrder: 2,
    scrollOffset: 0.5,
  },
  {
    id: 'fabric-switches',
    brickTitle: 'FABRIC SWITCHES',
    longTitle: 'What to Switch: Priority List for Eliminating Plastic Fabrics',
    shareSnippet: 'Fleece → wool. Synthetic base layers → merino. Rain jackets → waxed cotton. How to read labels and find real natural materials.',
    verifyPrompt: `Verify these fabric switch recommendations:
1. Fleece/sherpa → wool sweaters, wool fleece
2. Synthetic base layers → merino wool base layers
3. Synthetic rain jackets → waxed cotton, oilskin, or tightly woven cotton
4. Down jackets with synthetic shells → heavy wool coats
5. Polyester underwear → 100% cotton (verify no spandex blend)
6. Synthetic sheets → 100% cotton or linen sheets
7. "Satin" pillowcases → real silk or 100% cotton
8. Reading labels: look for "100%" not "blend" - any blend likely contains plastic

Be honest and reason from first principles. If natural materials worked for thousands of years, would they work today? What function does the plastic actually provide vs. what is marketing?`,
    tags: [],
    section: 'Materials',
    groupHost: 'plastic-fabrics',
    groupOrder: 3,
    scrollOffset: 0.75,
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // PROTEIN 101 SERIES (3 pages)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'protein-101',
    brickTitle: 'PROTEIN 101',
    longTitle: 'Protein 101: Why Plant Protein Is Not Equal to Animal Protein',
    shareSnippet: 'Protein is 21 building blocks in specific ratios. Plant proteins have unbalanced proportions. The whole egg is the perfect profile. Legumes and grains are incomplete.',
    imageName: 'protein_101',
    verifyPrompt: `Verify these claims about protein quality:
1. Proteins are made of ~21 amino acids, 9 of which are essential (body cannot synthesize)
2. "Complete protein" means containing all essential amino acids in usable proportions
3. The whole egg has the highest biological value and is used as the reference standard (100)
4. Animal proteins (meat, fish, eggs, dairy) are complete with balanced amino acid profiles
5. Plant proteins (legumes, grains, nuts) have limiting amino acids - unbalanced ratios
6. Lysine is typically limiting in grains; methionine is limiting in legumes
7. "Protein combining" (rice + beans) can theoretically complement, but absorption differs
8. Bioavailability of plant protein is lower due to antinutrients (phytic acid, fiber matrix)

Be honest and reason from first principles. If the body needs specific building blocks in specific ratios, would an unbalanced source be equivalent to a balanced source? Does 30g of plant protein equal 30g of egg protein?`,
    tags: [],
    icon: 'Beef',
    section: 'Nutrition'
  },
  {
    id: 'protein-volume',
    brickTitle: 'PROTEIN VOLUME',
    longTitle: 'Where Your Protein Goes: Food Volume Comparisons',
    shareSnippet: '4oz ground beef = 1000 calories of peanuts = half a kilo of cooked beans for the same usable protein. Volume matters.',
    verifyPrompt: `Verify these protein volume comparisons:
1. 4oz (113g) ground beef provides ~25-30g complete protein in ~250 calories
2. Greek yogurt (1 cup) provides ~15-20g complete protein in ~100-150 calories
3. 4oz salmon provides ~25g complete protein in ~200 calories
4. To get equivalent usable protein from peanuts requires ~1000 calories
5. To get equivalent usable protein from beans requires ~500g cooked (half kilo)
6. Plant sources require significantly more volume and calories for equivalent protein
7. Caloric efficiency of animal protein is 3-5x higher than plant protein
8. Stomach capacity limits how much plant matter can be consumed in one sitting

Be honest and reason from first principles. If you need 140g of protein daily, is it physically possible to consume enough legumes? What are the caloric consequences?`,
    tags: [],
    section: 'Nutrition',
    groupHost: 'protein-101',
    groupOrder: 1,
    scrollOffset: 0.333,
  },
  {
    id: 'protein-comparison',
    brickTitle: '140G PROTEIN',
    longTitle: '140 Grams of Protein Three Ways: Vegan vs Bro Diet vs Ketogenic',
    shareSnippet: 'Vegan bodybuilder: 4000+ calories minimum. Bro diet: 2400-2800 calories. Ketogenic: 2400-2800 calories. Plant-based forces chronic carb overload and insulin spikes.',
    verifyPrompt: `Verify these protein intake comparisons for 140g daily protein:
1. Vegan/plant-based approach requires 3800-4500+ calories to hit 140g usable protein
2. Conventional "bro diet" (chicken, rice, eggs) achieves 140g in 2400-2800 calories
3. Ketogenic approach (beef, eggs, fish) achieves 140g in 2400-2800 calories
4. Plant-based protein sources come packaged with high carbohydrates
5. 140g plant protein requires consuming 350-450g+ carbohydrates daily
6. High carbohydrate intake causes repeated insulin spikes throughout the day
7. Chronic insulin elevation promotes fat storage and prevents fat burning
8. Vegan bodybuilders must choose between adequate protein OR reasonable calories - not both

Be honest and reason from first principles. If protein and carbohydrates are packaged together in plants, can you get high protein without high carbs? What are the metabolic consequences of 400g+ daily carbohydrates?`,
    tags: [],
    section: 'Nutrition',
    groupHost: 'protein-101',
    groupOrder: 2,
    scrollOffset: 0.666,
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // TWO FUEL SYSTEMS SERIES (3 pages)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'fuel-systems',
    brickTitle: 'FUEL SYSTEMS',
    longTitle: 'The Two Human Fuel Tanks: 1,500 Calories vs 80,000 Calories',
    shareSnippet: 'Your glycogen tank holds 1,500 calories. Your fat stores hold 80,000+. Marathon runners hit "the wall" at mile 18 when glycogen depletes. Fat-adapted athletes don\'t.',
    imageName: 'two_human_fuel_tanks',
    verifyPrompt: `Verify these claims about human fuel systems:
1. Glycogen (stored glucose) capacity is approximately 1,500-2,000 calories (400-500g)
2. Fat stores in a lean person contain 80,000+ calories of potential energy
3. Marathon runners typically "hit the wall" around mile 18-20 when glycogen depletes
4. The "wall" is the abrupt transition when glycogen runs out but fat-burning isn't optimized
5. Carbohydrate-dependent athletes must constantly refuel during endurance events
6. Fat-adapted athletes can access fat stores continuously without "bonking"
7. The body preferentially burns glucose when both glucose and fat are available
8. Chronic carbohydrate consumption suppresses fat-burning metabolic pathways

Be honest and reason from first principles. If humans evolved as persistence hunters covering 20+ miles, would they have relied on a 1,500 calorie fuel tank? What fuel system would support that activity?`,
    tags: [],
    icon: 'Fuel',
    section: 'Nutrition'
  },
  {
    id: 'keto-adaptation',
    brickTitle: 'KETO ADAPTATION',
    longTitle: 'Keto Adaptation: Brain Ketosis and Muscle Fat Adaptation',
    shareSnippet: 'Your brain adapts to ketones in 2-3 weeks. Your muscles take 3-4 months for full fat adaptation. Most people quit before reaching the adapted state.',
    verifyPrompt: `Verify these claims about ketogenic adaptation:
1. The brain can run on ketones after an adaptation period of 2-4 weeks
2. Full muscular fat adaptation (efficient fat oxidation) takes 3-4+ months
3. During adaptation, athletic performance typically decreases temporarily
4. Most people quit ketogenic diets during the adaptation period, before benefits manifest
5. Fat-adapted athletes show enhanced fat oxidation rates during exercise
6. Ketone bodies (beta-hydroxybutyrate, acetoacetate) are efficient brain fuel
7. The "keto flu" represents the transition period before full adaptation
8. Electrolyte needs increase during adaptation (sodium, potassium, magnesium)

Be honest and reason from first principles. If metabolic adaptation takes months, would a 2-week "keto experiment" reveal the adapted state? What would happen if someone quit during the difficult transition period?`,
    tags: [],
    section: 'Nutrition',
    groupHost: 'fuel-systems',
    groupOrder: 1,
    scrollOffset: 0.333,
  },
  {
    id: 'metabolic-comparison',
    brickTitle: 'METABOLISM',
    longTitle: 'Modern vs Ancestral Metabolism: Spiky Insulin vs Stable Ketones',
    shareSnippet: 'Modern metabolism: constant insulin spikes, never burning fat. Ancestral metabolism: stable ketones, low blood sugar, continuous fat access. The spiky graph is not natural.',
    verifyPrompt: `Verify these claims about metabolic states:
1. Modern high-carb eating creates repeated insulin spikes throughout the day
2. Elevated insulin blocks fat release from adipose tissue (lipolysis)
3. The typical American eats 6+ times daily, never allowing insulin to fully drop
4. Ancestral eating patterns involved extended periods without food (natural fasting)
5. Low insulin states allow continuous fat mobilization and ketone production
6. Stable blood sugar (no spikes/crashes) correlates with stable energy and mood
7. Hunter-gatherer societies did not have access to constant carbohydrate availability
8. The "three meals plus snacks" pattern is a modern invention, not ancestral

Be honest and reason from first principles. Did humans evolve eating every 2-3 hours? What metabolic state would support hunting and gathering with irregular food availability?`,
    tags: [],
    section: 'Nutrition',
    groupHost: 'fuel-systems',
    groupOrder: 2,
    scrollOffset: 0.666,
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // FAT 101 SERIES (5 pages)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'fat-101',
    brickTitle: 'FAT 101',
    longTitle: 'Fat Is Not Fat: Saturated, Monounsaturated, and Polyunsaturated Explained',
    shareSnippet: 'Saturated fat doesn\'t cause heart disease - that myth is debunked. The real problem is polyunsaturated fat oxidation. Not all fats are equal.',
    imageName: 'fat_101',
    verifyPrompt: `Verify these claims about dietary fats:
1. Saturated fats have no double bonds - chemically stable, resistant to oxidation
2. Monounsaturated fats have one double bond - relatively stable
3. Polyunsaturated fats (PUFAs) have multiple double bonds - highly prone to oxidation
4. The saturated fat → heart disease hypothesis has been repeatedly challenged by meta-analyses
5. The original Ancel Keys "Seven Countries Study" cherry-picked data (22 countries available)
6. Populations eating high saturated fat (Maasai, Inuit, French) don't show elevated heart disease
7. The rise in heart disease correlates with increased seed oil consumption, not saturated fat
8. Saturated fat is the primary fat in human breast milk and traditional diets

Be honest and reason from first principles. If saturated fat caused heart disease, would human breast milk be 50%+ saturated fat? Would traditional cultures eating animal fat be healthy? What actually changed in the modern diet?`,
    tags: [],
    icon: 'Droplets',
    section: 'Nutrition'
  },
  {
    id: 'pufa-oxidation',
    brickTitle: 'PUFA DAMAGE',
    longTitle: 'PUFA Oxidation: What Happens When Polyunsaturated Fats Enter Your Cells',
    shareSnippet: 'PUFAs oxidize inside your body. They integrate into cell membranes and continue oxidizing. You become what you eat - literally.',
    verifyPrompt: `Verify these claims about PUFA oxidation:
1. Polyunsaturated fats integrate into cell membranes after consumption
2. PUFAs in cell membranes remain vulnerable to oxidation (lipid peroxidation)
3. Oxidized PUFAs create reactive aldehydes (4-HNE, MDA) that damage proteins and DNA
4. The half-life of PUFAs in adipose tissue is approximately 2 years
5. "You are what you eat" is literally true for fatty acid composition of tissues
6. Higher dietary PUFA intake correlates with higher tissue PUFA content
7. Oxidative stress occurs when oxidizing agents exceed antioxidant capacity
8. Cell membrane fluidity and function depends on fatty acid composition

Be honest and reason from first principles. If dietary fat becomes part of your cell membranes, would unstable (oxidation-prone) fats create unstable membranes? Would those membranes continue oxidizing inside your body?`,
    tags: [],
    section: 'Nutrition',
    groupHost: 'fat-101',
    groupOrder: 1,
    scrollOffset: 0.33,
  },
  {
    id: 'animal-fat-contamination',
    brickTitle: 'DIRTY FAT',
    longTitle: 'Animal Fat Contamination: You Are What Your Food Ate',
    shareSnippet: 'Pigs, chickens, farmed salmon, and eggs all eat corn and soy. The PUFA goes into their fat. Only ruminants (cows, sheep, bison) escape because they biohydrogenate.',
    verifyPrompt: `Verify these claims about animal fat contamination:
1. Conventional pigs are fed corn and soy-based diets high in linoleic acid
2. Conventional chickens are fed corn and soy-based diets high in linoleic acid
3. Farmed salmon are fed pellets containing vegetable oils high in linoleic acid
4. Egg yolk fatty acid composition directly reflects hen diet fatty acid composition
5. The fatty acid profile of pork, chicken, and farmed fish reflects their feed
6. Ruminants (cattle, sheep, goats, bison) have a rumen that biohydrogenates dietary PUFAs
7. Biohydrogenation converts unsaturated fats to saturated fats before absorption
8. Grass-fed beef fat is predominantly saturated and monounsaturated regardless of some grass PUFA content

Be honest and reason from first principles. If animals store dietary fat in their tissues, and those animals eat seed oils and corn, what fat are you eating when you eat those animals? Why would ruminants be different?`,
    tags: [],
    section: 'Nutrition',
    groupHost: 'fat-101',
    groupOrder: 2,
    scrollOffset: 0.66,
  },
  // ═══════════════════════════════════════════════════════════════════════════════
  // SEED OILS DECODED SERIES (3 pages)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'seed-oils-decoded',
    brickTitle: 'SEED OILS',
    longTitle: 'Seed Oils Decoded: What "Vegetable Oil" Actually Is',
    shareSnippet: 'Vegetable oil contains no vegetables. It\'s soybean and corn extracted with hexane, a petroleum solvent. No traditional culture consumed these because the technology didn\'t exist.',
    imageName: 'seed_oils',
    verifyPrompt: `Verify these claims about seed oils:
1. "Vegetable oil" is typically soybean oil, corn oil, or a blend - not from vegetables
2. "Canola" is a marketing rebrand of rapeseed oil (Canadian Oil Low Acid)
3. Commercial seed oil extraction uses hexane, a petroleum-derived solvent
4. Hexane is used because mechanical pressing only extracts ~70% of oil
5. The FDA allows residual hexane in food oils without labeling requirements
6. Seed oil production requires degumming, bleaching, and deodorizing steps
7. Soybean oil is 54% linoleic acid, corn oil is 59%, sunflower is 69%
8. No whole food in nature contains 50%+ linoleic acid concentration
9. Traditional fats (olive oil, butter, tallow) can be extracted by pressing alone
10. 94% of US soybeans and 92% of US corn are GMO/Roundup Ready varieties
11. Glyphosate residues have been detected in refined vegetable oils
12. Commercial seed oil production began in the early 1900s

Be honest and reason from first principles. If these oils require petroleum solvents to extract and contain fatty acid concentrations that don't exist in nature, are they traditional human foods? Could any pre-industrial culture have consumed them?`,
    tags: [],
    icon: 'Factory',
    section: 'Nutrition',
  },
  {
    id: 'linoleic-acid-problem',
    brickTitle: 'LINOLEIC ACID',
    longTitle: 'The Linoleic Acid Problem: 40x Oxidation and Cellular Damage',
    shareSnippet: 'Linoleic acid oxidizes 40x faster than monounsaturated fat. It now makes up 20-30% of American body fat. It\'s in your cell membranes and mitochondria, oxidizing under UV light.',
    verifyPrompt: `Verify these claims about linoleic acid:
1. Linoleic acid is an 18-carbon omega-6 PUFA with 2 double bonds
2. Each additional double bond exponentially increases oxidation susceptibility
3. Linoleic acid oxidizes approximately 40x faster than oleic acid (1 double bond)
4. EPA (5 double bonds) oxidizes approximately 320x faster than oleic acid
5. American linoleic acid consumption increased from ~2% to ~8-10% of calories since 1909
6. Human adipose tissue linoleic acid content has increased from ~8% to ~20-30% since the 1960s
7. Dietary fatty acids integrate into cell membrane phospholipids
8. Mitochondrial cardiolipin incorporates dietary linoleic acid
9. UV light triggers PUFA oxidation in skin cell membranes
10. PUFA oxidation produces toxic aldehydes including 4-HNE and malondialdehyde
11. Chronic low-grade inflammation is associated with increased cancer risk
12. Oxidized cardiolipin impairs mitochondrial electron transport function

Be honest and reason from first principles. If linoleic acid oxidizes 40x faster than saturated fat, and it now comprises 20-30% of body fat (triple historical levels), and it integrates into cell and mitochondrial membranes - what happens when those membranes are exposed to UV light or metabolic stress?`,
    tags: [],
    section: 'Nutrition',
    groupHost: 'seed-oils-decoded',
    groupOrder: 1,
    scrollOffset: 0.33,
  },
  {
    id: 'omega-confusion',
    brickTitle: 'REAL OMEGA-3',
    longTitle: 'The Omega Confusion: Flaxseed Oil Is Not Fish Oil',
    shareSnippet: 'ALA from flaxseed converts to EPA and DHA at only 5-10% efficiency. "Plant-based omega-3" is a scam. You need actual fish oil or fatty fish.',
    verifyPrompt: `Verify these claims about omega-3 fatty acids:
1. ALA (alpha-linolenic acid) is the omega-3 found in flaxseed, chia, walnuts
2. EPA and DHA are the omega-3s found in fatty fish and fish oil
3. The body must convert ALA → EPA → DHA through elongation and desaturation
4. ALA to EPA conversion efficiency is approximately 5-10% in humans
5. ALA to DHA conversion efficiency is approximately 2-5% in humans
6. Women convert ALA slightly better than men due to estrogen effects
7. EPA and DHA are the biologically active forms used by the brain and for anti-inflammatory effects
8. Consuming 1g of fish oil EPA/DHA is not equivalent to consuming 1g of flaxseed oil ALA

Be honest and reason from first principles. If conversion efficiency is 5%, would consuming 1 tablespoon of flaxseed oil provide equivalent omega-3 benefit to fish oil? What would you actually be getting?`,
    tags: [],
    section: 'Nutrition',
    groupHost: 'seed-oils-decoded',
    groupOrder: 2,
    scrollOffset: 0.66,
  },
];

// Helper to get topic by ID
export function getTopicById(id: string): Topic | undefined {
  return topics.find(t => t.id === id);
}

// Check if a topic is a group host (other topics reference it via groupHost)
export function isGroupHost(topicId: string): boolean {
  return topics.some(t => t.groupHost === topicId);
}

// Get all topics that belong to a group (including the host), in order
export function getGroupedTopics(hostId: string): Topic[] {
  const host = topics.find(t => t.id === hostId);
  if (!host) return [];

  const members = topics
    .filter(t => t.groupHost === hostId)
    .sort((a, b) => (a.groupOrder ?? 0) - (b.groupOrder ?? 0));

  return [host, ...members];
}

// Get the proper URL for a topic (with anchor if it's grouped)
export function getTopicUrl(topic: Topic): string {
  if (topic.groupHost) {
    return `/${topic.groupHost}#${topic.id}`;
  }
  return `/${topic.id}`;
}

// Get the host topic for a grouped topic (or itself if standalone/host)
export function getHostTopic(topic: Topic): Topic {
  if (topic.groupHost) {
    return topics.find(t => t.id === topic.groupHost) ?? topic;
  }
  return topic;
}

// Helper to get next topic (for "Next" button)
// Always goes to the next main topic (skips grouped sub-topics)
export function getNextTopic(currentId: string): Topic {
  const current = getTopicById(currentId);
  if (!current) {
    return topics[0];
  }

  // If current is a grouped topic, use its host as the starting point
  const startId = current.groupHost ?? current.id;
  const startIndex = topics.findIndex(t => t.id === startId);

  // Find the next topic that is NOT a grouped sub-topic
  for (let i = 1; i < topics.length; i++) {
    const nextIndex = (startIndex + i) % topics.length;
    const nextTopic = topics[nextIndex];
    // Skip grouped topics - only return standalone topics or group hosts
    if (!nextTopic.groupHost) {
      return nextTopic;
    }
  }

  return topics[0];
}