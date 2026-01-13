'use client';

import Link from 'next/link';
import { Topic } from '@/data/topics';
import * as LucideIcons from 'lucide-react';
import { useState } from 'react';
import { useReadStatus } from '@/hooks/useReadStatus';
import { useIsMobile } from '@/hooks/useIsMobile';
import { trackBrickClick } from '@/lib/analytics';

interface BrickProps {
  topic: Topic;
}

// ọ̀rọ̀ Yorùbá: ìwé kíkà àwọn àkọsílẹ̀ ilẹ̀ wa
export default function Brick({ topic }: BrickProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isRead, isInitialized } = useReadStatus();
  const hasBeenRead = isInitialized && isRead(topic.id);
  const isMobile = useIsMobile();

  const handleClick = () => {
    trackBrickClick(topic.id, topic.longTitle);
  };

  // Check if this is the featured "start here" brick
  const isStartHere = topic.tags.includes('start-here');

  // Text color: green if read, gold if start-here, white otherwise
  const getTextColor = () => {
    if (hasBeenRead) return '#22c55e'; // Green
    if (isStartHere && !isHovered) return '#d4af37'; // Gold text for start-here
    if (isHovered) return '#000'; // Hovered state
    return '#fff'; // Default white
  };

  // Get the Lucide icon component dynamically
  const IconComponent = topic.icon
    ? (LucideIcons as any)[topic.icon]
    : null;

  // Background: transparent for normal, white for hovered
  const background = isHovered ? '#fff' : 'transparent';

  const textColor = getTextColor();
  const borderColor = isStartHere ? '#d4af37' : '#444';

  const fontSize = isMobile ? '16px' : '28px';
  const iconSize = isMobile ? 18 : 28;
  const padding = isMobile ? '8px 12px' : '10px 16px';
  const gap = isMobile ? '8px' : '12px';

  return (
    <Link
      href={`/${topic.id}`}
      onClick={handleClick}
      style={{
        padding: padding,
        background: background,
        border: `1px solid ${isStartHere ? borderColor : '#222'}`,
        borderRadius: '8px',
        color: textColor,
        fontFamily: "'Space Mono', monospace",
        fontSize: fontSize,
        fontWeight: '400',
        letterSpacing: '1px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: gap,
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        boxShadow: isStartHere ? '0 4px 12px rgba(212, 175, 55, 0.3)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {IconComponent && (
        <IconComponent size={iconSize} strokeWidth={2} style={{ color: textColor }} />
      )}
      {topic.brickTitle}
    </Link>
  );
}
