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

  // ==========================================================================
  // TV Remote D-Pad Navigation & Focus Highlighting Controller
  // ==========================================================================
  const focusableButtons = [button64, button32].filter(Boolean);
  let currentFocusedIndex = -1;

  function detectTV() {
    const ua = (navigator.userAgent || "").toLowerCase();
    const tvKeywords = [
      "googletv",
      "android tv",
      "smarttv",
      "smart-tv",
      "hbbtv",
      "appletv",
      "aft", // Amazon Fire TV
      "firetv",
      "fire tv",
      "tizen",
      "webos",
      "netcast",
      "viera",
      "bravia",
      "roku",
      "downloader",
      "large screen"
    ];
    return tvKeywords.some(keyword => ua.includes(keyword));
  }

  function setFocusedButton(index, options = {}) {
    const { focusNative = true, updateStatus = true } = options;
    if (index < 0 || index >= focusableButtons.length) return;

    document.body.classList.add("tv-mode");
    currentFocusedIndex = index;

    focusableButtons.forEach((btn, i) => {
      const isTarget = i === index;
      btn.classList.toggle("tv-focused", isTarget);
      if (isTarget) {
        btn.setAttribute("aria-selected", "true");
        if (focusNative && document.activeElement !== btn) {
          btn.focus({ preventScroll: true });
        }
        btn.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        btn.removeAttribute("aria-selected");
      }
    });

    if (updateStatus && status && !status.classList.contains("loading")) {
      const targetBtn = focusableButtons[index];
      if (targetBtn === button64) {
        status.textContent = "64-bit APK (ARM64) selected · Press OK to download";
      } else if (targetBtn === button32) {
        status.textContent = "32-bit APK (ARMv7) selected · Press OK to download";
      }
    }
  }

  function handleDirection(direction) {
    if (currentFocusedIndex === -1) {
      setFocusedButton(0);
      return;
    }

    const currentBtn = focusableButtons[currentFocusedIndex];
    const currentRect = currentBtn.getBoundingClientRect();
    const currentCenter = {
      x: currentRect.left + currentRect.width / 2,
      y: currentRect.top + currentRect.height / 2
    };

    let bestIndex = -1;
    let minDistance = Infinity;

    focusableButtons.forEach((btn, idx) => {
      if (idx === currentFocusedIndex) return;
      const rect = btn.getBoundingClientRect();
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      let match = false;
      let dist = Infinity;

      if (direction === "down" && center.y > currentCenter.y + 15) {
        match = true;
        dist = Math.abs(center.y - currentCenter.y) + Math.abs(center.x - currentCenter.x) * 2;
      } else if (direction === "up" && center.y < currentCenter.y - 15) {
        match = true;
        dist = Math.abs(currentCenter.y - center.y) + Math.abs(center.x - currentCenter.x) * 2;
      } else if (direction === "right" && center.x > currentCenter.x + 15) {
        match = true;
        dist = Math.abs(center.x - currentCenter.x) + Math.abs(center.y - currentCenter.y) * 2;
      } else if (direction === "left" && center.x < currentCenter.x - 15) {
        match = true;
        dist = Math.abs(currentCenter.x - center.x) + Math.abs(center.y - currentCenter.y) * 2;
      }

      if (match && dist < minDistance) {
        minDistance = dist;
        bestIndex = idx;
      }
    });

    if (bestIndex !== -1) {
      setFocusedButton(bestIndex);
    } else {
      // Orthogonal fallback for intuitive remote navigation in 1 or 2 column layouts
      if (direction === "down" || direction === "right") {
        const nextIdx = (currentFocusedIndex + 1) % focusableButtons.length;
        setFocusedButton(nextIdx);
      } else if (direction === "up" || direction === "left") {
        const prevIdx = (currentFocusedIndex - 1 + focusableButtons.length) % focusableButtons.length;
        setFocusedButton(prevIdx);
      }
    }
  }

  function triggerSelectedButton() {
    if (currentFocusedIndex === -1) {
      setFocusedButton(0);
      return;
    }
    const btn = focusableButtons[currentFocusedIndex];
    if (!btn) return;

    btn.classList.add("tv-pressed");
    window.setTimeout(() => {
      btn.classList.remove("tv-pressed");
    }, 140);

    btn.click();
  }

  // Key event handling for Android TV, Fire TV, Smart TVs, and keyboards
  window.addEventListener("keydown", (event) => {
    const key = event.key;
    const code = event.keyCode;

    // Up: ArrowUp, Up, Android DPAD_UP (19)
    if (key === "ArrowUp" || key === "Up" || code === 38 || code === 19) {
      event.preventDefault();
      handleDirection("up");
      return;
    }

    // Down: ArrowDown, Down, Android DPAD_DOWN (20)
    if (key === "ArrowDown" || key === "Down" || code === 40 || code === 20) {
      event.preventDefault();
      handleDirection("down");
      return;
    }

    // Left: ArrowLeft, Left, Android DPAD_LEFT (21)
    if (key === "ArrowLeft" || key === "Left" || code === 37 || code === 21) {
      event.preventDefault();
      handleDirection("left");
      return;
    }

    // Right: ArrowRight, Right, Android DPAD_RIGHT (22)
    if (key === "ArrowRight" || key === "Right" || code === 39 || code === 22) {
      event.preventDefault();
      handleDirection("right");
      return;
    }

    // OK / Select / Enter: Enter, Select, DPAD_CENTER (23), KEYCODE_ENTER (66), Space on button
    const isEnter = key === "Enter" || key === "Select" || code === 13 || code === 23 || code === 66;
    const isSpaceOnFocused = (key === " " || code === 32) && focusableButtons.includes(document.activeElement);

    if (isEnter || isSpaceOnFocused) {
      event.preventDefault();
      triggerSelectedButton();
    }
  });

  // Track native focus & blur (e.g. Tab navigation)
  focusableButtons.forEach((btn, index) => {
    btn.addEventListener("focus", () => {
      setFocusedButton(index, { focusNative: false, updateStatus: true });
    });

    btn.addEventListener("blur", () => {
      btn.classList.remove("tv-focused");
      btn.removeAttribute("aria-selected");
      window.setTimeout(() => {
        const active = document.activeElement;
        const anyActive = focusableButtons.some(b => b === active);
        if (!anyActive && status && !status.classList.contains("loading")) {
          status.textContent = "Secure direct download · Select an option above";
          currentFocusedIndex = -1;
        }
      }, 60);
    });
  });

  // Clear TV focus outline when user interacts with mouse or touch
  window.addEventListener("pointerdown", () => {
    document.body.classList.remove("tv-mode");
    focusableButtons.forEach(btn => {
      btn.classList.remove("tv-focused");
    });
  });

  // TV Device detection & initial auto-focus
  const isTV = detectTV();
  if (isTV) {
    document.body.classList.add("tv-device", "tv-mode");
    window.setTimeout(() => {
      setFocusedButton(0);
    }, 200);
  }

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
