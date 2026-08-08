import React, { useEffect, useRef, useState } from 'react';

interface Props {
  image: string;
}
const RADIUS = 260;

export const SpotlightReveal: React.FC<Props> = ({ image }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [spotlightMask, setSpotlightMask] = useState<React.CSSProperties>({ opacity: 0 });
  const [headTransform, setHeadTransform] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)');

  const mouse  = useRef({ x: -RADIUS * 4, y: -RADIUS * 4, normX: 0, normY: 0 });
  const smooth = useRef({ x: -RADIUS * 4, y: -RADIUS * 4, normX: 0, normY: 0 });
  const raf    = useRef<number | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    if (!canvas.current) canvas.current = document.createElement('canvas');

    const updateSize = () => {
      if (canvas.current) {
        canvas.current.width  = window.innerWidth;
        canvas.current.height = window.innerHeight;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const onMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouse.current = {
        x: e.clientX,
        y: e.clientY,
        normX: (e.clientX - centerX) / centerX,
        normY: (e.clientY - centerY) / centerY,
      };
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      const s = smooth.current;
      const m = mouse.current;
      
      // Interpolate position & rotation with smooth spring lerp
      s.x += (m.x - s.x) * 0.08;
      s.y += (m.y - s.y) * 0.08;
      s.normX += (m.normX - s.normX) * 0.08;
      s.normY += (m.normY - s.normY) * 0.08;

      const cv = canvas.current!;
      const ctx = cv.getContext('2d')!;
      ctx.clearRect(0, 0, cv.width, cv.height);

      // Create cursor spotlight mask
      const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, RADIUS);
      g.addColorStop(0,    'rgba(255,255,255,1)');
      g.addColorStop(0.40, 'rgba(255,255,255,1)');
      g.addColorStop(0.60, 'rgba(255,255,255,0.75)');
      g.addColorStop(0.75, 'rgba(255,255,255,0.40)');
      g.addColorStop(0.88, 'rgba(255,255,255,0.12)');
      g.addColorStop(1,    'rgba(255,255,255,0)');

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(s.x, s.y, RADIUS, 0, Math.PI * 2);
      ctx.fill();

      const url = cv.toDataURL();
      setSpotlightMask({
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
        opacity: 1,
      });

      // Calculate 3D tilt & translation for head based on mouse
      const rotY = s.normX * 10;
      const rotX = -s.normY * 10;
      const transX = s.normX * 18;
      const transY = s.normY * 18;

      setHeadTransform(
        `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0px)`
      );

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', updateSize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [isMobile]);

  // Soft radial feathering to hide rectangular box background of profile photo
  const featherStyle: React.CSSProperties = {
    WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 45%, black 40%, transparent 95%)',
    maskImage: 'radial-gradient(ellipse 65% 65% at 50% 45%, black 40%, transparent 95%)',
  };

  return (
    <>
      {/* ── Base Head Portrait (Soft Feathered Vignette, No Box Edges) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none pb-10 sm:pb-0 transition-transform duration-75 ease-out"
        style={{ transform: isMobile ? 'none' : headTransform }}
      >
        <div style={featherStyle} className="w-full h-full flex items-center justify-center">
          <img
            src={image}
            alt="Souvik Kundu Portrait"
            className="max-h-[60vh] sm:max-h-[68vh] max-w-[70vw] object-contain opacity-40 filter brightness-[0.8] contrast-[1.1]"
          />
        </div>
      </div>

      {/* ── Spotlight Head Reveal (Soft Feathered Vignette + Cursor Spotlight) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none pb-10 sm:pb-0 transition-transform duration-75 ease-out"
        style={{
          transform: isMobile ? 'none' : headTransform,
          ...spotlightMask,
        }}
      >
        <div style={featherStyle} className="w-full h-full flex items-center justify-center">
          <img
            src={image}
            alt="Souvik Kundu Illuminated Head"
            className="max-h-[60vh] sm:max-h-[68vh] max-w-[70vw] object-contain opacity-95 filter brightness-[1.12] contrast-[1.12] drop-shadow-[0_20px_50px_rgba(232,112,42,0.3)]"
          />
        </div>
      </div>
    </>
  );
};
