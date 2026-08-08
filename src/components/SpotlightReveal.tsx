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

      const rotY   = s.normX * 12;
      const rotX   = -s.normY * 8;
      const transX = s.normX * 16;
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

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      style={{ transform: isMobile ? 'none' : transform }}
    >
      <img
        src={image}
        alt="Souvik Kundu"
        className="h-[80vh] w-auto object-contain opacity-90 drop-shadow-[0_30px_60px_rgba(232,112,42,0.15)]"
      />
    </div>
  );
};
