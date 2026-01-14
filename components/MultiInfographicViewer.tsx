'use client';

/**
 * IMPORTANT: This component has a sibling - InfographicViewer.tsx
 * When making changes here (especially mobile layout), update both files!
 * InfographicViewer handles single topics without grouping.
 */

import { Topic } from '@/data/topics';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface MultiInfographicViewerProps {
  topics: Topic[];
  hostTopic: Topic;
}

// Renders a single infographic image with virtual scroll anchors for grouped topics
export default function MultiInfographicViewer({ topics, hostTopic }: MultiInfographicViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageHeight, setImageHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const lastTouchDistance = useRef<number | null>(null);
  const isMobile = useIsMobile();

  const nonHostTopics = topics.filter(t => t.id !== hostTopic.id);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  // Reset zoom and loading state when host topic changes
  useEffect(() => {
    setZoom(1);
    setIsImageLoading(true);
    setImageHeight(0);
  }, [hostTopic.id]);

  // Handle hash navigation - scroll to percentage offset
  const scrollToHash = useCallback(() => {
    const hash = window.location.hash.slice(1);
    if (!hash || !containerRef.current) return;

    // Find the topic matching the hash
    const targetTopic = topics.find(t => t.id === hash);
    if (targetTopic && targetTopic.scrollOffset !== undefined && imageRef.current) {
      const currentImageHeight = imageRef.current.getBoundingClientRect().height;
      const scrollPosition = currentImageHeight * targetTopic.scrollOffset;
      // Account for top padding (100px)
      containerRef.current.scrollTo({
        top: scrollPosition + 100,
        behavior: 'smooth'
      });
    }
  }, [topics]);

  // Scroll to hash on mount and hash change
  useEffect(() => {
    // Small delay to ensure image has loaded
    const timeout = setTimeout(scrollToHash, 150);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [scrollToHash, imageHeight]);

  function handleImageLoad() {
    setIsImageLoading(false);
    if (imageRef.current) {
      setImageHeight(imageRef.current.getBoundingClientRect().height);
    }
  }

  function handleImageError() {
    // On error, hide the loading indicator
    setIsImageLoading(false);
  }

  // Check if image is already loaded (handles cached images)
  useEffect(() => {
    const img = imageRef.current;
    if (img && img.complete && img.naturalHeight > 0) {
      setIsImageLoading(false);
      setImageHeight(img.getBoundingClientRect().height);
    }
  }, [hostTopic.id]);

  // Update image height on zoom change
  useEffect(() => {
    if (imageRef.current && !isImageLoading) {
      const timeout = setTimeout(() => {
        if (imageRef.current) {
          setImageHeight(imageRef.current.getBoundingClientRect().height);
        }
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [zoom, isImageLoading]);

  // Custom pinch-to-zoom handling - DESKTOP ONLY
  // On mobile, we let Safari's native pinch-to-zoom handle everything
  function getTouchDistance(touch1: React.Touch, touch2: React.Touch) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (isMobile) return; // Let Safari handle it natively
    if (e.touches.length === 2) {
      lastTouchDistance.current = getTouchDistance(e.touches[0], e.touches[1]);
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (isMobile) return; // Let Safari handle it natively
    if (e.touches.length === 2 && lastTouchDistance.current !== null) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
      const delta = (currentDistance - lastTouchDistance.current) * 0.01;
      setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 3));
      lastTouchDistance.current = currentDistance;
    }
  }

  function handleTouchEnd() {
    if (isMobile) return; // Let Safari handle it natively
    lastTouchDistance.current = null;
  }

  // Build image sources - AVIF primary, WebP fallback
  const imageName = hostTopic.imageName;
  const avifSrcSet = `/images/${imageName}-en-medium.avif 1200w, /images/${imageName}-en-large.avif 2400w, /images/${imageName}-en-original.avif 4800w`;
  const webpSrcSet = `/images/${imageName}-en-medium.webp 1200w, /images/${imageName}-en-large.webp 2400w, /images/${imageName}-en-original.webp 4800w`;
  const fallbackSrc = `/images/${imageName}-en-medium.webp`;

  // Mobile: Absolutely minimal - just the image with anchors, no scroll containers
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

        {/* Image container with virtual anchors */}
        <div style={{ position: 'relative' }}>
          {/* Host anchor at top */}
          <div id={hostTopic.id} style={{ position: 'absolute', top: 0 }} />

          {/* Virtual anchor divs positioned by percentage */}
          {nonHostTopics.map(topic => (
            <div
              key={topic.id}
              id={topic.id}
              style={{
                position: 'absolute',
                top: `${(topic.scrollOffset ?? 0) * 100}%`,
                left: 0,
                width: '100%',
                height: 0,
              }}
            />
          ))}

          {/* Just the image - no wrapper, no scroll context */}
          <picture>
            <source type="image/avif" srcSet={avifSrcSet} sizes="100vw" />
            <source type="image/webp" srcSet={webpSrcSet} sizes="100vw" />
            <img
              ref={imageRef}
              src={fallbackSrc}
              sizes="100vw"
              alt={hostTopic.longTitle}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                width: '100%',
                height: 'auto',
                display: isImageLoading ? 'none' : 'block',
              }}
            />
          </picture>
        </div>
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
      {/* Zoom controls */}
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

      {/* Top padding */}
      <div style={{ height: '80px' }} />

      {/* Single image container with virtual anchors */}
      <div style={{ position: 'relative' }}>
        {/* Host anchor at top */}
        <div id={hostTopic.id} style={{ position: 'absolute', top: 0 }} />

        {/* Virtual anchor divs positioned by percentage */}
        {nonHostTopics.map(topic => (
          <div
            key={topic.id}
            id={topic.id}
            style={{
              position: 'absolute',
              top: `${(topic.scrollOffset ?? 0) * 100}%`,
              left: 0,
              width: '100%',
              height: 0,
            }}
          />
        ))}

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

        {/* The infographic image - AVIF primary, WebP fallback */}
        <picture>
          <source type="image/avif" srcSet={avifSrcSet} sizes="100vw" />
          <source type="image/webp" srcSet={webpSrcSet} sizes="100vw" />
          <img
            ref={imageRef}
            src={fallbackSrc}
            sizes="100vw"
            alt={hostTopic.longTitle}
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
      </div>

      {/* Bottom padding */}
      <div style={{ height: '120px' }} />
    </div>
  );
}
