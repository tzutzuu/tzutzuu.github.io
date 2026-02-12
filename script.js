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
    title: "Stages Overview",
    description: "Three stages of the semiconductor value chain",
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
    title: "Global View 6",
    description: "Section 6",
    center: [0, 20], // World view
    zoom: 1.5,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "IC Design Revenue Share",
    description: "Global IC design revenue by country, 2021",
    center: [20, 28],
    zoom: 1.8,
    pitch: 0,
    bearing: 0,
  },
  {
    title: "California Fabless Cluster",
    description: "Zoom into California fabless companies",
    center: [-119.5, 36.2],
    zoom: 5.8,
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
        name: "NVIDIA",
        rank: 1,
        type: "Fabless",
        marketcap: "$4.241T",
      },
      geometry: { type: "Point", coordinates: [-121.9659302, 37.37187] },
    },
    {
      type: "Feature",
      properties: {
        name: "Broadcom",
        rank: 3,
        type: "Fabless",
        marketcap: "$1.460T",
      },
      geometry: { type: "Point", coordinates: [-122.1432136, 37.3993703] },
    },
    {
      type: "Feature",
      properties: {
        name: "AMD",
        rank: 8,
        type: "Fabless",
        marketcap: "$325.9M",
      },
      geometry: { type: "Point", coordinates: [-121.9703754, 37.3829498] },
    },
    {
      type: "Feature",
      properties: {
        name: "QUALCOMM",
        rank: 14,
        type: "Fabless",
        marketcap: "$159.5M",
      },
      geometry: { type: "Point", coordinates: [-117.1957412, 32.8961271] },
    },
    {
      type: "Feature",
      properties: {
        name: "Marvell Technology",
        rank: 23,
        type: "Fabless",
        marketcap: "$63.6M",
      },
      geometry: { type: "Point", coordinates: [-121.9828692, 37.4111844] },
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
        rank: 21,
        marketcap: "$80,159M",
      },
      // Approximate HQ near Sunnyvale / Mountain View, CA
      geometry: { type: "Point", coordinates: [-122.03, 37.39] },
    },
    {
      type: "Feature",
      properties: {
        name: "Cadence",
        rank: null,
        marketcap: "$79,490M",
      },
      // Approximate HQ in San Jose, CA
      geometry: { type: "Point", coordinates: [-121.93, 37.33] },
    },
  ],
};

// Connector lines from EDA company dots to card anchors
const edaLinesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Synopsys" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-122.03, 37.39],
          [-122.22, 37.50],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Cadence" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-121.93, 37.33],
          [-121.74, 37.22],
        ],
      },
    },
  ],
};

// Card anchor positions for EDA companies
const edaCardData = [
  { name: "Synopsys", rank: 21, marketcap: "$80,159M", coords: [-122.22, 37.50] },
  { name: "Cadence", rank: null, marketcap: "$79,490M", coords: [-121.74, 37.22] },
];
let edaCardMarkers = [];

// IDM companies (Intel, Micron Technology, Texas Instruments, Analog Devices) across the US
const idmUsGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Intel",
        rank: 10,
        marketcap: "$242.77B",
      },
      // Approximate HQ in Santa Clara, CA
      geometry: { type: "Point", coordinates: [-121.97, 37.37] },
    },
    {
      type: "Feature",
      properties: {
        name: "Micron Technology",
        rank: 6,
        marketcap: "$427.01B",
      },
      // Approximate HQ in Boise, ID
      geometry: { type: "Point", coordinates: [-116.20, 43.60] },
    },
    {
      type: "Feature",
      properties: {
        name: "Texas Instruments",
        rank: 12,
        marketcap: "$202.55B",
      },
      // Approximate HQ in Dallas, TX
      geometry: { type: "Point", coordinates: [-96.77, 32.91] },
    },
    {
      type: "Feature",
      properties: {
        name: "Analog Devices",
        rank: 15,
        marketcap: "$156.9B",
      },
      // Approximate HQ in Wilmington, MA
      geometry: { type: "Point", coordinates: [-71.17, 42.56] },
    },
  ],
};

