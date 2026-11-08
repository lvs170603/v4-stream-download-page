# V4 Stream Website

A lightweight, responsive single-page download landing page built with HTML, CSS, and vanilla JavaScript. Supports Android (64-bit and 32-bit APKs) and Windows PC applications.

## Files
- `index.html` — page structure with 64-bit Android, 32-bit Android, Windows PC download buttons, and Monetag responsive ad placements
- `style.css` — responsive dark glass UI with micro-animations, multi-column grid, and CLS-free ad container styling
- `script.js` — dynamic file size detection, loading states, download handling, and TV remote spatial navigation
- `monetag.js` — modular Monetag ad controller supporting all 8 publisher formats with download button protection and TV safeguards
- `sw.js` — official Monetag website verification and push service worker script
- `ads.txt` — authorized digital sellers declaration placeholder for Monetag Publisher records
- `assets/v4Stream-64bit.apk` — 64-bit (ARM64-v8a) APK (recommended for most modern phones and Google TV)
- `assets/v4Stream-32bit.apk` — 32-bit (armeabi-v7a) APK (for legacy devices and older TV boxes)
- `assets/V4-Stream-Setup.exe` — Windows desktop application installer (for Windows 10/11 PCs and laptops)
- `assets/logo.png` — official V4 Stream mark

## Monetag Advertising Integration

The website is fully prepared to support all 8 publisher advertising formats available on [Monetag](https://monetag.com/). All advertising scripts are modularized in `monetag.js` and can be enabled individually by updating the configuration object `MONETAG_CONFIG`.

### Configured Monetag MultiTag & Ad Zones
- **MultiTag Script**: `<script src="https://quge5.com/88/tag.min.js" data-zone="307280" async data-cfasync="false"></script>` (embedded directly after `<head>` in `index.html`)
- **MultiTag Zone ID**: `307280`
- **Push Notifications Zone ID**: `12214897` (Service Worker: `sw.js` pointing to `3nbf4.com`)
- **Vignette Banner Zone ID**: `12214896`
- **In-Page Push Zone ID**: `12214895`
- **OnClick / Popunder Zone ID**: `12214894`

### Supported Monetag Formats
1. **MultiTag (Recommended)**: All-in-one AI tag dynamically delivering Popunder, In-Page Push, Push, and Vignette.
2. **OnClick / Popunder**: Opens in a new window/tab behind the current browser tab upon user interaction.
3. **In-Page Push (IPP)**: Sleek, non-intrusive floating banners resembling OS notifications (works on all devices and browsers without user permissions).
4. **Push Notification Ads (Web Push)**: Native browser opt-in alerts (requires service worker `sw.js`).
5. **Vignette Banners (Interstitial)**: Full overlay banners with a prominent close button.
6. **Classic Display Banners**:
   - `ad-header` (`#monetagHeaderBanner`) — Top banner above the download card
   - `ad-content` (`#monetagContentBanner`) — In-card native/banner placement between downloads and metadata
   - `ad-mid-section` (`#monetagMidBanner`) — Mid-section banner between download card and footer
   - `ad-footer` (`#monetagFooterBanner`) — Bottom banner below footer
7. **Native Ads / Smart Banners**: Blended recommendation-style content units.
8. **Direct Links (SmartLink)**: Direct traffic routing URLs.

### Safety & Policy Safeguards
- **Download Protection**: Clicks on Android APK or Windows PC download buttons are shielded with `stopPropagation()`, ensuring user downloads are never hijacked by popunders.
- **TV Remote Navigation**: Android TV and 10-foot browser user agents are detected automatically. Popunders and push alerts remain suppressed on TV devices to preserve D-Pad navigation.
- **Zero Layout Shift (CLS)**: Unconfigured or pending ad containers collapse cleanly (`.is-empty`) to 0 height, preserving page aesthetics and preventing content jumps.
- **Ad-Blocker Resilience**: Network or script blocking failures resolve cleanly with zero JavaScript console errors.
- **Deduplication**: Script URLs are tracked in a Set to prevent redundant HTTP requests or duplicate script initialization.

### Monetag Setup Instructions
1. Log in to your [Monetag Dashboard](https://monetag.com/).
2. Navigate to **Sites** and select/add your domain (`v4apk.vercel.app`).
3. Click **Add Zone** and choose the ad format you wish to monetize with.
4. Open `monetag.js` and locate the corresponding section in `MONETAG_CONFIG`:
   - Set `enabled: true`.
   - Paste the `scriptUrl` and optional `zoneId` provided by Monetag.
5. If Monetag provides an `ads.txt` code, open `ads.txt` and paste the records.

## Responsive Layout & Platform Adaptivity
- **Small Mobile (≤ 360px)**: Compact, thumb-friendly touch targets with zero-wrap button labels and auto-wrapped metadata.
- **Standard Mobile (361px – 430px)**: Optimized for iPhone 12–16, Samsung Galaxy, and Google Pixel with notch/home-indicator safe area insets.
- **Large Mobile (431px – 639px)**: Balanced card proportions for Plus/Max and Ultra smartphones.
- **Tablets (640px – 1023px)**: Well-proportioned centered download column preventing stretched buttons or awkward card bloat.
- **Desktop & Laptops (1024px – 1439px)**: Centered widescreen glass card with refined typography, tactile hover elevations, and expanded ambient background glow.
- **Large Desktop & Ultra-Wide (1440px+)**: Enhanced scaling for 2K/4K monitors with rich ambient wash and spacious action controls.
- **TV & 10-Foot UI**: Auto-detected spatial D-Pad navigation, high-visibility pulsating focus rings, and popunder suppression.

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
