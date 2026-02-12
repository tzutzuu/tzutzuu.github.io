import { scenes } from "./scenes.js";
import {
  designRevenueGeoJson,
  fablessUsGeoJson,
  edaIpUsGeoJson,
  edaLinesGeoJson,
  edaCardData,
  idmUsGeoJson,
  idmCardData,
  asiaSemiGeoJson,
  asiaCountryHighlightIds,
  asiaCardData,
  europeSemiGeoJson,
  fablessUsLinesGeoJson,
  fablessCardData,
  countryHighlightIds,
  restOfWorldBar,
  californiaCitiesGeoJson,
} from "./datasets.js";

// Scrollytelling (fixed) MapLibre map used by the main story sections.
// This file intentionally mirrors the original script.js behavior, but splits static
// data into separate modules for easier maintenance.

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let edaCardMarkers = [];
let idmCardMarkers = [];
let asiaCardMarkers = [];
let fablessCardMarkers = [];
let barMarkers = [];

const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    sources: {
      cartodb: {
        type: "raster",
        tiles: ["https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution:
          ' <a href="https://www.openstreetmap.org/copyright"> </a>  <a href="https://carto.com/attributions"></a>',
      },
    },
    layers: [
      {
        id: "cartodb",
        type: "raster",
        source: "cartodb",
        minzoom: 0,
        maxzoom: 19,
      },
    ],
  },
  center: scenes[0].center,
  zoom: scenes[0].zoom,
  pitch: scenes[0].pitch,
  bearing: scenes[0].bearing,
  interactive: false,
});

let mapLoaded = false;
let currentScene = -1;

