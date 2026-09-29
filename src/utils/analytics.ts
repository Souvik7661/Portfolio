/**
 * Privacy-First Analytics Utility
 * Dispatches custom events while respecting Do-Not-Track (DNT).
 */

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Respect user's Do Not Track preference
  if (typeof window !== 'undefined' && (navigator.doNotTrack === '1' || (window as any).doNotTrack === '1')) {
    return;
  }

  // Log in development
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event] ${eventName}:`, properties);
  }

  // Hook for Google Analytics 4 (gtag) or Plausible if configured
  if (typeof window !== 'undefined') {
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, properties);
    }
    if ((window as any).plausible) {
      (window as any).plausible(eventName, { props: properties });
    }
  }
};
