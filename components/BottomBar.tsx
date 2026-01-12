'use client';

import Link from 'next/link';
import { Share2, ArrowRight } from 'lucide-react';
import { Topic, getNextTopic } from '@/data/topics';
import { trackVerifyClick, trackShare, trackTopicRead } from '@/lib/analytics';
import { useReadStatus } from '@/hooks/useReadStatus';

interface BottomBarProps {
  topic: Topic;
}

const aiPlatforms = [
  { name: 'ChatGPT', baseUrl: 'https://chatgpt.com/', param: 'q' },
  { name: 'Gemini', baseUrl: 'https://gemini.google.com/app', param: 'q' },
  { name: 'Grok', baseUrl: 'https://x.com/i/grok', param: 'text' },
] as const;

function getVerifyUrl(platform: typeof aiPlatforms[number], prompt: string) {
  return `${platform.baseUrl}?${platform.param}=${encodeURIComponent(prompt)}`;
}

export default function BottomBar({ topic }: BottomBarProps) {
  const nextTopic = getNextTopic(topic.id);
  const { markAsRead } = useReadStatus();

  const handleVerifyClick = (platformName: string) => {
    const provider = platformName.toLowerCase() as 'chatgpt' | 'gemini' | 'grok';
    trackVerifyClick(provider, topic.id);
  };

  const handleNextClick = () => {
    // Mark current topic as read when clicking NEXT
    markAsRead(topic.id);
    trackTopicRead(topic.id, topic.longTitle);
  };

  const handleShare = async () => {
    const url = `https://isthisheresy.com/${topic.id}`;
    const method = navigator.share ? 'native_share' : 'clipboard';
    trackShare(method, topic.id);

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
    <>
      {/* Verify buttons - stacked vertically on the left */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '224px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 10,
      }}>
        {aiPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={getVerifyUrl(platform, topic.verifyPrompt)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleVerifyClick(platform.name)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 16px',
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#fff',
              textDecoration: 'none',
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.5px',
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
            VERIFY WITH {platform.name.toUpperCase()}
          </a>
        ))}
      </div>

      {/* Share and Next buttons - stacked on the right */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 10,
      }}>
        {/* Share button */}
        <button
          onClick={handleShare}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #444',
            borderRadius: '8px',
            color: '#fff',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.5px',
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
          <Share2 size={14} />
          SHARE
        </button>

        {/* Next button */}
        <Link
          href={`/${nextTopic.id}`}
          onClick={handleNextClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 16px',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #444',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            textDecoration: 'none',
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
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            fontWeight: '600',
            color: '#fff',
            letterSpacing: '0.5px',
          }}>
            NEXT: {nextTopic.brickTitle}
          </div>
          <ArrowRight size={14} color="#fff" />
        </Link>
      </div>
    </>
  );
}
