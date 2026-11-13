(function () {
  "use strict";

  var MPS_HOME = "https://mansoor0x.github.io/mps/";
  var byId = function (id) { return document.getElementById(id); };
  var ua = navigator.userAgent || "";
  var isPS4 = /PlayStation 4/i.test(ua);
  var firmwareMatch = ua.match(/PlayStation 4[^0-9]*([0-9]+(?:\.[0-9]+)?)/i);
  var firmware = firmwareMatch ? firmwareMatch[1] : null;

  function setText(id, value) {
    var node = byId(id);
    if (node) node.textContent = value;
  }
  function setState(id, value, className) {
    var node = byId(id);
    if (!node) return;
    node.textContent = value;
    node.className = className || "";
  }
  function detectBrowser() {
    if (isPS4) return "PS4 browser";
    if (/Firefox/i.test(ua)) return "Firefox";
    if (/Edg/i.test(ua)) return "Microsoft Edge";
    if (/Chrome/i.test(ua)) return "Chrome";
    if (/Safari/i.test(ua)) return "Safari";
    return "Unknown browser";
  }
  function updateNetwork() {
    var online = navigator.onLine;
    setState("networkValue", online ? "Online" : "Offline", online ? "state-good" : "state-warn");
  }
  function updateCache() {
    var api = window.applicationCache;
    if (!api) {
      setText("cacheValue", "Not detected");
      setText("cacheDescription", "This page has no AppCache manifest attached, so its offline host cache cannot be confirmed.");
      setState("cacheBadge", "NOT LINKED", "state-warn");
      setState("appCacheValue", "Unavailable", "state-warn");
      return;
    }
    setText("appCacheValue", "Available");
    var states = ["UNCACHED", "IDLE", "CHECKING", "DOWNLOADING", "UPDATEREADY", "OBSOLETE"];
    var state = states[api.status] || "UNKNOWN";
    if (api.status === window.applicationCache.IDLE) {
      setText("cacheValue", "Cache idle");
      setText("cacheDescription", "The browser reports an idle application cache for this origin.");
      setState("cacheBadge", "AVAILABLE", "state-good");
    } else if (api.status === window.applicationCache.DOWNLOADING || api.status === window.applicationCache.CHECKING) {
      setText("cacheValue", "Updating");
      setText("cacheDescription", "The browser is checking or downloading cached resources.");
      setState("cacheBadge", "IN PROGRESS", "state-warn");
    } else if (api.status === window.applicationCache.UPDATEREADY) {
      setText("cacheValue", "Update ready");
      setText("cacheDescription", "A newer cache is ready. Follow the host's reload instructions.");
      setState("cacheBadge", "UPDATE READY", "state-good");
    } else {
      setText("cacheValue", state === "UNCACHED" ? "Not installed" : state);
      setText("cacheDescription", "No completed offline cache has been confirmed for this page.");
      setState("cacheBadge", "NOT READY", "state-warn");
    }
  }
  function refresh() {
    setText("browserValue", detectBrowser());
    updateNetwork();
    updateCache();

    if (firmware) {
      setText("firmwareValue", "FW " + firmware);
      setText("deviceValue", isPS4 ? "PlayStation 4 detected from browser user agent" : "Firmware string found in browser user agent");
      if (firmware === "14.00") {
        setState("compatValue", "MPS target detected", "state-good");
      } else {
        setState("compatValue", "Verify upstream support", "state-warn");
      }
    } else {
      setText("firmwareValue", isPS4 ? "Version unknown" : "PS4 not detected");
      setText("deviceValue", isPS4 ? "Could not read firmware version from user agent" : "Open this page in the PS4 browser to detect firmware");
      setState("compatValue", "Not verified", "state-neutral");
    }
  }

  byId("startBtn").addEventListener("click", function () {
    window.location.href = MPS_HOME;
  });
  byId("retryBtn").addEventListener("click", refresh);
  window.addEventListener("online", updateNetwork);
  window.addEventListener("offline", updateNetwork);

  if (window.applicationCache) {
    var events = ["cached", "checking", "downloading", "error", "noupdate", "obsolete", "progress", "updateready"];
    for (var i = 0; i < events.length; i++) {
      window.applicationCache.addEventListener(events[i], updateCache, false);
    }
  }
  refresh();
}());
