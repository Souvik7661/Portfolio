import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown, RotateCcw } from 'lucide-react';

export const IntroVideo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ambientVideoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Approach B: Cinematic Gateway State
  const [hasEntered, setHasEntered] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  // Scroll Progress Hook for smooth transition into main screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Dynamic Scroll Transforms: Smooth scaling and depth handoff into Hero
  const videoScale = useTransform(
    smoothProgress,
    [0, 0.45, 0.85, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [1, 0.96, 0.78, 0.65]
  );

  const videoY = useTransform(
    smoothProgress,
    [0, 0.6, 1],
    prefersReducedMotion ? [0, 0, 0] : [0, -10, -32]
  );

  const videoBorderRadius = useTransform(
    smoothProgress,
    [0, 0.35, 1],
    [16, 24, 38]
  );

  const videoOpacity = useTransform(
    smoothProgress,
    [0, 0.75, 0.95],
    [1, 1, 0]
  );

  // Disable browser scroll restoration to prevent landing halfway down on reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Direct User Activation: Launches unmuted video from 0:00 with full sound
  const handleEnter = () => {
    // Ensure viewport is at top of intro section so opacity is 100% and in view
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    setHasEntered(true);
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1.0;
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Playback error fallback to muted:', err);
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    // Only play ambient background video on desktop/tablets (saves 50% GPU on mobile)
    if (ambientVideoRef.current && window.innerWidth >= 768) {
      ambientVideoRef.current.muted = true;
      ambientVideoRef.current.currentTime = 0;
      ambientVideoRef.current.play().catch(() => {});
    }
  };

  // Keyboard shortcut: Press Enter or Space to enter
  useEffect(() => {
    if (hasEntered) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasEntered]);

  // Video playback listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const v = videoRef.current;
      if (!v) return;
      if (ambientVideoRef.current && Math.abs(ambientVideoRef.current.currentTime - v.currentTime) > 0.35) {
        ambientVideoRef.current.currentTime = v.currentTime;
      }
      if ((v.duration && v.currentTime >= v.duration - 0.35) || v.currentTime >= 9.4 || v.ended) {
        setIsEnded(true);
      }
    };

    const handleEnded = () => {
      setIsEnded(true);
    };

    const handlePlay = () => {
      if (ambientVideoRef.current && ambientVideoRef.current.paused && window.innerWidth >= 768) {
        ambientVideoRef.current.play().catch(() => {});
      }
    };

    const handlePause = () => {
      if (ambientVideoRef.current && !ambientVideoRef.current.paused) {
        ambientVideoRef.current.pause();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate, { passive: true });
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  // Pause video when scrolled past to Hero to save mobile battery & resources
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (val) => {
      const video = videoRef.current;
      if (!video) return;
      if (val >= 0.92) {
        if (!video.paused) video.pause();
      } else if (hasEntered && !isEnded && video.paused) {
        video.play().catch(() => {});
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, hasEntered, isEnded]);

  // Replay Video from start with full audio
  const handleReplay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    setIsEnded(false);
    video.currentTime = 0;
    video.muted = false;
    video.volume = 1.0;
    if (ambientVideoRef.current && window.innerWidth >= 768) {
      ambientVideoRef.current.currentTime = 0;
      ambientVideoRef.current.play().catch(() => {});
    }
    video.play().catch(() => {});
  };

  // Smooth scroll into main screen (#hero)
  const scrollToHero = () => {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="intro"
      ref={containerRef}
      className="relative w-full h-[150vh] sm:h-[180vh] bg-[#070707] text-white selection:bg-[#E8702A] selection:text-white"
      aria-label="Welcome Screen — Souvik Kundu"
    >
      {/* ── STICKY FULLSCREEN VIEWPORT: Welcoming Screen ── */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex items-center justify-center overflow-hidden p-0 bg-black">

        {/* ── CINEMATIC GATEWAY OVERLAY (APPROACH B) ── */}
        <AnimatePresence>
          {!hasEntered && (
            <motion.div
              key="cinematic-gate"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#070707] select-none"
            >
              {/* Gate Ambient Backdrop */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                  src="/images/intro-poster.jpg"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover blur-2xl opacity-15 scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(232,112,42,0.18) 0%, rgba(10,10,10,0.7) 45%, #070707 100%)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95" />
              </div>

              {/* Gate Center Showcase & CTA */}
              <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm sm:max-w-md mx-auto">
                {/* Central Brand Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-4 sm:mb-6 relative"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-b from-[#E8702A] to-transparent shadow-[0_0_35px_rgba(232,112,42,0.45)]">
                    <img
                      src="/images/logo.png"
                      alt="Souvik Kundu"
                      className="w-full h-full rounded-full object-cover border-2 border-black"
                    />
                  </div>
                </motion.div>

                {/* Subtitle */}
                <p className="font-pixel text-[11px] sm:text-xs md:text-sm text-[#E8702A] tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-1.5 sm:mb-2">
                  CREATIVE DEVELOPER &bull; CSE 2028
                </p>

                {/* Main Welcome Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-wide uppercase text-white mb-5 sm:mb-6">
                  SOUVIK <span className="font-pixel text-[#E8702A]">KUNDU</span>
                </h2>

                {/* Primary Enter Button */}
                <motion.button
                  id="enter-btn"
                  onClick={handleEnter}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  whileHover={{ scale: 1.04, boxShadow: '0 0 45px rgba(232,112,42,0.75)' }}
                  whileTap={{ scale: 0.96 }}
                  className="relative group inline-flex items-center gap-2.5 sm:gap-3.5 overflow-hidden border border-[#E8702A] bg-[#E8702A] hover:bg-[#d65f1c] active:bg-[#c25316] px-7 py-3.5 sm:px-9 sm:py-4 rounded-full text-white text-xs sm:text-sm font-mono font-bold tracking-widest uppercase cursor-pointer shadow-[0_0_30px_rgba(232,112,42,0.5)] transition-all duration-300 touch-manipulation"
                >
                  {/* Shimmer Effect */}
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                    }}
                  />
                  <span className="relative">CLICK TO ENTER</span>
                  <ArrowRight size={15} className="relative group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── PORTFOLIO UI AMBIENT ATMOSPHERE ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 bg-[#070707]">
          {/* Ambient blurred video (Desktop only to conserve mobile battery/GPU) */}
          <video
            ref={ambientVideoRef}
            src="/intro.mp4"
            playsInline
            muted
            loop={false}
            aria-hidden="true"
            className="hidden md:block absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 scale-105 pointer-events-none"
          />
          {/* Signature orange ambient spotlight matching Hero */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(232,112,42,0.18) 0%, rgba(10,10,10,0.65) 50%, #070707 100%)',
            }}
          />
          {/* Cinematic top & bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/95" />
        </div>

        {/* ── FULL SCREEN VIDEO (MATCHING PORTFOLIO UI & OPTIMIZED FOR MOBILE) ── */}
        <motion.div
          style={{
            scale: videoScale,
            y: videoY,
            borderRadius: videoBorderRadius,
            opacity: videoOpacity,
          }}
          onClick={handleReplay}
          className="relative z-20 flex items-center justify-center select-none cursor-pointer"
        >
          {/* Responsive Media Frame: Full height on mobile (90dvh), framed on desktop */}
          <div className="relative aspect-[9/16] rounded-2xl md:rounded-3xl border border-white/10 md:border-white/15 overflow-hidden shadow-[0_0_50px_rgba(232,112,42,0.2)] md:shadow-[0_0_80px_rgba(232,112,42,0.25)] ring-1 ring-white/10 bg-black flex items-center justify-center h-[88dvh] sm:h-[88vh] md:h-[90vh] max-h-[820px] max-w-[96vw] sm:max-w-none">
            {/* The Full 1080p 60fps Video (Full Height, completely uncropped) */}
            <video
              id="main-intro-video"
              ref={videoRef}
              src="/intro.mp4"
              poster="/images/intro-poster.jpg"
              playsInline
              preload="auto"
              className="h-full w-full object-cover pointer-events-none"
            />
          </div>
        </motion.div>

        {/* ── ACTION WHEN VIDEO FINISHES (MOBILE & DESKTOP OPTIMIZED) ── */}
        {isEnded && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-6 sm:bottom-10 inset-x-0 z-40 flex flex-col sm:flex-row items-center justify-center gap-3 px-4 pointer-events-auto"
          >
            {/* Primary Action: Explore Portfolio */}
            <button
              onClick={scrollToHero}
              className="cursor-pointer group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#E8702A] hover:bg-[#d65f1c] active:bg-[#c25316] text-white text-xs sm:text-sm font-mono font-bold tracking-widest uppercase shadow-[0_0_35px_rgba(232,112,42,0.7)] transition-all touch-manipulation"
              aria-label="Explore Portfolio"
            >
              <span>EXPLORE PORTFOLIO</span>
              <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform animate-bounce" />
            </button>

            {/* Secondary Action: Replay Video */}
            <button
              onClick={handleReplay}
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 active:bg-white/20 text-white/80 hover:text-white text-xs font-mono tracking-wider uppercase border border-white/10 backdrop-blur-md transition-all touch-manipulation"
              aria-label="Replay intro video"
            >
              <RotateCcw size={13} />
              <span>Replay</span>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};