map.on("load", () => {
  mapLoaded = true;

  map.addSource("design-revenue", { type: "geojson", data: designRevenueGeoJson });

  map.addLayer({
    id: "design-revenue-dots",
    type: "circle",
    source: "design-revenue",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 16,
      "circle-color": ["case", ["==", ["get", "highlight"], true], "#facc15", "#ffffff"],
      "circle-stroke-color": "#4b5563",
      "circle-stroke-width": 1.5,
    },
  });

  map.addLayer({
    id: "design-revenue-labels",
    type: "symbol",
    source: "design-revenue",
    layout: {
      visibility: "none",
      "text-field": ["concat", ["get", "name"], "\n", ["get", "value"]],
      "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
      "text-size": 16,
      "text-anchor": "top",
      "text-offset": [
        "case",
        ["==", ["get", "name"], "South Korea"],
        ["literal", [0, -3.4]],
        ["literal", [0, 1.2]],
      ],
      "text-allow-overlap": true,
    },
    paint: {
      "text-color": "#111827",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5,
    },
  });

  map.addSource("fabless-us", { type: "geojson", data: fablessUsGeoJson });
  map.addLayer({
    id: "fabless-us-dots",
    type: "circle",
    source: "fabless-us",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 10,
      "circle-color": "#f0ff53",
      "circle-stroke-color": "#1a3a6e",
      "circle-stroke-width": 2,
    },
  });
  map.addLayer({
    id: "fabless-us-labels",
    type: "symbol",
    source: "fabless-us",
    layout: { visibility: "none", "text-field": "", "text-size": 1, "text-allow-overlap": true },
    paint: { "text-color": "rgba(0,0,0,0)" },
  });

  fetch("https://cdn.jsdelivr.net/npm/us-atlas@3.0.1/states-10m.json")
    .then((r) => r.json())
    .then((us) => {
      const states = topojson.feature(us, us.objects.states);
      const california = {
        type: "FeatureCollection",
        features: states.features.filter((f) => f.properties.name === "California"),
      };

      map.addSource("california-boundary", { type: "geojson", data: california });
      map.addLayer({
        id: "california-fill",
        type: "fill",
        source: "california-boundary",
        layout: { visibility: "none" },
        paint: { "fill-color": "#1a3a6e", "fill-opacity": 0.08 },
      });
      map.addLayer({
        id: "california-border",
        type: "line",
        source: "california-boundary",
        layout: { visibility: "none" },
        paint: { "line-color": "#1a3a6e", "line-width": 2.5, "line-dasharray": [3, 2] },
      });
    })
    .catch((err) => console.warn("Failed to load California boundary:", err));

  map.addSource("california-cities", { type: "geojson", data: californiaCitiesGeoJson });
  map.addLayer({
    id: "california-city-dots",
    type: "circle",
    source: "california-cities",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 4,
      "circle-color": "#4b5563",
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 1,
    },
  });
  map.addLayer({
    id: "california-city-labels",
    type: "symbol",
    source: "california-cities",
    layout: {
      visibility: "none",
      "text-field": ["get", "name"],
      "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
      "text-size": 14,
      "text-anchor": "top",
      "text-offset": [0, 0.6],
      "text-allow-overlap": false,
    },
    paint: {
      "text-color": "#4b5563",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5,
    },
  });

  map.addSource("eda-ip-us", { type: "geojson", data: edaIpUsGeoJson });
  map.addLayer({
    id: "eda-ip-dots",
    type: "circle",
    source: "eda-ip-us",
    layout: { visibility: "none" },
    paint: { "circle-radius": 14, "circle-color": "#ea9999", "circle-stroke-color": "#1a3a6e", "circle-stroke-width": 2 },
  });

  map.addSource("eda-lines", { type: "geojson", data: edaLinesGeoJson });
  map.addLayer({
    id: "eda-lines",
    type: "line",
    source: "eda-lines",
    layout: { visibility: "none" },
    paint: { "line-color": "#1a3a6e", "line-width": 1.5, "line-dasharray": [4, 2] },
  });

  edaCardData.forEach((item) => {
    const el = document.createElement("div");
    el.className = "eda-card-marker";
    el.style.display = "none";
    const rankText = item.rank ? ` (#${item.rank})` : "";
    el.innerHTML = `
      <div class="eda-card-marker-name">${item.name}${rankText}</div>
      <div class="eda-card-marker-cap">${item.marketcap}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: "center" }).setLngLat(item.coords).addTo(map);
    edaCardMarkers.push(marker);
  });

  map.addSource("fabless-us-lines", { type: "geojson", data: fablessUsLinesGeoJson });
  map.addLayer({
    id: "fabless-us-lines",
    type: "line",
    source: "fabless-us-lines",
    layout: { visibility: "none" },
    paint: { "line-color": "#1a3a6e", "line-width": 1.5, "line-dasharray": [4, 2] },
  });

  fablessCardData.forEach((item) => {
    const el = document.createElement("div");
    el.className = "fabless-card-marker";
    el.style.display = "none";
    el.innerHTML = `
      <div class="fabless-card-marker-name">${item.name} (#${item.rank})</div>
      <div class="fabless-card-marker-cap">${item.marketcap}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: "center" }).setLngLat(item.coords).addTo(map);
    fablessCardMarkers.push(marker);
  });

  map.addSource("idm-us", { type: "geojson", data: idmUsGeoJson });
  map.addLayer({
    id: "idm-us-dots",
    type: "circle",
    source: "idm-us",
    layout: { visibility: "none" },
    paint: { "circle-radius": 14, "circle-color": "#e9bcff", "circle-stroke-color": "#1a3a6e", "circle-stroke-width": 2 },
  });

  idmCardData.forEach((item) => {
    const el = document.createElement("div");
    el.className = "idm-card-marker";
    el.style.display = "none";
    el.innerHTML = `
      <div class="idm-card-marker-name">${item.name} (#${item.rank})</div>
      <div class="idm-card-marker-cap">${item.marketcap}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: item.anchor }).setLngLat(item.coords).addTo(map);
    idmCardMarkers.push(marker);
  });

  map.addSource("asia-semi", { type: "geojson", data: asiaSemiGeoJson });
  map.addLayer({
    id: "asia-semi-dots",
    type: "circle",
    source: "asia-semi",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 14,
      "circle-color": ["case", ["==", ["get", "kind"], "fabless"], "#f0ff53", "#e9bcff"],
      "circle-stroke-color": "#1a3a6e",
      "circle-stroke-width": 2,
    },
  });

  asiaCardData.forEach((item) => {
    const el = document.createElement("div");
    el.className = item.kind === "idm" ? "idm-card-marker" : "asia-fabless-card-marker";
    el.style.display = "none";
    const rankText = item.rank ? ` (#${item.rank})` : "";
    el.innerHTML = `
      <div class="${el.className}-name">${item.name}${rankText}</div>
      <div class="${el.className}-cap">${item.marketcap}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: item.anchor }).setLngLat(item.coords).addTo(map);
    asiaCardMarkers.push(marker);
  });

  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json")
    .then((r) => r.json())
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries);
      const asiaTargetIds = new Set(Object.keys(asiaCountryHighlightIds).map(Number));
      const asiaHighlighted = {
        type: "FeatureCollection",
        features: countries.features
          .filter((f) => asiaTargetIds.has(Number(f.id)))
          .map((f) => {
            const info = asiaCountryHighlightIds[Number(f.id)];
            return { ...f, properties: { ...f.properties, highlightColor: info.color, name: info.name } };
          }),
      };

      map.addSource("asia-country-highlights", { type: "geojson", data: asiaHighlighted });
      map.addLayer({
        id: "asia-country-fills",
        type: "fill",
        source: "asia-country-highlights",
        layout: { visibility: "none" },
        paint: { "fill-color": ["get", "highlightColor"], "fill-opacity": 0.2 },
      });
      map.addLayer({
        id: "asia-country-borders",
        type: "line",
        source: "asia-country-highlights",
        layout: { visibility: "none" },
        paint: { "line-color": ["get", "highlightColor"], "line-width": 2.5 },
      });
    })
    .catch((err) => console.warn("Failed to load Asia country boundaries:", err));

  map.addSource("europe-semi", { type: "geojson", data: europeSemiGeoJson });
  map.addLayer({
    id: "europe-semi-dots",
    type: "circle",
    source: "europe-semi",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 16,
      "circle-color": ["case", ["==", ["get", "kind"], "edmip"], "#e06666", "#b4a7d6"],
      "circle-stroke-color": "#4b5563",
      "circle-stroke-width": 1.5,
    },
  });
  map.addLayer({
    id: "europe-semi-labels",
    type: "symbol",
    source: "europe-semi",
    layout: {
      visibility: "none",
      "text-field": ["get", "label"],
      "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
      "text-size": 16,
      "text-line-height": 1.2,
      "text-anchor": "center",
      "text-offset": [
        "case",
        ["==", ["get", "name"], "Arm Holdings"],
        ["literal", [-1.8, 2.6]],
        ["==", ["get", "name"], "Siemens"],
        ["literal", [1.8, 2.6]],
        ["==", ["get", "name"], "NXP Semiconductors"],
        ["literal", [0, 2.6]],
        ["literal", [-1.9, -2.6]],
      ],
      "text-allow-overlap": true,
    },
    paint: { "text-color": "#111827", "text-halo-color": "#ffffff", "text-halo-width": 1.5 },
  });

  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
    .then((r) => r.json())
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries);
      const targetIds = new Set(Object.keys(countryHighlightIds).map(Number));
      const highlighted = {
        type: "FeatureCollection",
        features: countries.features
          .filter((f) => targetIds.has(Number(f.id)))
          .map((f) => {
            const info = countryHighlightIds[Number(f.id)];
            return { ...f, properties: { ...f.properties, highlightColor: info.color, name: info.name } };
          }),
      };

      map.addSource("country-highlights", { type: "geojson", data: highlighted });
      map.addLayer({
        id: "country-fills",
        type: "fill",
        source: "country-highlights",
        layout: { visibility: "none" },
        paint: { "fill-color": ["get", "highlightColor"], "fill-opacity": 0.25 },
      });
      map.addLayer({
        id: "country-borders",
        type: "line",
        source: "country-highlights",
        layout: { visibility: "none" },
        paint: { "line-color": ["get", "highlightColor"], "line-width": 2.5 },
      });
    })
    .catch((err) => console.warn("Failed to load country boundaries:", err));

  const maxBarHeight = 160;
  const allBarData = [...Object.values(countryHighlightIds), restOfWorldBar];
  allBarData.forEach((item) => {
    const barHeight = Math.round((item.value / 43) * maxBarHeight);
    const el = document.createElement("div");
    el.className = "revenue-bar-marker";
    el.style.display = "none";
    el.innerHTML = `
      <div class="revenue-bar-value">${item.value}%</div>
      <div class="revenue-bar" style="height:${barHeight}px;background:${item.color};"></div>
      <div class="revenue-bar-label">${item.name}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: "bottom" }).setLngLat(item.coords).addTo(map);
    barMarkers.push(marker);
  });

  applyScene(0, { instant: true });
  setupScrollObserver();
});

