import React, { useEffect, useRef, useState } from 'react';

interface Props {
  image: string;
}

export const SpotlightReveal: React.FC<Props> = ({ image }) => {
  const [transform, setTransform] = useState('none');
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});
  
  const target  = useRef({ normX: 0, normY: 0 });
  const current = useRef({ normX: 0, normY: 0 });
  const shakeOffset = useRef({ x: 0, y: 0 });
  const raf     = useRef<number | null>(null);

  useEffect(() => {
    // ── 1. Desktop Mouse Movement ──
    const onMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      target.current = {
        normX: (e.clientX - centerX) / centerX,
        normY: (e.clientY - centerY) / centerY,
      };
    };

    // ── 2. Mobile Touch Movement ──
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        target.current = {
          normX: (touch.clientX - centerX) / centerX,
          normY: (touch.clientY - centerY) / centerY,
        };
      }
    };

    // ── 3. Mobile Device Orientation (Gyroscope Tilt for Android & iOS) ──
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left-to-right tilt (-90 to 90)
        // beta: front-to-back tilt (-180 to 180)
        const normX = Math.max(-1, Math.min(1, e.gamma / 35));
        const normY = Math.max(-1, Math.min(1, (e.beta - 45) / 35)); // 45deg standard natural holding angle
        target.current = { normX, normY };
      }
    };

    // ── 4. Mobile Device Motion (Shake Detection for Android & iOS) ──
    let lastX = 0, lastY = 0, lastZ = 0;
    let lastTime = 0;
    const onDeviceMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity || e.acceleration;
      if (!acc) return;

      const currentTime = Date.now();
      if (currentTime - lastTime > 100) {
        const diffTime = currentTime - lastTime;
        lastTime = currentTime;

        const x = acc.x || 0;
        const y = acc.y || 0;
        const z = acc.z || 0;

        const speed = (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;

        if (speed > 800) { // Shake detected!
          shakeOffset.current = {
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 40,
          };
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    // Request orientation permission on iOS 13+ if supported
    const initDeviceSensors = () => {
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as any).requestPermission === 'function'
      ) {
        (DeviceOrientationEvent as any)
          .requestPermission()
          .then((permissionState: string) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', onDeviceOrientation, true);
              window.addEventListener('devicemotion', onDeviceMotion, true);
            }
          })
          .catch(() => {});
      } else {
        window.addEventListener('deviceorientation', onDeviceOrientation, true);
        window.addEventListener('devicemotion', onDeviceMotion, true);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', initDeviceSensors, { once: true });
    initDeviceSensors();

    // ── 5. Main Animation Loop (Spring Interpolation & 3D Render) ──
    const tick = () => {
      const c = current.current;
      const t = target.current;
      const s = shakeOffset.current;
      
      // Decay shake offset
      s.x *= 0.88;
      s.y *= 0.88;

      // Smooth lerp (0.10) for fluid response
      c.normX += (t.normX - c.normX) * 0.10;
      c.normY += (t.normY - c.normY) * 0.10;

      // Calculate 3D tilt & translation values
      const rotY   = c.normX * 24 + s.x * 0.5;  
      const rotX   = -c.normY * 16 + s.y * 0.5; 
      const transX = c.normX * 30 + s.x;  
      const transY = c.normY * 18 + s.y;  
      const scale  = 1 + Math.abs(c.normX * 0.04) + Math.abs(c.normY * 0.04);

      setTransform(
        `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0px) scale(${scale.toFixed(3)})`
      );

      // Dynamic cursor/shake lighting beam
      const shadowX = -c.normX * 40 + s.x;
      const shadowY = -c.normY * 30 + s.y;
      const orangeIntensity = 0.25 + Math.abs(c.normX) * 0.15 + (Math.abs(s.x) > 5 ? 0.3 : 0);
      
      setGlowStyle({
        filter: `drop-shadow(${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 45px rgba(232,112,42,${orangeIntensity.toFixed(2)})) drop-shadow(0 25px 50px rgba(0,0,0,0.85))`,
      });

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('deviceorientation', onDeviceOrientation, true);
      window.removeEventListener('devicemotion', onDeviceMotion, true);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-transform duration-75 ease-out"
      style={{ transform }}
    >
      <img
        src={image}
        alt="Souvik Kundu"
        style={glowStyle}
        className="h-[48vh] sm:h-[68vh] md:h-[82vh] max-h-[750px] w-auto object-contain opacity-90 sm:opacity-95 transition-all duration-100"
      />
    </div>
  );
};
