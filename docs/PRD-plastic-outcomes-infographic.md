# PRD: Plastic Outcomes Infographic

## Overview

Add the "8 Outcomes of Plastic in Your Body" infographic to isthisheresy.com. This is a comprehensive visual guide showing what leaches from different food-contact materials (glass, plastic, aluminum cans, paper cups) and the health outcomes.

## Source File

**Location:** `/Users/davitbala/workplace/RESEARCH-ONLY/infographics/plastic_outcomes/plastic_outcomes.jpg`
**Size:** ~19 MB JPEG
**Content:** 8 health outcomes legend + material comparison table (room temp vs heated)

## Pre-Implementation: Image Conversion

The conversion script expects PNG, but source is JPEG. Two options:

### Option A: Convert JPEG to PNG first (Recommended)
```bash
# Using ImageMagick or sips (macOS built-in)
sips -s format png /Users/davitbala/workplace/RESEARCH-ONLY/infographics/plastic_outcomes/plastic_outcomes.jpg --out /Users/davitbala/workplace/xcode/isthisheresy-next/dev/native-png/english/plastic_outcomes.png
```

### Option B: Modify convert-images.mjs
Update line 161 and line 250 to accept both PNG and JPEG:
```javascript
// Change from:
const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));
// To:
const imageFiles = files.filter(f => /\.(png|jpe?g)$/i.test(f));
```

**Recommendation:** Option A. Don't modify the script for a one-off. Just convert the JPEG to PNG.

## Implementation Steps

### 1. Convert and copy source image
```bash
sips -s format png /Users/davitbala/workplace/RESEARCH-ONLY/infographics/plastic_outcomes/plastic_outcomes.jpg --out /Users/davitbala/workplace/xcode/isthisheresy-next/dev/native-png/english/plastic_outcomes.png
```

### 2. Run conversion script
```bash
cd /Users/davitbala/workplace/xcode/isthisheresy-next
npm run convert-images
```

This generates:
- `plastic_outcomes-en-thumb.webp` (200px)
- `plastic_outcomes-en-medium.webp` (1200px)
- `plastic_outcomes-en-large.webp` (2400px)
- `plastic_outcomes-en-original.webp` (4800px)
- `plastic_outcomes-en-og.webp` (1200x630 cropped for social)
- Plus AVIF versions of each

### 3. Add topic entry to `data/topics.ts`

```typescript
{
  id: 'plastic-outcomes',
  brickTitle: 'PLASTIC',
  longTitle: '8 Outcomes of Plastic in Your Body',
  shareSnippet: 'What leaches from your containers—glass, plastic, aluminum cans, paper cups—and what it does to your hormones, brain, and gut.',
  imageName: 'plastic_outcomes',
  icon: 'Biohazard',
  section: 'Chemical Exposure',
  tags: [],
  verifyPrompt: `I'm sharing an infographic titled "8 Outcomes of Plastic in Your Body." Please verify these claims:

HEALTH OUTCOMES CLAIMED:
1. Microplastics lodge in organ tissue (heart, lungs, liver, placenta)
2. Nanoplastics cross blood-brain barrier and lodge in brain
3. BPA, BPS, phthalates, nonylphenol activate estrogen receptors (xeno-estrogens)
4. Phthalates block testosterone production; BPA converts testosterone to estrogen via aromatase
5. BPA, phthalates, antimony kill gut bacteria (antibiotic effect, dysbiosis)
6. BPA, BPS, phthalates, PFAS suppress thyroid function
7. BPA, phthalates, tributyltin force fat storage (obesogens reprogram cells)
8. PFAS bioaccumulate permanently ("forever chemicals")

MATERIAL SAFETY CLAIMS:
- Glass, ceramic, stainless steel, cast iron: ZERO leaching cold or hot
- Silicone: Negligible cold, sheds micro/nano plastics when heated (steam sterilization)
- HDPE #2, PP #5: Low shedding cold; heat causes particle release + estrogenic byproducts
- PET #1: Leaches antimony + phthalates even cold; all 7 outcomes when heated (car in sun)
- Aluminum cans: BPA epoxy lining leaches entire shelf life; canned food cooked inside the BPA coating
- "Paper" cups: Polyethylene plastic lining (not paper contact); ~25,000 microplastics per hot coffee
- PVC #3: Phthalates leach continuously; fat accelerates (cling wrap on cheese/meat)
- Polycarbonate #7: Made FROM BPA (BPA is structural monomer); leaches BPA at room temp always

Please verify these specific claims using peer-reviewed research. Note any claims that are overstated, understated, or lack evidence. Be honest and reason from first principles—I want accuracy, not reassurance.`,
},
```

## URL

The infographic will be accessible at: `https://isthisheresy.com/plastic-outcomes`

## Section Placement

Add to "Chemical Exposure" section alongside existing topics like BPA, atrazine, tap water.

If "Chemical Exposure" doesn't exist in `lib/sections.ts`, add it to `SECTION_ORDER`.

## Acceptance Criteria

- [ ] PNG converted from source JPEG
- [ ] `npm run convert-images` completes without errors
- [ ] All size variants generated (thumb, medium, large, original, og)
- [ ] Topic entry added to `data/topics.ts`
- [ ] Page loads at `/plastic-outcomes`
- [ ] Image is zoomable/pannable in InfographicViewer
- [ ] Verify buttons work (prompt is populated)
- [ ] OG image shows correctly when sharing URL
- [ ] No console errors

## Related Content

This infographic complements existing topics:
- `/bpa` - BPA deep dive
- `/hidden-plastic-in-packaging` - Paper cups, aluminum cans
- `/plastic-fabrics` - Synthetic clothing

Consider adding navigation between these related topics.

## Reference Documents

- Research context: `/Users/davitbala/workplace/RESEARCH-ONLY/infographics/context-about-material-outcomes-infographics.md`
- Layout design: `/Users/davitbala/workplace/RESEARCH-ONLY/infographics/infographic-layout-materials-outcomes.md`
