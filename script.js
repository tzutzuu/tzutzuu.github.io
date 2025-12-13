const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scenes = [
  {
    title: "Global View",
    description: "The Global Semiconductor Supply Chain",
    center: [0, 20], // World view
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "Global Overview",
    description: "Semiconductors at the center of modern life",
    center: [0, 20], // World view
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "Design Stage",
    description: "First stage: Design",
    center: [0, 20], // World view
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "Global View 4",
    description: "Section 4",
    center: [0, 20], // World view
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "Global View 5",
    description: "Section 5",
    center: [0, 20], // World view
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "Global View 6",
    description: "Section 6",
    center: [0, 20], // World view
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "Global View 7",
    description: "Section 7",
    center: [0, 20], // World view
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "California Fabless Cluster",
    description: "Zoom into California fabless companies",
    center: [-121.5, 36.8], // California coast, tighter on Bay Area
    zoom: 5.5,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "Bay Area EDA & IP",
    description: "Zoom into Synopsys and Cadence in the Bay Area",
    center: [-121.95, 37.4], // Bay Area (Sunnyvale / San Jose)
    zoom: 8.6,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "US IDM Cluster",
    description: "Zoom into key American IDMs",
    center: [-97, 39], // Continental US
    zoom: 4.1,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "Asia IDM & Fabless Cluster",
    description: "Zoom into key Asian IDMs and fabless designers",
    center: [120, 35], // East Asia
    zoom: 4.2,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "Europe EDA & IDM Cluster",
    description: "Zoom into key European EDA/IP and IDM players",
    center: [8, 51], // Central Europe
    zoom: 5.5,
    pitch: 0,
    bearing: 0,
  },
];

const designRevenueGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "United States", value: "43%", highlight: true },
      geometry: { type: "Point", coordinates: [-98, 37] },
    },
    {
      type: "Feature",
      properties: { name: "China", value: "7%", highlight: false },
      geometry: { type: "Point", coordinates: [104, 35] },
    },
    {
      type: "Feature",
      properties: { name: "Taiwan", value: "8%", highlight: false },
      geometry: { type: "Point", coordinates: [121, 24] },
    },
    {
      type: "Feature",
      properties: { name: "South Korea", value: "21%", highlight: true },
      geometry: { type: "Point", coordinates: [128, 36] },
    },
    {
      type: "Feature",
      properties: { name: "Japan", value: "7.4%", highlight: false },
      geometry: { type: "Point", coordinates: [140, 37] },
    },
    {
      type: "Feature",
      properties: { name: "Rest of the world", value: "13.5%", highlight: false },
      geometry: { type: "Point", coordinates: [70, -20] },
    },
  ],
};

const fablessUsGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Marvell Technology",
        label: "$77.42B\n(World No.22)\nMarvell Technology",
      },
      geometry: { type: "Point", coordinates: [-122.9, 38.3] }, // north of Bay Area
    },
    {
      type: "Feature",
      properties: {
        name: "Broadcom",
        label: "$1.881T\n(World No.2)\nBroadcom",
      },
      geometry: { type: "Point", coordinates: [-121.8, 37.5] }, // near San Jose
    },
    {
      type: "Feature",
      properties: {
        name: "NVIDIA",
        label: "$4.441T\n(World No.1)\nNVIDIA",
      },
      geometry: { type: "Point", coordinates: [-121.2, 38.0] }, // east Bay
    },
    {
      type: "Feature",
      properties: {
        name: "AMD",
        label: "$355.92B\n(World No.6)\nAMD",
      },
      geometry: { type: "Point", coordinates: [-121.0, 37.1] }, // inland a bit
    },
    {
      type: "Feature",
      properties: {
        name: "Qualcomm",
        label: "$188.04B\n(World No.12)\nQualcomm",
      },
      geometry: { type: "Point", coordinates: [-117.15, 32.8] }, // San Diego
    },
  ],
};

