# V4 Stream Website

A lightweight, responsive single-page download landing page built with HTML, CSS, and vanilla JavaScript. Supports Android (64-bit and 32-bit APKs) and Windows PC applications.

## Files
- `index.html` — page structure with 64-bit Android, 32-bit Android, and Windows PC download buttons
- `style.css` — responsive dark glass UI with micro-animations, multi-column grid, and cross-device tiers
- `script.js` — dynamic file size detection, loading states, download handling, and TV remote spatial navigation
- `assets/v4Stream-64bit.apk` — 64-bit (ARM64-v8a) APK (recommended for most modern phones and Google TV)
- `assets/v4Stream-32bit.apk` — 32-bit (armeabi-v7a) APK (for legacy devices and older TV boxes)
- `assets/V4-Stream-Setup.exe` — Windows desktop application installer (for Windows 10/11 PCs and laptops)
- `assets/logo.png` — official V4 Stream mark

## Responsive Layout & Platform Adaptivity
- **Small Mobile (≤ 360px)**: Compact, thumb-friendly touch targets with zero-wrap button labels and auto-wrapped metadata.
- **Standard Mobile (361px – 430px)**: Optimized for iPhone 12–16, Samsung Galaxy, and Google Pixel with notch/home-indicator safe area insets.
- **Large Mobile (431px – 639px)**: Balanced card proportions for Plus/Max and Ultra smartphones.
- **Tablets (640px – 1023px)**: Well-proportioned centered download column preventing stretched buttons or awkward card bloat.
- **Desktop & Laptops (1024px – 1439px)**: Centered widescreen glass card with refined typography, tactile hover elevations, and expanded ambient background glow.
- **Large Desktop & Ultra-Wide (1440px+)**: Enhanced scaling for 2K/4K monitors with rich ambient wash and spacious action controls.
- **TV & 10-Foot UI**: Auto-detected spatial D-Pad navigation, high-visibility pulsating focus rings, and tactile button feedback.

## Platform & Architecture Support
- **Android 64-bit (ARM64)**: Optimized for all modern Android phones, tablets, and newer Android TV / Google TV devices.
- **Android 32-bit (ARMv7)**: Compatible with older Android smartphones and budget TV boxes.
- **Windows PC (x64)**: Native executable for Windows 10 and Windows 11 desktop computers and laptops.

## TV Remote D-Pad & 10-Foot UI Support
- **Directional Navigation**: Navigate seamlessly using TV remote D-Pad controls (Up, Down, Left, Right) or keyboard arrows with 2D spatial navigation.
- **Focus Highlighting**: High-contrast, pulsating neon focus rings and scale elevations designed for 10-foot viewing distances on Android TV, Google TV, Fire TV, and Smart TVs.
- **One-Click TV Download**: Press `OK` / `Select` / `Enter` to download immediately with tactile button depression feedback.
- **Auto-Detection**: Automatically detects TV browsers and pre-focuses the recommended 64-bit option on TV devices.

## Deploy with GitHub Pages / Vercel
1. Push repository changes to GitHub.
2. If using GitHub Pages:
   - Open **Settings → Pages**.
   - Under **Build and deployment**, choose **Deploy from a branch** (`main` / root).
3. If using Vercel:
   - Connect repository and deploy directly as a static project.
