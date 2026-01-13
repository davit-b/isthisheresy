'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { topics, Topic, getTopicUrl, getHostTopic } from '@/data/topics';
import { useState, useEffect } from 'react';
import { useReadStatus } from '@/hooks/useReadStatus';
import { trackPasscodeAttempt, trackPasscodeUnlock, trackRequestSubmit } from '@/lib/analytics';

interface MobileMenuProps {
  currentTopic: Topic;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ currentTopic, isOpen, onClose }: MobileMenuProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const { isRead, isInitialized } = useReadStatus();

  useEffect(() => {
    const unlocked = localStorage.getItem('secretUnlocked') === 'true';
    setIsUnlocked(unlocked);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    function updateHash() {
      setCurrentHash(window.location.hash.slice(1));
    }
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

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

  function handleTopicClick(t: Topic, e: React.MouseEvent, isHost: boolean) {
    // Update hash for same-page navigation (grouped topic)
    if (t.groupHost === currentTopic.id) {
      setCurrentHash(t.id);
    }

    // Handle host topic click - scroll to top if already on that page with a hash
    if (isHost && t.id === currentTopic.id && currentHash) {
      e.preventDefault();
      setCurrentHash('');
      window.history.pushState(null, '', `/${t.id}`);
      // Find the scroll container and scroll to top
      const scrollContainer = document.querySelector('[style*="overflow: auto"]');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    onClose();
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.98)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header with close button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid #222',
      }}>
        <Link
          href="/"
          onClick={onClose}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '16px',
            fontWeight: '700',
            color: '#fff',
            letterSpacing: '2px',
            textDecoration: 'none',
          }}
        >
          IS THIS HERESY?
        </Link>
        <button
          onClick={onClose}
          aria-label="Close menu"
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
          <X size={22} />
        </button>
      </div>

      {/* Scrollable topic list */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 0',
      }}>
        {Object.entries(groupedTopics).map(([sectionName, sectionTopics]) => (
          <div key={sectionName}>
            {/* Section header */}
            <div style={{
              padding: '16px 20px 8px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
              fontWeight: '700',
              color: '#666',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}>
              {sectionName}
            </div>

            {/* Topics */}
            {sectionTopics.map((t) => {
              const isGrouped = !!t.groupHost;
              const isHost = !isGrouped && topics.some(x => x.groupHost === t.id);

              let isActive = false;
              if (isGrouped) {
                isActive = currentHash === t.id;
              } else if (isHost) {
                isActive = t.id === currentTopic.id && (!currentHash || currentHash === t.id);
              } else {
                isActive = t.id === currentTopic.id;
              }

              const isSecret = t.tags.includes('secret');
              const hasBeenRead = isInitialized && isRead(t.id);

              let textColor = '#fff';
              if (isActive) textColor = '#dc2626';
              else if (hasBeenRead) textColor = '#22c55e';
              else if (isSecret) textColor = '#d4af37';

              return (
                <Link
                  key={t.id}
                  href={getTopicUrl(t)}
                  onClick={(e) => handleTopicClick(t, e, isHost)}
                  style={{
                    display: 'block',
                    padding: '14px 20px',
                    paddingLeft: isGrouped ? '36px' : '20px',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: isGrouped ? '13px' : '15px',
                    fontWeight: isActive ? '700' : '400',
                    color: textColor,
                    letterSpacing: '1px',
                    textDecoration: 'none',
                    borderLeft: isActive ? '3px solid #dc2626' : '3px solid transparent',
                    background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  }}
                >
                  {t.brickTitle}
                </Link>
              );
            })}
          </div>
        ))}

        {/* Glossary */}
        <div>
          <div style={{
            padding: '16px 20px 8px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            fontWeight: '700',
            color: '#666',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}>
            Other
          </div>
          <Link
            href="/glossary"
            onClick={onClose}
            style={{
              display: 'block',
              padding: '14px 20px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '15px',
              fontWeight: currentTopic.id === 'glossary' ? '700' : '400',
              color: currentTopic.id === 'glossary' ? '#dc2626' : '#fff',
              letterSpacing: '1px',
              textDecoration: 'none',
              borderLeft: currentTopic.id === 'glossary' ? '3px solid #dc2626' : '3px solid transparent',
            }}
          >
            GLOSSARY
          </Link>

          {/* Secret button - only show if not unlocked */}
          {isHydrated && !isUnlocked && (
            <button
              onClick={() => setShowPasscodeModal(true)}
              style={{
                display: 'block',
                width: '100%',
                padding: '14px 20px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '15px',
                fontWeight: '400',
                color: '#d4af37',
                letterSpacing: '1px',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                borderLeft: '3px solid transparent',
                cursor: 'pointer',
              }}
            >
              SECRET
            </button>
          )}

          {/* Request button */}
          <button
            onClick={() => setShowRequestModal(true)}
            style={{
              display: 'block',
              width: '100%',
              padding: '14px 20px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '15px',
              fontWeight: '400',
              color: '#fff',
              letterSpacing: '1px',
              textAlign: 'left',
              background: 'transparent',
              border: 'none',
              borderLeft: '3px solid transparent',
              cursor: 'pointer',
            }}
          >
            REQUEST
          </button>

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
    </div>
  );
}

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
        zIndex: 1001,
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
          width: '90%',
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
        zIndex: 1001,
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
          width: '90%',
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
