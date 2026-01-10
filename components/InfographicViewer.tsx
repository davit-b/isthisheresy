'use client';

import { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Topic } from '@/data/topics';

interface InfographicViewerProps {
  topic: Topic;
}

export default function InfographicViewer({ topic }: InfographicViewerProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.min(Math.max(prev * delta, 0.5), 4));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Image paths for responsive loading
  const imageSrc = `/images/${topic.imageName}-medium.webp`;
  const imageSrcSet = `
    /images/${topic.imageName}-medium.webp 1200w,
    /images/${topic.imageName}-large.webp 2400w,
    /images/${topic.imageName}-original.webp 4800w
  `;

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        flex: 1,
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        position: 'relative',
      }}
    >
      {/* Infographic image */}
      <img
        src={imageSrc}
        srcSet={imageSrcSet}
        sizes="(max-width: 1200px) 100vw, 80vw"
        alt={topic.longTitle}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          maxHeight: '100%',
          maxWidth: '100%',
          objectFit: 'contain',
        }}
        draggable={false}
      />

      {/* Zoom controls */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        display: 'flex',
        gap: '8px',
      }}>
        <button
          onClick={() => setScale(s => Math.min(s * 1.2, 4))}
          style={{
            width: '36px',
            height: '36px',
            background: '#1a1a1a',
            border: '1px solid #333',
            color: '#888',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setScale(s => Math.max(s * 0.8, 0.5))}
          style={{
            width: '36px',
            height: '36px',
            background: '#1a1a1a',
            border: '1px solid #333',
            color: '#888',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={resetView}
          style={{
            width: '36px',
            height: '36px',
            background: '#1a1a1a',
            border: '1px solid #333',
            color: '#888',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
