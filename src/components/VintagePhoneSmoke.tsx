import React, { useEffect, useRef } from 'react';

export const VintagePhoneSmoke: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    // Particle system for glowing smoke
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];

    const spawnParticle = () => {
      const originX = width * 0.35;
      const originY = height * 0.4;
      particles.push({
        x: originX + (Math.random() - 0.5) * 20,
        y: originY + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 0.8 + 0.5,
        vy: -Math.random() * 1.6 - 0.8,
        radius: Math.random() * 25 + 15,
        alpha: Math.random() * 0.45 + 0.25,
        life: 0,
        maxLife: Math.random() * 120 + 80,
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn particles
      if (Math.random() < 0.65) {
        spawnParticle();
      }

      // Update & Draw smoke particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.radius += 0.35;
        p.alpha *= 0.985;

        const progress = p.life / p.maxLife;
        const currentAlpha = p.alpha * (1 - progress);

        if (progress >= 1 || currentAlpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(232, 112, 42, ${currentAlpha * 0.8})`);
        grad.addColorStop(0.5, `rgba(160, 170, 200, ${currentAlpha * 0.35})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#0c0d10] border border-white/10 group shadow-2xl">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity" />

      {/* Smoke Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Vintage Telephone Graphic Illustration */}
      <div className="relative z-20 flex flex-col items-center justify-center p-6 text-center">
        <svg
          viewBox="0 0 512 512"
          className="w-52 h-52 sm:w-64 sm:h-64 drop-shadow-[0_0_35px_rgba(232,112,42,0.35)] transform group-hover:scale-105 transition-transform duration-700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Handset Top Receiver */}
          <path
            d="M120 180 C120 120, 392 120, 392 180 C392 200, 340 190, 320 180 C280 160, 232 160, 192 180 C172 190, 120 200, 120 180 Z"
            fill="#1f2229"
            stroke="#ffffff33"
            strokeWidth="4"
          />
          {/* Left Earpiece */}
          <ellipse cx="140" cy="185" rx="35" ry="20" fill="#2d313b" stroke="#E8702A" strokeWidth="2" />
          {/* Right Earpiece */}
          <ellipse cx="372" cy="185" rx="35" ry="20" fill="#2d313b" stroke="#E8702A" strokeWidth="2" />

          {/* Main Telephone Base Body */}
          <path
            d="M160 220 L352 220 C380 220, 410 260, 420 370 L92 370 C102 260, 132 220, 160 220 Z"
            fill="#14161d"
            stroke="#ffffff22"
            strokeWidth="4"
          />

          {/* Base Bottom Stand */}
          <rect x="80" y="370" width="352" height="30" rx="10" fill="#0d0e12" stroke="#ffffff33" strokeWidth="3" />

          {/* Rotary Dial Ring Outer */}
          <circle cx="256" cy="310" r="55" fill="#252833" stroke="#E8702A" strokeWidth="4" />
          {/* Rotary Dial Center Wheel */}
          <circle cx="256" cy="310" r="22" fill="#0d0e12" stroke="#ffffff44" strokeWidth="2" />

          {/* Rotary Finger Holes */}
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 256 + Math.cos(rad) * 38;
            const cy = 310 + Math.sin(rad) * 38;
            return <circle key={i} cx={cx} cy={cy} r="7" fill="#ffffff" opacity="0.85" />;
          })}

          {/* Coiled Phone Cord Line */}
          <path
            d="M120 200 C 100 240, 80 280, 100 320 C 120 360, 100 390, 90 410"
            stroke="#E8702A"
            strokeWidth="5"
            strokeDasharray="6 4"
            fill="none"
          />
        </svg>

        <span className="mt-2 text-xs font-mono tracking-widest text-white/50 uppercase">
          ANALOG &bull; NEURAL COMMUNICATOR
        </span>
      </div>
    </div>
  );
};
