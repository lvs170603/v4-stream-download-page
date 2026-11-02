# V4 Stream Website

A lightweight single-page APK download landing page built with HTML, CSS, and vanilla JavaScript.

## Files
- `index.html` — page structure
- `style.css` — responsive dark glass UI
- `script.js` — download feedback and APK size detection
- `assets/logo.png` — placeholder V4 Stream mark (replace with your official logo)
- `assets/README.txt` — instructions for adding the real APK

## Add your APK
Copy your real APK into `assets/` and name it **app-release.apk**.
The expected relative path is `assets/app-release.apk`. The ZIP intentionally does
not contain a fake or empty APK.

## Deploy with GitHub Pages
1. Create a new GitHub repository (for example `V4-Stream-Website`).
2. Extract this ZIP and upload all files and folders to the repository root.
3. Add `assets/app-release.apk` containing your real APK. Keep the filename exact.
4. Commit and push the files.
5. In the repository, open **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select branch `main` and folder `/ (root)`, then Save.
8. Wait for the Pages URL to appear. Open it and test the APK download on Android Chrome.

## Notes
- GitHub has a 100 MB individual file limit for files pushed through the normal Git workflow.
  Keep the APK below 100 MB; GitHub Pages is static hosting, not an APK signing/build service.
- Browsers may ignore the `download` attribute in some cross-origin or hosting situations.
  This project uses a same-origin relative URL, which generally supports download naming.
  Actual download behavior can still depend on browser and hosting headers.
- The page is designed to fit one viewport and hides overflow. Very short screens or
  browser zoom/accessibility text scaling may require adjusting the compact-height CSS.
- Replace the version text (`v1.0.0`) and Android minimum version in `index.html` with
  your real app details before publishing.
