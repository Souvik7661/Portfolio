import React, { useEffect, useRef, useState } from 'react';

interface Props {
  image: string;
}

export const SpotlightReveal: React.FC<Props> = ({ image }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [transform, setTransform] = useState('none');
  const mouse  = useRef({ normX: 0, normY: 0 });
  const smooth = useRef({ normX: 0, normY: 0 });
  const raf    = useRef<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouse.current = {
        normX: (e.clientX - centerX) / centerX,
        normY: (e.clientY - centerY) / centerY,
      };
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      const s = smooth.current;
      const m = mouse.current;
      s.normX += (m.normX - s.normX) * 0.07;
      s.normY += (m.normY - s.normY) * 0.07;

      const rotY  = s.normX * 12;
      const rotX  = -s.normY * 8;
      const transX = s.normX * 14;
      const transY = s.normY * 10;

      setTransform(
        `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0px)`
      );

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [isMobile]);

  /* 
   * CUTOUT TECHNIQUE:
   * 1. mix-blend-mode: screen  → multiplies light, pure black becomes transparent
   * 2. Tight ellipse mask       → clips the person tightly, fades edges softly
   * 3. contrast + brightness    → pushes the dark room BG to near-black so screen kills it
   *    while keeping the person's face/skin tones visible
   */
  const cutoutStyle: React.CSSProperties = {
    WebkitMaskImage: [
      'radial-gradient(ellipse 52% 72% at 50% 42%, black 55%, rgba(0,0,0,0.6) 72%, transparent 90%)',
    ].join(', '),
    maskImage: [
      'radial-gradient(ellipse 52% 72% at 50% 42%, black 55%, rgba(0,0,0,0.6) 72%, transparent 90%)',
    ].join(', '),
    mixBlendMode: 'screen' as const,
    filter: 'brightness(1.6) contrast(1.4) saturate(1.1)',
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      style={{ transform: isMobile ? 'none' : transform }}
    >
      <img
        src={image}
        alt="Souvik Kundu"
        style={cutoutStyle}
        className="h-[75vh] w-auto object-contain"
      />
    </div>
  );
};
