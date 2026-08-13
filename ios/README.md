# 🍎 iOS Platform Documentation & Optimization Guide

This directory contains iOS-specific optimizations, WebKit platform utilities, styling rules, safe-area inset helpers, and debugging checklists for Souvik Kundu's Portfolio web application.

---

## 📌 Overview

Apple iOS devices running Mobile Safari and WebKit (iPhone, iPad, iPod touch) have distinct browser behaviors including notch/Dynamic Island safe-area insets, dynamic browser address bar height changes (`dvh`), momentum scroll dynamics, and auto-zoom triggers on form inputs.

This portfolio includes dedicated WebKit runtime checks, safe-area utility classes, and iOS-tailored CSS variables to deliver a native app-like experience.

---

## 🛠 Architecture & Platform Implementation

### 1. **Utility & Detection Helpers** (`src/utils/ios.ts`)
- **`isIOS()`**: Detects iPhone, iPad, iPod, and iPadOS desktop mode (`MacIntel` with touch points).
- **`isIPhone()`**: Specifically identifies iPhone hardware.
- **`isIPad()`**: Identifies iPad hardware and iPadOS.
- **`getIOSVersion()`**: Extracts major iOS version (e.g., iOS 16, 17, 18).
- **`applyIOSOptimizations()`**:
  - Injects `.is-ios`, `.is-iphone`, or `.is-ipad` classes into `<html>`.
  - Sets custom viewport variable `--ios-viewport-height`.
  - Listens to `resize` and `orientationchange` events to recalibrate layout metrics.

### 2. **iOS Stylesheet Utilities** (`src/index.css`)
- **Safe Area Insets**: Utility classes for iPhone notches, rounded screen corners, and home indicator bars:
  - `.pt-safe` (`padding-top: env(safe-area-inset-top)`)
  - `.pb-safe` (`padding-bottom: env(safe-area-inset-bottom)`)
  - `.pl-safe` (`padding-left: env(safe-area-inset-left)`)
  - `.pr-safe` (`padding-right: env(safe-area-inset-right)`)
- **Dynamic Viewport Height**: `.min-h-ios-dvh` (`min-height: 100dvh`) preventing bottom navigation bar cutoff.
- **Momentum Scrolling**: `-webkit-overflow-scrolling: touch` for buttery smooth WebKit pan physics.
- **Tap Highlight & Callouts**: `-webkit-tap-highlight-color: transparent` and `.no-callout` disabling annoying gray tap overlays and contextual menus.

---

## 📂 Directory Structure

```
ios/
├── README.md             # iOS architecture & platform guide (this file)
└── debug-checklist.md    # iOS QA, Mobile Safari verification, and WebKit checklist
```

---

## 🚀 Quick Developer Checklist for iOS
- [x] Run `useMobilePlatform()` hook in `src/App.tsx`.
- [x] Verify `.is-ios` class is applied to `<html>`.
- [x] Validate notch / Dynamic Island spacing using `.pt-safe` and `.pb-safe`.
- [x] Ensure form inputs have font-size $\ge 16\text{ px}$ to prevent iOS auto-zoom.
