# 📋 iOS Debugging & QA Checklist

Use this checklist when auditing, testing, or troubleshooting Souvik Kundu's Portfolio on Apple iOS devices (Safari & WebKit wrappers).

---

## 🔍 1. Browser & Device Testing Matrix

- [ ] **Mobile Safari (iPhone portrait)**: Test on iPhone with notch / Dynamic Island.
- [ ] **Mobile Safari (iPhone landscape)**: Confirm safe area side padding when rotated.
- [ ] **iPad / iPadOS Safari**: Confirm tablet layout rendering.
- [ ] **iOS Third-Party Browsers (Chrome / Edge / Firefox for iOS)**: Verify WebKit engine behavior.
- [ ] **In-App WebViews**: Test links opened inside Instagram, X (Twitter), or LinkedIn on iOS.

---

## 🎨 2. Visual & Notch / Safe Area Audit

- [ ] **Notch & Dynamic Island Top Spacing**:
  - Verify header element has safe area top clearance (`.pt-safe` / `env(safe-area-inset-top)`).
- [ ] **Home Indicator Bottom Spacing**:
  - Scroll to fixed elements / sticky footer.
  - Verify bottom actions do not obscure the swipe-up home indicator line (`.pb-safe` / `env(safe-area-inset-bottom)`).
- [ ] **Dynamic Viewport Height (`100dvh`)**:
  - Verify page hero fits full screen without bottom controls blocking content when Safari toolbar expands/collapses.
- [ ] **Tap Highlight Colors**:
  - Tap links and buttons; confirm grey semi-transparent tap box does NOT appear (`-webkit-tap-highlight-color: transparent`).

---

## ⚡ 3. Form Inputs & Touch Interaction

- [ ] **Prevent Auto-Zoom on Form Inputs**:
  - Tap contact form input fields (`name`, `email`, `message`).
  - Confirm Safari does NOT automatically zoom into text fields (requires `font-size: 16px` minimum).
- [ ] **Momentum Scrolling**:
  - Test vertical inertia pan scrolling; verify zero jitter or elastic overscroll breakage.
- [ ] **Touch Callouts**:
  - Long press on non-image decorative UI elements; confirm contextual menu callout does not trigger.

---

## 🚀 4. Performance & Safari Web Inspector

- [ ] **Web Inspector Debugging (Mac Safari)**:
  - Connect iPhone via Lightning/USB-C to Mac.
  - Open Mac Safari `Develop > [Device Name] > portfolio`.
  - Check Console tab for unhandled WebKit promise rejections or CSS warnings.
- [ ] **Framer Motion Backdrop Filters**:
  - Verify CSS `backdrop-filter: blur(...)` glassmorphism renders smoothly without frame drops.

---

## 🛠 Troubleshooting Common iOS Issues

| Symptom | Probable Cause | Fix |
| :--- | :--- | :--- |
| **Viewport zooms when tapping text input** | Font size in input field $< 16\text{ px}$ | Set `text-base` ($16\text{ px}$) or larger on inputs in `ContactForm.tsx` |
| **Content cut off under notch or home bar** | Missing safe area environment inset | Apply `.pt-safe`, `.pb-safe`, `.pl-safe`, `.pr-safe` classes |
| **Hero height cuts off in Mobile Safari** | Using standard `100vh` instead of dynamic height | Use `min-h-[100dvh]` and `.min-h-ios-dvh` |
| **Gray square flashes when tapping buttons** | Safari default tap highlight | Ensure `-webkit-tap-highlight-color: transparent` in `index.css` |
