# 🤖 Android Platform Documentation & Optimization Guide

This directory contains Android-specific optimizations, platform detection utilities, styling rules, and debugging checklists for Souvik Kundu's Portfolio web application.

---

## 📌 Overview

Android devices run across thousands of hardware configurations, screen densities, and browser engine variations (primarily Chrome, Samsung Internet, Firefox, and Android WebViews). To ensure a smooth, high-performance user experience across all Android devices, this portfolio implements dedicated Android runtime detection, dynamic layout adjustments, and material-inspired tactile feedback.

---

## 🛠 Architecture & Platform Implementation

### 1. **Utility & Detection Helpers** (`src/utils/android.ts`)
- **`isAndroid()`**: User agent inspection for Android OS.
- **`isAndroidChrome()`**: Specialized check for Chrome browser on Android.
- **`getAndroidVersion()`**: Extracts Android major release version (e.g., Android 12, 13, 14).
- **`applyAndroidOptimizations()`**:
  - Adds `.is-android` and `.is-android-chrome` classes to `<html>`.
  - Sets custom viewport height variable `--android-vh` to prevent sudden layout jumps when the address bar hides/shows on scroll.
- **`triggerAndroidHaptic(durationMs)`**: Invokes `navigator.vibrate()` for subtle tactile feedback on interactive buttons and chips.

### 2. **Android Stylesheet Utilities** (`src/index.css`)
- **Text Rendering**: Sets `-webkit-text-size-adjust: 100%` and `text-rendering: optimizeLegibility`.
- **300ms Tap Delay Elimination**: Uses `touch-action: manipulation` on buttons, anchors, inputs, and selects.
- **Active State Feedback**: Smooth background color transitions on tap (`:active`).
- **Touch Target Standard**: Provides `.min-touch-target` utility guaranteeing $48 \times 48\text{ px}$ target bounds following Material guidelines.
- **Touch-optimized Scrollbars**: Custom styled slim scrollbars tuned for Android Chrome drag interactions.

---

## 📂 Directory Structure

```
android/
├── README.md             # Android architecture & platform guide (this file)
└── debug-checklist.md    # Android QA, browser verification, and performance checklist
```

---

## 🚀 Quick Developer Checklist for Android
- [x] Run `useMobilePlatform()` hook in `src/App.tsx`.
- [x] Verify `.is-android` class is injected into `<html>`.
- [x] Test haptic vibration on physical Android devices.
- [x] Check address bar scroll behavior with `--android-vh`.
