// V4 Stream download UX. The APK is a static file hosted in ./assets.
(() => {
  const button = document.getElementById("downloadButton");
  const status = document.getElementById("downloadStatus");
  const fileSize = document.getElementById("fileSize");
  const year = document.getElementById("year");
  const apkPath = "assets/app-release.apk";
  let locked = false;

  year.textContent = new Date().getFullYear();

  // Report the actual APK size when the file is present and hosting permits HEAD.
  fetch(apkPath, { method: "HEAD", cache: "no-store" })
    .then(response => {
      if (!response.ok) throw new Error("APK not found");
      const bytes = Number(response.headers.get("content-length"));
      if (bytes > 0) fileSize.textContent = formatBytes(bytes);
    })
    .catch(() => {
      fileSize.textContent = "APK file";
    });

  button.addEventListener("click", (event) => {
    if (locked) {
      event.preventDefault();
      return;
    }
    locked = true;
    button.classList.add("is-loading");
    status.className = "download-status loading";
    status.textContent = "Preparing your download…";

    // Keep the native anchor download behavior for Android Chrome and static hosts.
    // A short status animation is used because browsers do not expose download
    // completion for a normal cross-origin/static anchor reliably.
    window.setTimeout(() => {
      status.className = "download-status";
      status.textContent = "If the download did not start, tap again or check your browser downloads.";
      button.classList.remove("is-loading");
      locked = false;
    }, 1800);
  });

  function formatBytes(bytes) {
    const units = ["B", "KB", "MB", "GB"];
    let value = bytes, unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
      value /= 1024;
      unit++;
    }
    return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
  }
})();
