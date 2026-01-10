'use client';

import Link from 'next/link';
import { Topic } from '@/data/topics';

interface BrickProps {
  topic: Topic;
}

export default function Brick({ topic }: BrickProps) {
  return (
    <Link
      href={`/${topic.id}`}
      style={{
        padding: '10px 16px',
        background: 'transparent',
        border: '1px solid #444',
        color: '#fff',
        fontFamily: "'Space Mono', monospace",
        fontSize: '28px',
        fontWeight: '700',
        letterSpacing: '1px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#fff';
        e.currentTarget.style.color = '#000';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = '#fff';
      }}
    >
      {topic.brickTitle}
    </Link>
  );
}
