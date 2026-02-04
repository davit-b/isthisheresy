'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ExplanationSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        marginTop: '40px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: 'transparent',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '12px 20px',
          color: '#888',
          fontFamily: "'Space Mono', monospace",
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          justifyContent: 'center',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#555';
          e.currentTarget.style.color = '#aaa';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#333';
          e.currentTarget.style.color = '#888';
        }}
      >
        How do these measures differ?
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isExpanded && (
        <div
          style={{
            marginTop: '20px',
            padding: '24px',
            background: '#0a0a0a',
            border: '1px solid #222',
            borderRadius: '12px',
          }}
        >
          <div style={{ marginBottom: '28px' }}>
            <h3
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '16px',
                fontWeight: '700',
                color: '#888',
                marginBottom: '12px',
                letterSpacing: '1px',
              }}
            >
              Consumer Price Index (CPI)
            </h3>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                color: '#aaa',
                lineHeight: '1.8',
                margin: 0,
              }}
            >
              CPI measures the average change in prices paid by urban consumers for a basket of goods and services. The Bureau of Labor Statistics uses several adjustments:
            </p>
            <ul
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                color: '#aaa',
                lineHeight: '1.8',
                paddingLeft: '20px',
                marginTop: '12px',
                marginBottom: 0,
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#ccc' }}>Substitution</strong> — If beef prices rise and consumers switch to chicken, the index accounts for this behavior change.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#ccc' }}>Hedonic adjustment</strong> — Price changes are adjusted for quality improvements (e.g., a computer with more RAM at the same price is counted as cheaper).
              </li>
              <li>
                <strong style={{ color: '#ccc' }}>Geometric weighting</strong> — Items are weighted by consumer spending patterns, which change over time.
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <h3
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '16px',
                fontWeight: '700',
                color: '#ffcc00',
                marginBottom: '12px',
                letterSpacing: '1px',
              }}
            >
              M2 Money Supply
            </h3>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                color: '#aaa',
                lineHeight: '1.8',
                margin: 0,
              }}
            >
              M2 measures the total amount of money in circulation, including cash, checking deposits, savings deposits, and money market funds. When M2 increases faster than economic output, each dollar represents a smaller share of the economy. This metric is tracked by the Federal Reserve and published on FRED.
            </p>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <h3
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '16px',
                fontWeight: '700',
                color: '#d4af37',
                marginBottom: '12px',
                letterSpacing: '1px',
              }}
            >
              Gold Price
            </h3>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                color: '#aaa',
                lineHeight: '1.8',
                margin: 0,
              }}
            >
              Gold has been used as a store of value for thousands of years. Its purchasing power has remained relatively stable over long periods—an ounce of gold bought a quality suit in 1900 and still does today. Some economists use gold as a benchmark for measuring currency devaluation over time.
            </p>
          </div>

          {/* Expert Perspectives */}
          <div
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid #222',
            }}
          >
            <h3
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                fontWeight: '700',
                color: '#666',
                marginBottom: '20px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              What Investors Say
            </h3>

            {/* Ray Dalio */}
            <div
              style={{
                marginBottom: '24px',
                padding: '16px',
                background: '#111',
                borderRadius: '8px',
                borderLeft: '3px solid #3b82f6',
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '13px',
                  color: '#aaa',
                  lineHeight: '1.7',
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                &quot;CPI is a terribly incomplete and misleading measure of inflation... It doesn&apos;t reflect the inflation occurring in asset prices.&quot;
              </p>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '12px',
                  marginBottom: 0,
                }}
              >
                — <strong style={{ color: '#888' }}>Ray Dalio</strong>, Bridgewater Associates
              </p>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '11px',
                  color: '#555',
                  marginTop: '8px',
                  marginBottom: 0,
                }}
              >
                Dalio&apos;s &quot;How the Economic Machine Works&quot; framework links M2 growth outpacing productivity to inflation. He notes that money printing &quot;redistributes from savers to debtors.&quot;
              </p>
            </div>

            {/* Michael Burry */}
            <div
              style={{
                padding: '16px',
                background: '#111',
                borderRadius: '8px',
                borderLeft: '3px solid #ef4444',
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '13px',
                  color: '#aaa',
                  lineHeight: '1.7',
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                &quot;Inflation will be the story of 2021. Not transitory.&quot;
              </p>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '12px',
                  marginBottom: 0,
                }}
              >
                — <strong style={{ color: '#888' }}>Michael Burry</strong>, Scion Asset Management (Feb 2021)
              </p>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '11px',
                  color: '#555',
                  marginTop: '8px',
                  marginBottom: 0,
                }}
              >
                In Dec 2020, Burry posted M2 charts showing 40% YoY growth when CPI was 1.2%. He noted that using 1980 CPI methodology, reported 4.2% inflation would be ~10.5%. CPI peaked at 9.1% in 2022.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: '24px',
              padding: '16px',
              background: '#111',
              borderRadius: '8px',
            }}
          >
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '12px',
                color: '#666',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              <strong style={{ color: '#888' }}>Note:</strong> Each metric measures something different. CPI tracks consumer prices, M2 tracks money supply, and gold tracks commodity value. There is ongoing debate among economists about which best represents changes in purchasing power.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
