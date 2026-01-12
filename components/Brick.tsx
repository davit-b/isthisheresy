'use client';

import Link from 'next/link';
import { Topic } from '@/data/topics';
import * as LucideIcons from 'lucide-react';
import { useState } from 'react';
import { useReadStatus } from '@/hooks/useReadStatus';
import { trackBrickClick } from '@/lib/analytics';

interface BrickProps {
  topic: Topic;
}

// ọ̀rọ̀ Yorùbá: ìwé kíkà àwọn àkọsílẹ̀ ilẹ̀ wa
export default function Brick({ topic }: BrickProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isRead, isInitialized } = useReadStatus();
  const hasBeenRead = isInitialized && isRead(topic.id);

  const handleClick = () => {
    trackBrickClick(topic.id, topic.longTitle);
  };

  // Check if this is the featured "start here" brick
  const isStartHere = topic.tags.includes('start-here');

  // Text color: green if read, gold if start-here, white otherwise
  const getTextColor = () => {
    if (hasBeenRead) return '#22c55e'; // Green
    if (isStartHere && !isHovered) return '#000'; // Gold brick has black text
    if (isHovered) return '#000'; // Hovered state
    return '#fff'; // Default white
  };

  // Get the Lucide icon component dynamically
  const IconComponent = topic.icon
    ? (LucideIcons as any)[topic.icon]
    : null;

  // Gold gradient for featured brick
  const goldBackground = isStartHere && !isHovered
    ? 'linear-gradient(135deg, #d4af37 0%, #f4e5a1 25%, #d4af37 50%, #c5a028 75%, #d4af37 100%)'
    : isStartHere && isHovered
    ? '#fff'
    : isHovered
    ? '#fff'
    : 'transparent';

  const textColor = getTextColor();
  const borderColor = isStartHere ? '#d4af37' : '#444';

  return (
    <Link
      href={`/${topic.id}`}
      onClick={handleClick}
      style={{
        padding: '10px 16px',
        background: goldBackground,
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        color: textColor,
        fontFamily: "'Space Mono', monospace",
        fontSize: '28px',
        fontWeight: '700',
        letterSpacing: '1px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        boxShadow: isStartHere ? '0 4px 12px rgba(212, 175, 55, 0.3)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {IconComponent && (
        <IconComponent size={28} strokeWidth={2.5} style={{ color: textColor }} />
      )}
      {topic.brickTitle}
    </Link>
  );
}
