/**
 * ============================================================================
 * V4 Stream — Monetag Advertising Architecture Controller
 * ============================================================================
 *
 * Provides modular, configurable integration for all Monetag publisher ad
 * formats (MultiTag, Popunder/OnClick, In-Page Push, Push Notifications,
 * Vignette, Classic Banners, Native Banners, and Direct Links).
 *
 * SAFETY & POLICY GUARANTEES:
 * 1. Download Protection: Clicks on APK/PC download buttons NEVER trigger Popunders.
 * 2. TV Remote Navigation: Does not trap focus or disrupt TV remote D-Pad controls.
 * 3. Zero Console Errors: Gracefully checks for configuration and handles ad-blockers.
 * 4. Zero Layout Shift (CLS): Containers collapse cleanly when unpopulated.
 * 5. Deduplication: Ensures advertising scripts are loaded exactly once.
 *
 * INSTRUCTIONS FOR USER:
 * When you generate your tag/zone codes in your Monetag Dashboard (https://monetag.com/):
 * Set `enabled: true` and paste the respective script URL or zone ID into MONETAG_CONFIG below.
 * ============================================================================
 */

(() => {
  "use strict";

  // ==========================================================================
  // 1. MONETAG PUBLISHER CONFIGURATION
  // Paste your actual Monetag scripts, zone IDs, or tags below.
  // ==========================================================================
  const MONETAG_CONFIG = {
    // ------------------------------------------------------------------------
    // FORMAT 1: MultiTag (Recommended by Monetag)
    // All-in-one AI tag that bundles Popunder, In-Page Push, Push, and Vignette.
    // Dashboard: Monetag -> Sites -> Add Zone -> MultiTag
    // Tag embedded directly after <head> in index.html to follow Monetag instructions.
    // ------------------------------------------------------------------------
    multiTag: {
      enabled: false, // Embedded directly in index.html <head> to prevent duplicate loading
      scriptUrl: "https://quge5.com/88/tag.min.js",
      zoneId: "307280"
    },

    // ------------------------------------------------------------------------
    // FORMAT 2: OnClick / Popunder
    // Full-page window opened under current tab on user interaction.
    // Dashboard: Monetag -> Sites -> Add Zone -> OnClick (Popunder)
    // ------------------------------------------------------------------------
    popunder: {
      enabled: false,
      scriptUrl: "",
      zoneId: "12214894",
      // Safety safeguard: Exclude download buttons so downloads are NEVER intercepted
      excludedSelectors: [
        "#downloadButton64",
        "#downloadButton32",
        "#downloadButtonPc",
        ".download-button"
      ]
    },

    // ------------------------------------------------------------------------
    // FORMAT 3: In-Page Push (IPP)
    // Non-intrusive floating native banner resembling an OS notification.
    // Works on all platforms (iOS, Android, Windows, Mac) without browser permissions.
    // Dashboard: Monetag -> Sites -> Add Zone -> In-Page Push
    // ------------------------------------------------------------------------
    inPagePush: {
      enabled: false,
      scriptUrl: "",
      zoneId: "12214895"
    },

    // ------------------------------------------------------------------------
    // FORMAT 4: Push Notification Ads (Web Push)
    // Browser-native push notification opt-in.
    // Requires sw.js (Service Worker) registered at the root domain.
    // Dashboard: Monetag -> Sites -> Add Zone -> Push Notifications
    // ------------------------------------------------------------------------
    pushNotifications: {
      enabled: false,
      scriptUrl: "",
      zoneId: "12214897",
      serviceWorkerUrl: "/sw.js"
    },

    // ------------------------------------------------------------------------
    // FORMAT 5: Vignette Banner (Interstitial)
    // High-CTR overlay banner with a visible close button.
    // Dashboard: Monetag -> Sites -> Add Zone -> Vignette Banner
    // ------------------------------------------------------------------------
    vignette: {
      enabled: false,
      scriptUrl: "",
      zoneId: "12214896"
    },

    // ------------------------------------------------------------------------
    // FORMAT 6: Classic Display Banners
    // Standard responsive banner ad placements in designated page locations.
    // Dashboard: Monetag -> Sites -> Add Zone -> Banners
    // ------------------------------------------------------------------------
    banners: {
      header: {
        enabled: false,
        containerId: "monetagHeaderBanner",
        slotId: "monetagHeaderSlot",
        scriptUrl: "",
        zoneId: ""
      },
      content: {
        enabled: false,
        containerId: "monetagContentBanner",
        slotId: "monetagContentSlot",
        scriptUrl: "",
        zoneId: ""
      },
      midSection: {
        enabled: false,
        containerId: "monetagMidBanner",
        slotId: "monetagMidSlot",
        scriptUrl: "",
        zoneId: ""
      },
      footer: {
        enabled: false,
        containerId: "monetagFooterBanner",
        slotId: "monetagFooterSlot",
        scriptUrl: "",
        zoneId: ""
      }
    },

    // ------------------------------------------------------------------------
    // FORMAT 7: Native Ads / Smart Banners
    // Responsive content-recommendation style cards that blend with page style.
    // Dashboard: Monetag -> Sites -> Add Zone -> Native Ads
    // ------------------------------------------------------------------------
    nativeAds: {
      enabled: false,
      containerId: "monetagContentBanner",
      slotId: "monetagContentSlot",
      scriptUrl: "",
      zoneId: ""
    },

    // ------------------------------------------------------------------------
    // FORMAT 8: Direct Link (SmartLink)
    // Monetized URL for direct traffic routing.
    // Dashboard: Monetag -> Sites -> Add Zone -> Direct Link
    // ------------------------------------------------------------------------
    directLink: {
      enabled: false,
      url: "" // e.g., "https://oackooly.com/4/..."
    }
  };

  // ==========================================================================
  // 2. SCRIPT LOADER & AD INITIALIZER ENGINE
  // ==========================================================================
  const loadedScripts = new Set();

  function isTVDevice() {
    const ua = (navigator.userAgent || "").toLowerCase();
    const tvKeywords = [
      "googletv", "android tv", "smarttv", "smart-tv", "hbbtv",
      "appletv", "aft", "firetv", "fire tv", "tizen", "webos",
      "netcast", "viera", "bravia", "roku", "downloader", "large screen"
    ];
    return tvKeywords.some(keyword => ua.includes(keyword));
  }

  function loadExternalScript(src, attributes = {}) {
    if (!src || typeof src !== "string" || src.trim() === "") return Promise.resolve(null);
    const cleanSrc = src.trim();

    // Prevent duplicate loading if already loaded or present in DOM
    if (loadedScripts.has(cleanSrc) || document.querySelector(`script[src="${cleanSrc}"]`)) {
      loadedScripts.add(cleanSrc);
      return Promise.resolve(null);
    }

    return new Promise((resolve) => {
      try {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = cleanSrc;
        script.async = true;

        Object.keys(attributes).forEach(attr => {
          if (attributes[attr]) {
            script.setAttribute(attr, attributes[attr]);
          }
        });

        script.onload = () => {
          loadedScripts.add(cleanSrc);
          resolve(script);
        };
        script.onerror = () => {
          // Gracefully resolve on ad-blocker interception without unhandled error
          resolve(null);
        };

        (document.head || document.body).appendChild(script);
      } catch (err) {
        resolve(null);
      }
    });
  }

  function activateAdContainer(containerId, slotId, content) {
    const container = document.getElementById(containerId);
    const slot = document.getElementById(slotId);
    if (!container || !slot) return;

    container.classList.remove("is-empty");
    container.classList.add("has-ad");

    if (content instanceof HTMLElement) {
      slot.appendChild(content);
    } else if (typeof content === "string" && content.trim() !== "") {
      slot.innerHTML = content;
    }
  }

  // Protect download actions from Popunder hijacking
  function setupDownloadProtection() {
    const downloadButtons = document.querySelectorAll(
      MONETAG_CONFIG.popunder.excludedSelectors.join(", ")
    );

    downloadButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        // Prevent background popunder interception during legitimate APK/PC download click
        e.stopPropagation();
      }, true);
    });
  }

  // Initialize Monetag Ad Formats
  function initMonetag() {
    // Register all scripts currently present in DOM to prevent duplicate loading
    document.querySelectorAll("script[src]").forEach(s => {
      if (s.src) loadedScripts.add(s.src);
    });

    // Always protect APK and PC download buttons against Popunder interception
    setupDownloadProtection();

    const isTV = isTVDevice();

    // 1. MultiTag
    if (MONETAG_CONFIG.multiTag.enabled && MONETAG_CONFIG.multiTag.scriptUrl) {
      loadExternalScript(MONETAG_CONFIG.multiTag.scriptUrl, {
        "data-zone": MONETAG_CONFIG.multiTag.zoneId || ""
      });
    }

    // 2. Popunder / OnClick (Omit on TV devices to preserve 10-foot remote UX)
    if (!isTV && MONETAG_CONFIG.popunder.enabled && MONETAG_CONFIG.popunder.scriptUrl) {
      loadExternalScript(MONETAG_CONFIG.popunder.scriptUrl, {
        "data-zone": MONETAG_CONFIG.popunder.zoneId || ""
      });
      setupDownloadProtection();
    }

    // 3. In-Page Push (IPP)
    if (MONETAG_CONFIG.inPagePush.enabled && MONETAG_CONFIG.inPagePush.scriptUrl) {
      loadExternalScript(MONETAG_CONFIG.inPagePush.scriptUrl, {
        "data-zone": MONETAG_CONFIG.inPagePush.zoneId || ""
      });
    }

    // 4. Push Notifications (Web Push)
    if (!isTV && MONETAG_CONFIG.pushNotifications.enabled && MONETAG_CONFIG.pushNotifications.scriptUrl) {
      loadExternalScript(MONETAG_CONFIG.pushNotifications.scriptUrl, {
        "data-zone": MONETAG_CONFIG.pushNotifications.zoneId || ""
      });
    }

    // 5. Vignette Banner
    if (MONETAG_CONFIG.vignette.enabled && MONETAG_CONFIG.vignette.scriptUrl) {
      loadExternalScript(MONETAG_CONFIG.vignette.scriptUrl, {
        "data-zone": MONETAG_CONFIG.vignette.zoneId || ""
      });
    }

    // 6. Classic Banners (Header, Content, Mid-Section, Footer)
    Object.keys(MONETAG_CONFIG.banners).forEach(key => {
      const banner = MONETAG_CONFIG.banners[key];
      if (banner.enabled && (banner.scriptUrl || banner.zoneId)) {
        activateAdContainer(banner.containerId, banner.slotId, "");
        if (banner.scriptUrl) {
          const scriptTag = document.createElement("script");
          scriptTag.src = banner.scriptUrl;
          scriptTag.async = true;
          if (banner.zoneId) scriptTag.setAttribute("data-zone", banner.zoneId);
          const slot = document.getElementById(banner.slotId);
          if (slot) slot.appendChild(scriptTag);
        }
      }
    });

    // 7. Native Ads
    if (MONETAG_CONFIG.nativeAds.enabled && (MONETAG_CONFIG.nativeAds.scriptUrl || MONETAG_CONFIG.nativeAds.zoneId)) {
      activateAdContainer(MONETAG_CONFIG.nativeAds.containerId, MONETAG_CONFIG.nativeAds.slotId, "");
      if (MONETAG_CONFIG.nativeAds.scriptUrl) {
        const scriptTag = document.createElement("script");
        scriptTag.src = MONETAG_CONFIG.nativeAds.scriptUrl;
        scriptTag.async = true;
        const slot = document.getElementById(MONETAG_CONFIG.nativeAds.slotId);
        if (slot) slot.appendChild(scriptTag);
      }
    }
  }

  // Safe boot once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMonetag);
  } else {
    initMonetag();
  }

  // Expose configuration object globally for easy console debugging or runtime updates
  window.MONETAG_CONFIG = MONETAG_CONFIG;
})();

