import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUp, Film } from 'lucide-react';

export const IntroVideo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ambientVideoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Playback & State (Sound ON by default)
  const [isPlaying, setIsPlaying] = useState(true);
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
  // Starts 100% full screen (scale 1.0, borderRadius 0) then smoothly transforms
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

    // Guarantee immediate playback across Safari, Chrome, iOS & Android
    video.defaultMuted = true;
    video.muted = true;

    const playVideos = () => {
      const v = videoRef.current;
      if (!v) return;
      const p = v.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => {});
      }
      if (ambientVideoRef.current && ambientVideoRef.current.paused) {
        ambientVideoRef.current.play().catch(() => {});
      }
    };

    playVideos();
    video.addEventListener('loadedmetadata', playVideos, { once: true });
    video.addEventListener('canplay', playVideos, { once: true });

    // Automatically unmute and ensure playback upon the very first user interaction anywhere
    const unlockSound = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = false;
      v.volume = 1.0;
      // If user interacted early, restart from 0:00 so they hear the full soundtrack
      if (v.currentTime < 3.0) {
        v.currentTime = 0;
      }
      if (v.paused) {
        v.play().catch(() => {});
      }
    };

    window.addEventListener('click', unlockSound, { once: true });
    window.addEventListener('keydown', unlockSound, { once: true });
    window.addEventListener('touchstart', unlockSound, { once: true });
    window.addEventListener('pointerdown', unlockSound, { once: true });

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeked', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadedmetadata', playVideos);
      video.removeEventListener('canplay', playVideos);
      window.removeEventListener('click', unlockSound);
      window.removeEventListener('keydown', unlockSound);
      window.removeEventListener('touchstart', unlockSound);
      window.removeEventListener('pointerdown', unlockSound);
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
    if (ambientVideoRef.current) ambientVideoRef.current.currentTime = 0;
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
                muted
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
