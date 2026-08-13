/**
 * iOS Platform Utilities & Device Optimization Helpers
 * Designed for Souvik Kundu's Portfolio
 */

/**
 * Checks if the current user agent is running on an iOS device (iPhone, iPad, iPod)
 */
export const isIOS = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};

/**
 * Checks specifically for iPhone devices
 */
export const isIPhone = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return /iPhone/.test(navigator.userAgent);
};

/**
 * Checks specifically for iPad devices
 */
export const isIPad = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return (
    /iPad/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};

/**
 * Detects iOS major version (e.g. 17, 18)
 */
export const getIOSVersion = (): number | null => {
  if (!isIOS()) return null;
  const match = navigator.userAgent.match(/OS (\d+)_/);
  return match ? parseInt(match[1], 10) : null;
};

/**
 * Applies iOS-specific CSS class markers and fixes to document elements
 */
export const applyIOSOptimizations = (): void => {
  if (typeof document === 'undefined') return;

  if (isIOS()) {
    document.documentElement.classList.add('is-ios');

    if (isIPhone()) {
      document.documentElement.classList.add('is-iphone');
    }

    if (isIPad()) {
      document.documentElement.classList.add('is-ipad');
    }

    // Prevent iOS rubber-band overscroll glitch on full page apps if needed
    document.documentElement.style.setProperty('--ios-viewport-height', `${window.innerHeight}px`);

    const updateIOSHeight = () => {
      document.documentElement.style.setProperty('--ios-viewport-height', `${window.innerHeight}px`);
    };

    window.addEventListener('resize', updateIOSHeight, { passive: true });
    window.addEventListener('orientationchange', updateIOSHeight, { passive: true });
  }
};

/**
 * Configuration options for future iOS-specific custom behavior
 */
export const iosConfig = {
  enableSmoothTouchScroll: true,
  preventInputAutoZoom: true,
  safeAreaPaddingDefault: true,
  hapticFeedbackEnabled: true,
};