function setupScrollObserver() {
  const steps = Array.from(document.querySelectorAll(".map-step"));
  if (steps.length === 0) {
    console.warn("No .map-step elements found");
    return;
  }

  const sceneIndices = steps.map((el) => Number(el.dataset.scene) || 0);
  let ticking = false;

  function updateSceneFromScroll() {
    const viewportCenter = window.scrollY + window.innerHeight / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    steps.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const stepCenter = rect.top + window.scrollY + rect.height / 2;
      const dist = Math.abs(stepCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });

    const rawIndex = sceneIndices[closestIdx];
    if (!isNaN(rawIndex) && rawIndex >= 0 && rawIndex !== currentScene) {
      const safeIndex = Math.max(0, Math.min(rawIndex, scenes.length - 1));
      currentScene = rawIndex;
      applyScene(safeIndex);
    }

    if (mapLoaded) {
      if (map.getLayer("design-revenue-dots") && map.getLayer("design-revenue-labels")) {
        map.setLayoutProperty("design-revenue-dots", "visibility", "none");
        map.setLayoutProperty("design-revenue-labels", "visibility", "none");
      }
      if (map.getLayer("country-fills") && map.getLayer("country-borders")) {
        const revenueVis = currentScene === 4 ? "visible" : "none";
        map.setLayoutProperty("country-fills", "visibility", revenueVis);
        map.setLayoutProperty("country-borders", "visibility", revenueVis);
      }
      barMarkers.forEach((m) => {
        m.getElement().style.display = currentScene === 4 ? "flex" : "none";
      });
      if (map.getLayer("fabless-us-dots") && map.getLayer("fabless-us-labels")) {
        const fablessVisibility = currentScene === 5 ? "visible" : "none";
        map.setLayoutProperty("fabless-us-dots", "visibility", fablessVisibility);
        map.setLayoutProperty("fabless-us-labels", "visibility", fablessVisibility);
        map.setLayoutProperty("fabless-us-lines", "visibility", fablessVisibility);
        fablessCardMarkers.forEach((m) => {
          m.getElement().style.display = currentScene === 5 ? "block" : "none";
        });
        if (map.getLayer("california-fill")) map.setLayoutProperty("california-fill", "visibility", fablessVisibility);
        if (map.getLayer("california-border")) map.setLayoutProperty("california-border", "visibility", fablessVisibility);
        if (map.getLayer("california-city-dots")) map.setLayoutProperty("california-city-dots", "visibility", fablessVisibility);
        if (map.getLayer("california-city-labels")) map.setLayoutProperty("california-city-labels", "visibility", fablessVisibility);
      }
      if (map.getLayer("eda-ip-dots")) {
        const edaVisibility = currentScene === 6 ? "visible" : "none";
        map.setLayoutProperty("eda-ip-dots", "visibility", edaVisibility);
        if (map.getLayer("eda-lines")) map.setLayoutProperty("eda-lines", "visibility", edaVisibility);
        edaCardMarkers.forEach((m) => {
          m.getElement().style.display = currentScene === 6 ? "block" : "none";
        });
      }
      if (map.getLayer("idm-us-dots")) {
        const idmVisibility = currentScene === 7 ? "visible" : "none";
        map.setLayoutProperty("idm-us-dots", "visibility", idmVisibility);
        idmCardMarkers.forEach((m) => {
          m.getElement().style.display = currentScene === 7 ? "block" : "none";
        });
      }
      if (map.getLayer("asia-semi-dots")) {
        const asiaVisibility = currentScene === 8 ? "visible" : "none";
        map.setLayoutProperty("asia-semi-dots", "visibility", asiaVisibility);
        if (map.getLayer("asia-country-fills")) map.setLayoutProperty("asia-country-fills", "visibility", asiaVisibility);
        if (map.getLayer("asia-country-borders")) map.setLayoutProperty("asia-country-borders", "visibility", asiaVisibility);
        asiaCardMarkers.forEach((m) => {
          m.getElement().style.display = currentScene === 8 ? "block" : "none";
        });
      }
      if (map.getLayer("europe-semi-dots") && map.getLayer("europe-semi-labels")) {
        const euVisibility = currentScene === 9 ? "visible" : "none";
        map.setLayoutProperty("europe-semi-dots", "visibility", euVisibility);
        map.setLayoutProperty("europe-semi-labels", "visibility", euVisibility);
      }
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateSceneFromScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateSceneFromScroll();
}

function applyScene(index, { instant = false } = {}) {
  if (!mapLoaded) {
    console.warn("Map not loaded yet");
    return;
  }

  const safeIndex = Math.max(0, Math.min(index, scenes.length - 1));
  const scene = scenes[safeIndex];

  const speed = prefersReducedMotion ? 2.0 : instant ? 3.0 : 1.2;
  const curve = prefersReducedMotion ? 1.2 : 1.42;

  try {
    if (instant) {
      map.jumpTo({ center: scene.center, zoom: scene.zoom, pitch: scene.pitch, bearing: scene.bearing });
    } else {
      map.flyTo({
        center: scene.center,
        zoom: scene.zoom,
        pitch: scene.pitch,
        bearing: scene.bearing,
        speed,
        curve,
        essential: true,
      });
    }
  } catch (error) {
    console.error("Error applying scene:", error);
  }
}

