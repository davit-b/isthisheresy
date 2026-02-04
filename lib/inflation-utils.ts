import { inflationData } from '@/data/inflation-data';

export interface InflationResult {
  cpiAdjusted: number;
  m2Adjusted: number;
  goldAdjusted: number;
  cpiMultiplier: number;
  m2Multiplier: number;
  goldMultiplier: number;
}

export function calculateInflation(
  amount: number,
  startYear: number,
  endYear: number
): InflationResult {
  const startData = inflationData[startYear];
  const endData = inflationData[endYear];

  if (!startData || !endData) {
    throw new Error(`Data not available for years ${startYear} or ${endYear}`);
  }

  const cpiMultiplier = endData.cpi / startData.cpi;
  const m2Multiplier = endData.m2 / startData.m2;
  const goldMultiplier = endData.gold / startData.gold;

  return {
    cpiAdjusted: amount * cpiMultiplier,
    m2Adjusted: amount * m2Multiplier,
    goldAdjusted: amount * goldMultiplier,
    cpiMultiplier,
    m2Multiplier,
    goldMultiplier,
  };
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMultiplier(value: number): string {
  return `${value.toFixed(1)}×`;
}

export function isSalaryRange(amount: number): boolean {
  return amount >= 30000 && amount <= 500000;
}

export interface WageComparison {
  cpiChange: number;
  m2Change: number;
  goldChange: number;
  cpiVerdict: 'raise' | 'cut';
  m2Verdict: 'raise' | 'cut';
  goldVerdict: 'raise' | 'cut';
}

export function calculateWageComparison(
  oldSalary: number,
  newSalary: number,
  startYear: number,
  endYear: number
): WageComparison {
  const result = calculateInflation(oldSalary, startYear, endYear);

  // Calculate the percentage change in purchasing power
  // If CPI says you need $119K but you make $80K, that's a (80-119)/119 = -33% cut
  const cpiChange = ((newSalary - result.cpiAdjusted) / result.cpiAdjusted) * 100;
  const m2Change = ((newSalary - result.m2Adjusted) / result.m2Adjusted) * 100;
  const goldChange = ((newSalary - result.goldAdjusted) / result.goldAdjusted) * 100;

  return {
    cpiChange,
    m2Change,
    goldChange,
    cpiVerdict: cpiChange >= 0 ? 'raise' : 'cut',
    m2Verdict: m2Change >= 0 ? 'raise' : 'cut',
    goldVerdict: goldChange >= 0 ? 'raise' : 'cut',
  };
}
