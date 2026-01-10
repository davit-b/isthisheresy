'use client';

import Link from 'next/link';
import { ExternalLink, Share2, ArrowRight } from 'lucide-react';
import { Topic, getNextTopic } from '@/data/topics';

interface BottomBarProps {
  topic: Topic;
}

const aiPlatforms = [
  { name: 'ChatGPT', baseUrl: 'https://chatgpt.com/', param: 'q' },
  { name: 'Gemini', baseUrl: 'https://gemini.google.com/app', param: 'q' },
  { name: 'Grok', baseUrl: 'https://x.com/i/grok', param: 'text' },
];

function getVerifyUrl(platform: typeof aiPlatforms[0], prompt: string) {
  return `${platform.baseUrl}?${platform.param}=${encodeURIComponent(prompt)}`;
}

export default function BottomBar({ topic }: BottomBarProps) {
  const nextTopic = getNextTopic(topic.id);

  const handleShare = async () => {
    const url = `https://isthisheresy.com/${topic.id}`;
    if (navigator.share) {
      await navigator.share({
        title: topic.longTitle,
        text: topic.shareSnippet,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied!');
    }
  };

  return (
    <div style={{
      borderTop: '1px solid #222',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: '#000',
    }}>
      {/* Verify buttons */}
      {aiPlatforms.map((platform) => (
        <a
          key={platform.name}
          href={getVerifyUrl(platform, topic.verifyPrompt)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            background: 'transparent',
            border: '1px solid #444',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.5px',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#888';
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#444';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          VERIFY · {platform.name.toUpperCase()}
          <ExternalLink size={11} />
        </a>
      ))}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Share button */}
      <button
        onClick={handleShare}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 16px',
          background: 'transparent',
          border: '1px solid #444',
          color: '#fff',
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.5px',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#888';
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#444';
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <Share2 size={11} />
        SHARE
      </button>

      {/* Next infographic preview */}
      <Link
        href={`/${nextTopic.id}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 16px 8px 8px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid #444',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#888';
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#444';
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        }}
      >
        {/* Thumbnail */}
        <div style={{
          width: '48px',
          height: '48px',
          background: '#1a1a1a',
          backgroundImage: `url(/images/${nextTopic.imageName}-thumb.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '4px',
          flexShrink: 0,
        }} />
        {/* Text */}
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            color: '#888',
            letterSpacing: '1px',
            marginBottom: '4px',
          }}>
            NEXT
          </div>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '13px',
            fontWeight: '700',
            color: '#fff',
            letterSpacing: '0.5px',
          }}>
            {nextTopic.brickTitle}
          </div>
        </div>
        {/* Arrow */}
        <ArrowRight size={16} color="#888" style={{ marginLeft: '8px' }} />
      </Link>
    </div>
  );
}
