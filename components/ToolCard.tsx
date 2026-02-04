'use client';

import Link from 'next/link';
import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface ToolCardProps {
  href: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
}

export default function ToolCard({ href, title, description, icon, accentColor }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ size: number; strokeWidth: number; style: React.CSSProperties }>>)[icon];

  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: isMobile ? '20px 16px' : '32px 24px',
        background: isHovered ? '#111' : '#0a0a0a',
        border: `1px solid ${isHovered ? accentColor : '#222'}`,
        borderRadius: '12px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        minWidth: isMobile ? '140px' : '200px',
        maxWidth: '280px',
        flex: '1 1 200px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {IconComponent && (
        <IconComponent
          size={isMobile ? 32 : 48}
          strokeWidth={1.5}
          style={{
            color: isHovered ? accentColor : '#666',
            marginBottom: '16px',
            transition: 'color 0.2s ease',
          }}
        />
      )}
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '700',
          color: isHovered ? '#fff' : '#ccc',
          marginBottom: '8px',
          textAlign: 'center',
          letterSpacing: '1px',
          transition: 'color 0.2s ease',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: isMobile ? '11px' : '12px',
          color: '#666',
          textAlign: 'center',
          lineHeight: '1.5',
        }}
      >
        {description}
      </div>
    </Link>
  );
}
