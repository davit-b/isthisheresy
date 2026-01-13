'use client';

import { Topic } from '@/data/topics';
import { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface InfographicViewerProps {
  topic: Topic;
}

// Hausa: hoton da za a duba
export default function InfographicViewer({ topic }: InfographicViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchDistance = useRef<number | null>(null);

  // Image paths for responsive loading (with language code)
  const imageSrc = `/images/${topic.imageName}-en-medium.webp`;
  const imageSrcSet = `
    /images/${topic.imageName}-en-medium.webp 1200w,
    /images/${topic.imageName}-en-large.webp 2400w,
    /images/${topic.imageName}-en-original.webp 4800w
  `;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  // Reset zoom, scroll position, and loading state when topic changes
  useEffect(() => {
    setZoom(1);
    setIsImageLoading(true);
    // Scroll to skip the top padding (100px) so image starts at top
    if (containerRef.current) {
      containerRef.current.scrollTop = 100;
    }
  }, [topic.id]);

  // Custom pinch-to-zoom handling
  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      lastTouchDistance.current = getTouchDistance(e.touches[0], e.touches[1]);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance.current !== null) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
      const delta = (currentDistance - lastTouchDistance.current) * 0.01;
      setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 3));
      lastTouchDistance.current = currentDistance;
    }
  };

  const handleTouchEnd = () => {
    lastTouchDistance.current = null;
  };

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
      {/* Zoom controls - top right */}
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
      <div style={{ height: '100px' }} />

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

      {/* Full-width image at top, scroll down to see more */}
      <img
        src={imageSrc}
        srcSet={imageSrcSet}
        sizes="100vw"
        alt={topic.longTitle}
        onLoad={() => setIsImageLoading(false)}
        style={{
          width: `${zoom * 100}%`,
          height: 'auto',
          display: isImageLoading ? 'none' : 'block',
          transformOrigin: 'top center',
          transition: 'width 0.2s ease',
        }}
      />
      {/* Bottom padding so overlay buttons don't cover content */}
      <div style={{ height: '260px' }} />
    </div>
  );
}
