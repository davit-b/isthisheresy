'use client';

import { Topic } from '@/data/topics';
import { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface InfographicViewerProps {
  topic: Topic;
}

// Hausa: hoton da za a duba
export default function InfographicViewer({ topic }: InfographicViewerProps) {
  const [zoom, setZoom] = useState(1);

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

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      background: '#0a0a0a',
      WebkitOverflowScrolling: 'touch',
      position: 'relative',
    }}>
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

      {/* Full-width image at top, scroll down to see more */}
      <img
        src={imageSrc}
        srcSet={imageSrcSet}
        sizes="100vw"
        alt={topic.longTitle}
        style={{
          width: `${zoom * 100}%`,
          height: 'auto',
          display: 'block',
          transformOrigin: 'top center',
          transition: 'width 0.2s ease',
        }}
      />
      {/* Bottom padding so overlay buttons don't cover content */}
      <div style={{ height: '120px' }} />
    </div>
  );
}
