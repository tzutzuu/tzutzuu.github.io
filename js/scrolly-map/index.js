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
  europeCardData,
  europeCountryHighlightIds,
  fablessUsLinesGeoJson,
  fablessCardData,
  countryHighlightIds,
  restOfWorldBar,
  californiaCitiesGeoJson,
  advancedProcessCountryHighlightIds,
  advancedProcessExtraBars,
  matureProcessCountryHighlightIds,
  matureProcessExtraBars,
  foundryMarketShareGeoJson,
  foundryCountryHighlightIds,
  foundryCardData,
  foundryLinesGeoJson,
  equipmentGeoJson,
  equipmentCountryHighlightIds,
  equipmentCardData,
  equipmentLinesGeoJson,
  equipmentUsNlGeoJson,
  equipmentUsNlCountryHighlightIds,
  equipmentUsNlCardData,
  equipmentUsNlLinesGeoJson,
  waferGeoJson,
  waferCountryHighlightIds,
  waferCardData,
  waferLinesGeoJson,
} from "./datasets.js";

// Scrollytelling (fixed) MapLibre map used by the main story sections.
// This file intentionally mirrors the original script.js behavior, but splits static
// data into separate modules for easier maintenance.

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let edaCardMarkers = [];
let idmCardMarkers = [];
let asiaCardMarkers = [];
let europeCardMarkers = [];
let fablessCardMarkers = [];
let foundryCardMarkers = [];
let equipmentCardMarkers = [];
let equipmentUsNlCardMarkers = [];
let waferCardMarkers = [];
let barMarkers = [];
let advancedBarMarkers = [];
let matureBarMarkers = [];

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
      "circle-radius": 12,
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
    
  // Add US country border for IDM scene - Fixed filtering
  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json")
    .then((r) => r.json())
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries);
      
      // Debug: log first few countries to see structure
      console.log("Sample country properties:", countries.features.slice(0, 3).map(f => ({ id: f.id, properties: f.properties })));
      
      // Try multiple approaches to find US
      const unitedStates = {
        type: "FeatureCollection",
        features: countries.features.filter((f) => {
          return f.id === 840 || // Numeric ID
                 f.id === "840" || // String ID
                 (f.properties && f.properties.NAME === "United States") ||
                 (f.properties && f.properties.NAME_EN === "United States") ||
                 (f.properties && f.properties.NAME_LONG === "United States of America") ||
                 (f.properties && f.properties.ADMIN === "United States of America");
        }),
      };

      console.log("Found US features:", unitedStates.features.length);
      if (unitedStates.features.length > 0) {
        console.log("US feature properties:", unitedStates.features[0].properties);
      }

      if (unitedStates.features.length > 0) {
        map.addSource("us-boundary", { type: "geojson", data: unitedStates });
        map.addLayer({
          id: "us-fill",
          type: "fill",
          source: "us-boundary",
          layout: { visibility: "none" },
          paint: { "fill-color": "#1a3a6e", "fill-opacity": 0.15 },
        });
        map.addLayer({
          id: "us-border",
          type: "line",
          source: "us-boundary",
          layout: { visibility: "none" },
          paint: { "line-color": "#1a3a6e", "line-width": 3, "line-dasharray": [4, 3] },
        });
        // Move IDM dots above US borders
        if (map.getLayer("idm-us-dots")) {
          map.moveLayer("idm-us-dots");
        }
        
        console.log("US boundary layers added successfully");
      } else {
        // Fallback: Create a simple US outline from coordinates
        console.warn("No US features found, using fallback boundary");
        const usFallback = {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [[
                [-180, 71], [-180, 18], [-60, 18], [-60, 71], [-180, 71]
              ]]
            }
          }]
        };
        
        map.addSource("us-boundary", { type: "geojson", data: usFallback });
        map.addLayer({
          id: "us-fill",
          type: "fill",
          source: "us-boundary",
          layout: { visibility: "none" },
          paint: { "fill-color": "#1a3a6e", "fill-opacity": 0.15 },
        });
        map.addLayer({
          id: "us-border",
          type: "line",
          source: "us-boundary",
          layout: { visibility: "none" },
          paint: { "line-color": "#1a3a6e", "line-width": 3, "line-dasharray": [4, 3] },
        });
      }
    })
    .catch((err) => console.warn("Failed to load US boundary:", err));

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
    paint: { "circle-radius": 12, "circle-color": "#ea9999", "circle-stroke-color": "#1a3a6e", "circle-stroke-width": 2 },
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
    paint: { "circle-radius": 12, "circle-color": "#e9bcff", "circle-stroke-color": "#1a3a6e", "circle-stroke-width": 2 },
  });

  idmCardData.forEach((item) => {
    const el = document.createElement("div");
    el.className = "idm-card-marker";
    el.style.display = "none";
    el.innerHTML = `
      <div class="idm-card-marker-name">${item.name} (#${item.rank})</div>
      <div class="idm-card-marker-cap">${item.marketcap}</div>
    `;
    // Apply custom offset if provided, otherwise use original coords
    const offsetCoords = [
      item.coords[0] + (item.offsetX || 0), 
      item.coords[1] + (item.offsetY || 0)
    ];
    const marker = new maplibregl.Marker({ element: el, anchor: "center" }).setLngLat(offsetCoords).addTo(map);
    idmCardMarkers.push(marker);
  });

  map.addSource("asia-semi", { type: "geojson", data: asiaSemiGeoJson });
  map.addLayer({
    id: "asia-semi-dots",
    type: "circle",
    source: "asia-semi",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 12,
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
    // Apply custom offset if provided, otherwise use original coords
    const offsetCoords = [
      item.coords[0] + (item.offsetX || 0), 
      item.coords[1] + (item.offsetY || 0)
    ];
    const marker = new maplibregl.Marker({ element: el, anchor: "center" }).setLngLat(offsetCoords).addTo(map);
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
      // Move asia dots above borders
      if (map.getLayer("asia-semi-dots")) {
        map.moveLayer("asia-semi-dots");
      }
    })
    .catch((err) => console.warn("Failed to load Asia country boundaries:", err));
  // Europe country highlights
  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json")
    .then((r) => r.json())
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries);
      const europeTargetIds = new Set(Object.keys(europeCountryHighlightIds).map(Number));
      const europeHighlighted = {
        type: "FeatureCollection",
        features: countries.features
          .filter((f) => europeTargetIds.has(Number(f.id)))
          .map((f) => {
            const info = europeCountryHighlightIds[Number(f.id)];
            return { ...f, properties: { ...f.properties, highlightColor: info.color, name: info.name } };
          }),
      };

      map.addSource("europe-country-highlights", { type: "geojson", data: europeHighlighted });
      map.addLayer({
        id: "europe-country-fills",
        type: "fill",
        source: "europe-country-highlights",
        layout: { visibility: "none" },
        paint: { "fill-color": ["get", "highlightColor"], "fill-opacity": 0.12 },
      });
      map.addLayer({
        id: "europe-country-borders",
        type: "line",
        source: "europe-country-highlights",
        layout: { visibility: "none" },
        paint: { "line-color": ["get", "highlightColor"], "line-width": 2.5, "line-dasharray": [3, 2] },
      });
      // Move europe dots above borders
      if (map.getLayer("europe-semi-dots")) {
        map.moveLayer("europe-semi-dots");
      }
    })
    .catch((err) => console.warn("Failed to load Europe country highlights:", err));
  map.addSource("europe-semi", { type: "geojson", data: europeSemiGeoJson });
  map.addLayer({
    id: "europe-semi-dots",
    type: "circle",
    source: "europe-semi",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 12,
      "circle-color": ["case", ["==", ["get", "kind"], "eda"], "#ea9999", "#e9bcff"],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#1a3a6e",
    },
  });

  // Europe card markers
  europeCardData.forEach((item) => {
    const el = document.createElement("div");
    el.className = item.kind === "eda" ? "eda-card-marker" : "idm-card-marker";
    el.style.display = "none";
    el.innerHTML = `
      <div class="${el.className}-name">${item.name} (#${item.rank})</div>
      <div class="${el.className}-cap">${item.marketcap}</div>
    `;
    // Apply custom offset if provided, otherwise use original coords
    const offsetCoords = [
      item.coords[0] + (item.offsetX || 0), 
      item.coords[1] + (item.offsetY || 0)
    ];
    const marker = new maplibregl.Marker({ element: el, anchor: "center" }).setLngLat(offsetCoords).addTo(map);
    europeCardMarkers.push(marker);
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

  // Advanced process market share 2024 (scene 13) – country fills
  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
    .then((r) => r.json())
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries);
      const advTargetIds = new Set(Object.keys(advancedProcessCountryHighlightIds).map(Number));
      const advHighlighted = {
        type: "FeatureCollection",
        features: countries.features
          .filter((f) => advTargetIds.has(Number(f.id)))
          .map((f) => {
            const info = advancedProcessCountryHighlightIds[Number(f.id)];
            return { ...f, properties: { ...f.properties, highlightColor: info.color, name: info.name } };
          }),
      };

      map.addSource("adv-country-highlights", { type: "geojson", data: advHighlighted });
      map.addLayer({
        id: "adv-country-fills",
        type: "fill",
        source: "adv-country-highlights",
        layout: { visibility: "none" },
        paint: { "fill-color": ["get", "highlightColor"], "fill-opacity": 0.25 },
      });
      map.addLayer({
        id: "adv-country-borders",
        type: "line",
        source: "adv-country-highlights",
        layout: { visibility: "none" },
        paint: { "line-color": ["get", "highlightColor"], "line-width": 2.5 },
      });
    })
    .catch((err) => console.warn("Failed to load advanced process country boundaries:", err));

  // Advanced process bar markers
  const advMaxBarHeight = 140;
  const advAllBarData = [...Object.values(advancedProcessCountryHighlightIds), ...advancedProcessExtraBars];
  advAllBarData.forEach((item) => {
    const barHeight = Math.max(2, Math.round((item.value / 66) * advMaxBarHeight));
    const el = document.createElement("div");
    el.className = "revenue-bar-marker";
    el.style.display = "none";
    el.innerHTML = `
      <div class="revenue-bar-value">${item.value}%</div>
      <div class="revenue-bar" style="height:${barHeight}px;background:${item.color};"></div>
      <div class="revenue-bar-label">${item.name}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: "bottom" }).setLngLat(item.coords).addTo(map);
    advancedBarMarkers.push(marker);
  });

  // Mature process market share 2024 (scene 14) – country fills
  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
    .then((r) => r.json())
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries);
      const matTargetIds = new Set(Object.keys(matureProcessCountryHighlightIds).map(Number));
      const matHighlighted = {
        type: "FeatureCollection",
        features: countries.features
          .filter((f) => matTargetIds.has(Number(f.id)))
          .map((f) => {
            const info = matureProcessCountryHighlightIds[Number(f.id)];
            return { ...f, properties: { ...f.properties, highlightColor: info.color, name: info.name } };
          }),
      };

      map.addSource("mat-country-highlights", { type: "geojson", data: matHighlighted });
      map.addLayer({
        id: "mat-country-fills",
        type: "fill",
        source: "mat-country-highlights",
        layout: { visibility: "none" },
        paint: { "fill-color": ["get", "highlightColor"], "fill-opacity": 0.25 },
      });
      map.addLayer({
        id: "mat-country-borders",
        type: "line",
        source: "mat-country-highlights",
        layout: { visibility: "none" },
        paint: { "line-color": ["get", "highlightColor"], "line-width": 2.5 },
      });
    })
    .catch((err) => console.warn("Failed to load mature process country boundaries:", err));

  // Mature process bar markers
  const matMaxBarHeight = 160;
  const matReferenceMaxValue = 66;
  const matAllBarData = [...Object.values(matureProcessCountryHighlightIds), ...matureProcessExtraBars];
  matAllBarData.forEach((item) => {
    const barHeight = Math.max(2, Math.round((item.value / matReferenceMaxValue) * matMaxBarHeight));
    const el = document.createElement("div");
    el.className = "revenue-bar-marker";
    el.style.display = "none";
    el.innerHTML = `
      <div class="revenue-bar-value">${item.value}%</div>
      <div class="revenue-bar" style="height:${barHeight}px;background:${item.color};"></div>
      <div class="revenue-bar-label">${item.name}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: "bottom" }).setLngLat(item.coords).addTo(map);
    matureBarMarkers.push(marker);
  });

  // Foundry company market share (scene 15)
  map.addSource("foundry-market-share", { type: "geojson", data: foundryMarketShareGeoJson });
  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json")
    .then((r) => r.json())
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries);
      const foundryTargetIds = new Set(Object.keys(foundryCountryHighlightIds).map(Number));
      const foundryHighlighted = {
        type: "FeatureCollection",
        features: countries.features
          .filter((f) => foundryTargetIds.has(Number(f.id)))
          .map((f) => {
            const info = foundryCountryHighlightIds[Number(f.id)];
            return { ...f, properties: { ...f.properties, highlightColor: info.color, name: info.name } };
          }),
      };

      map.addSource("foundry-country-highlights", { type: "geojson", data: foundryHighlighted });
      map.addLayer({
        id: "foundry-country-fills",
        type: "fill",
        source: "foundry-country-highlights",
        layout: { visibility: "none" },
        paint: { "fill-color": ["get", "highlightColor"], "fill-opacity": 0.12 },
      });
      map.addLayer({
        id: "foundry-country-borders",
        type: "line",
        source: "foundry-country-highlights",
        layout: { visibility: "none" },
        paint: { "line-color": ["get", "highlightColor"], "line-width": 2.5, "line-dasharray": [3, 2] },
      });
      const foundryCountryVis = currentScene === 15 ? "visible" : "none";
      map.setLayoutProperty("foundry-country-fills", "visibility", foundryCountryVis);
      map.setLayoutProperty("foundry-country-borders", "visibility", foundryCountryVis);
      if (map.getLayer("foundry-market-share-dots")) {
        map.moveLayer("foundry-market-share-dots");
      }
    })
    .catch((err) => console.warn("Failed to load foundry country highlights:", err));

  map.addLayer({
    id: "foundry-market-share-dots",
    type: "circle",
    source: "foundry-market-share",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 10,
      "circle-color": "#94e0ea",
      "circle-stroke-color": "#1a3a6e",
      "circle-stroke-width": 2,
    },
  });
  map.addSource("foundry-lines", { type: "geojson", data: foundryLinesGeoJson });
  map.addLayer({
    id: "foundry-lines",
    type: "line",
    source: "foundry-lines",
    layout: { visibility: "none" },
    paint: { "line-color": "#1a3a6e", "line-width": 1.5, "line-dasharray": [4, 2] },
  });

  foundryCardData.forEach((item) => {
    const el = document.createElement("div");
    el.className = "foundry-card-marker";
    el.style.display = "none";
    const rankText = item.rank && item.rank !== "x" ? ` (#${item.rank})` : "";
    el.innerHTML = `
      <div class="foundry-card-marker-name">${item.name}${rankText}</div>
      <div class="foundry-card-marker-share">${item.percentage} | ${item.process}</div>
      <div class="foundry-card-marker-cap">${item.marketcap}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: "center" }).setLngLat(item.coords).addTo(map);
    foundryCardMarkers.push(marker);
  });

  // Equipment companies in China/Japan (scene 16)
  map.addSource("equipment-companies", { type: "geojson", data: equipmentGeoJson });
  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json")
    .then((r) => r.json())
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries);
      const equipmentTargetIds = new Set(Object.keys(equipmentCountryHighlightIds).map(Number));
      const equipmentHighlighted = {
        type: "FeatureCollection",
        features: countries.features
          .filter((f) => equipmentTargetIds.has(Number(f.id)))
          .map((f) => {
            const info = equipmentCountryHighlightIds[Number(f.id)];
            return { ...f, properties: { ...f.properties, highlightColor: info.color, name: info.name } };
          }),
      };

      map.addSource("equipment-country-highlights", { type: "geojson", data: equipmentHighlighted });
      map.addLayer({
        id: "equipment-country-fills",
        type: "fill",
        source: "equipment-country-highlights",
        layout: { visibility: "none" },
        paint: { "fill-color": ["get", "highlightColor"], "fill-opacity": 0.12 },
      });
      map.addLayer({
        id: "equipment-country-borders",
        type: "line",
        source: "equipment-country-highlights",
        layout: { visibility: "none" },
        paint: { "line-color": ["get", "highlightColor"], "line-width": 2.5, "line-dasharray": [3, 2] },
      });
      const equipmentCountryVis = currentScene === 16 ? "visible" : "none";
      map.setLayoutProperty("equipment-country-fills", "visibility", equipmentCountryVis);
      map.setLayoutProperty("equipment-country-borders", "visibility", equipmentCountryVis);
      if (map.getLayer("equipment-company-dots")) {
        map.moveLayer("equipment-company-dots");
      }
    })
    .catch((err) => console.warn("Failed to load equipment country highlights:", err));

  map.addLayer({
    id: "equipment-company-dots",
    type: "circle",
    source: "equipment-companies",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 10,
      "circle-color": "#e88ebd",
      "circle-stroke-color": "#1a3a6e",
      "circle-stroke-width": 2,
    },
  });
  map.addSource("equipment-lines", { type: "geojson", data: equipmentLinesGeoJson });
  map.addLayer({
    id: "equipment-lines",
    type: "line",
    source: "equipment-lines",
    layout: { visibility: "none" },
    paint: { "line-color": "#1a3a6e", "line-width": 1.5, "line-dasharray": [4, 2] },
  });

  equipmentCardData.forEach((item) => {
    const el = document.createElement("div");
    el.className = "equipment-card-marker";
    el.style.display = "none";
    const rankText = item.rank ? ` (#${item.rank})` : "";
    el.innerHTML = `
      <div class="equipment-card-marker-name">${item.name}${rankText}</div>
      <div class="equipment-card-marker-cap">${item.marketcap}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: "center" }).setLngLat(item.coords).addTo(map);
    equipmentCardMarkers.push(marker);
  });

  // Equipment companies in United States/Netherlands (scene 17)
  map.addSource("equipment-usnl-companies", { type: "geojson", data: equipmentUsNlGeoJson });
  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json")
    .then((r) => r.json())
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries);
      const equipmentUsNlTargetIds = new Set(Object.keys(equipmentUsNlCountryHighlightIds).map(Number));
      const equipmentUsNlHighlighted = {
        type: "FeatureCollection",
        features: countries.features
          .filter((f) => equipmentUsNlTargetIds.has(Number(f.id)))
          .map((f) => {
            const info = equipmentUsNlCountryHighlightIds[Number(f.id)];
            return { ...f, properties: { ...f.properties, highlightColor: info.color, name: info.name } };
          }),
      };

      map.addSource("equipment-usnl-country-highlights", { type: "geojson", data: equipmentUsNlHighlighted });
      map.addLayer({
        id: "equipment-usnl-country-fills",
        type: "fill",
        source: "equipment-usnl-country-highlights",
        layout: { visibility: "none" },
        paint: { "fill-color": ["get", "highlightColor"], "fill-opacity": 0.12 },
      });
      map.addLayer({
        id: "equipment-usnl-country-borders",
        type: "line",
        source: "equipment-usnl-country-highlights",
        layout: { visibility: "none" },
        paint: { "line-color": ["get", "highlightColor"], "line-width": 2.5, "line-dasharray": [3, 2] },
      });
      const equipmentUsNlCountryVis = currentScene === 17 ? "visible" : "none";
      map.setLayoutProperty("equipment-usnl-country-fills", "visibility", equipmentUsNlCountryVis);
      map.setLayoutProperty("equipment-usnl-country-borders", "visibility", equipmentUsNlCountryVis);
      if (map.getLayer("equipment-usnl-company-dots")) {
        map.moveLayer("equipment-usnl-company-dots");
      }
    })
    .catch((err) => console.warn("Failed to load equipment US/NL country highlights:", err));

  map.addLayer({
    id: "equipment-usnl-company-dots",
    type: "circle",
    source: "equipment-usnl-companies",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 10,
      "circle-color": "#e88ebd",
      "circle-stroke-color": "#1a3a6e",
      "circle-stroke-width": 2,
    },
  });
  map.addSource("equipment-usnl-lines", { type: "geojson", data: equipmentUsNlLinesGeoJson });
  map.addLayer({
    id: "equipment-usnl-lines",
    type: "line",
    source: "equipment-usnl-lines",
    layout: { visibility: "none" },
    paint: { "line-color": "#1a3a6e", "line-width": 1.5, "line-dasharray": [4, 2] },
  });

  equipmentUsNlCardData.forEach((item) => {
    const el = document.createElement("div");
    el.className = "equipment-card-marker";
    el.style.display = "none";
    const rankText = item.rank ? ` (#${item.rank})` : "";
    el.innerHTML = `
      <div class="equipment-card-marker-name">${item.name}${rankText}</div>
      <div class="equipment-card-marker-cap">${item.marketcap}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: "center" }).setLngLat(item.coords).addTo(map);
    equipmentUsNlCardMarkers.push(marker);
  });

  // Wafer companies (scene 18)
  map.addSource("wafer-companies", { type: "geojson", data: waferGeoJson });
  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json")
    .then((r) => r.json())
    .then((world) => {
      const countries = topojson.feature(world, world.objects.countries);
      const waferTargetIds = new Set(Object.keys(waferCountryHighlightIds).map(Number));
      const waferHighlighted = {
        type: "FeatureCollection",
        features: countries.features
          .filter((f) => waferTargetIds.has(Number(f.id)))
          .map((f) => {
            const info = waferCountryHighlightIds[Number(f.id)];
            return { ...f, properties: { ...f.properties, highlightColor: info.color, name: info.name } };
          }),
      };

      map.addSource("wafer-country-highlights", { type: "geojson", data: waferHighlighted });
      map.addLayer({
        id: "wafer-country-fills",
        type: "fill",
        source: "wafer-country-highlights",
        layout: { visibility: "none" },
        paint: { "fill-color": ["get", "highlightColor"], "fill-opacity": 0.12 },
      });
      map.addLayer({
        id: "wafer-country-borders",
        type: "line",
        source: "wafer-country-highlights",
        layout: { visibility: "none" },
        paint: { "line-color": ["get", "highlightColor"], "line-width": 2.5, "line-dasharray": [3, 2] },
      });
      const waferCountryVis = currentScene === 18 ? "visible" : "none";
      map.setLayoutProperty("wafer-country-fills", "visibility", waferCountryVis);
      map.setLayoutProperty("wafer-country-borders", "visibility", waferCountryVis);
      if (map.getLayer("wafer-company-dots")) {
        map.moveLayer("wafer-company-dots");
      }
    })
    .catch((err) => console.warn("Failed to load wafer country highlights:", err));

  map.addLayer({
    id: "wafer-company-dots",
    type: "circle",
    source: "wafer-companies",
    layout: { visibility: "none" },
    paint: {
      "circle-radius": 10,
      "circle-color": "#ccffa9",
      "circle-stroke-color": "#1a3a6e",
      "circle-stroke-width": 2,
    },
  });
  map.addSource("wafer-lines", { type: "geojson", data: waferLinesGeoJson });
  map.addLayer({
    id: "wafer-lines",
    type: "line",
    source: "wafer-lines",
    layout: { visibility: "none" },
    paint: { "line-color": "#1a3a6e", "line-width": 1.5, "line-dasharray": [4, 2] },
  });

  waferCardData.forEach((item) => {
    const el = document.createElement("div");
    el.className = "wafer-card-marker";
    el.style.display = "none";
    const rankText = item.rank ? ` (#${item.rank})` : "";
    el.innerHTML = `
      <div class="wafer-card-marker-name">${item.name}${rankText}</div>
      <div class="wafer-card-marker-cap">${item.marketcap}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: "center" }).setLngLat(item.coords).addTo(map);
    waferCardMarkers.push(marker);
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
        // Show US border for IDM scene
        if (map.getLayer("us-fill")) {
          map.setLayoutProperty("us-fill", "visibility", idmVisibility);
          console.log(`US fill visibility set to: ${idmVisibility}`);
        }
        if (map.getLayer("us-border")) {
          map.setLayoutProperty("us-border", "visibility", idmVisibility);
          console.log(`US border visibility set to: ${idmVisibility}`);
        }
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
      if (map.getLayer("europe-semi-dots")) {
        const euVisibility = currentScene === 9 ? "visible" : "none";
        map.setLayoutProperty("europe-semi-dots", "visibility", euVisibility);
        europeCardMarkers.forEach((m) => {
          m.getElement().style.display = currentScene === 9 ? "block" : "none";
        });
        // Show Europe country borders for Europe scene
        if (map.getLayer("europe-country-fills")) map.setLayoutProperty("europe-country-fills", "visibility", euVisibility);
        if (map.getLayer("europe-country-borders")) map.setLayoutProperty("europe-country-borders", "visibility", euVisibility);
      }
      // Advanced process market share 2024 (scene 13)
      if (map.getLayer("adv-country-fills")) {
        const advVis = currentScene === 13 ? "visible" : "none";
        map.setLayoutProperty("adv-country-fills", "visibility", advVis);
        map.setLayoutProperty("adv-country-borders", "visibility", advVis);
      }
      advancedBarMarkers.forEach((m) => {
        m.getElement().style.display = currentScene === 13 ? "flex" : "none";
      });
      // Mature process market share 2024 (scene 14)
      if (map.getLayer("mat-country-fills")) {
        const matVis = currentScene === 14 ? "visible" : "none";
        map.setLayoutProperty("mat-country-fills", "visibility", matVis);
        map.setLayoutProperty("mat-country-borders", "visibility", matVis);
      }
      matureBarMarkers.forEach((m) => {
        m.getElement().style.display = currentScene === 14 ? "flex" : "none";
      });
      // Foundry company market share (scene 15)
      if (map.getLayer("foundry-market-share-dots")) {
        const foundryVis = currentScene === 15 ? "visible" : "none";
        map.setLayoutProperty("foundry-market-share-dots", "visibility", foundryVis);
        if (map.getLayer("foundry-lines")) {
          map.setLayoutProperty("foundry-lines", "visibility", foundryVis);
        }
      }
      if (map.getLayer("foundry-country-fills")) {
        const foundryCountryVis = currentScene === 15 ? "visible" : "none";
        map.setLayoutProperty("foundry-country-fills", "visibility", foundryCountryVis);
        map.setLayoutProperty("foundry-country-borders", "visibility", foundryCountryVis);
      }
      foundryCardMarkers.forEach((m) => {
        m.getElement().style.display = currentScene === 15 ? "block" : "none";
      });
      // Equipment companies in China/Japan (scene 16)
      if (map.getLayer("equipment-company-dots")) {
        const equipmentVis = currentScene === 16 ? "visible" : "none";
        map.setLayoutProperty("equipment-company-dots", "visibility", equipmentVis);
        if (map.getLayer("equipment-lines")) {
          map.setLayoutProperty("equipment-lines", "visibility", equipmentVis);
        }
      }
      if (map.getLayer("equipment-country-fills")) {
        const equipmentCountryVis = currentScene === 16 ? "visible" : "none";
        map.setLayoutProperty("equipment-country-fills", "visibility", equipmentCountryVis);
        map.setLayoutProperty("equipment-country-borders", "visibility", equipmentCountryVis);
      }
      equipmentCardMarkers.forEach((m) => {
        m.getElement().style.display = currentScene === 16 ? "block" : "none";
      });
      // Equipment companies in United States/Netherlands (scene 17)
      if (map.getLayer("equipment-usnl-company-dots")) {
        const equipmentUsNlVis = currentScene === 17 ? "visible" : "none";
        map.setLayoutProperty("equipment-usnl-company-dots", "visibility", equipmentUsNlVis);
        if (map.getLayer("equipment-usnl-lines")) {
          map.setLayoutProperty("equipment-usnl-lines", "visibility", equipmentUsNlVis);
        }
      }
      if (map.getLayer("equipment-usnl-country-fills")) {
        const equipmentUsNlCountryVis = currentScene === 17 ? "visible" : "none";
        map.setLayoutProperty("equipment-usnl-country-fills", "visibility", equipmentUsNlCountryVis);
        map.setLayoutProperty("equipment-usnl-country-borders", "visibility", equipmentUsNlCountryVis);
      }
      equipmentUsNlCardMarkers.forEach((m) => {
        m.getElement().style.display = currentScene === 17 ? "block" : "none";
      });
      // Wafer companies (scene 18)
      if (map.getLayer("wafer-company-dots")) {
        const waferVis = currentScene === 18 ? "visible" : "none";
        map.setLayoutProperty("wafer-company-dots", "visibility", waferVis);
        if (map.getLayer("wafer-lines")) {
          map.setLayoutProperty("wafer-lines", "visibility", waferVis);
        }
      }
      if (map.getLayer("wafer-country-fills")) {
        const waferCountryVis = currentScene === 18 ? "visible" : "none";
        map.setLayoutProperty("wafer-country-fills", "visibility", waferCountryVis);
        map.setLayoutProperty("wafer-country-borders", "visibility", waferCountryVis);
      }
      waferCardMarkers.forEach((m) => {
        m.getElement().style.display = currentScene === 18 ? "block" : "none";
      });
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

