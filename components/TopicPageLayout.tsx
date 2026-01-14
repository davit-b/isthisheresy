'use client';

import { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface TopicPageLayoutProps {
  children: ReactNode;
  leftRail: ReactNode;
  bottomBar: ReactNode;
  mobileHeader: ReactNode;
  readTracker: ReactNode;
}

/**
 * Layout wrapper for topic pages.
 *
 * Mobile: Simple scrolling page - no nested scroll contexts.
 * Desktop: Flex layout with left rail and custom scroll container.
 */
export default function TopicPageLayout({
  children,
  leftRail,
  bottomBar,
  mobileHeader,
  readTracker,
}: TopicPageLayoutProps) {
  const isMobile = useIsMobile();

  // Mobile: Simple scrolling page, no viewport lock
  if (isMobile) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
      }}>
        {readTracker}
        {mobileHeader}

        {/* Image content - flows naturally, page scrolls */}
        {children}

        {/* Fixed bottom bar */}
        {bottomBar}
      </div>
    );
  }

  // Desktop: Original flex layout with scroll container
  return (
    <div style={{
      height: '100vh',
      background: '#000',
      display: 'flex',
      overflow: 'hidden',
    }}>
      {readTracker}
      {mobileHeader}
      {leftRail}

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {children}
      </div>

      {bottomBar}
    </div>
  );
}
