'use client';

import Link from 'next/link';
import { Topic, getTopicUrl } from '@/data/topics';
import Image from 'next/image';
import { useState } from 'react';
import { useReadStatus } from '@/hooks/useReadStatus';
import { trackBrickClick } from '@/lib/analytics';

interface ThumbnailCardProps {
  topic: Topic;
  sectionColor?: string;
}

export default function ThumbnailCard({ topic, sectionColor }: ThumbnailCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isRead, isInitialized } = useReadStatus();
  const hasBeenRead = isInitialized && isRead(topic.id);

  const handleClick = () => {
    trackBrickClick(topic.id, topic.longTitle);
  };

  // Check if this is the featured "start here" brick
  const isStartHere = topic.tags.includes('start-here');

  // Border styling
  const getBorderColor = () => {
    if (hasBeenRead) return '#22c55e'; // Green if read
    if (isStartHere) return '#d4af37'; // Gold for start-here
    if (sectionColor) return sectionColor; // Section color
    return '#333'; // Default gray
  };

  const borderColor = getBorderColor();
  const borderWidth = isHovered ? '2px' : '1px';

  // Scale on hover
  const scale = isHovered ? 1.02 : 1;

  // Image path
  const imagePath = `/images/${topic.imageName}-en-thumb.webp`;

  return (
    <Link
      href={getTopicUrl(topic)}
      onClick={handleClick}
      style={{
        display: 'block',
        border: `${borderWidth} solid ${borderColor}`,
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: `scale(${scale})`,
        textDecoration: 'none',
        background: '#111',
        boxShadow: isStartHere ? '0 4px 16px rgba(212, 175, 55, 0.4)' : isHovered ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 2px 8px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Image */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2 / 3',
        background: '#000',
      }}>
        <Image
          src={imagePath}
          alt={topic.longTitle}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          style={{
            objectFit: 'cover',
          }}
        />

        {/* Dark gradient overlay for title */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Title overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px',
          color: '#fff',
          fontFamily: "'Space Mono', monospace",
          fontSize: '14px',
          fontWeight: '700',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          lineHeight: 1.3,
        }}>
          {topic.brickTitle}
        </div>

        {/* Read checkmark badge */}
        {hasBeenRead && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#22c55e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: '700',
            color: '#000',
          }}>
            ✓
          </div>
        )}

        {/* Start-here badge */}
        {isStartHere && !hasBeenRead && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '6px 12px',
            borderRadius: '6px',
            background: '#d4af37',
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '1px',
            color: '#000',
            textTransform: 'uppercase',
          }}>
            START
          </div>
        )}
      </div>
    </Link>
  );
}
