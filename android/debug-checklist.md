# 📋 Android Debugging & QA Checklist

Use this checklist when auditing, testing, or troubleshooting Souvik Kundu's Portfolio on Android devices and emulators.

---

## 🔍 1. Browser & Device Testing Matrix

- [ ] **Android Chrome (Latest)**: Test on Chrome Mobile (Pixel / Galaxy devices).
- [ ] **Samsung Internet**: Test on Samsung Galaxy default browser.
- [ ] **Android WebViews**: Test embed view inside apps like LinkedIn or Twitter/X in-app browser.
- [ ] **Low-End Android Device**: Test performance on budget hardware (3GB RAM or lower).

---

## 🎨 2. Visual & Layout Audit

- [ ] **Dynamic Address Bar Shift**:
  - Scroll down until Chrome's top address bar auto-hides.
  - Verify layout does not snap awkwardly or misalign section bounds.
  - Verify `--android-vh` custom property updates correctly on resize.
- [ ] **Touch Target Bounds**:
  - Verify all buttons and interactive cards meet the minimum $48 \times 48\text{ px}$ Material touch target size.
- [ ] **Font Rendering**:
  - Verify `basis33` pixel font and `Inter` render crisp without unexpected font fallback substitution.
- [ ] **Viewport Width Overflows**:
  - Verify horizontal scrolling is completely locked (`overflow-x: hidden`).

---

## ⚡ 3. Touch, Interaction & Haptics

- [ ] **Double-Tap Delay**:
  - Rapid tap on buttons; confirm instant response without 300ms double-tap zoom delay.
- [ ] **Tactile Vibration Haptics**:
  - Tap project modal filters, contact pills, and navbar buttons on a physical Android device.
  - Confirm `navigator.vibrate(15)` fires smoothly without console warnings.
- [ ] **Active Ripple / Highlight States**:
  - Verify active background transition fires on `:active` tap state.

---

## 🚀 4. Performance & Memory

- [ ] **FPS Check (Chrome Remote Debugging)**:
  - Connect device via USB debugging (`chrome://inspect`).
  - Verify Framer Motion hero animations and spotlight cursor run at $\ge 50\text{ FPS}$.
- [ ] **Reduced Motion**:
  - Toggle Android System setting: `Settings > Accessibility > Remove Animations`.
  - Confirm page respects `prefers-reduced-motion: reduce`.

---

## 🛠 Troubleshooting Common Android Issues

| Symptom | Probable Cause | Fix |
| :--- | :--- | :--- |
| **Address bar hide/show causes layout jump** | `100vh` computed incorrectly | Use `100dvh` CSS unit and `--android-vh` CSS variable |
| **300ms tap latency on buttons** | Missing touch action rules | Ensure `touch-action: manipulation` in `index.css` |
| **Haptics fail silently** | Vibration API blocked without user gesture | Trigger `triggerAndroidHaptic()` strictly inside click/tap event handlers |
