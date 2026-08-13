import { useEffect, useState } from 'react';
import { applyIOSOptimizations, isIOS } from '../utils/ios';
import { applyAndroidOptimizations, isAndroid } from '../utils/android';

export interface MobilePlatformState {
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
}

export const useMobilePlatform = (): MobilePlatformState => {
  const [platformState, setPlatformState] = useState<MobilePlatformState>({
    isIOS: false,
    isAndroid: false,
    isMobile: false,
  });

  useEffect(() => {
    applyIOSOptimizations();
    applyAndroidOptimizations();

    const ios = isIOS();
    const android = isAndroid();

    setPlatformState({
      isIOS: ios,
      isAndroid: android,
      isMobile: ios || android,
    });
  }, []);

  return platformState;
};
