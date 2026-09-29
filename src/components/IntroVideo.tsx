import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUp, ArrowRight, Volume2, Film } from 'lucide-react';

export const IntroVideo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ambientVideoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Approach B: Cinematic Gateway State
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  // Scroll Progress Hook for smooth transition into main screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Dynamic Scroll Transforms: Smooth scaling and depth handoff into Hero
  const videoScale = useTransform(
    smoothProgress,
    [0, 0.45, 0.85, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [1, 0.95, 0.75, 0.65]
  );

  const videoY = useTransform(
    smoothProgress,
    [0, 0.6, 1],
    prefersReducedMotion ? [0, 0, 0] : [0, -10, -35]
  );

  const videoRotateX = useTransform(
    smoothProgress,
    [0, 0.6, 1],
    prefersReducedMotion ? [0, 0, 0] : [0, 2, 5]
  );

  const videoBorderRadius = useTransform(
    smoothProgress,
    [0, 0.4, 1],
    [0, 24, 38]
  );

  const videoOpacity = useTransform(
    smoothProgress,
    [0, 0.75, 0.95],
    [1, 1, 0]
  );

  const welcomeElementsOpacity = useTransform(
    smoothProgress,
    [0, 0.25],
    [1, 0]
  );

  const transitionBannerOpacity = useTransform(
    smoothProgress,
    [0.4, 0.65, 0.85],
    [0, 1, 0]
  );

  const transitionBannerY = useTransform(
    smoothProgress,
    [0.45, 0.75],
    [30, 0]
  );

  // Direct User Activation: Launches unmuted video from 0:00 with full sound
  const handleEnter = () => {
    setHasEntered(true);
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1.0;
    video.currentTime = 0;
    video.play().then(() => setIsPlaying(true)).catch(() => {});
    if (ambientVideoRef.current) {
      ambientVideoRef.current.currentTime = 0;
      ambientVideoRef.current.play().catch(() => {});
    }
  };

  // Keyboard shortcut: Press Enter or Space to enter with sound
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasEntered && (e.key === 'Enter' || e.key === ' ')) {
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
      if (ambientVideoRef.current && Math.abs(ambientVideoRef.current.currentTime - v.currentTime) > 0.3) {
        ambientVideoRef.current.currentTime = v.currentTime;
      }
      // Trigger ended state when video reaches the final moments
      if ((v.duration && v.currentTime >= v.duration - 0.4) || v.currentTime >= 9.2 || v.ended) {
        setIsEnded(true);
      }
    };

    const handleEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      if (ambientVideoRef.current && ambientVideoRef.current.paused) {
        ambientVideoRef.current.play().catch(() => {});
      }
    };
    const handlePause = () => {
      setIsPlaying(false);
      if (ambientVideoRef.current && !ambientVideoRef.current.paused) {
        ambientVideoRef.current.pause();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('seeked', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeked', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  // Track scroll position to pause video when user reaches main content
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (val) => {
      const video = videoRef.current;
      if (!video) return;

      const past = val >= 0.95;
      setIsScrolledPast(past);

      if (past) {
        if (!video.paused) {
          video.pause();
        }
      } else {
        if (video.paused && !isEnded && isPlaying) {
          video.play().catch(() => {});
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isPlaying, isEnded]);


  // Replay Video from start
  const handleReplay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    setIsEnded(false);
    videoRef.current.currentTime = 0;
    videoRef.current.muted = false;
    videoRef.current.volume = 1.0;
    if (ambientVideoRef.current) {
      ambientVideoRef.current.currentTime = 0;
      ambientVideoRef.current.play().catch(() => {});
    }
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  // Smooth scroll into main screen (#hero)
  const scrollToHero = () => {
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 1.8, behavior: 'smooth' });
    }
  };

  // Smooth scroll back to top (#intro)
  const scrollToIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleReplay();
  };

  return (
    <>
      <section
        id="intro"
        ref={containerRef}
        className="relative w-full h-[180vh] sm:h-[190vh] bg-[#070707] text-white selection:bg-[#E8702A] selection:text-white"
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
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 bg-[#070707] select-none"
              >
                {/* Gate Ambient Backdrop */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <img
                    src="/images/intro-poster.jpg"
                    alt="Atmosphere"
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

                {/* Gate Top Header */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/logo.png"
                      alt="Souvik Kundu"
                      className="w-9 h-9 rounded-full object-cover border border-white/25 shadow-lg ring-1 ring-[#E8702A]/30"
                    />
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="font-bold tracking-widest text-xs uppercase text-white font-sans">
                        SOUVIK
                      </span>
                      <span className="font-pixel text-sm text-[#E8702A] tracking-wider uppercase">
                        KUNDU
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[10px] text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8702A] animate-ping" />
                    <span>1080P &bull; 60FPS</span>
                  </div>
                </div>

                {/* Gate Center Showcase & CTA */}
                <div className="relative z-10 flex flex-col items-center text-center my-auto px-4 max-w-xl mx-auto">
                  {/* Central Brand Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6 relative"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-b from-[#E8702A] to-transparent shadow-[0_0_40px_rgba(232,112,42,0.4)]">
                      <img
                        src="/images/logo.png"
                        alt="Souvik Kundu"
                        className="w-full h-full rounded-full object-cover border-2 border-black"
                      />
                    </div>
                  </motion.div>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="font-pixel text-xs sm:text-sm text-[#E8702A] tracking-[0.25em] uppercase mb-2"
                  >
                    CREATIVE DEVELOPER &bull; CSE 2028
                  </motion.p>

                  {/* Main Welcome Heading */}
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide uppercase text-white mb-6"
                  >
                    SOUVIK <span className="font-pixel text-[#E8702A]">KUNDU</span>
                  </motion.h1>

                  {/* Primary Enter Button */}
                  <motion.button
                    id="enter-with-sound-btn"
                    onClick={handleEnter}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(232,112,42,0.8)' }}
                    whileTap={{ scale: 0.96 }}
                    className="relative group inline-flex items-center gap-3.5 overflow-hidden border border-[#E8702A] bg-[#E8702A] hover:bg-[#d65f1c] px-9 py-4 rounded-full text-white text-xs sm:text-sm font-mono font-bold tracking-widest uppercase cursor-pointer shadow-[0_0_35px_rgba(232,112,42,0.55)] transition-all duration-300"
                  >
                    {/* Shimmer Effect */}
                    <span
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                      }}
                    />
                    <Volume2 size={18} className="animate-pulse" />
                    <span className="relative">ENTER WITH SOUND</span>
                    <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <p className="text-[11px] font-mono text-white/50 mt-4 tracking-wider">
                    Sound enabled &bull; Full stereo experience
                  </p>
                </div>

                {/* Gate Footer Strip */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/40 border-t border-white/10 pt-4">
                  <span>SOUVIK KUNDU ARCHITECTURE</span>
                  <span>PRESS ENTER OR CLICK TO LAUNCH</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── PORTFOLIO UI AMBIENT ATMOSPHERE ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 bg-[#070707]">
            {/* Ambient blurred video extension across entire 13" MacBook display */}
            <video
              ref={ambientVideoRef}
              src="/intro.mp4"
              autoPlay
              playsInline
              muted
              loop={false}
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 scale-105 pointer-events-none"
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

          {/* ── TOP HEADER (CLEAN BRAND LOGO MATCHING PORTFOLIO UI) ── */}
          <motion.div
            style={{ opacity: welcomeElementsOpacity }}
            className="absolute top-0 inset-x-0 z-40 flex items-center justify-between px-6 sm:px-10 py-5 select-none pointer-events-none"
          >
            {/* Authentic Portfolio Brand Logo & Name */}
            <div className="flex items-center gap-3 pointer-events-auto">
              <img
                src="/images/logo.png"
                alt="Souvik Kundu Logo"
                className="w-9 h-9 rounded-full object-cover border border-white/25 shadow-lg ring-1 ring-[#E8702A]/30"
              />
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-bold tracking-widest text-xs uppercase text-white font-sans">
                  SOUVIK
                </span>
                <span className="font-pixel text-sm text-[#E8702A] tracking-wider uppercase">
                  KUNDU
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── FULL SCREEN VIDEO (MATCHING PORTFOLIO UI) ── */}
          <motion.div
            style={{
              scale: videoScale,
              y: videoY,
              rotateX: videoRotateX,
              borderRadius: videoBorderRadius,
              opacity: videoOpacity,
              perspective: 1200,
            }}
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              if (v.paused) {
                v.play().catch(() => {});
              }
              v.muted = false;
              v.volume = 1.0;
            }}
            className="relative z-20 flex items-center justify-center select-none cursor-pointer"
          >
            {/* Elegant Media Frame matching Portfolio About & Hero style */}
            <div className="relative rounded-2xl md:rounded-3xl border border-white/15 overflow-hidden shadow-[0_0_80px_rgba(232,112,42,0.25)] ring-1 ring-white/10 bg-black flex items-center justify-center h-[88vh] md:h-[90vh] max-h-[820px]">
              {/* The Full 1080p 60fps Video (Full Height, completely uncropped from head to shoes to Porsche) */}
              <video
                id="main-intro-video"
                ref={videoRef}
                src="/intro.mp4"
                poster="/images/intro-poster.jpg"
                autoPlay
                playsInline
                preload="auto"
                className="h-full w-auto object-contain"
              />
            </div>
          </motion.div>

          {/* ── MESSAGE TO SCROLL UP (Appears when video finishes) ── */}
          <motion.div
            style={{ opacity: welcomeElementsOpacity }}
            className="absolute bottom-8 sm:bottom-12 inset-x-0 z-40 flex flex-col items-center justify-center pointer-events-none"
          >
            {isEnded && (
              <motion.button
                onClick={scrollToHero}
                initial={{ opacity: 0, y: 16, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="pointer-events-auto cursor-pointer group flex flex-col items-center"
                aria-label="Scroll up to enter portfolio"
              >
                <div className="px-8 py-3.5 rounded-full bg-[#E8702A] hover:bg-[#d65f1c] text-white text-xs sm:text-sm font-mono font-bold tracking-widest uppercase flex items-center gap-3 shadow-[0_0_35px_rgba(232,112,42,0.85)] transition-all">
                  <span>Scroll Up to Enter</span>
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowUp size={16} />
                  </motion.span>
                </div>
                <p className="text-[11px] font-mono text-white/70 mt-2 tracking-wider drop-shadow-md">
                  Swipe up or scroll to enter portfolio
                </p>
              </motion.button>
            )}
          </motion.div>

          {/* ── SCROLL-DRIVEN TRANSITION BANNER (Smoothly reveals as you scroll) ── */}
          <motion.div
            style={{
              opacity: transitionBannerOpacity,
              y: transitionBannerY,
            }}
            className="absolute bottom-8 z-30 pointer-events-none text-center px-4"
          >
            <p className="font-pixel text-xs text-[#E8702A] tracking-widest uppercase mb-1">
              PORTFOLIO INITIALIZED
            </p>
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-white">
              Entering <span className="font-pixel text-[#E8702A]">Souvik Kundu</span> Architecture
            </h2>
          </motion.div>

        </div>
      </section>

      {/* ── FLOATING "WATCH INTRO" BUTTON (Appears once in main portfolio) ── */}
      <motion.button
        onClick={scrollToIntro}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{
          opacity: isScrolledPast ? 1 : 0,
          scale: isScrolledPast ? 1 : 0.8,
          y: isScrolledPast ? 0 : 20,
          pointerEvents: isScrolledPast ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(232,112,42,0.5)' }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-[90] flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0D0D12]/90 hover:bg-[#E8702A] text-white text-xs font-mono font-semibold tracking-wider uppercase border border-white/20 hover:border-[#E8702A] shadow-2xl backdrop-blur-md transition-colors cursor-pointer group"
        aria-label="Scroll back up to watch intro video"
      >
        <Film size={14} className="text-[#E8702A] group-hover:text-white transition-colors" />
        <span className="hidden sm:inline">Watch Intro</span>
      </motion.button>
    </>
  );
};
