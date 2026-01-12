'use client';

import Link from 'next/link';
import { topics, Topic } from '@/data/topics';
import { Lock, MessageSquarePlus } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  const { isRead, isInitialized } = useReadStatus();

  // Check unlock status on mount
  useEffect(() => {
    const unlocked = localStorage.getItem('secretUnlocked') === 'true';
    setIsUnlocked(unlocked);
  }, []);

  // Filter topics based on unlock status
  const visibleTopics = topics.filter(t => {
    if (t.tags.includes('secret')) {
      return isUnlocked;
    }
    return true;
  });

  return (
    <>
      <div style={{
        width: '200px',
        borderRight: '1px solid #222',
        overflowY: 'auto',
        flexShrink: 0,
      }}>
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

          {/* All topics */}
          {visibleTopics.map((t) => {
            const displayLabel = t.brickTitle.length > 15
              ? t.brickTitle.slice(0, 15) + '…'
              : t.brickTitle;
            const isActive = t.id === currentTopic.id;
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
                href={`/${t.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #dc2626' : '3px solid transparent',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '400',
                  color: textColor,
                  letterSpacing: '1px',
                  transition: 'all 0.1s ease',
                  textDecoration: 'none',
                }}
              >
                {displayLabel}
              </Link>
            );
          })}

          {/* Secret item (looks like a regular menu item) */}
          {!isUnlocked && (
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
          )}

          {/* Request item (looks like a regular menu item) */}
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
      onClick={onClose}
    >
      <div
        style={{
          background: '#111',
          border: '1px solid #333',
          borderRadius: '12px',
          padding: '32px',
          maxWidth: '400px',
          width: '100%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
