# PRD: Real Inflation Calculator

## Overview

Add an interactive inflation calculator to isthisheresy.com that shows users the gap between CPI (the official lie) and real inflation measured by M2 money supply and gold.

## Why This Exists

CPI systematically understates inflation through substitution bias, hedonic adjustments, and ignoring quality degradation. When someone asks "what's $50K from 1990 worth today?", CPI says ~$119K. M2 says ~$330K. Gold says ~$425K.

This tool exposes that gap and educates users on why their wages haven't kept up.

## User Flow

1. User lands on `/real-inflation` (or `/inflation-calculator`)
2. Enters: Amount, Start Year, End Year (defaults to current year)
3. Clicks "Calculate"
4. Sees three results side-by-side:
   - **CPI-Adjusted** (labeled "Official Story")
   - **M2-Adjusted** (labeled "Money Supply Truth")
   - **Gold-Adjusted** (labeled "Hard Asset Truth")
5. Below results: brief explanation of why these differ
6. Optional: "Share" button generates a shareable card/image

## UI Requirements

### Input Section
- Amount field (number input, placeholder: "$50,000")
- Start Year dropdown (1900-2026)
- End Year dropdown (1900-2026, default: current year)
- "Calculate" button

### Output Section

Three cards side-by-side (stack on mobile):

```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  OFFICIAL STORY │ │  MONEY SUPPLY   │ │  HARD ASSET     │
│      (CPI)      │ │      (M2)       │ │     (GOLD)      │
│                 │ │                 │ │                 │
│    $119,000     │ │    $330,000     │ │    $425,000     │
│                 │ │                 │ │                 │
│   2.4× needed   │ │   6.6× needed   │ │   8.5× needed   │
└─────────────────┴─┴─────────────────┴─┴─────────────────┘
```

Color coding:
- CPI card: neutral/gray (the "official" one)
- M2 card: yellow/warning (showing the gap)
- Gold card: gold/amber (the hard truth)

### Explanation Section

Below the cards, collapsible "Why are these different?" section with brief explanations:

**CPI's Three Lies:**
1. Substitution - counts settling for less as "no inflation"
2. Hedonic adjustment - credits you for unwanted "improvements"
3. Quality degradation - ignores that products got worse

**M2 measures** how many dollars exist. More dollars = each worth less.

**Gold** has bought the same goods for centuries. One ounce bought a suit in 1900 and buys one today.

### Wage Context (Optional Enhancement)

If user enters a salary-like amount ($30K-$500K range), show additional context:

```
If you made $50,000 in 1990 and make $80,000 today:
- CPI says: You got a 60% raise ✓
- M2 says: You took a 76% pay cut ✗
- Gold says: You took an 81% pay cut ✗
```

## Data Requirements

### Historical Data (JSON file in `/data/`)

```typescript
// data/inflation-data.ts
export const inflationData: Record<number, {
  m2: number;        // M2 in trillions
  gold: number;      // Gold $/oz annual average
  cpi: number;       // CPI index (base year = 100)
}> = {
  1900: { m2: 0.007, gold: 20.67, cpi: 8.4 },
  1910: { m2: 0.009, gold: 20.67, cpi: 9.2 },
  // ... every year through 2026
  2024: { m2: 21.24, gold: 2370, cpi: 314.5 },
  2025: { m2: 21.8, gold: 2500, cpi: 320 },  // estimates
  2026: { m2: 22.3, gold: 2650, cpi: 326 },  // estimates
};
```

### Data Sources
- **M2:** FRED (Federal Reserve Economic Data) - fred.stlouisfed.org/series/M2SL
- **Gold:** Kitco historical data, World Gold Council
- **CPI:** BLS (Bureau of Labor Statistics) - use CPI-U All Items

### Calculation Functions

```typescript
function calculateCPIAdjusted(amount: number, startYear: number, endYear: number): number {
  return amount * (inflationData[endYear].cpi / inflationData[startYear].cpi);
}

function calculateM2Adjusted(amount: number, startYear: number, endYear: number): number {
  return amount * (inflationData[endYear].m2 / inflationData[startYear].m2);
}

function calculateGoldAdjusted(amount: number, startYear: number, endYear: number): number {
  return amount * (inflationData[endYear].gold / inflationData[startYear].gold);
}
```

## Technical Implementation

### File Structure

```
isthisheresy-next/
├── app/
│   └── real-inflation/
│       └── page.tsx          # Calculator page
├── components/
│   ├── InflationCalculator.tsx   # Main calculator component
│   ├── ResultCard.tsx            # Individual result card
│   └── ExplanationSection.tsx    # Collapsible explainer
├── data/
│   ├── topics.ts             # Existing
│   └── inflation-data.ts     # New: historical M2/Gold/CPI
└── lib/
    └── inflation-utils.ts    # Calculation functions
```

### Component: InflationCalculator.tsx

- Client component ('use client')
- Local state for inputs and results
- No API calls - all calculations client-side
- Responsive: cards stack vertically on mobile

### Styling

Follow existing site patterns:
- Inline styles (no Tailwind/CSS modules)
- Minimalist, content-focused
- Dark mode compatible if site supports it

## SEO / Meta

```typescript
export const metadata = {
  title: 'Real Inflation Calculator | Is This Heresy?',
  description: 'See what your money is really worth. Compare CPI (the official story) with M2 money supply and gold-based inflation.',
  openGraph: {
    title: 'Real Inflation Calculator',
    description: 'CPI lies about inflation. See the truth.',
  }
};
```

## Future Enhancements (Out of Scope for V1)

1. **Shareable cards** - Generate image showing user's result
2. **Embed widget** - Let other sites embed the calculator
3. **Salary tracker** - Input salary history, show real purchasing power over time
4. **Asset comparison** - "What if you'd bought gold/stocks/bitcoin instead?"

## Acceptance Criteria

- [ ] Calculator loads at `/real-inflation`
- [ ] User can input amount and year range
- [ ] All three calculations display correctly
- [ ] Results are formatted with commas and $ signs
- [ ] Mobile responsive (cards stack)
- [ ] Explanation section is present and readable
- [ ] Data covers at least 1970-2026 (ideally 1900-2026)
- [ ] No console errors
- [ ] Page is static (no server-side requirements)

## Reference Document

Full background research and thesis in:
`/Users/davitbala/workplace/RESEARCH-ONLY/victor-ai-related/m2-vs-cpi-university-inflation.md`

This contains:
- Verified M2 data points
- Gold/suit equivalence data
- CPI critique (the three lies)
- The American debt machine thesis
- Why M2/GDP is also problematic
