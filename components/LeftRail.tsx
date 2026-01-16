'use client';

import Link from 'next/link';
import { topics, Topic, getTopicUrl, getHostTopic } from '@/data/topics';
import { Lock, MessageSquarePlus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useReadStatus } from '@/hooks/useReadStatus';
import { trackPasscodeAttempt, trackPasscodeUnlock, trackRequestSubmit } from '@/lib/analytics';

interface LeftRailProps {
  currentTopic: Topic;
}

// Igbo: ebe nchekwa nke ihe nzuzo
export default function LeftRail({ currentTopic }: LeftRailProps) {
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const { isRead, isInitialized } = useReadStatus();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Save scroll position to sessionStorage on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScroll = () => {
        sessionStorage.setItem('leftRailScroll', String(container.scrollTop));
      };
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Restore scroll position from sessionStorage on mount
  useEffect(() => {
    const container = scrollContainerRef.current;
    const saved = sessionStorage.getItem('leftRailScroll');
    if (container && saved) {
      container.scrollTop = parseInt(saved, 10);
    }
  }, []);

  // Check unlock status on mount (only runs once on client)
  useEffect(() => {
    const unlocked = localStorage.getItem('secretUnlocked') === 'true';
    setIsUnlocked(unlocked);
    setIsHydrated(true);
  }, []);

  // Track hash changes for highlighting active anchor
  useEffect(() => {
    function updateHash() {
      setCurrentHash(window.location.hash.slice(1));
    }
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  // Filter topics based on unlock status
  const visibleTopics = topics.filter(t => {
    if (t.tags.includes('secret')) {
      return isUnlocked;
    }
    return true;
  });

  // Group topics by section
  const groupedTopics: { [key: string]: typeof visibleTopics } = {};
  visibleTopics.forEach(t => {
    const section = t.section || 'Other';
    if (!groupedTopics[section]) {
      groupedTopics[section] = [];
    }
    groupedTopics[section].push(t);
  });

  // Explicit section ordering
  const SECTION_ORDER = [
    'Autism',
    'Chemical Exposure',
    'Food Contamination',
    'Nutrition',
    'Health Basics',
    'Water Contamination',
    'Materials',
  ];

  const sortedSections = Object.entries(groupedTopics).sort(([a], [b]) => {
    const aIndex = SECTION_ORDER.indexOf(a);
    const bIndex = SECTION_ORDER.indexOf(b);
    // Unlisted sections go to the end
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  // Handle click on grouped topics - manually update hash for same-page navigation
  function handleGroupedTopicClick(t: Topic) {
    // If we're already on the host page, manually update the hash state
    // since Next.js Link doesn't fire hashchange for same-page hash changes
    if (t.groupHost === currentTopic.id) {
      setCurrentHash(t.id);
    }
  }

  // Handle click on host topics - scroll to top if already on that page
  function handleHostTopicClick(t: Topic, e: React.MouseEvent) {
    // Check if we're already on this host's page (either as host or viewing a grouped topic)
    const isOnThisPage = t.id === currentTopic.id;
    if (isOnThisPage && currentHash) {
      // We're on the page with a hash, need to scroll to top
      e.preventDefault();
      setCurrentHash('');
      window.history.pushState(null, '', `/${t.id}`);
      // Find the scroll container and scroll to top
      const scrollContainer = document.querySelector('[style*="overflow: auto"]');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="desktop-only"
        style={{
          width: '200px',
          borderRight: '1px solid #222',
          overflowY: 'auto',
          flexShrink: 0,
        }}
      >
        {/* Single scrollable list */}
        <div style={{
          padding: '12px 0',
        }}>
          {/* Title - clickable to go home */}
          <Link
            href="/"
            style={{
              display: 'block',
              padding: '20px 16px',
              marginBottom: '12px',
              textDecoration: 'none',
            }}
          >
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '18px',
              fontWeight: '700',
              color: '#fff',
              letterSpacing: '2px',
              lineHeight: 1.2,
            }}>
              IS<br />THIS<br />HERESY?
            </div>
          </Link>

          {/* Topics grouped by section */}
          {sortedSections.map(([sectionName, sectionTopics]) => (
            <div key={sectionName}>
              {/* Section header */}
              <div style={{
                padding: '16px 16px 8px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                fontWeight: '700',
                color: '#888',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                borderBottom: '1px solid #444',
                marginRight: '16px',
              }}>
                {sectionName}
              </div>

              {/* Topics in this section */}
              {sectionTopics.map((t) => {
                const displayLabel = t.brickTitle.length > 15
                  ? t.brickTitle.slice(0, 15) + '…'
                  : t.brickTitle;
                const hostTopic = getHostTopic(t);
                const isGrouped = !!t.groupHost;
                const isHost = !isGrouped && topics.some(x => x.groupHost === t.id);

                // Determine if this topic is active
                let isActive = false;
                if (isGrouped) {
                  // Grouped topic: active if hash matches this topic's id
                  isActive = currentHash === t.id;
                } else if (isHost) {
                  // Host topic: active if we're on this page AND no hash OR at top
                  isActive = t.id === currentTopic.id && (!currentHash || currentHash === t.id);
                } else {
                  // Standalone topic: active if we're on this page
                  isActive = t.id === currentTopic.id;
                }

                const isSecret = t.tags.includes('secret');
                const hasBeenRead = isInitialized && isRead(t.id);

                // Determine text color: active=red, read=green, secret=gold, default=white
                let textColor = '#fff';
                if (isActive) textColor = '#dc2626';
                else if (hasBeenRead) textColor = '#22c55e';
                else if (isSecret) textColor = '#d4af37';

                return (
                  <Link
                    key={t.id}
                    href={getTopicUrl(t)}
                    onClick={(e) => {
                      if (isGrouped) handleGroupedTopicClick(t);
                      if (isHost) handleHostTopicClick(t, e);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                      border: 'none',
                      borderLeft: isActive ? '3px solid #dc2626' : '3px solid transparent',
                      padding: '12px 16px',
                      paddingLeft: isGrouped ? '28px' : '16px', // Indent grouped topics
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: isGrouped ? '12px' : '14px', // Slightly smaller for grouped
                      fontWeight: isActive ? '700' : '400',
                      color: textColor,
                      letterSpacing: '1px',
                      transition: 'none',
                      textDecoration: 'none',
                    }}
                  >
                    {displayLabel}
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Other section */}
          <div>
            {/* Section header */}
            <div style={{
              padding: '16px 16px 8px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              fontWeight: '700',
              color: '#888',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              borderBottom: '1px solid #444',
              marginRight: '16px',
            }}>
              Other
            </div>

            {/* Glossary link */}
            <Link
              href="/glossary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                background: currentTopic.id === 'glossary' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                border: 'none',
                borderLeft: currentTopic.id === 'glossary' ? '3px solid #dc2626' : '3px solid transparent',
                padding: '12px 16px',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                fontWeight: currentTopic.id === 'glossary' ? '700' : '400',
                color: currentTopic.id === 'glossary' ? '#dc2626' : '#fff',
                letterSpacing: '1px',
                textDecoration: 'none',
              }}
            >
              GLOSSARY
            </Link>

            {/* Secret item - commented out until we have secret pages */}
            {/* {isHydrated && !isUnlocked && (
              <button
                onClick={() => setShowPasscodeModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderLeft: '3px solid transparent',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#d4af37',
                  letterSpacing: '1px',
                  transition: 'all 0.1s ease',
                }}
              >
                SECRET
              </button>
            )} */}

            {/* Request button */}
            <button
              onClick={() => setShowRequestModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderLeft: '3px solid transparent',
                padding: '12px 16px',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                fontWeight: '400',
                color: '#fff',
                letterSpacing: '1px',
                transition: 'all 0.1s ease',
              }}
            >
              REQUEST
            </button>
          </div>

          {/* Bottom spacer for scroll clearance */}
          <div style={{ height: '80px' }} />
        </div>
      </div>

      {/* Passcode Modal */}
      {showPasscodeModal && (
        <PasscodeModal
          onClose={() => setShowPasscodeModal(false)}
          onUnlock={() => {
            setIsUnlocked(true);
            setShowPasscodeModal(false);
          }}
        />
      )}

      {/* Request Modal */}
      {showRequestModal && (
        <RequestModal
          onClose={() => setShowRequestModal(false)}
        />
      )}
    </>
  );
}

// Yorùbá: ọ̀nà àbáyọ fún àwọn ohun tí a fi pamọ́
function PasscodeModal({ onClose, onUnlock }: { onClose: () => void; onUnlock: () => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '6739') {
      localStorage.setItem('secretUnlocked', 'true');
      trackPasscodeAttempt(true);
      trackPasscodeUnlock();
      onUnlock();
    } else {
      trackPasscodeAttempt(false);
      setError('Invalid passcode');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#111',
          border: '1px solid #333',
          borderRadius: '12px',
          padding: '32px',
          maxWidth: '300px',
          width: '100%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '20px',
          fontWeight: '700',
          color: '#d4af37',
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          ENTER PASSCODE
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="••••"
            autoFocus
            style={{
              width: '100%',
              background: '#000',
              border: '1px solid #444',
              borderRadius: '8px',
              padding: '16px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '32px',
              fontWeight: '700',
              color: '#fff',
              textAlign: 'center',
              letterSpacing: '12px',
              marginBottom: '16px',
            }}
          />
          {error && (
            <div style={{
              color: '#dc2626',
              fontSize: '12px',
              textAlign: 'center',
              marginBottom: '12px',
              fontFamily: "'Space Mono', monospace",
            }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              background: '#d4af37',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '14px',
              fontWeight: '700',
              color: '#000',
              cursor: 'pointer',
            }}
          >
            UNLOCK
          </button>
        </form>
      </div>
    </div>
  );
}

// Igbo: ebe ịchọrọ ihe
function RequestModal({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    if (status !== 'loading') {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setErrorMessage('Please enter a request');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      trackRequestSubmit(true);
      setStatus('success');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      trackRequestSubmit(false, err.message);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: '#111',
          border: '1px solid #333',
          borderRadius: '12px',
          padding: '32px',
          maxWidth: '400px',
          width: '100%',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '20px',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            opacity: status === 'loading' ? 0.5 : 1,
            padding: '4px',
            lineHeight: 1,
          }}
        >
          ×
        </button>
        <h2 style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '18px',
          fontWeight: '700',
          color: '#fff',
          marginBottom: '16px',
        }}>
          REQUEST INFOGRAPHIC
        </h2>
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '12px',
          color: '#888',
          marginBottom: '24px',
          lineHeight: 1.5,
        }}>
          What topic would you like to see covered?
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your request..."
            autoFocus
            disabled={status !== 'idle'}
            style={{
              width: '100%',
              background: '#000',
              border: '1px solid #444',
              borderRadius: '8px',
              padding: '12px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '14px',
              color: '#fff',
              resize: 'vertical',
              minHeight: '100px',
              marginBottom: '16px',
            }}
          />
          {errorMessage && (
            <div style={{
              color: '#dc2626',
              fontSize: '12px',
              marginBottom: '12px',
              fontFamily: "'Space Mono', monospace",
            }}>
              {errorMessage}
            </div>
          )}
          {status === 'success' && (
            <div style={{
              color: '#22c55e',
              fontSize: '12px',
              marginBottom: '12px',
              fontFamily: "'Space Mono', monospace",
            }}>
              Request submitted successfully!
            </div>
          )}
          <button
            type="submit"
            disabled={status !== 'idle'}
            style={{
              width: '100%',
              background: status === 'idle' ? '#fff' : '#444',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '14px',
              fontWeight: '700',
              color: '#000',
              cursor: status === 'idle' ? 'pointer' : 'not-allowed',
            }}
          >
            {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  );
}
