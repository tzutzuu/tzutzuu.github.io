import { MAP_CONTAINER_ID } from "./constants.js";
import { setupInteractiveMapInfoToggle } from "./dom.js";
import { buildInteractiveMapStyle } from "./map-style.js";
import { attachMapErrorLogger, configureMapInteractions, preventBrowserPageZoomOnPinch } from "./gestures.js";
import { setupCompanies } from "./companies.js";

function initInteractiveMap() {
  const container = document.getElementById(MAP_CONTAINER_ID);
  if (!container) return;

  if (typeof maplibregl === "undefined") {
    console.warn("MapLibre is not loaded; cannot initialize interactive map.");
    return;
  }

  const map = new maplibregl.Map({
    container,
    style: buildInteractiveMapStyle(),
    center: [0, 20],
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
    cooperativeGestures: true,
  });

  attachMapErrorLogger(map);
  preventBrowserPageZoomOnPinch(container, map);
  configureMapInteractions(map);

  map.on("load", async () => {
    try {
      map.resize();
      map.getCanvas().style.cursor = "grab";
    } catch (_) {
      // ignore
    }

    try {
      await setupCompanies(map, container);
    } catch (err) {
      console.warn("Failed to load company points:", err);
    }
  });
}

function initWhenVisible() {
  const container = document.getElementById(MAP_CONTAINER_ID);
  if (!container) return;

  let didInit = false;
  const run = () => {
    if (didInit) return;
    didInit = true;
    initInteractiveMap();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target !== container) continue;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          observer.disconnect();
          run();
        }
      }
    },
    { threshold: [0, 0.15, 0.5, 1] }
  );
  observer.observe(container);
}

function boot() {
  setupInteractiveMapInfoToggle();
  initWhenVisible();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