// Card positions for IDM companies (placed directly above or below dots)
// Above-center companies (lat > 39): card anchor = "bottom" (card sits on top of dot)
// Below-center companies (lat < 39): card anchor = "top" (card hangs below dot)
const idmCardData = [
  { name: "Intel", rank: 10, marketcap: "$242.77B", coords: [-121.97, 37.37], anchor: "top" },
  { name: "Micron Technology", rank: 6, marketcap: "$427.01B", coords: [-116.20, 43.60], anchor: "bottom" },
  { name: "Texas Instruments", rank: 12, marketcap: "$202.55B", coords: [-96.77, 32.91], anchor: "top" },
  { name: "Analog Devices", rank: 15, marketcap: "$156.9B", coords: [-71.17, 42.56], anchor: "bottom" },
];
let idmCardMarkers = [];

// Asia IDM & fabless companies (Samsung, SK Hynix, Sony, MediaTek, Cambricon)
const asiaSemiGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Samsung",
        rank: 4,
        marketcap: "$773.95B",
        kind: "idm",
      },
      // Approximate near Suwon/Seoul, South Korea
      geometry: { type: "Point", coordinates: [127.02, 37.26] },
    },
    {
      type: "Feature",
      properties: {
        name: "SK Hynix",
        rank: 7,
        marketcap: "$425.38B",
        kind: "idm",
      },
      // Approximate near Icheon, South Korea
      geometry: { type: "Point", coordinates: [127.43, 37.27] },
    },
    {
      type: "Feature",
      properties: {
        name: "Sony",
        rank: null,
        marketcap: "$166.23B",
        kind: "idm",
      },
      // Approximate Yokohama, Japan
      geometry: { type: "Point", coordinates: [139.586792, 35.400372] },
    },
    {
      type: "Feature",
      properties: {
        name: "MediaTek",
        rank: 19,
        marketcap: "$90.83B",
        kind: "fabless",
      },
      // Approximate Hsinchu, Taiwan
      geometry: { type: "Point", coordinates: [120.97, 24.81] },
    },
    {
      type: "Feature",
      properties: {
        name: "Cambricon Technologies",
        rank: 22,
        marketcap: "$64.89B",
        kind: "fabless",
      },
      // Approximate Beijing, China
      geometry: { type: "Point", coordinates: [116.40, 39.90] },
    },
  ],
};

// Country highlight configuration for Scene 8 (Asia)
const asiaCountryHighlightIds = {
  410: { name: "South Korea", color: "#6366f1" },
  392: { name: "Japan", color: "#ea580c" },
  158: { name: "Taiwan", color: "#16a34a" },
  156: { name: "China", color: "#dc2626" },
};

// Card data for Asia companies
// Samsung above dot (top of Korea), SK Hynix below (avoid overlap)
// MediaTek below (Taiwan is small), Cambricon above
const asiaCardData = [
  { name: "Samsung", rank: 4, marketcap: "$773.95B", kind: "idm", coords: [127.02, 37.26], anchor: "bottom" },
  { name: "SK Hynix", rank: 7, marketcap: "$425.38B", kind: "idm", coords: [127.43, 37.27], anchor: "top" },
  { name: "Sony", rank: null, marketcap: "$166.23B", kind: "idm", coords: [139.586792, 35.400372], anchor: "top" },
  { name: "MediaTek", rank: 19, marketcap: "$90.83B", kind: "fabless", coords: [120.97, 24.81], anchor: "top" },
  { name: "Cambricon Technologies", rank: 22, marketcap: "$64.89B", kind: "fabless", coords: [116.40, 39.90], anchor: "bottom" },
];
let asiaCardMarkers = [];

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

// Connector lines from each company dot to card anchor below
const fablessUsLinesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "NVIDIA" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-121.9659302, 37.37187],
          [-123.6, 36.4],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Broadcom" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-122.1432136, 37.3993703],
          [-124.2, 37.5],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "AMD" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-121.9703754, 37.3829498],
          [-123.4, 35.3],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Marvell Technology" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-121.9828692, 37.4111844],
          [-124.0, 38.6],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "QUALCOMM" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-117.1957412, 32.8961271],
          [-118.8, 34.2],
        ],
      },
    },
  ],
};

