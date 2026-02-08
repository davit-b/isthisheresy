'use client';

import { formatCurrency, formatMultiplier } from '@/lib/inflation-utils';

interface ResultCardProps {
  title: string;
  subtitle: string;
  description?: string;
  value: number;
  multiplier: number;
  colorScheme: 'neutral' | 'warning' | 'gold';
}

export default function ResultCard({
  title,
  subtitle,
  description,
  value,
  multiplier,
  colorScheme,
}: ResultCardProps) {
  const colors = {
    neutral: {
      background: '#1a1a1a',
      border: '#333',
      accent: '#888',
      text: '#ccc',
    },
    warning: {
      background: '#1a1a0f',
      border: '#554400',
      accent: '#ffcc00',
      text: '#ffee88',
    },
    gold: {
      background: '#1a1508',
      border: '#8b6914',
      accent: '#d4af37',
      text: '#f5d67a',
    },
  };

  const scheme = colors[colorScheme];

  return (
    <div
      style={{
        background: scheme.background,
        border: `1px solid ${scheme.border}`,
        borderRadius: '12px',
        padding: '24px 20px',
        flex: '1 1 200px',
        minWidth: '200px',
        maxWidth: '320px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '2px',
          color: scheme.accent,
          marginBottom: '4px',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px',
          color: '#666',
          marginBottom: '16px',
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '32px',
          fontWeight: '700',
          color: scheme.text,
          marginBottom: '8px',
        }}
      >
        {formatCurrency(value)}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '14px',
          color: '#888',
        }}
      >
        {formatMultiplier(multiplier)} multiplier
      </div>
      {description && (
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: '#555',
            marginTop: '12px',
            lineHeight: '1.5',
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
}
