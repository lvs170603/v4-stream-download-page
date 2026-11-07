# V4 Stream Website

A lightweight, responsive single-page download landing page built with HTML, CSS, and vanilla JavaScript. Supports Android (64-bit and 32-bit APKs) and Windows PC applications.

## Files
- `index.html` — page structure with 64-bit Android, 32-bit Android, and Windows PC download buttons
- `style.css` — responsive dark glass UI with micro-animations and multi-column grid
- `script.js` — dynamic file size detection, loading states, download handling, and TV remote spatial navigation
- `assets/v4Stream-64bit.apk` — 64-bit (ARM64-v8a) APK (recommended for most modern phones and Google TV)
- `assets/v4Stream-32bit.apk` — 32-bit (armeabi-v7a) APK (for legacy devices and older TV boxes)
- `assets/V4-Stream-Setup.exe` — Windows desktop application installer (for Windows 10/11 PCs and laptops)
- `assets/logo.png` — official V4 Stream mark

## Platform & Architecture Support
- **Android 64-bit (ARM64)**: Optimized for all modern Android phones, tablets, and newer Android TV / Google TV devices.
- **Android 32-bit (ARMv7)**: Compatible with older Android smartphones and budget TV boxes.
- **Windows PC (x64)**: Native executable for Windows 10 and Windows 11 desktop computers and laptops.

## TV Remote D-Pad & 10-Foot UI Support
- **Directional Navigation**: Navigate seamlessly using TV remote D-Pad controls (Up, Down, Left, Right) or keyboard arrows with 2D spatial navigation.
- **Focus Highlighting**: High-contrast, pulsating neon focus rings and scale elevations designed for 10-foot viewing distances on Android TV, Google TV, Fire TV, and Smart TVs.
- **One-Click TV Download**: Press `OK` / `Select` / `Enter` to download immediately with tactile button depression feedback.
- **Auto-Detection**: Automatically detects TV browsers and pre-focuses the recommended 64-bit option on TV devices.

## Deploy with GitHub Pages
1. Push this repository to GitHub: `https://github.com/lvs170603/v4-stream-download-page`.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then Save.
5. The live download page will be published at: `https://lvs170603.github.io/v4-stream-download-page/`.