// Card anchor positions (end of connector lines) with company info
const fablessCardData = [
  { name: "NVIDIA", rank: 1, marketcap: "$4.241T", coords: [-123.6, 36.4] },
  { name: "Broadcom", rank: 3, marketcap: "$1.460T", coords: [-124.2, 37.5] },
  { name: "AMD", rank: 8, marketcap: "$325.9M", coords: [-123.4, 35.3] },
  { name: "Marvell Technology", rank: 23, marketcap: "$63.6M", coords: [-124.0, 38.6] },
  { name: "QUALCOMM", rank: 14, marketcap: "$159.5M", coords: [-118.8, 34.2] },
];
let fablessCardMarkers = [];

// Country highlight configuration for Scene 4 revenue bars
const countryHighlightIds = {
  840: { name: "United States", value: 43, color: "#1a3a6e", coords: [-98, 39] },
  410: { name: "South Korea", value: 21, color: "#2563eb", coords: [128, 36] },
  158: { name: "Taiwan", value: 8, color: "#16a34a", coords: [121, 23] },
  392: { name: "Japan", value: 7.4, color: "#ea580c", coords: [145, 37] },
  156: { name: "China", value: 7, color: "#dc2626", coords: [104, 33] },
};
const restOfWorldBar = { name: "Rest of World", value: 13.5, color: "#9ca3af", coords: [60, -8] };
let barMarkers = [];

