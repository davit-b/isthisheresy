'use client';

/**
 * IMPORTANT: This component has a sibling - MultiInfographicViewer.tsx
 * When making changes here (especially mobile layout), update both files!
 * MultiInfographicViewer handles grouped topics with virtual scroll anchors.
 */

import { Topic } from '@/data/topics';
import { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface InfographicViewerProps {
  topic: Topic;
}

// Hausa: hoton da za a duba
export default function InfographicViewer({ topic }: InfographicViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const lastTouchDistance = useRef<number | null>(null);
  const isMobile = useIsMobile();

  // Image paths - AVIF primary, WebP fallback
  const imageName = topic.imageName;
  const avifSrcSet = `/images/${imageName}-en-medium.avif 1200w, /images/${imageName}-en-large.avif 2400w, /images/${imageName}-en-original.avif 4800w`;
  const webpSrcSet = `/images/${imageName}-en-medium.webp 1200w, /images/${imageName}-en-large.webp 2400w, /images/${imageName}-en-original.webp 4800w`;
  const fallbackSrc = `/images/${imageName}-en-medium.webp`;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  // Reset zoom, scroll position, and loading state when topic changes
  useEffect(() => {
    setZoom(1);
    setIsImageLoading(true);
    // Scroll to top when opening a new infographic
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [topic.id]);

  // Check if image is already loaded (handles cached images)
  useEffect(() => {
    const img = imageRef.current;
    if (img && img.complete && img.naturalHeight > 0) {
      setIsImageLoading(false);
    }
  }, [topic.id, fallbackSrc]);

  function handleImageLoad() {
    setIsImageLoading(false);
  }

  function handleImageError() {
    // On error, hide the loading indicator (image will just not display)
    setIsImageLoading(false);
  }

  // Custom pinch-to-zoom handling - DESKTOP ONLY
  // On mobile, we let Safari's native pinch-to-zoom handle everything
  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) return; // Let Safari handle it natively
    if (e.touches.length === 2) {
      lastTouchDistance.current = getTouchDistance(e.touches[0], e.touches[1]);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isMobile) return; // Let Safari handle it natively
    if (e.touches.length === 2 && lastTouchDistance.current !== null) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
      const delta = (currentDistance - lastTouchDistance.current) * 0.01;
      setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 3));
      lastTouchDistance.current = currentDistance;
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) return; // Let Safari handle it natively
    lastTouchDistance.current = null;
  };

  // Mobile: Absolutely minimal - just the image, no scroll containers
  // The page itself scrolls naturally, Safari handles zoom natively
  if (isMobile) {
    return (
      <>
        {/* Loading skeleton */}
        {isImageLoading && (
          <div style={{
            width: '100%',
            height: '80vh',
            background: 'linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s ease-in-out infinite',
          }} />
        )}

        {/* Just the image - no wrapper, no scroll context */}
        {/* sizes="200vw" forces browser to pick large (2400w) instead of medium on mobile */}
        <picture>
          <source type="image/avif" srcSet={avifSrcSet} sizes="200vw" />
          <source type="image/webp" srcSet={webpSrcSet} sizes="200vw" />
          <img
            ref={imageRef}
            src={fallbackSrc}
            sizes="200vw"
            alt={topic.longTitle}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              width: '100%',
              height: 'auto',
              display: isImageLoading ? 'none' : 'block',
            }}
          />
        </picture>
      </>
    );
  }

  // Desktop view with custom zoom controls
  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        flex: 1,
        overflow: 'auto',
        background: '#0a0a0a',
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
      }}
    >
      {/* Zoom controls - top right, desktop only */}
      <div style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        display: 'flex',
        gap: '8px',
        zIndex: 10,
      }}>
        <button
          onClick={handleZoomIn}
          aria-label="Zoom in"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #444',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#888';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#444';
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
          }}
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={handleZoomOut}
          aria-label="Zoom out"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #444',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#888';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#444';
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
          }}
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={handleReset}
          aria-label="Reset zoom"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #444',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#888';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#444';
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
          }}
        >
          <Maximize2 size={20} />
        </button>
      </div>

      {/* Top padding - hidden on initial load but can scroll up to it */}
      <div style={{ height: '80px' }} />

      {/* Loading skeleton */}
      {isImageLoading && (
        <div style={{
          width: '100%',
          height: '80vh',
          background: 'linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%)',
          backgroundSize: '200% 100%',
          animation: 'loading 1.5s ease-in-out infinite',
        }} />
      )}

      {/* Full-width image - AVIF primary, WebP fallback */}
      <picture>
        <source type="image/avif" srcSet={avifSrcSet} sizes="100vw" />
        <source type="image/webp" srcSet={webpSrcSet} sizes="100vw" />
        <img
          ref={imageRef}
          src={fallbackSrc}
          sizes="100vw"
          alt={topic.longTitle}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            width: `${zoom * 100}%`,
            height: 'auto',
            display: isImageLoading ? 'none' : 'block',
            transformOrigin: 'top center',
            transition: 'width 0.2s ease',
          }}
        />
      </picture>
      {/* Bottom padding so overlay buttons don't cover content */}
      <div style={{ height: '120px' }} />
    </div>
  );
}
