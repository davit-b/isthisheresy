// Igbo: usoro maka ịgbakọ ihe omume
// Google Analytics event tracking utility

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, any>
    ) => void;
  }
}

// Track custom events
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

// Specific tracking functions for common events

export function trackBrickClick(topicId: string, topicTitle: string) {
  trackEvent('brick_click', {
    topic_id: topicId,
    topic_title: topicTitle,
  });
}

export function trackVerifyClick(provider: 'chatgpt' | 'gemini' | 'grok', topicId: string) {
  trackEvent('verify_click', {
    ai_provider: provider,
    topic_id: topicId,
  });
}

export function trackPasscodeAttempt(success: boolean) {
  trackEvent('passcode_attempt', {
    success: success,
  });
}

export function trackPasscodeUnlock() {
  trackEvent('secret_unlocked', {});
}

export function trackRequestSubmit(success: boolean, errorMessage?: string) {
  trackEvent('infographic_request', {
    success: success,
    error_message: errorMessage || null,
  });
}

export function trackTopicRead(topicId: string, topicTitle: string) {
  trackEvent('topic_read', {
    topic_id: topicId,
    topic_title: topicTitle,
  });
}

export function trackLanguageChange(fromLang: string, toLang: string) {
  trackEvent('language_change', {
    from_language: fromLang,
    to_language: toLang,
  });
}

export function trackShare(method: string, topicId: string) {
  trackEvent('share', {
    method: method,
    topic_id: topicId,
  });
}
