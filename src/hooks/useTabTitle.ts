import { useEffect } from 'react';

/**
 * Custom Tab Title hook: Changes document title when user switches away
 * to create an engaging, delightful micro-interaction.
 */
export const useTabTitle = () => {
  useEffect(() => {
    const originalTitle = 'Souvik Kundu — Creative Developer & Software Engineer';
    const awayTitle = 'Come back! 👋 — Souvik Kundu';

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = awayTitle;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.title = originalTitle;
    };
  }, []);
};
