/**
 * Android Platform Utilities & Device Optimization Helpers
 * Designed for Souvik Kundu's Portfolio
 */

/**
 * Checks if the current user agent is running on an Android device
 */
export const isAndroid = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
};

/**
 * Checks if running specifically inside Android Chrome
 */
export const isAndroidChrome = (): boolean => {
  if (!isAndroid()) return false;
  return /Chrome/i.test(navigator.userAgent) && !/Version/i.test(navigator.userAgent);
};

/**
 * Detects Android OS major version (e.g. 13, 14, 15)
 */
export const getAndroidVersion = (): number | null => {
  if (!isAndroid()) return null;
  const match = navigator.userAgent.match(/Android\s([0-9\.]Browser|[0-9\.]+)/i);
  return match ? parseInt(match[1], 10) : null;
};

/**
 * Applies Android-specific CSS class markers and fixes to document elements
 */
export const applyAndroidOptimizations = (): void => {
  if (typeof document === 'undefined') return;

  if (isAndroid()) {
    document.documentElement.classList.add('is-android');

    if (isAndroidChrome()) {
      document.documentElement.classList.add('is-android-chrome');
    }

    // Dynamic viewport height fix for Android address bar hiding/showing
    const updateAndroidViewport = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--android-vh', `${vh}px`);
    };

    updateAndroidViewport();
    window.addEventListener('resize', updateAndroidViewport, { passive: true });
  }
};

/**
 * Triggers a short vibration on supported Android devices for tactile feedback
 */
export const triggerAndroidHaptic = (durationMs: number = 15): void => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator && isAndroid()) {
    try {
      navigator.vibrate(durationMs);
    } catch {
      // Ignore if vibration permissions or capability fails
    }
  }
};

/**
 * Configuration options for future Android-specific custom behavior
 */
export const androidConfig = {
  enableMaterialTouchFeedback: true,
  enableHaptics: true,
  minTouchTargetSizePx: 48,
  optimizeChromeScroll: true,
};
