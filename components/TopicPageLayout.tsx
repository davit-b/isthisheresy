'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, Share2, ArrowRight, ArrowLeft, CheckCircle, Copy } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Topic, getNextTopic, getTopicUrl } from '@/data/topics';
import { trackVerifyClick, trackShare, trackTopicRead } from '@/lib/analytics';
import { useReadStatus } from '@/hooks/useReadStatus';
import MobileMenu from './MobileMenu';

interface TopicPageLayoutProps {
  children: ReactNode;
  leftRail: ReactNode;
  bottomBar: ReactNode;
  mobileHeader: ReactNode;
  readTracker: ReactNode;
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

/**
 * Layout wrapper for topic pages.
 *
 * Mobile: Simple scrolling page with header/footer IN the scroll flow.
 * Desktop: Flex layout with left rail and fixed overlay buttons.
 */
export default function TopicPageLayout({
  children,
  leftRail,
  bottomBar,
  mobileHeader,
  readTracker,
  topic,
}: TopicPageLayoutProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { markAsRead } = useReadStatus();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showVerifyMenu, setShowVerifyMenu] = useState(false);

  const nextTopic = getNextTopic(topic.id);

  function handleVerifyClick(platformName: string) {
    const provider = platformName.toLowerCase() as 'chatgpt' | 'gemini' | 'grok';
    trackVerifyClick(provider, topic.id);
    setShowVerifyMenu(false);
  }

  function handleNextClick() {
    markAsRead(topic.id);
    trackTopicRead(topic.id, topic.longTitle);
  }

  async function handleCopyPrompt() {
    await navigator.clipboard.writeText(topic.verifyPrompt);
    alert('Verification prompt copied!');
  }

  async function handleShare() {
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
  }

  function handleBack() {
    router.back();
  }

  // Mobile: Everything in scroll flow - header, content, footer
  if (isMobile) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
      }}>
        {readTracker}

        {/* Mobile Header Bar - IN scroll flow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          borderBottom: '1px solid #222',
        }}>
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'transparent',
              border: '1px solid #444',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <Menu size={22} />
          </button>

          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '14px',
            fontWeight: '700',
            color: '#fff',
            letterSpacing: '2px',
          }}>
            IS THIS HERESY?
          </div>

          {/* Spacer to balance layout */}
          <div style={{ width: '40px' }} />
        </div>

        {/* Mobile Menu Overlay */}
        <MobileMenu
          currentTopic={topic}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />

        {/* Image content - flows naturally, page scrolls */}
        {children}

        {/* Mobile Footer Bar - IN scroll flow */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '16px',
          borderTop: '1px solid #222',
          background: '#0a0a0a',
        }}>
          {/* Verify dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowVerifyMenu(!showVerifyMenu)}
              aria-label="Verify with AI"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '14px',
                background: '#1a1a1a',
                border: '1px solid #444',
                borderRadius: '8px',
                color: '#fff',
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                cursor: 'pointer',
              }}
            >
              <CheckCircle size={16} />
              VERIFY WITH AI
            </button>

            {showVerifyMenu && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: 0,
                right: 0,
                marginBottom: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                background: 'rgba(0, 0, 0, 0.95)',
                border: '1px solid #444',
                borderRadius: '8px',
                padding: '8px',
              }}>
                <button
                  onClick={handleCopyPrompt}
                  style={{
                    padding: '12px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#d4af37',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Copy size={14} />
                  Copy Prompt
                </button>
                <div style={{ height: '1px', background: '#333', margin: '4px 0' }} />
                {aiPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={getVerifyUrl(platform, topic.verifyPrompt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleVerifyClick(platform.name)}
                    style={{
                      padding: '12px',
                      background: 'transparent',
                      borderRadius: '4px',
                      color: '#fff',
                      textDecoration: 'none',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '13px',
                      fontWeight: '600',
                    }}
                  >
                    {platform.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Share and Back row */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleBack}
              aria-label="Go back"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                background: '#1a1a1a',
                border: '1px solid #444',
                borderRadius: '8px',
                color: '#fff',
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={16} />
              BACK
            </button>

            <button
              onClick={handleShare}
              aria-label="Share"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                background: '#1a1a1a',
                border: '1px solid #444',
                borderRadius: '8px',
                color: '#fff',
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                cursor: 'pointer',
              }}
            >
              <Share2 size={16} />
              SHARE
            </button>
          </div>

          {/* Next button */}
          <Link
            href={getTopicUrl(nextTopic)}
            onClick={handleNextClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '14px',
              background: '#1a1a1a',
              border: '1px solid #444',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '13px',
              fontWeight: '600',
              color: '#fff',
              letterSpacing: '0.5px',
            }}>
              NEXT: {nextTopic.brickTitle}
            </div>
            <ArrowRight size={16} color="#fff" />
          </Link>
        </div>
      </div>
    );
  }

  // Desktop: Original flex layout with scroll container and fixed overlays
  return (
    <div style={{
      height: '100vh',
      background: '#000',
      display: 'flex',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
      }}>
        {readTracker}
        {mobileHeader}
        {leftRail}

        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {children}
        </div>

        {bottomBar}
      </div>
    </div>
  );
}
