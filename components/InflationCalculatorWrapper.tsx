'use client';

import { useState, useEffect } from 'react';
import { getAvailableYears, MAX_YEAR, MIN_YEAR } from '@/data/inflation-data';
import { calculateInflation, InflationResult, isSalaryRange, calculateWageComparison, formatCurrency } from '@/lib/inflation-utils';
import ResultCard from './ResultCard';
import ExplanationSection from './ExplanationSection';
import InflationChart from './InflationChart';
import { Share2 } from 'lucide-react';

interface InflationCalculatorWrapperProps {
  initialAmount: string;
  initialStartYear: number;
  initialEndYear: number;
}

export default function InflationCalculatorWrapper({
  initialAmount,
  initialStartYear,
  initialEndYear,
}: InflationCalculatorWrapperProps) {
  // Validate initial values
  const validStartYear = initialStartYear >= MIN_YEAR && initialStartYear <= MAX_YEAR ? initialStartYear : 2005;
  const validEndYear = initialEndYear >= MIN_YEAR && initialEndYear <= MAX_YEAR && initialEndYear > validStartYear ? initialEndYear : 2026;

  const [amount, setAmount] = useState<string>(initialAmount);
  const [startYear, setStartYear] = useState<number>(validStartYear);
  const [endYear, setEndYear] = useState<number>(validEndYear);
  const [result, setResult] = useState<InflationResult | null>(null);
  const [currentSalary, setCurrentSalary] = useState<string>('');
  const [showWageComparison, setShowWageComparison] = useState(false);
  const [shareMessage, setShareMessage] = useState<string>('');

  const years = getAvailableYears();

  // Calculate on mount with initial values
  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCalculate = () => {
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    if (isNaN(numAmount) || numAmount <= 0) {
      return;
    }

    if (startYear >= endYear) {
      return;
    }

    const inflationResult = calculateInflation(numAmount, startYear, endYear);
    setResult(inflationResult);
    setShowWageComparison(isSalaryRange(numAmount));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9,]/g, '');
    setAmount(value);
    setResult(null);
  };

  const handleShare = async () => {
    const cleanAmount = amount.replace(/,/g, '');
    const url = `${window.location.origin}/real-inflation?amount=${cleanAmount}&start=${startYear}&end=${endYear}`;

    try {
      await navigator.clipboard.writeText(url);
      setShareMessage('Link copied!');
      setTimeout(() => setShareMessage(''), 2000);
    } catch {
      setShareMessage('Failed to copy');
      setTimeout(() => setShareMessage(''), 2000);
    }
  };

  const numericAmount = parseFloat(amount.replace(/,/g, '')) || 0;
  const wageComparison = showWageComparison && currentSalary && result
    ? calculateWageComparison(
        numericAmount,
        parseFloat(currentSalary.replace(/,/g, '')) || 0,
        startYear,
        endYear
      )
    : null;

  const inputStyle: React.CSSProperties = {
    background: '#111',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#fff',
    fontFamily: "'Space Mono', monospace",
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '36px',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Space Mono', monospace",
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px',
    display: 'block',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  };

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '40px 20px',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '32px',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '12px',
            letterSpacing: '2px',
          }}
        >
          THREE INFLATION CALCULATORS
        </h1>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '14px',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}
        >
          Compare how different metrics measure changes in purchasing power: CPI (consumer prices), M2 (money supply), and gold.
        </p>
      </div>

      {/* Chart - always visible */}
      <InflationChart startYear={startYear} endYear={endYear} />

      {/* Input Section */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div style={{ flex: '1 1 180px', maxWidth: '220px' }}>
          <label style={labelStyle}>Amount</label>
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666',
                fontFamily: "'Space Mono', monospace",
              }}
            >
              $
            </span>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="65,000"
              style={{
                ...inputStyle,
                paddingLeft: '32px',
              }}
            />
          </div>
        </div>

        <div style={{ flex: '1 1 140px', maxWidth: '160px' }}>
          <label style={labelStyle}>Start Year</label>
          <select
            value={startYear}
            onChange={(e) => {
              setStartYear(Number(e.target.value));
              setResult(null);
            }}
            style={selectStyle}
          >
            {years.filter(y => y < endYear).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: '1 1 140px', maxWidth: '160px' }}>
          <label style={labelStyle}>End Year</label>
          <select
            value={endYear}
            onChange={(e) => {
              setEndYear(Number(e.target.value));
              setResult(null);
            }}
            style={selectStyle}
          >
            {years.filter(y => y > startYear).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          <button
            onClick={handleCalculate}
            disabled={!amount || startYear >= endYear}
            style={{
              background: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 32px',
              color: '#000',
              fontFamily: "'Space Mono', monospace",
              fontSize: '14px',
              fontWeight: '700',
              cursor: amount && startYear < endYear ? 'pointer' : 'not-allowed',
              opacity: amount && startYear < endYear ? 1 : 0.5,
              letterSpacing: '1px',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (amount && startYear < endYear) {
                e.currentTarget.style.background = '#eee';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
            }}
          >
            CALCULATE
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div style={{ marginTop: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                color: '#666',
                margin: 0,
              }}
            >
              {formatCurrency(numericAmount)} from {startYear} adjusted to {endYear}:
            </p>
            <button
              onClick={handleShare}
              style={{
                background: 'transparent',
                border: '1px solid #333',
                borderRadius: '6px',
                padding: '6px 12px',
                color: '#666',
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#555';
                e.currentTarget.style.color = '#999';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.color = '#666';
              }}
            >
              <Share2 size={14} />
              {shareMessage || 'Share'}
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <ResultCard
              title="CPI Adjusted"
              subtitle="Consumer Price Index"
              value={result.cpiAdjusted}
              multiplier={result.cpiMultiplier}
              colorScheme="neutral"
            />
            <ResultCard
              title="M2 Adjusted"
              subtitle="Money Supply"
              value={result.m2Adjusted}
              multiplier={result.m2Multiplier}
              colorScheme="warning"
            />
            <ResultCard
              title="Gold Adjusted"
              subtitle="Gold Price"
              value={result.goldAdjusted}
              multiplier={result.goldMultiplier}
              colorScheme="gold"
            />
          </div>

          {/* Wage Comparison Section */}
          {showWageComparison && (
            <div
              style={{
                marginTop: '40px',
                padding: '24px',
                background: '#0a0a0a',
                border: '1px solid #222',
                borderRadius: '12px',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '14px',
                  color: '#888',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}
              >
                Compare to current income (optional)
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#666',
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    $
                  </span>
                  <input
                    type="text"
                    value={currentSalary}
                    onChange={(e) => setCurrentSalary(e.target.value.replace(/[^0-9,]/g, ''))}
                    placeholder="Current salary"
                    style={{
                      ...inputStyle,
                      width: '180px',
                      paddingLeft: '28px',
                    }}
                  />
                </div>
              </div>

              {wageComparison && (
                <div style={{ marginTop: '24px' }}>
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '13px',
                      color: '#666',
                      textAlign: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    {formatCurrency(numericAmount)} in {startYear} vs{' '}
                    {formatCurrency(parseFloat(currentSalary.replace(/,/g, '')) || 0)} in {endYear}:
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '14px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#888' }}>By CPI:</span>
                      <span style={{ color: wageComparison.cpiVerdict === 'raise' ? '#22c55e' : '#ef4444' }}>
                        {wageComparison.cpiChange >= 0 ? '+' : ''}{wageComparison.cpiChange.toFixed(0)}% purchasing power
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#ffcc00' }}>By M2:</span>
                      <span style={{ color: wageComparison.m2Verdict === 'raise' ? '#22c55e' : '#ef4444' }}>
                        {wageComparison.m2Change >= 0 ? '+' : ''}{wageComparison.m2Change.toFixed(0)}% purchasing power
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#d4af37' }}>By Gold:</span>
                      <span style={{ color: wageComparison.goldVerdict === 'raise' ? '#22c55e' : '#ef4444' }}>
                        {wageComparison.goldChange >= 0 ? '+' : ''}{wageComparison.goldChange.toFixed(0)}% purchasing power
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Explanation Section */}
          <ExplanationSection />
        </div>
      )}
    </div>
  );
}