// EDA & IP companies (Synopsys, Cadence) in the Bay Area
const edaIpUsGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Synopsys",
        label: "$88.55B\n(World No.20)\nSynopsys",
      },
      // Approximate HQ near Sunnyvale / Mountain View, CA
      geometry: { type: "Point", coordinates: [-122.03, 37.39] },
    },
    {
      type: "Feature",
      properties: {
        name: "Cadence",
        label: "$92.54B\nCadence",
      },
      // Approximate HQ in San Jose, CA
      geometry: { type: "Point", coordinates: [-121.93, 37.33] },
    },
  ],
};

// IDM companies (Intel, Micron Technology, Texas Instruments, Analog Devices) across the US
const idmUsGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Intel",
        label: "$192.63B\n(World No.11)\nIntel",
      },
      // Approximate HQ in Santa Clara, CA
      geometry: { type: "Point", coordinates: [-121.97, 37.37] },
    },
    {
      type: "Feature",
      properties: {
        name: "Micron Technology",
        label: "$273.20B\n(World No.7)\nMicron Technology",
      },
      // Approximate HQ in Boise, ID
      geometry: { type: "Point", coordinates: [-116.20, 43.60] },
    },
    {
      type: "Feature",
      properties: {
        name: "Texas Instruments",
        label: "$165.49B\n(World No.12)\nTexas Instruments",
      },
      // Approximate HQ in Dallas, TX
      geometry: { type: "Point", coordinates: [-96.77, 32.91] },
    },
    {
      type: "Feature",
      properties: {
        name: "Analog Devices",
        label: "$138.08B\n(World No.16)\nAnalog Devices",
      },
      // Approximate HQ in Wilmington, MA
      geometry: { type: "Point", coordinates: [-71.17, 42.56] },
    },
  ],
};

// Asia IDM & fabless companies (Samsung, SK Hynix, Sony, MediaTek, Cambricon)
const asiaSemiGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Samsung",
        label: "$498.43B\n(World No.4)\nSamsung",
        kind: "idm",
      },
      // Approximate near Suwon/Seoul, South Korea
      geometry: { type: "Point", coordinates: [127.02, 37.26] },
    },
    {
      type: "Feature",
      properties: {
        name: "SK Hynix",
        label: "$271.21B\n(World No.8)\nSK Hynix",
        kind: "idm",
      },
      // Approximate near Icheon, South Korea
      geometry: { type: "Point", coordinates: [127.43, 37.27] },
    },
    {
      type: "Feature",
      properties: {
        name: "Sony",
        label: "$166.23B\n(World No.16)\nSony",
        kind: "idm",
      },
      // Approximate Tokyo, Japan
      geometry: { type: "Point", coordinates: [139.76, 35.68] },
    },
    {
      type: "Feature",
      properties: {
        name: "MediaTek",
        label: "$73.77B\n(World No.23)\nMediaTek",
        kind: "fabless",
      },
      // Approximate Hsinchu, Taiwan
      geometry: { type: "Point", coordinates: [120.97, 24.81] },
    },
    {
      type: "Feature",
      properties: {
        name: "Cambricon Technologies",
        label: "$84.57B\n(World No.21)\nCambricon Technologies",
        kind: "fabless",
      },
      // Approximate Beijing, China
      geometry: { type: "Point", coordinates: [116.40, 39.90] },
    },
  ],
};

// Europe EDA/IP & IDM companies (Arm, Siemens, NXP, Infineon)
const europeSemiGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Arm Holdings",
        label: "$148.53B\n(World No.15)\nArm Holdings",
        kind: "edmip",
      },
      // Approximate Cambridge, UK
      geometry: { type: "Point", coordinates: [0.13, 52.20] },
    },
    {
      type: "Feature",
      properties: {
        name: "Siemens",
        label: "$213.37B\nSiemens",
        kind: "edmip",
      },
      // Approximate Munich, Germany
      geometry: { type: "Point", coordinates: [11.58, 48.13] },
    },
    {
      type: "Feature",
      properties: {
        name: "NXP Semiconductors",
        label: "$58.53B\n(World No.24)\nNXP Semiconductors",
        kind: "idm",
      },
      // Approximate Eindhoven, Netherlands
      geometry: { type: "Point", coordinates: [5.48, 51.44] },
    },
    {
      type: "Feature",
      properties: {
        name: "Infineon",
        label: "$57.48B\n(World No.25)\nInfineon",
        kind: "idm",
      },
      // Approximate Munich/Neubiberg, Germany
      geometry: { type: "Point", coordinates: [11.65, 48.08] },
    },
  ],
};

