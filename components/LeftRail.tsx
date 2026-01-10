'use client';

import Link from 'next/link';
import { topics, Topic } from '@/data/topics';

interface LeftRailProps {
  currentTopic: Topic;
}

export default function LeftRail({ currentTopic }: LeftRailProps) {
  return (
    <div style={{
      width: '200px',
      borderRight: '1px solid #222',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Title - clickable to go home */}
      <Link
        href="/"
        style={{
          background: 'none',
          border: 'none',
          borderBottom: '1px solid #222',
          padding: '20px 16px',
          cursor: 'pointer',
          textAlign: 'left',
          textDecoration: 'none',
        }}
      >
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '18px',
          fontWeight: '700',
          color: '#fff',
          letterSpacing: '2px',
          lineHeight: 1.2,
        }}>
          IS<br />THIS<br />HERESY?
        </div>
      </Link>

      {/* Topic list */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 0',
      }}>
        {topics.map((t) => {
          const displayLabel = t.brickTitle.length > 15 
            ? t.brickTitle.slice(0, 15) + '…' 
            : t.brickTitle;
          const isActive = t.id === currentTopic.id;
          
          return (
            <Link
              key={t.id}
              href={`/${t.id}`}
              style={{
                display: 'block',
                width: '100%',
                background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                border: 'none',
                borderLeft: isActive ? '3px solid #dc2626' : '3px solid transparent',
                padding: '12px 16px',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                fontWeight: isActive ? '700' : '400',
                color: isActive ? '#dc2626' : '#fff',
                letterSpacing: '1px',
                transition: 'all 0.1s ease',
                textDecoration: 'none',
              }}
            >
              {displayLabel}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
