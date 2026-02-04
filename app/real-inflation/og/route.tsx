import { ImageResponse } from 'next/og';
import { inflationData } from '@/data/inflation-data';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const startYear = parseInt(searchParams.get('start') || '2005', 10);
  const endYear = parseInt(searchParams.get('end') || '2026', 10);

  const years = Object.keys(inflationData)
    .map(Number)
    .filter((y) => y >= startYear && y <= endYear)
    .sort((a, b) => a - b);

  const baseData = inflationData[years[0]];
  const finalYear = years[years.length - 1];
  const finalData = inflationData[finalYear];

  const cpiMultiplier = (finalData.cpi / baseData.cpi).toFixed(1);
  const m2Multiplier = (finalData.m2 / baseData.m2).toFixed(1);
  const goldMultiplier = (finalData.gold / baseData.gold).toFixed(1);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px',
        }}
      >
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <span style={{ fontSize: '48px', fontWeight: 700, color: '#fff', letterSpacing: '2px' }}>
            THREE INFLATION CALCULATORS
          </span>
        </div>

        <div style={{ display: 'flex', marginBottom: '60px' }}>
          <span style={{ fontSize: '24px', color: '#666' }}>
            {`${startYear} → ${endYear} • isthisheresy.com`}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          {/* CPI */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 50px',
              background: '#1a1a1a',
              border: '2px solid #333',
              borderRadius: '16px',
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#888', letterSpacing: '3px', marginBottom: '8px' }}>
              CPI
            </span>
            <span style={{ fontSize: '14px', color: '#555', marginBottom: '24px' }}>
              Consumer Price Index
            </span>
            <span style={{ fontSize: '64px', fontWeight: 700, color: '#ccc' }}>
              {`${cpiMultiplier}×`}
            </span>
          </div>

          {/* M2 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 50px',
              background: '#1a1a0f',
              border: '2px solid #554400',
              borderRadius: '16px',
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#ffcc00', letterSpacing: '3px', marginBottom: '8px' }}>
              M2
            </span>
            <span style={{ fontSize: '14px', color: '#776600', marginBottom: '24px' }}>
              Money Supply
            </span>
            <span style={{ fontSize: '64px', fontWeight: 700, color: '#ffee88' }}>
              {`${m2Multiplier}×`}
            </span>
          </div>

          {/* Gold */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '40px 50px',
              background: '#1a1508',
              border: '2px solid #8b6914',
              borderRadius: '16px',
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#d4af37', letterSpacing: '3px', marginBottom: '8px' }}>
              GOLD
            </span>
            <span style={{ fontSize: '14px', color: '#8b6914', marginBottom: '24px' }}>
              Gold Price
            </span>
            <span style={{ fontSize: '64px', fontWeight: 700, color: '#f5d67a' }}>
              {`${goldMultiplier}×`}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <span style={{ fontSize: '16px', color: '#444' }}>
            Compare CPI, M2, and Gold-based inflation calculations
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
