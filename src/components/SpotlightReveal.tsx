import React, { useEffect, useRef, useState } from 'react';

interface Props {
  image: string;
}

export const SpotlightReveal: React.FC<Props> = ({ image }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [transform, setTransform] = useState('none');
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});
  
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
      
      // Fast & responsive lerp (0.10) for immediate cursor feedback
      s.normX += (m.normX - s.normX) * 0.10;
      s.normY += (m.normY - s.normY) * 0.10;

      // Enhanced 3D rotation & translation amplitudes for clearly visible tracking
      const rotY   = s.normX * 24;  // -24deg to +24deg tilt
      const rotX   = -s.normY * 16; // -16deg to +16deg tilt
      const transX = s.normX * 32;  // -32px to +32px pan
      const transY = s.normY * 20;  // -20px to +20px pan
      const scale  = 1 + Math.abs(s.normX * 0.04) + Math.abs(s.normY * 0.04); // subtle 3D depth scale

      setTransform(
        `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0px) scale(${scale.toFixed(3)})`
      );

      // Dynamic light beam shadow following cursor position
      const shadowX = -s.normX * 45;
      const shadowY = -s.normY * 35;
      const orangeIntensity = 0.25 + Math.abs(s.normX) * 0.15;
      
      setGlowStyle({
        filter: `drop-shadow(${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 45px rgba(232,112,42,${orangeIntensity.toFixed(2)})) drop-shadow(0 25px 50px rgba(0,0,0,0.8))`,
      });

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
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-transform duration-75 ease-out"
      style={{ transform: isMobile ? 'none' : transform }}
    >
      <img
        src={image}
        alt="Souvik Kundu"
        style={glowStyle}
        className="h-[82vh] w-auto object-contain opacity-95 transition-all duration-100"
      />
    </div>
  );
};