// Major California cities for Scene 5
const californiaCitiesGeoJson = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "San Francisco" }, geometry: { type: "Point", coordinates: [-122.4194, 37.7749] } },
    { type: "Feature", properties: { name: "Los Angeles" }, geometry: { type: "Point", coordinates: [-118.2437, 34.0522] } },
    { type: "Feature", properties: { name: "San Diego" }, geometry: { type: "Point", coordinates: [-117.1611, 32.7157] } },
    { type: "Feature", properties: { name: "Sacramento" }, geometry: { type: "Point", coordinates: [-121.4944, 38.5816] } },
    { type: "Feature", properties: { name: "San Jose" }, geometry: { type: "Point", coordinates: [-121.8863, 37.3382] } },
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
      "circle-radius": 16,
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

  // Fabless US companies source & layers (California zoom, scene 5)
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
    layout: {
      visibility: "none",
      "text-field": "",
      "text-size": 1,
      "text-allow-overlap": true,
    },
    paint: {
      "text-color": "rgba(0,0,0,0)",
    },
  });

  // California boundary from US states TopoJSON
  fetch("https://cdn.jsdelivr.net/npm/us-atlas@3.0.1/states-10m.json")
    .then(r => r.json())
    .then(us => {
      const states = topojson.feature(us, us.objects.states);
      const california = {
        type: "FeatureCollection",
        features: states.features.filter(f => f.properties.name === "California"),
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
    .catch(err => console.warn("Failed to load California boundary:", err));

  // California city labels
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
      "circle-radius": 14,
      "circle-color": "#ea9999",
      "circle-stroke-color": "#1a3a6e",
      "circle-stroke-width": 2,
    },
  });

  // Connector lines from EDA dots to card anchors
  map.addSource("eda-lines", {
    type: "geojson",
    data: edaLinesGeoJson,
  });

  map.addLayer({
    id: "eda-lines",
    type: "line",
    source: "eda-lines",
    layout: {
      visibility: "none",
    },
    paint: {
      "line-color": "#1a3a6e",
      "line-width": 1.5,
      "line-dasharray": [4, 2],
    },
  });

  // EDA company info card markers (DOM-based)
  edaCardData.forEach(item => {
    const el = document.createElement("div");
    el.className = "eda-card-marker";
    el.style.display = "none";
    const rankText = item.rank ? ` (#${item.rank})` : "";
    el.innerHTML = `
      <div class="eda-card-marker-name">${item.name}${rankText}</div>
      <div class="eda-card-marker-cap">${item.marketcap}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: "center" })
      .setLngLat(item.coords)
      .addTo(map);
    edaCardMarkers.push(marker);
  });

  // Connector lines from dots to spread-out label anchors
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
      "line-color": "#1a3a6e",
      "line-width": 1.5,
      "line-dasharray": [4, 2],
    },
  });

  // Company info card markers (DOM-based, positioned at connector line endpoints)
  fablessCardData.forEach(item => {
    const el = document.createElement("div");
    el.className = "fabless-card-marker";
    el.style.display = "none";
    el.innerHTML = `
      <div class="fabless-card-marker-name">${item.name} (#${item.rank})</div>
      <div class="fabless-card-marker-cap">${item.marketcap}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: "center" })
      .setLngLat(item.coords)
      .addTo(map);
    fablessCardMarkers.push(marker);
  });

  // IDM US companies (scene 7)
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
      "circle-radius": 14,
      "circle-color": "#e9bcff",
      "circle-stroke-color": "#1a3a6e",
      "circle-stroke-width": 2,
    },
  });

  // IDM company info card markers (DOM-based, above or below dots)
  idmCardData.forEach(item => {
    const el = document.createElement("div");
    el.className = "idm-card-marker";
    el.style.display = "none";
    el.innerHTML = `
      <div class="idm-card-marker-name">${item.name} (#${item.rank})</div>
      <div class="idm-card-marker-cap">${item.marketcap}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: item.anchor })
      .setLngLat(item.coords)
      .addTo(map);
    idmCardMarkers.push(marker);
  });

  // Asia IDM & fabless companies (scene 8)
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
      "circle-radius": 14,
      "circle-color": [
        "case",
        ["==", ["get", "kind"], "fabless"],
        "#f0ff53", // yellow-green for fabless
        "#e9bcff", // purple for IDM
      ],
      "circle-stroke-color": "#1a3a6e",
      "circle-stroke-width": 2,
    },
  });

  // Asia company info card markers (DOM-based, above or below dots)
  asiaCardData.forEach(item => {
    const el = document.createElement("div");
    el.className = item.kind === "idm" ? "idm-card-marker" : "asia-fabless-card-marker";
    el.style.display = "none";
    const rankText = item.rank ? ` (#${item.rank})` : "";
    el.innerHTML = `
      <div class="${el.className}-name">${item.name}${rankText}</div>
      <div class="${el.className}-cap">${item.marketcap}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: item.anchor })
      .setLngLat(item.coords)
      .addTo(map);
    asiaCardMarkers.push(marker);
  });

  // ── Scene 8: Load Asia country boundaries from TopoJSON ──
  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
    .then(r => r.json())
    .then(world => {
      const countries = topojson.feature(world, world.objects.countries);
      const asiaTargetIds = new Set(Object.keys(asiaCountryHighlightIds).map(Number));
      const asiaHighlighted = {
        type: "FeatureCollection",
        features: countries.features
          .filter(f => asiaTargetIds.has(Number(f.id)))
          .map(f => {
            const info = asiaCountryHighlightIds[Number(f.id)];
            return {
              ...f,
              properties: { ...f.properties, highlightColor: info.color, name: info.name }
            };
          })
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
    .catch(err => console.warn("Failed to load Asia country boundaries:", err));

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
      "circle-radius": 16,
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

  // ── Scene 4: Load country boundaries from TopoJSON ──
  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
    .then(r => r.json())
    .then(world => {
      const countries = topojson.feature(world, world.objects.countries);
      const targetIds = new Set(Object.keys(countryHighlightIds).map(Number));
      const highlighted = {
        type: "FeatureCollection",
        features: countries.features
          .filter(f => targetIds.has(Number(f.id)))
          .map(f => {
            const info = countryHighlightIds[Number(f.id)];
            return {
              ...f,
              properties: { ...f.properties, highlightColor: info.color, name: info.name }
            };
          })
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
    .catch(err => console.warn("Failed to load country boundaries:", err));

  // ── Scene 4: Bar chart markers ──
  const maxBarHeight = 160;
  const allBarData = [...Object.values(countryHighlightIds), restOfWorldBar];

  allBarData.forEach(item => {
    const barHeight = Math.round((item.value / 43) * maxBarHeight);
    const el = document.createElement("div");
    el.className = "revenue-bar-marker";
    el.style.display = "none";
    el.innerHTML = `
      <div class="revenue-bar-value">${item.value}%</div>
      <div class="revenue-bar" style="height:${barHeight}px;background:${item.color};"></div>
      <div class="revenue-bar-label">${item.name}</div>
    `;
    const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
      .setLngLat(item.coords)
      .addTo(map);
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

    // Toggle marker sets based solely on active scene
    if (mapLoaded) {
      // Old design-revenue dots/labels: keep hidden (replaced by country fills + bars)
      if (map.getLayer("design-revenue-dots") && map.getLayer("design-revenue-labels")) {
        map.setLayoutProperty("design-revenue-dots", "visibility", "none");
        map.setLayoutProperty("design-revenue-labels", "visibility", "none");
      }
      // Country highlights + bar markers for scene 4
      if (map.getLayer("country-fills") && map.getLayer("country-borders")) {
        const revenueVis = currentScene === 4 ? "visible" : "none";
        map.setLayoutProperty("country-fills", "visibility", revenueVis);
        map.setLayoutProperty("country-borders", "visibility", revenueVis);
      }
      barMarkers.forEach(m => {
        m.getElement().style.display = currentScene === 4 ? "flex" : "none";
      });
      if (map.getLayer("fabless-us-dots") && map.getLayer("fabless-us-labels")) {
        const fablessVisibility = currentScene === 5 ? "visible" : "none";
        map.setLayoutProperty("fabless-us-dots", "visibility", fablessVisibility);
        map.setLayoutProperty("fabless-us-labels", "visibility", fablessVisibility);
        map.setLayoutProperty("fabless-us-lines", "visibility", fablessVisibility);
        // Card markers
        fablessCardMarkers.forEach(m => {
          m.getElement().style.display = currentScene === 5 ? "block" : "none";
        });
        // California boundary + cities
        if (map.getLayer("california-fill")) map.setLayoutProperty("california-fill", "visibility", fablessVisibility);
        if (map.getLayer("california-border")) map.setLayoutProperty("california-border", "visibility", fablessVisibility);
        if (map.getLayer("california-city-dots")) map.setLayoutProperty("california-city-dots", "visibility", fablessVisibility);
        if (map.getLayer("california-city-labels")) map.setLayoutProperty("california-city-labels", "visibility", fablessVisibility);
      }
      if (map.getLayer("eda-ip-dots")) {
        const edaVisibility = currentScene === 6 ? "visible" : "none";
        map.setLayoutProperty("eda-ip-dots", "visibility", edaVisibility);
        if (map.getLayer("eda-lines")) map.setLayoutProperty("eda-lines", "visibility", edaVisibility);
        edaCardMarkers.forEach(m => {
          m.getElement().style.display = currentScene === 6 ? "block" : "none";
        });
      }
      if (map.getLayer("idm-us-dots")) {
        const idmVisibility = currentScene === 7 ? "visible" : "none";
        map.setLayoutProperty("idm-us-dots", "visibility", idmVisibility);
        idmCardMarkers.forEach(m => {
          m.getElement().style.display = currentScene === 7 ? "block" : "none";
        });
      }
      if (map.getLayer("asia-semi-dots")) {
        const asiaVisibility = currentScene === 8 ? "visible" : "none";
        map.setLayoutProperty("asia-semi-dots", "visibility", asiaVisibility);
        if (map.getLayer("asia-country-fills")) map.setLayoutProperty("asia-country-fills", "visibility", asiaVisibility);
        if (map.getLayer("asia-country-borders")) map.setLayoutProperty("asia-country-borders", "visibility", asiaVisibility);
        asiaCardMarkers.forEach(m => {
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