// Simple connector lines from a hub near San Jose to each fabless dot
const fablessUsLinesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Marvell Technology" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-121.9, 37.3],
          [-122.9, 38.3],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Broadcom" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-121.9, 37.3],
          [-121.8, 37.5],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "NVIDIA" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-121.9, 37.3],
          [-121.2, 38.0],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "AMD" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-121.9, 37.3],
          [-121.0, 37.1],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Qualcomm" },
      geometry: { type: "Point", coordinates: [-117.16, 32.71] }, // San Diego
    },
  ],
};


const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    // Required for symbol layers using text-field (SDF glyph-based labels)
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    sources: {
      cartodb: {
        type: "raster",
        tiles: ["https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: ' <a href="https://www.openstreetmap.org/copyright"> </a>  <a href="https://carto.com/attributions"></a>',
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
  // Add design revenue markers as part of the map
  map.addSource("design-revenue", {
    type: "geojson",
    data: designRevenueGeoJson,
  });

  map.addLayer({
    id: "design-revenue-dots",
    type: "circle",
    source: "design-revenue",
    layout: {
      visibility: "none",
    },
    paint: {
      "circle-radius": 8,
      "circle-color": [
        "case",
        ["==", ["get", "highlight"], true],
        "#facc15",
        "#ffffff",
      ],
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
      // Use fonts that exist on the demo glyph server
      "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
      "text-size": 16,
      "text-anchor": "top",
      // Move South Korea's label above its dot, others below
      "text-offset": [
        "case",
        ["==", ["get", "name"], "South Korea"],
        ["literal", [0, -3.4]],
        ["literal", [0, 1.2]]
      ],
      "text-allow-overlap": true,
    },
    paint: {
      "text-color": "#111827",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5,
    },
  });

  // Fabless US companies source & layers (California zoom, scene 7)
  map.addSource("fabless-us", {
    type: "geojson",
    data: fablessUsGeoJson,
  });

  map.addLayer({
    id: "fabless-us-dots",
    type: "circle",
    source: "fabless-us",
    layout: {
      visibility: "none",
    },
    paint: {
      "circle-radius": 8,
      "circle-color": "#facc15",
      "circle-stroke-color": "#4b5563",
      "circle-stroke-width": 1.5,
    },
  });

  // EDA & IP (Synopsys, Cadence) source & layers (Bay Area zoom, scene 8)
  map.addSource("eda-ip-us", {
    type: "geojson",
    data: edaIpUsGeoJson,
  });

  map.addLayer({
    id: "eda-ip-dots",
    type: "circle",
    source: "eda-ip-us",
    layout: {
      visibility: "none",
    },
    paint: {
      "circle-radius": 8,
      "circle-color": "#e06666",
      "circle-stroke-color": "#4b5563",
      "circle-stroke-width": 1.5,
    },
  });

  map.addLayer({
    id: "eda-ip-labels",
    type: "symbol",
    source: "eda-ip-us",
    layout: {
      visibility: "none",
      // Use multi-line label text (value, rank, name)
      "text-field": ["get", "label"],
      "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
      "text-size": 16,
      "text-anchor": "top",
      "text-offset": [
        "case",
        ["==", ["get", "name"], "Synopsys"],
        ["literal", [-2.5, 0.5]],
        ["literal", [2.8, -1.4]] // Cadence
      ],
      "text-allow-overlap": true,
    },
    paint: {
      "text-color": "#111827",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5,
    },
  });

  map.addLayer({
    id: "fabless-us-labels",
    type: "symbol",
    source: "fabless-us",
    layout: {
      visibility: "none",
      "text-field": ["get", "label"],
      "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
      "text-size": 16,
      "text-line-height": 1.2,
      "text-anchor": "center",
      "text-offset": [
        "case",
        ["==", ["get", "name"], "Marvell Technology"],
        // Marvell: above and slightly left
        ["literal", [-2.0, 2.0]],
        ["==", ["get", "name"], "Broadcom"],
        // Broadcom: above and slightly right
        ["literal", [-2.0, 4.0]],
        ["==", ["get", "name"], "NVIDIA"],
        // NVIDIA: below and slightly right
        ["literal", [-2.0, -2.0]],
        ["==", ["get", "name"], "AMD"],
        // AMD: below and slightly left
        ["literal", [2.0, 3.0]],
        // Qualcomm: above its dot
        ["literal", [2.0, -3.0]]
      ],
      "text-allow-overlap": true,
    },
    paint: {
      "text-color": "#111827",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5,
    },
  });

  // Connector lines layer
  map.addSource("fabless-us-lines", {
    type: "geojson",
    data: fablessUsLinesGeoJson,
  });

  map.addLayer({
    id: "fabless-us-lines",
    type: "line",
    source: "fabless-us-lines",
    layout: {
      visibility: "none",
    },
    paint: {
      "line-color": "#4b5563",
      "line-width": 1.5,
    },
  });

  // IDM US companies (scene 9)
  map.addSource("idm-us", {
    type: "geojson",
    data: idmUsGeoJson,
  });

  map.addLayer({
    id: "idm-us-dots",
    type: "circle",
    source: "idm-us",
    layout: {
      visibility: "none",
    },
    paint: {
      "circle-radius": 8,
      "circle-color": "#b4a7d6",
      "circle-stroke-color": "#4b5563",
      "circle-stroke-width": 1.5,
    },
  });

  map.addLayer({
    id: "idm-us-labels",
    type: "symbol",
    source: "idm-us",
    layout: {
      visibility: "none",
      "text-field": ["get", "label"],
      "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
      "text-size": 16,
      "text-line-height": 1.2,
      "text-anchor": "center",
      "text-offset": [
        "case",
        ["==", ["get", "name"], "Intel"],
        ["literal", [-1.8, 2.6]],
        ["==", ["get", "name"], "Micron Technology"],
        ["literal", [0, -2.6]],
        ["==", ["get", "name"], "Texas Instruments"],
        ["literal", [0, -2.6]],
        // Analog Devices
        ["literal", [-0.7, 2.6]]
      ],
      "text-allow-overlap": true,
    },
    paint: {
      "text-color": "#111827",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5,
    },
  });

  // Asia IDM & fabless companies (scene 10)
  map.addSource("asia-semi", {
    type: "geojson",
    data: asiaSemiGeoJson,
  });

  map.addLayer({
    id: "asia-semi-dots",
    type: "circle",
    source: "asia-semi",
    layout: {
      visibility: "none",
    },
    paint: {
      "circle-radius": 8,
      "circle-color": [
        "case",
        ["==", ["get", "kind"], "fabless"],
        "#fef08a", // yellow for fabless
        "#b4a7d6", // purple for IDM
      ],
      "circle-stroke-color": "#4b5563",
      "circle-stroke-width": 1.5,
    },
  });

  // Europe EDA/IP & IDM companies (scene 11)
  map.addSource("europe-semi", {
    type: "geojson",
    data: europeSemiGeoJson,
  });

  map.addLayer({
    id: "europe-semi-dots",
    type: "circle",
    source: "europe-semi",
    layout: {
      visibility: "none",
    },
    paint: {
      "circle-radius": 8,
      "circle-color": [
        "case",
        ["==", ["get", "kind"], "edmip"],
        "#e06666", // red for EDA/IP (Arm, Siemens)
        "#b4a7d6", // purple for IDM (NXP, Infineon)
      ],
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
        // Infineon
        ["literal", [-1.9, -2.6]]
      ],
      "text-allow-overlap": true,
    },
    paint: {
      "text-color": "#111827",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5,
    },
  });

  map.addLayer({
    id: "asia-semi-labels",
    type: "symbol",
    source: "asia-semi",
    layout: {
      visibility: "none",
      "text-field": ["get", "label"],
      "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
      "text-size": 16,
      "text-line-height": 1.2,
      "text-anchor": "center",
      "text-offset": [
        "case",
        ["==", ["get", "name"], "Samsung"],
        ["literal", [0, 2.6]],
        ["==", ["get", "name"], "SK Hynix"],
        ["literal", [0, -2.6]],
        ["==", ["get", "name"], "Sony"],
        ["literal", [0, 2.6]],
        ["==", ["get", "name"], "MediaTek"],
        ["literal", [0, -2.6]],
        // Cambricon
        ["literal", [0, -3.0]]
      ],
      "text-allow-overlap": true,
    },
    paint: {
      "text-color": "#111827",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5,
    },
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

    // Toggle marker sets based solely on active scene
    if (mapLoaded) {
      if (map.getLayer("design-revenue-dots") && map.getLayer("design-revenue-labels")) {
        const designVisibility = currentScene === 6 ? "visible" : "none";
        map.setLayoutProperty("design-revenue-dots", "visibility", designVisibility);
        map.setLayoutProperty("design-revenue-labels", "visibility", designVisibility);
      }
      if (map.getLayer("fabless-us-dots") && map.getLayer("fabless-us-labels") && map.getLayer("fabless-us-lines")) {
        const fablessVisibility = currentScene === 7 ? "visible" : "none";
        map.setLayoutProperty("fabless-us-dots", "visibility", fablessVisibility);
        map.setLayoutProperty("fabless-us-labels", "visibility", fablessVisibility);
        map.setLayoutProperty("fabless-us-lines", "visibility", fablessVisibility);
      }
      if (map.getLayer("eda-ip-dots") && map.getLayer("eda-ip-labels")) {
        const edaVisibility = currentScene === 8 ? "visible" : "none";
        map.setLayoutProperty("eda-ip-dots", "visibility", edaVisibility);
        map.setLayoutProperty("eda-ip-labels", "visibility", edaVisibility);
      }
      if (map.getLayer("idm-us-dots") && map.getLayer("idm-us-labels")) {
        const idmVisibility = currentScene === 9 ? "visible" : "none";
        map.setLayoutProperty("idm-us-dots", "visibility", idmVisibility);
        map.setLayoutProperty("idm-us-labels", "visibility", idmVisibility);
      }
      if (map.getLayer("asia-semi-dots") && map.getLayer("asia-semi-labels")) {
        const asiaVisibility = currentScene === 10 ? "visible" : "none";
        map.setLayoutProperty("asia-semi-dots", "visibility", asiaVisibility);
        map.setLayoutProperty("asia-semi-labels", "visibility", asiaVisibility);
      }
      if (map.getLayer("europe-semi-dots") && map.getLayer("europe-semi-labels")) {
        const euVisibility = currentScene === 11 ? "visible" : "none";
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

  // Initial sync on load
  updateSceneFromScroll();
}


function applyScene(index, { instant = false } = {}) {
  if (!mapLoaded) {
    console.warn("Map not loaded yet");
    return;
  }

  // Clamp scene index so sections without explicit scenes still reuse the last one
  const safeIndex = Math.max(0, Math.min(index, scenes.length - 1));
  const scene = scenes[safeIndex];

  const speed = prefersReducedMotion ? 2.0 : instant ? 3.0 : 1.2;
  const curve = prefersReducedMotion ? 1.2 : 1.42;

  try {
    // Use jumpTo for instant, flyTo for animated
    if (instant) {
      map.jumpTo({
        center: scene.center,
        zoom: scene.zoom,
        pitch: scene.pitch,
        bearing: scene.bearing,
      });
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


