'use client';

import { inflationData } from '@/data/inflation-data';

interface InflationChartProps {
  startYear: number;
  endYear: number;
}

export default function InflationChart({ startYear, endYear }: InflationChartProps) {
  // Filter data for the selected range
  const years = Object.keys(inflationData)
    .map(Number)
    .filter((y) => y >= startYear && y <= endYear)
    .sort((a, b) => a - b);

  if (years.length < 2) return null;

  // Normalize all values to start at 100 (index style)
  const baseData = inflationData[years[0]];
  const normalizedData = years.map((year) => {
    const data = inflationData[year];
    return {
      year,
      cpi: (data.cpi / baseData.cpi) * 100,
      m2: (data.m2 / baseData.m2) * 100,
      gold: (data.gold / baseData.gold) * 100,
    };
  });

  // Find max value for scaling
  const allValues = normalizedData.flatMap((d) => [d.cpi, d.m2, d.gold]);
  const maxValue = Math.max(...allValues);
  const minValue = 100; // Always start from 100

  // Chart dimensions
  const width = 800;
  const height = 300;
  const padding = { top: 20, right: 80, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Scale functions
  const xScale = (index: number) => padding.left + (index / (years.length - 1)) * chartWidth;
  const yScale = (value: number) =>
    padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

  // Generate path data
  const generatePath = (key: 'cpi' | 'm2' | 'gold') => {
    return normalizedData
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d[key])}`)
      .join(' ');
  };

  // Y-axis ticks
  const yTicks = [100, Math.round((maxValue + 100) / 2), Math.round(maxValue)];

  // X-axis ticks (show ~5 year labels)
  const xTickInterval = Math.max(1, Math.floor(years.length / 5));
  const xTicks = years.filter((_, i) => i % xTickInterval === 0 || i === years.length - 1);

  // Get final values for legend
  const finalData = normalizedData[normalizedData.length - 1];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto 40px',
        padding: '24px',
        background: '#0a0a0a',
        border: '1px solid #222',
        borderRadius: '12px',
      }}
    >
      <h3
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '14px',
          fontWeight: '400',
          color: '#888',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Indexed to {startYear} = 100
      </h3>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: '100%',
          height: 'auto',
        }}
      >
        {/* Grid lines */}
        {yTicks.map((tick) => (
          <line
            key={tick}
            x1={padding.left}
            y1={yScale(tick)}
            x2={width - padding.right}
            y2={yScale(tick)}
            stroke="#222"
            strokeDasharray="4,4"
          />
        ))}

        {/* Y-axis labels */}
        {yTicks.map((tick) => (
          <text
            key={tick}
            x={padding.left - 10}
            y={yScale(tick)}
            fill="#666"
            fontSize="11"
            fontFamily="Space Mono, monospace"
            textAnchor="end"
            dominantBaseline="middle"
          >
            {tick}
          </text>
        ))}

        {/* X-axis labels */}
        {xTicks.map((year) => {
          const index = years.indexOf(year);
          return (
            <text
              key={year}
              x={xScale(index)}
              y={height - padding.bottom + 20}
              fill="#666"
              fontSize="11"
              fontFamily="Space Mono, monospace"
              textAnchor="middle"
            >
              {year}
            </text>
          );
        })}

        {/* CPI line */}
        <path d={generatePath('cpi')} fill="none" stroke="#888" strokeWidth="2" />

        {/* M2 line */}
        <path d={generatePath('m2')} fill="none" stroke="#ffcc00" strokeWidth="2" />

        {/* Gold line */}
        <path d={generatePath('gold')} fill="none" stroke="#d4af37" strokeWidth="2" />

        {/* Legend at end of lines */}
        <text
          x={width - padding.right + 8}
          y={yScale(finalData.cpi)}
          fill="#888"
          fontSize="11"
          fontFamily="Space Mono, monospace"
          dominantBaseline="middle"
        >
          CPI
        </text>
        <text
          x={width - padding.right + 8}
          y={yScale(finalData.m2)}
          fill="#ffcc00"
          fontSize="11"
          fontFamily="Space Mono, monospace"
          dominantBaseline="middle"
        >
          M2
        </text>
        <text
          x={width - padding.right + 8}
          y={yScale(finalData.gold)}
          fill="#d4af37"
          fontSize="11"
          fontFamily="Space Mono, monospace"
          dominantBaseline="middle"
        >
          Gold
        </text>
      </svg>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginTop: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '3px', background: '#888' }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '12px',
              color: '#888',
            }}
          >
            CPI (Consumer Price Index)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '3px', background: '#ffcc00' }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '12px',
              color: '#ffcc00',
            }}
          >
            M2 (Money Supply)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '3px', background: '#d4af37' }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '12px',
              color: '#d4af37',
            }}
          >
            Gold Price
          </span>
        </div>
      </div>
    </div>
  );
}
