// V4 Stream download UX for 64-bit and 32-bit Android APKs.
(() => {
  const button64 = document.getElementById("downloadButton64");
  const button32 = document.getElementById("downloadButton32");
  const status = document.getElementById("downloadStatus");
  const fileSize64 = document.getElementById("fileSize64");
  const fileSize32 = document.getElementById("fileSize32");
  const year = document.getElementById("year");

  const apkPath64 = "assets/v4Stream-64bit.apk";
  const apkPath32 = "assets/v4Stream-32bit.apk";
  let locked = false;

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Detect and format actual APK sizes via HEAD requests
  checkFileSize(apkPath64, fileSize64, "44.6 MB");
  checkFileSize(apkPath32, fileSize32, "41.7 MB");

  function checkFileSize(url, element, fallback) {
    if (!element) return;
    fetch(url, { method: "HEAD", cache: "no-store" })
      .then(response => {
        if (!response.ok) throw new Error("APK not reachable");
        const bytes = Number(response.headers.get("content-length"));
        if (bytes > 0) {
          element.textContent = formatBytes(bytes);
        } else {
          element.textContent = fallback;
        }
      })
      .catch(() => {
        element.textContent = fallback;
      });
  }

  function setupDownloadHandler(button, label) {
    if (!button) return;
    button.addEventListener("click", (event) => {
      if (locked) {
        event.preventDefault();
        return;
      }
      locked = true;
      button.classList.add("is-loading");
      if (status) {
        status.className = "download-status loading";
        status.textContent = `Preparing ${label} APK download…`;
      }

      window.setTimeout(() => {
        if (status) {
          status.className = "download-status";
          status.textContent = "If the download did not start, tap again or check your browser downloads.";
        }
        button.classList.remove("is-loading");
        locked = false;
      }, 1800);
    });
  }

  setupDownloadHandler(button64, "64-bit");
  setupDownloadHandler(button32, "32-bit");

  function formatBytes(bytes) {
    const units = ["B", "KB", "MB", "GB"];
    let value = bytes;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
      value /= 1024;
      unit++;
    }
    return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
  }
})();
