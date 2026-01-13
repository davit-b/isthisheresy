'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Share2, ArrowRight, CheckCircle, Copy } from 'lucide-react';
import { Topic, getNextTopic, getTopicUrl, getTopicById, isGroupHost, getGroupedTopics } from '@/data/topics';
import { trackVerifyClick, trackShare, trackTopicRead } from '@/lib/analytics';
import { useReadStatus } from '@/hooks/useReadStatus';
import { useState, useEffect } from 'react';

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
  const router = useRouter();
  const { markAsRead } = useReadStatus();
  const [showVerifyMenu, setShowVerifyMenu] = useState(false);
  const [currentHash, setCurrentHash] = useState('');

  // Track hash changes to know which virtual anchor we're viewing
  useEffect(() => {
    function updateHash() {
      setCurrentHash(window.location.hash.slice(1));
    }
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  // Determine the "current" topic based on hash (for grouped topics)
  function getCurrentTopicId(): string {
    // If we have a hash and it matches a grouped topic under this host, use it
    if (currentHash && isGroupHost(topic.id)) {
      const groupedTopics = getGroupedTopics(topic.id);
      const matchingTopic = groupedTopics.find(t => t.id === currentHash);
      if (matchingTopic) {
        return currentHash;
      }
    }
    return topic.id;
  }

  const currentTopicId = getCurrentTopicId();
  const nextTopic = getNextTopic(currentTopicId);

  const handleVerifyClick = (platformName: string) => {
    const provider = platformName.toLowerCase() as 'chatgpt' | 'gemini' | 'grok';
    trackVerifyClick(provider, topic.id);
    setShowVerifyMenu(false);
  };

  const handleNextClick = (e: React.MouseEvent) => {
    // Mark current topic as read when clicking NEXT
    markAsRead(currentTopicId);
    trackTopicRead(currentTopicId, topic.longTitle);

    // Check if next topic is a virtual anchor on the same page
    const nextUrl = getTopicUrl(nextTopic);
    const isInPageNavigation = nextUrl.startsWith(`/${topic.id}#`);

    if (isInPageNavigation) {
      e.preventDefault();
      // Update hash and trigger scroll
      const newHash = nextTopic.id;
      window.location.hash = newHash;
    }
    // Otherwise, let the Link handle navigation normally
  };

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(topic.verifyPrompt);
    alert('Verification prompt copied!');
  };

  const handleShare = async () => {
    const url = `https://isthisheresy.com/${topic.id}`;
    const hasNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;
    const method = hasNativeShare ? 'native_share' : 'clipboard';
    trackShare(method, topic.id);

    if (hasNativeShare) {
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
      {/* Verify button with dropdown menu - bottom left */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '224px',
        zIndex: 10,
      }}>
        <button
          onClick={() => setShowVerifyMenu(!showVerifyMenu)}
          aria-label="Verify with AI"
          aria-expanded={showVerifyMenu}
          aria-haspopup="true"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
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
          <CheckCircle size={14} />
          VERIFY
        </button>

        {/* Dropdown menu */}
        {showVerifyMenu && (
          <div
            role="menu"
            style={{
              position: 'absolute',
              bottom: '52px',
              left: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #444',
              borderRadius: '8px',
              padding: '8px',
              minWidth: '180px',
            }}>
            {/* Copy prompt button */}
            <button
              onClick={handleCopyPrompt}
              role="menuitem"
              aria-label="Copy verification prompt to clipboard"
              style={{
                padding: '8px 12px',
                background: 'transparent',
                border: 'none',
                borderRadius: '4px',
                color: '#d4af37',
                textDecoration: 'none',
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Copy size={12} />
              Copy Prompt
            </button>

            {/* Separator */}
            <div style={{
              height: '1px',
              background: '#333',
              margin: '4px 0',
            }} />

            {aiPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={getVerifyUrl(platform, topic.verifyPrompt)}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                aria-label={`Verify with ${platform.name}`}
                onClick={() => handleVerifyClick(platform.name)}
                style={{
                  padding: '8px 12px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                  textDecoration: 'none',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {platform.name}
              </a>
            ))}
          </div>
        )}
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
          aria-label={`Share ${topic.longTitle}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '10px 14px',
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
          href={getTopicUrl(nextTopic)}
          onClick={handleNextClick}
          aria-label={`Next topic: ${nextTopic.longTitle}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
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
            {nextTopic.brickTitle}
          </div>
          <ArrowRight size={14} color="#fff" />
        </Link>
      </div>
    </>
  );
}
