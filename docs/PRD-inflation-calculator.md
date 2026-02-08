# PRD: Real Inflation Calculator

## Overview

Add an interactive inflation calculator to isthisheresy.com that shows users the gap between CPI (the official lie) and real inflation measured by M2 money supply and gold.

## Why This Exists

There are two inflations running simultaneously. Consumer price inflation (~3-4%/yr) is roughly captured by CPI, though with significant blind spots (substitution, hedonic adjustments, quality degradation). Asset price inflation (~6-7%/yr) is approximately captured by M2 growth. No official index measures it. The gap between them — driven by the Cantillon Effect — is the wealth divide.

This tool lets users see both inflations side by side and understand which metric answers their actual question.

## User Flow

1. User lands on `/real-inflation` (or `/inflation-calculator`)
2. Enters: Amount, Start Year, End Year (defaults to current year)
3. Clicks "Calculate"
4. Sees three results side-by-side:
   - **CPI-Adjusted** — consumer price benchmark ("Are my groceries more expensive?")
   - **M2-Adjusted** — asset/wealth benchmark ("Can I still afford a house?")
   - **Gold-Adjusted** — hard asset benchmark ("How much has the currency devalued?")
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
│   CPI ADJUSTED  │ │   M2 ADJUSTED   │ │  GOLD ADJUSTED  │
│  Consumer Price │ │ Asset / Wealth  │ │  Hard Asset     │
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

**Two inflations framework:** Consumer inflation (~3-4%) vs asset inflation (~6-7%). The Cantillon Effect explains why: new money enters through financial markets first.

**CPI's blind spots:** Substitution, hedonic adjustment, quality degradation. Roughly right for groceries, blind to assets.

**M2:** Overstates consumer inflation (use M2 − GDP for that). But the right benchmark for assets/wealth, because assets are priced against the total dollar pool.

**The Deflation Dividend:** The ~2.5% of money printing that "matches GDP growth" prevented the deflation that productivity gains should have delivered to dollar holders.

**Gold** has bought the same goods for centuries. One ounce bought a suit in 1900 and buys one today.

**Expert perspectives:** Dalio's framework (Price = Money+Credit/Quantity, GDP deflator, real vs financial economy). Burry's model (multi-variable, velocity insight, farmland hedge).

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
  title: 'Three Inflation Calculators | Is This Heresy?',
  description: 'Two inflations run simultaneously: consumer prices (~3-4%/yr) and asset prices (~6-7%/yr). Compare CPI, M2 money supply, and gold.',
  openGraph: {
    title: 'Three Inflation Calculators',
    description: 'Consumer inflation vs asset inflation. Compare CPI, M2 money supply, and gold.',
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
