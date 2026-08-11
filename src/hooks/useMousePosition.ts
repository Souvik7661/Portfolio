import { useState, useEffect } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to +1 relative to screen center
  normalizedY: number; // -1 to +1 relative to screen center
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const normX = (ev.clientX - centerX) / centerX;
      const normY = (ev.clientY - centerY) / centerY;

      setMousePosition({
        x: ev.clientX,
        y: ev.clientY,
        normalizedX: normX,
        normalizedY: normY,
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
}
