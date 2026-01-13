'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Topic } from '@/data/topics';
import MobileMenu from './MobileMenu';

interface MobileHeaderProps {
  currentTopic: Topic;
}

export default function MobileHeader({ currentTopic }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Hamburger button - fixed position on mobile, aligned with zoom controls */}
      <button
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
        className="mobile-only"
        style={{
          position: 'fixed',
          top: '24px',
          left: '24px',
          zIndex: 100,
          width: '40px',
          height: '40px',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #444',
          borderRadius: '8px',
          color: '#fff',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Menu size={22} />
      </button>

      {/* Mobile menu overlay */}
      <MobileMenu
        currentTopic={currentTopic}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
