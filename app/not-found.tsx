'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '120px',
        fontWeight: '700',
        color: '#dc2626',
        letterSpacing: '8px',
        marginBottom: '20px',
      }}>
        404
      </div>

      <h1 style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '32px',
        fontWeight: '700',
        color: '#fff',
        letterSpacing: '4px',
        marginBottom: '16px',
        textAlign: 'center',
      }}>
        PAGE NOT FOUND
      </h1>

      <p style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '14px',
        fontWeight: '400',
        color: '#888',
        letterSpacing: '1px',
        marginBottom: '40px',
        textAlign: 'center',
        maxWidth: '400px',
      }}>
        This page doesn't exist. Maybe it's heresy too?
      </p>

      <Link
        href="/"
        style={{
          padding: '12px 24px',
          background: 'transparent',
          border: '1px solid #fff',
          borderRadius: '8px',
          color: '#fff',
          fontFamily: "'Space Mono', monospace",
          fontSize: '14px',
          fontWeight: '600',
          letterSpacing: '1px',
          textDecoration: 'none',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#fff';
          e.currentTarget.style.color = '#000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#fff';
        }}
      >
        BACK TO HOME
      </Link>
    </div>
  );
}
