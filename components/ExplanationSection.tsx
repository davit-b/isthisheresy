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
          {/* Two Inflations Framework */}
          <div style={{ marginBottom: '32px' }}>
            <h3
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '16px',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '12px',
                letterSpacing: '1px',
              }}
            >
              Two Inflations Run Simultaneously
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
              The mainstream says CPI is the inflation rate. Contrarians say M2 is. Both are wrong in isolation. There are two inflations:
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
                <strong style={{ color: '#ccc' }}>Consumer price inflation</strong> (~3-4%/yr) — how much more your groceries cost. CPI approximately captures this, with significant caveats.
              </li>
              <li>
                <strong style={{ color: '#ffcc00' }}>Asset price inflation</strong> (~6-7%/yr) — how much more it costs to buy a house, land, or equity. No official index measures this. M2 growth is the closest proxy.
              </li>
            </ul>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px',
                color: '#888',
                lineHeight: '1.7',
                marginTop: '16px',
                marginBottom: 0,
              }}
            >
              From 2009-2020, the Fed created trillions through QE. CPI stayed at ~2%. The S&amp;P 500 went up 400%. Housing doubled. Both numbers were real. CPI only measured one.
            </p>
          </div>

          {/* Which Question Table */}
          <div
            style={{
              marginBottom: '32px',
              padding: '16px',
              background: '#111',
              borderRadius: '8px',
              border: '1px solid #222',
            }}
          >
            <h4
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px',
                fontWeight: '700',
                color: '#888',
                marginBottom: '16px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Which Metric Answers Your Question?
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { question: '"Are my groceries more expensive?"', answer: 'CPI (~3-4%/yr)', color: '#888' },
                { question: '"Is my salary keeping up?"', answer: 'M2 − GDP (~3.7%/yr)', color: '#aaa' },
                { question: '"Can I still afford a house?"', answer: 'M2 (~6-7%/yr)', color: '#ffcc00' },
                { question: '"Am I building wealth?"', answer: 'M2 (~6-7%/yr)', color: '#ffcc00' },
                { question: '"How much has the currency devalued?"', answer: 'Gold', color: '#d4af37' },
              ].map((row) => (
                <div
                  key={row.question}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '12px',
                    padding: '4px 0',
                  }}
                >
                  <span style={{ color: '#aaa' }}>{row.question}</span>
                  <span style={{ color: row.color, fontWeight: '700', whiteSpace: 'nowrap', marginLeft: '16px' }}>{row.answer}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why the Money Splits - Cantillon Effect */}
          <div style={{ marginBottom: '32px' }}>
            <h3
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '16px',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '12px',
                letterSpacing: '1px',
              }}
            >
              Why Two Inflation Rates? (The Cantillon Effect)
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
              New money doesn&apos;t enter the economy evenly. It flows through: Federal Reserve → banks → financial markets → asset prices. Eventually, maybe, it reaches wages and consumer spending. Whoever gets the new money first benefits at the expense of whoever gets it last. The result: assets inflate at ~6-7%/yr while consumer prices rise ~3-4%/yr. The gap compounds into the wealth divide.
            </p>
          </div>

          {/* CPI Section */}
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
              CPI: Roughly Right for Groceries, Blind to Assets
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
              CPI approximately measures consumer price inflation, but has significant blind spots:
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
                <strong style={{ color: '#ccc' }}>Substitution</strong> — You wanted beef, bought chicken because beef costs too much. CPI says &quot;no inflation.&quot; It measures your ability to settle for less.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#ccc' }}>Hedonic adjustment</strong> — Your TV has more pixels. CPI says it &quot;costs less&quot; even though you paid the same dollars. You didn&apos;t ask for more pixels.
              </li>
              <li>
                <strong style={{ color: '#ccc' }}>Quality degradation</strong> — The 1960 pork chop is not the 2024 pork chop. Standard pork in 1960 (pasture-raised, natural diet) now requires buying &quot;heritage pasture-raised&quot; at 3-4× the price. CPI tracks the price of the label, not the thing.
              </li>
            </ul>
          </div>

          {/* M2 Section */}
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
              M2: The Asset/Wealth Benchmark
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
              M2 measures all dollars that could reasonably be spent — cash, checking, savings, and money market funds. It grew from ~$300B in 1960 to ~$21.5T in 2024 (72×).
            </p>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                color: '#aaa',
                lineHeight: '1.8',
                marginTop: '12px',
                marginBottom: 0,
              }}
            >
              <strong style={{ color: '#ccc' }}>The nuance:</strong> Raw M2 growth (~6.2%/yr) overstates <em>consumer</em> inflation. The Quantity Theory (MV=PY) says consumer inflation ≈ M2 growth − real GDP growth ≈ 3.7%/yr. Your econ professor is right — for grocery prices. But for asset prices, M2 is the right benchmark because assets compete for the total pool of dollars, not the GDP-adjusted pool.
            </p>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px',
                color: '#888',
                lineHeight: '1.7',
                marginTop: '12px',
                marginBottom: 0,
              }}
            >
              The ~2.5% &quot;neutral&quot; money printing that matches GDP growth prevented the deflation that productivity gains should have delivered to dollar holders. Every invention, every efficiency improvement should have made your dollars more valuable. The Fed printed that value away. This is the deflation dividend — invisible inflation that no official metric captures.
            </p>
          </div>

          {/* Gold Section */}
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
              Gold: The 125-Year Constant
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
              Gold is no one&apos;s liability. It can&apos;t be printed. An ounce of gold bought a quality suit in 1900 ($20.67) and buys one today ($2,650). The average across 125 years: ~0.96 oz per suit. Meanwhile, the dollar price went from $22 to $750 — a 34× increase CPI captures as ~3,200% inflation. Gold&apos;s number: ~12,700%. The gap is the inflation CPI hides.
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
                &quot;CPI is a terribly incomplete and misleading measure of inflation... It doesn&apos;t reflect the inflation occurring in asset prices or the things that rich people care about.&quot;
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
                  lineHeight: '1.6',
                  marginBottom: 0,
                }}
              >
                Dalio&apos;s actual formula: Price = (Money + Credit Spent) / Quantity Sold. He includes total credit (~$50T), not just M2. Bridgewater prefers the GDP deflator over both CPI and M2. But his core insight supports two inflations: when the Fed prints and money stays in financial assets, it bids up asset prices while CPI misses it entirely — &quot;that benefits holders of financial assets relative to non-holders.&quot; His MP3 proposal (money directed to spenders, not investors) was tested during COVID, and it DID cause consumer inflation.
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
                &quot;Inflation is a massively regressive tax. Never forget it.&quot;
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
                — <strong style={{ color: '#888' }}>Michael Burry</strong>, Scion Capital
              </p>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '11px',
                  color: '#555',
                  marginTop: '8px',
                  lineHeight: '1.6',
                  marginBottom: 0,
                }}
              >
                Burry doesn&apos;t use raw M2 either. His model: Inflation = f(M2, velocity, fiscal stimulus, supply constraints, labor costs). His key insight: velocity can override M2. In 2022, M2 was falling but inflation persisted because velocity rose — &quot;rising velocity trumped falling money supply.&quot; On CPI: using 1980s methodology, reported 4.2% inflation would be ~10.5%. His actual hedge isn&apos;t gold or Bitcoin — it&apos;s farmland with water on site. Productive real assets independent of monetary policy.
              </p>
            </div>
          </div>

          {/* Bottom note */}
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
              <strong style={{ color: '#888' }}>The framework:</strong> Neither Dalio nor Burry uses raw M2 as the inflation number. Neither trusts CPI. Both position their portfolios for a world where the true cost of monetary debasement — to wealth holders — is closer to M2 growth than to CPI. The right metric depends on the question you&apos;re asking.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
