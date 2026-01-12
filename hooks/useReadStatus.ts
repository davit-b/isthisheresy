import { useEffect, useState } from 'react';

// Hausa: kula da abin da aka karanta
export function useReadStatus() {
  const [readTopics, setReadTopics] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  // Load read status from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('readTopics');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setReadTopics(new Set(parsed));
      } catch (e) {
        console.error('Failed to parse readTopics from localStorage', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Mark a topic as read
  const markAsRead = (topicId: string) => {
    setReadTopics((prev) => {
      const updated = new Set(prev);
      updated.add(topicId);
      localStorage.setItem('readTopics', JSON.stringify(Array.from(updated)));
      return updated;
    });
  };

  // Check if a topic is read
  const isRead = (topicId: string): boolean => {
    return readTopics.has(topicId);
  };

  // Get read count
  const readCount = readTopics.size;

  return {
    isRead,
    markAsRead,
    readCount,
    isInitialized,
  };
}
