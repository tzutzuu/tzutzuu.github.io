export const designRevenueGeoJson = {
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

export const fablessUsGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "NVIDIA", rank: 1, type: "Fabless", marketcap: "$4.241T" },
      geometry: { type: "Point", coordinates: [-121.9659302, 37.37187] },
    },
    {
      type: "Feature",
      properties: { name: "Broadcom", rank: 3, type: "Fabless", marketcap: "$1.460T" },
      geometry: { type: "Point", coordinates: [-122.1432136, 37.3993703] },
    },
    {
      type: "Feature",
      properties: { name: "AMD", rank: 8, type: "Fabless", marketcap: "$325.9M" },
      geometry: { type: "Point", coordinates: [-121.9703754, 37.3829498] },
    },
    {
      type: "Feature",
      properties: { name: "QUALCOMM", rank: 14, type: "Fabless", marketcap: "$159.5M" },
      geometry: { type: "Point", coordinates: [-117.1957412, 32.8961271] },
    },
    {
      type: "Feature",
      properties: { name: "Marvell Technology", rank: 23, type: "Fabless", marketcap: "$63.6M" },
      geometry: { type: "Point", coordinates: [-121.9828692, 37.4111844] },
    },
  ],
};

export const edaIpUsGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Synopsys", rank: 21, marketcap: "$80,159M" },
      geometry: { type: "Point", coordinates: [-122.03, 37.39] },
    },
    {
      type: "Feature",
      properties: { name: "Cadence", rank: null, marketcap: "$79,490M" },
      geometry: { type: "Point", coordinates: [-121.93, 37.33] },
    },
  ],
};

export const edaLinesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Synopsys" },
      geometry: { type: "LineString", coordinates: [[-122.03, 37.39], [-122.22, 37.5]] },
    },
    {
      type: "Feature",
      properties: { name: "Cadence" },
      geometry: { type: "LineString", coordinates: [[-121.93, 37.33], [-121.74, 37.22]] },
    },
  ],
};

export const edaCardData = [
  { name: "Synopsys", rank: 21, marketcap: "$80,159M", coords: [-122.22, 37.5] },
  { name: "Cadence", rank: null, marketcap: "$79,490M", coords: [-121.74, 37.22] },
];

export const idmUsGeoJson = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "Intel", rank: 10, marketcap: "$242.77B" }, geometry: { type: "Point", coordinates: [-121.97, 37.37] } },
    { type: "Feature", properties: { name: "Micron Technology", rank: 6, marketcap: "$427.01B" }, geometry: { type: "Point", coordinates: [-116.2, 43.6] } },
    { type: "Feature", properties: { name: "Texas Instruments", rank: 12, marketcap: "$202.55B" }, geometry: { type: "Point", coordinates: [-96.77, 32.91] } },
    { type: "Feature", properties: { name: "Analog Devices", rank: 15, marketcap: "$156.9B" }, geometry: { type: "Point", coordinates: [-71.17, 42.56] } },
  ],
};

export const idmCardData = [
  { name: "Intel", rank: 10, marketcap: "$242.77B", coords: [-121.97, 37.37], anchor: "top", offsetX: 0, offsetY: 1.5 },
  { name: "Micron Technology", rank: 6, marketcap: "$427.01B", coords: [-116.2, 43.6], anchor: "bottom", offsetX: 0, offsetY: -1.5 },
  { name: "Texas Instruments", rank: 12, marketcap: "$202.55B", coords: [-96.77, 32.91], anchor: "bottom", offsetX: 0, offsetY: -1.5 },
  { name: "Analog Devices", rank: 15, marketcap: "$156.9B", coords: [-71.17, 42.56], anchor: "bottom", offsetX: 0, offsetY: -1.3 },
];

export const asiaSemiGeoJson = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "Samsung", rank: 4, marketcap: "$773.95B", kind: "idm" }, geometry: { type: "Point", coordinates: [127.02, 37.26] } },
    { type: "Feature", properties: { name: "SK Hynix", rank: 7, marketcap: "$425.38B", kind: "idm" }, geometry: { type: "Point", coordinates: [127.43, 37.27] } },
    { type: "Feature", properties: { name: "Sony", rank: null, marketcap: "$166.23B", kind: "idm" }, geometry: { type: "Point", coordinates: [139.586792, 35.400372] } },
    { type: "Feature", properties: { name: "MediaTek", rank: 19, marketcap: "$90.83B", kind: "fabless" }, geometry: { type: "Point", coordinates: [120.97, 24.81] } },
    { type: "Feature", properties: { name: "Cambricon Technologies", rank: 22, marketcap: "$64.89B", kind: "fabless" }, geometry: { type: "Point", coordinates: [116.4, 39.9] } },
  ],
};

export const asiaCountryHighlightIds = {
  410: { name: "South Korea", color: "#6366f1" },
  392: { name: "Japan", color: "#ea580c" },
  158: { name: "Taiwan", color: "#16a34a" },
  156: { name: "China", color: "#dc2626" },
};

export const europeCountryHighlightIds = {
  826: { name: "United Kingdom", color: "#ffd561" },
  276: { name: "Germany", color: "#00a7b0" },
  756: { name: "Switzerland", color: "#ec4899" },
  528: { name: "Netherlands", color: "#53cbff" },
};

export const asiaCardData = [
  { name: "Samsung", rank: 4, marketcap: "$773.95B", kind: "idm", coords: [127.02, 37.26], anchor: "top", offsetX: 0, offsetY: 1.5 },
  { name: "SK Hynix", rank: 7, marketcap: "$425.38B", kind: "idm", coords: [127.43, 37.27], anchor: "bottom", offsetX: 0, offsetY: -1.5 },
  { name: "Sony", rank: null, marketcap: "$166.23B", kind: "idm", coords: [139.586792, 35.400372], anchor: "bottom", offsetX: 0, offsetY: -1.5 },
  { name: "MediaTek", rank: 19, marketcap: "$90.83B", kind: "fabless", coords: [120.97, 24.81], anchor: "top", offsetX: 0, offsetY: 1.5 },
  { name: "Cambricon Technologies", rank: 22, marketcap: "$64.89B", kind: "fabless", coords: [116.4, 39.9], anchor: "top", offsetX: 0, offsetY: 1.5 },
];

export const europeSemiGeoJson = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "Arm Holdings", rank: 18, marketcap: "$111.3B", kind: "eda" }, geometry: { type: "Point", coordinates: [0.1787568, 52.181722] } },
    { type: "Feature", properties: { name: "Infineon", rank: 24, marketcap: "$61.93B", kind: "idm" }, geometry: { type: "Point", coordinates: [11.6146179, 48.0802968] } },
    { type: "Feature", properties: { name: "NXP Semiconductors", rank: 25, marketcap: "$57.19B", kind: "idm" }, geometry: { type: "Point", coordinates: [5.4603827, 51.4089645] } },
    { type: "Feature", properties: { name: "STMicroelectronics", rank: 37, marketcap: "$26.48B", kind: "idm" }, geometry: { type: "Point", coordinates: [6.1017261, 46.1645186] } },
  ],
};

export const europeCardData = [
  { name: "Arm Holdings", rank: 18, marketcap: "$111.3B", kind: "eda", coords: [0.1787568, 52.181722], anchor: "bottom", offsetX: 0, offsetY: -1.5 },
  { name: "Infineon", rank: 24, marketcap: "$61.93B", kind: "idm", coords: [11.6146179, 48.0802968], anchor: "top", offsetX: 0, offsetY: 1.5 },
  { name: "NXP Semiconductors", rank: 25, marketcap: "$57.19B", kind: "idm", coords: [5.4603827, 51.4089645], anchor: "top", offsetX: 0, offsetY: 1.5 },
  { name: "STMicroelectronics", rank: 37, marketcap: "$26.48B", kind: "idm", coords: [6.1017261, 46.1645186], anchor: "bottom", offsetX: 0, offsetY: -1.5 },
];

export const fablessUsLinesGeoJson = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "NVIDIA" }, geometry: { type: "LineString", coordinates: [[-121.9659302, 37.37187], [-123.6, 36.4]] } },
    { type: "Feature", properties: { name: "Broadcom" }, geometry: { type: "LineString", coordinates: [[-122.1432136, 37.3993703], [-124.2, 37.5]] } },
    { type: "Feature", properties: { name: "AMD" }, geometry: { type: "LineString", coordinates: [[-121.9703754, 37.3829498], [-123.4, 35.3]] } },
    { type: "Feature", properties: { name: "Marvell Technology" }, geometry: { type: "LineString", coordinates: [[-121.9828692, 37.4111844], [-124.0, 38.6]] } },
    { type: "Feature", properties: { name: "QUALCOMM" }, geometry: { type: "LineString", coordinates: [[-117.1957412, 32.8961271], [-118.8, 34.2]] } },
  ],
};

export const fablessCardData = [
  { name: "NVIDIA", rank: 1, marketcap: "$4.241T", coords: [-123.6, 36.4] },
  { name: "Broadcom", rank: 3, marketcap: "$1.460T", coords: [-124.2, 37.5] },
  { name: "AMD", rank: 8, marketcap: "$325.9M", coords: [-123.4, 35.3] },
  { name: "Marvell Technology", rank: 23, marketcap: "$63.6M", coords: [-124.0, 38.6] },
  { name: "QUALCOMM", rank: 14, marketcap: "$159.5M", coords: [-118.8, 34.2] },
];

export const countryHighlightIds = {
  840: { name: "United States", value: 43, color: "#1a3a6e", coords: [-98, 39] },
  410: { name: "South Korea", value: 21, color: "#2563eb", coords: [128, 36] },
  158: { name: "Taiwan", value: 8, color: "#16a34a", coords: [121, 23] },
  392: { name: "Japan", value: 7.4, color: "#ea580c", coords: [145, 37] },
  156: { name: "China", value: 7, color: "#dc2626", coords: [104, 33] },
};

export const restOfWorldBar = { name: "Rest of World", value: 13.5, color: "#9ca3af", coords: [60, -8] };

export const californiaCitiesGeoJson = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "San Francisco" }, geometry: { type: "Point", coordinates: [-122.4194, 37.7749] } },
    { type: "Feature", properties: { name: "Los Angeles" }, geometry: { type: "Point", coordinates: [-118.2437, 34.0522] } },
    { type: "Feature", properties: { name: "San Diego" }, geometry: { type: "Point", coordinates: [-117.1611, 32.7157] } },
    { type: "Feature", properties: { name: "Sacramento" }, geometry: { type: "Point", coordinates: [-121.4944, 38.5816] } },
    { type: "Feature", properties: { name: "San Jose" }, geometry: { type: "Point", coordinates: [-121.8863, 37.3382] } },
  ],
};

// Advanced processes market share 2024 (scene 13)
export const advancedProcessCountryHighlightIds = {
  158: { name: "Taiwan", value: 66, color: "#16a34a", coords: [121, 21] },
  840: { name: "United States", value: 10, color: "#1a3a6e", coords: [-98, 39] },
  410: { name: "South Korea", value: 11, color: "#2563eb", coords: [129, 35] },
  156: { name: "China", value: 9, color: "#dc2626", coords: [103, 32] },
  392: { name: "Japan", value: 0, color: "#ea580c", coords: [142, 37] },
};

export const advancedProcessExtraBars = [
  { name: "Europe", value: 0, color: "#9ca3af", coords: [15, 50] },
  { name: "Rest of World", value: 4, color: "#9ca3af", coords: [60, -8] },
];

// Mature processes market share 2024 (scene 14)
export const matureProcessCountryHighlightIds = {
  158: { name: "Taiwan", value: 42, color: "#16a34a", coords: [121, 21] },
  840: { name: "United States", value: 4, color: "#1a3a6e", coords: [-98, 39] },
  410: { name: "South Korea", value: 9, color: "#2563eb", coords: [129, 35] },
  156: { name: "China", value: 33, color: "#dc2626", coords: [103, 32] },
  392: { name: "Japan", value: 3, color: "#ea580c", coords: [142, 37] },
};

export const matureProcessExtraBars = [
  { name: "Europe", value: 0, color: "#9ca3af", coords: [15, 50] },
  { name: "Rest of World", value: 8, color: "#9ca3af", coords: [60, -8] },
];

// Global ATP capacity share (scene 22) — BCG; country fills + bar order
export const atpCapacityCountryHighlightIds = {
  840: { name: "United States", value: 4, color: "#1a3a6e", coords: [-98, 39] },
  /* Bar anchor coords offset from land so labels don’t stack (fills still follow real borders). */
  158: { name: "Taiwan", value: 27, color: "#16a34a", coords: [127.2, 21.2] },
  156: { name: "China", value: 30, color: "#dc2626", coords: [103, 32] },
  410: { name: "South Korea", value: 9, color: "#2563eb", coords: [130.5, 38.2] },
  458: { name: "Malaysia", value: 7, color: "#f97316", coords: [109.5, 2.8] },
  608: { name: "Philippines", value: 6, color: "#a855f7", coords: [126.5, 9.5] },
  764: { name: "Thailand", value: 2, color: "#14b8a6", coords: [99.2, 17.8] },
  484: { name: "Mexico", value: 2, color: "#ca8a04", coords: [-102, 23] },
};

/** Bar chart order (matches narrative); includes EU aggregate (no single country polygon). */
export const atpCapacityBarItems = [
  { name: "United States", value: 4, color: "#1a3a6e", coords: [-98, 39] },
  { name: "The EU", value: 3, color: "#ffca2c", coords: [12, 52] },
  { name: "South Korea", value: 9, color: "#2563eb", coords: [130.5, 38.2] },
  { name: "Taiwan", value: 27, color: "#16a34a", coords: [118.2, 21.2] },
  { name: "China", value: 30, color: "#dc2626", coords: [103, 32] },
  { name: "Malaysia", value: 7, color: "#f97316", coords: [109.5, 2.8] },
  { name: "Philippines", value: 6, color: "#a855f7", coords: [126.5, 4.5] },
  { name: "Thailand", value: 2, color: "#14b8a6", coords: [99.2, 17.8] },
  { name: "Mexico", value: 2, color: "#ca8a04", coords: [-102, 23] },
];

// Foundry market share by company (scene 15)
export const foundryMarketShareGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        rank: "2",
        name: "TSMC",
        marketcap: "$1.689 T",
        percentage: "70.2%",
        process: "Advanced",
        type: "Foundry",
      },
      geometry: { type: "Point", coordinates: [121.0046856, 24.7820648] },
    },
    {
      type: "Feature",
      properties: {
        rank: "39",
        name: "United Microelectronics",
        marketcap: "$24.91 B",
        percentage: "4.4%",
        process: "Mature",
        type: "Foundry",
      },
      geometry: { type: "Point", coordinates: [121.0062859, 24.7823005] },
    },
    {
      type: "Feature",
      properties: {
        rank: "4",
        name: "Samsung",
        marketcap: "$773.95 B",
        percentage: "7.3%",
        process: "Advanced",
        type: "Foundry",
      },
      geometry: { type: "Point", coordinates: [127.0511335, 37.2558477] },
    },
    {
      type: "Feature",
      properties: {
        rank: "20",
        name: "SMIC",
        marketcap: "$85.6 B",
        percentage: "5.1%",
        process: "Advanced",
        type: "Foundry",
      },
      geometry: { type: "Point", coordinates: [121.60866, 31.2181] },
    },
    {
      type: "Feature",
      properties: {
        rank: "x",
        name: "Huahong Group",
        marketcap: "$23.95 B",
        percentage: "2.5%",
        process: "Mature",
        type: "Foundry",
      },
      geometry: { type: "Point", coordinates: [121.58521, 31.20748] },
    },
    {
      type: "Feature",
      properties: {
        rank: "41",
        name: "Global Foundries",
        marketcap: "$22.84 B",
        percentage: "3.9%",
        process: "Mature",
        type: "Foundry",
      },
      geometry: { type: "Point", coordinates: [-73.7590016, 42.9705801] },
    },
  ],
};

export const foundryCountryHighlightIds = {
  158: { name: "Taiwan", color: "#16a34a" },
  410: { name: "South Korea", color: "#2563eb" },
  156: { name: "China", color: "#dc2626" },
  840: { name: "United States", color: "#1a3a6e" },
};

export const foundryCardData = [
  {
    name: "TSMC",
    rank: "2",
    marketcap: "$1.689 T",
    percentage: "70.2%",
    process: "Advanced",
    coords: [100.0, 5.0],
  },
  {
    name: "United Microelectronics",
    rank: "39",
    marketcap: "$24.91 B",
    percentage: "4.4%",
    process: "Mature",
    coords: [140.0, 10.0],
  },
  {
    name: "Samsung",
    rank: "4",
    marketcap: "$773.95 B",
    percentage: "7.3%",
    process: "Advanced",
    coords: [148.0, 52.0],
  },
  {
    name: "SMIC",
    rank: "20",
    marketcap: "$85.6 B",
    percentage: "5.1%",
    process: "Advanced",
    coords: [100.0, 50.0],
  },
  {
    name: "Huahong Group",
    rank: "",
    marketcap: "$23.95 B",
    percentage: "2.5%",
    process: "Mature",
    coords: [80.0, 30.0],
  },
  {
    name: "Global Foundries",
    rank: "41",
    marketcap: "$22.84 B",
    percentage: "3.9%",
    process: "Mature",
    coords: [-52.0, 47.0],
  },
];

export const foundryLinesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "TSMC" },
      geometry: {
        type: "LineString",
        coordinates: [
          [121.0046856, 24.7820648],
          [100.0, 5.0],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "United Microelectronics" },
      geometry: {
        type: "LineString",
        coordinates: [
          [121.0062859, 24.7823005],
          [140.0, 10.0],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Samsung" },
      geometry: {
        type: "LineString",
        coordinates: [
          [127.0511335, 37.2558477],
          [148.0, 52.0],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "SMIC" },
      geometry: {
        type: "LineString",
        coordinates: [
          [121.60866, 31.2181],
          [100.0, 50.0],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Huahong Group" },
      geometry: {
        type: "LineString",
        coordinates: [
          [121.58521, 31.20748],
          [80.0, 30.0],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Global Foundries" },
      geometry: {
        type: "LineString",
        coordinates: [
          [-73.7590016, 42.9705801],
          [-52.0, 47.0],
        ],
      },
    },
  ],
};

export const equipmentGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Tokyo Electron", rank: "16", marketcap: "$119.00B", type: "Equipment" },
      geometry: { type: "Point", coordinates: [139.7364288, 35.6732106] },
    },
    {
      type: "Feature",
      properties: { name: "Disco Corp.", rank: "28", marketcap: "$47.126B", type: "Equipment" },
      geometry: { type: "Point", coordinates: [139.7339948, 35.5868586] },
    },
    {
      type: "Feature",
      properties: { name: "SCREEN Holdings", rank: "51", marketcap: "$12.642B", type: "Equipment" },
      geometry: { type: "Point", coordinates: [135.7516371, 35.0338801] },
    },
    {
      type: "Feature",
      properties: { name: "NAURA Technology Group", rank: "27", marketcap: "$49.119B", type: "Equipment" },
      geometry: { type: "Point", coordinates: [116.407395, 39.904211] },
    },
    {
      type: "Feature",
      properties: { name: "AMEC", rank: "33", marketcap: "$31.502B", type: "Equipment" },
      geometry: { type: "Point", coordinates: [121.67931, 31.22885] },
    },
  ],
};

export const equipmentCountryHighlightIds = {
  156: { name: "China", color: "#dc2626" },
  392: { name: "Japan", color: "#ea580c" },
};

export const equipmentCardData = [
  { name: "Tokyo Electron", rank: "16", marketcap: "$119.00B", coords: [147.0, 42.5] },
  { name: "Disco Corp.", rank: "28", marketcap: "$47.126B", coords: [147.0, 35.0] },
  { name: "SCREEN Holdings", rank: "51", marketcap: "$12.642B", coords: [129.5, 39.0] },
  { name: "NAURA Technology Group", rank: "27", marketcap: "$49.119B", coords: [108.0, 47.5] },
  { name: "AMEC", rank: "33", marketcap: "$31.502B", coords: [127.8, 24.5] },
];

export const equipmentLinesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Tokyo Electron" },
      geometry: { type: "LineString", coordinates: [[139.7364288, 35.6732106], [147.0, 42.5]] },
    },
    {
      type: "Feature",
      properties: { name: "Disco Corp." },
      geometry: { type: "LineString", coordinates: [[139.7339948, 35.5868586], [147.0, 35.0]] },
    },
    {
      type: "Feature",
      properties: { name: "SCREEN Holdings" },
      geometry: { type: "LineString", coordinates: [[135.7516371, 35.0338801], [129.5, 39.0]] },
    },
    {
      type: "Feature",
      properties: { name: "NAURA Technology Group" },
      geometry: { type: "LineString", coordinates: [[116.407395, 39.904211], [108.0, 47.5]] },
    },
    {
      type: "Feature",
      properties: { name: "AMEC" },
      geometry: { type: "LineString", coordinates: [[121.67931, 31.22885], [127.8, 24.5]] },
    },
  ],
};

export const equipmentUsNlGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Lam Research", rank: "9", marketcap: "$263.49B", type: "Equipment" },
      geometry: { type: "Point", coordinates: [-121.9570265, 37.4885263] },
    },
    {
      type: "Feature",
      properties: { name: "Applied Materials", rank: "11", marketcap: "$236.212B", type: "Equipment" },
      geometry: { type: "Point", coordinates: [-121.9792715, 37.3777843] },
    },
    {
      type: "Feature",
      properties: { name: "KLA", rank: "13", marketcap: "$171.759B", type: "Equipment" },
      geometry: { type: "Point", coordinates: [-121.9255574, 37.4210942] },
    },
    {
      type: "Feature",
      properties: { name: "ASML", rank: "5", marketcap: "$519.780B", type: "Equipment" },
      geometry: { type: "Point", coordinates: [5.412781, 51.404027] },
    },
    {
      type: "Feature",
      properties: { name: "ASM International", rank: "31", marketcap: "$38.572B", type: "Equipment" },
      geometry: { type: "Point", coordinates: [5.1894332, 52.3492057] },
    },
  ],
};

export const equipmentUsNlCountryHighlightIds = {
  840: { name: "United States", color: "#1a3a6e" },
  528: { name: "Netherlands", color: "#53cbff" },
};

export const equipmentUsNlCardData = [
  { name: "Lam Research", rank: "9", marketcap: "$263.49B", coords: [-130.0, 42.8] },
  { name: "Applied Materials", rank: "11", marketcap: "$236.212B", coords: [-110.0, 32.5] },
  { name: "KLA", rank: "13", marketcap: "$171.759B", coords: [-136.0, 31.8] },
  { name: "ASML", rank: "5", marketcap: "$519.780B", coords: [16.2, 44.8] },
  { name: "ASM International", rank: "31", marketcap: "$38.572B", coords: [16.2, 58.2] },
];

export const equipmentUsNlLinesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Lam Research" },
      geometry: { type: "LineString", coordinates: [[-121.9570265, 37.4885263], [-130.0, 42.8]] },
    },
    {
      type: "Feature",
      properties: { name: "Applied Materials" },
      geometry: { type: "LineString", coordinates: [[-121.9792715, 37.3777843], [-110.0, 32.5]] },
    },
    {
      type: "Feature",
      properties: { name: "KLA" },
      geometry: { type: "LineString", coordinates: [[-121.9255574, 37.4210942], [-136.0, 31.8]] },
    },
    {
      type: "Feature",
      properties: { name: "ASML" },
      geometry: { type: "LineString", coordinates: [[5.412781, 51.404027], [16.2, 44.8]] },
    },
    {
      type: "Feature",
      properties: { name: "ASM International" },
      geometry: { type: "LineString", coordinates: [[5.1894332, 52.3492057], [16.2, 58.2]] },
    },
  ],
};

export const waferGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Shin-Etsu", rank: "", marketcap: "$61.94B", type: "Wafer" },
      geometry: { type: "Point", coordinates: [139.7650482, 35.6842777] },
    },
    {
      type: "Feature",
      properties: { name: "GlobalWafers", rank: "73", marketcap: "$7.25B", type: "Wafer" },
      geometry: { type: "Point", coordinates: [121.0062859, 24.7823005] },
    },
    {
      type: "Feature",
      properties: { name: "Sumco Corporation", rank: "91", marketcap: "$3.61B", type: "Wafer" },
      geometry: { type: "Point", coordinates: [139.7569483, 35.6499636] },
    },
    {
      type: "Feature",
      properties: { name: "Siltronic", rank: "114", marketcap: "$1.71B", type: "Wafer" },
      geometry: { type: "Point", coordinates: [11.6226634, 48.1375703] },
    },
    {
      type: "Feature",
      properties: { name: "Soitec", rank: "120", marketcap: "$1.27B", type: "Wafer" },
      geometry: { type: "Point", coordinates: [5.877707, 45.264005] },
    },
    {
      type: "Feature",
      properties: { name: "SK Siltron", rank: "", marketcap: "$1.4B", type: "Wafer" },
      geometry: { type: "Point", coordinates: [128.3509342, 36.1172459] },
    },
  ],
};

export const waferCountryHighlightIds = {
  392: { name: "Japan", color: "#ea580c" },
  158: { name: "Taiwan", color: "#16a34a" },
  276: { name: "Germany", color: "#00a7b0" },
  250: { name: "France", color: "#3b82f6" },
  410: { name: "South Korea", color: "#2563eb" },
};

export const waferCardData = [
  { name: "Shin-Etsu", rank: "", marketcap: "$61.94B", coords: [151.0, 41.0] },
  { name: "GlobalWafers", rank: "73", marketcap: "$7.25B", coords: [131.5, 20.5] },
  { name: "Sumco Corporation", rank: "91", marketcap: "$3.61B", coords: [151.0, 33.0] },
  { name: "Siltronic", rank: "114", marketcap: "$1.71B", coords: [20.0, 52.0] },
  { name: "Soitec", rank: "120", marketcap: "$1.27B", coords: [-1.0, 41.0] },
  { name: "SK Siltron", rank: "", marketcap: "$1.4B", coords: [139.5, 45.5] },
];

export const waferLinesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Shin-Etsu" },
      geometry: { type: "LineString", coordinates: [[139.7650482, 35.6842777], [151.0, 41.0]] },
    },
    {
      type: "Feature",
      properties: { name: "GlobalWafers" },
      geometry: { type: "LineString", coordinates: [[121.0062859, 24.7823005], [131.5, 20.5]] },
    },
    {
      type: "Feature",
      properties: { name: "Sumco Corporation" },
      geometry: { type: "LineString", coordinates: [[139.7569483, 35.6499636], [151.0, 33.0]] },
    },
    {
      type: "Feature",
      properties: { name: "Siltronic" },
      geometry: { type: "LineString", coordinates: [[11.6226634, 48.1375703], [20.0, 52.0]] },
    },
    {
      type: "Feature",
      properties: { name: "Soitec" },
      geometry: { type: "LineString", coordinates: [[5.877707, 45.264005], [-1.0, 41.0]] },
    },
    {
      type: "Feature",
      properties: { name: "SK Siltron" },
      geometry: { type: "LineString", coordinates: [[128.3509342, 36.1172459], [139.5, 45.5]] },
    },
  ],
};

// OSAT Taiwan (scene 23)
export const osatTaiwanGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "ASE Group", share: "44.6%", marketcap: "$41.43B", kind: "osat" },
      geometry: { type: "Point", coordinates: [120.3014353, 22.6272784] },
    },
    {
      type: "Feature",
      properties: { name: "Powertech Technology Inc.", share: "5.5%", marketcap: "$4.66B", kind: "osat" },
      geometry: { type: "Point", coordinates: [120.9983556, 24.8693044] },
    },
    {
      type: "Feature",
      properties: { name: "King Yuan Electronics Group", share: "2.2%", marketcap: "$9.9B", kind: "osat" },
      geometry: { type: "Point", coordinates: [121.0072678, 24.7975947] },
    },
    {
      type: "Feature",
      properties: { name: "ChipMos", share: "1.7%", marketcap: "$1.24B", kind: "osat" },
      geometry: { type: "Point", coordinates: [121.0017566, 24.7758606] },
    },
  ],
};

export const osatTaiwanCountryHighlightIds = {
  158: { name: "Taiwan", color: "#16a34a" },
};

export const osatTaiwanCardData = [
  { name: "ASE Group", share: "44.6%", marketcap: "$41.43B", coords: [118.35, 21.65] },
  { name: "Powertech Technology Inc.", share: "5.5%", marketcap: "$4.66B", coords: [123.15, 25.45] },
  { name: "King Yuan Electronics Group", share: "2.2%", marketcap: "$9.9B", coords: [122.55, 24.0] },
  { name: "ChipMos", share: "1.7%", marketcap: "$1.24B", coords: [119.15, 25.15] },
];

export const osatTaiwanLinesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "ASE Group" },
      geometry: { type: "LineString", coordinates: [[120.3014353, 22.6272784], [118.35, 21.65]] },
    },
    {
      type: "Feature",
      properties: { name: "Powertech Technology Inc." },
      geometry: { type: "LineString", coordinates: [[120.9983556, 24.8693044], [123.15, 25.45]] },
    },
    {
      type: "Feature",
      properties: { name: "King Yuan Electronics Group" },
      geometry: { type: "LineString", coordinates: [[121.0072678, 24.7975947], [122.55, 24.0]] },
    },
    {
      type: "Feature",
      properties: { name: "ChipMos" },
      geometry: { type: "LineString", coordinates: [[121.0017566, 24.7758606], [119.15, 25.15]] },
    },
  ],
};

// OSAT China (scene 24)
export const osatChinaGeoJson = {
  type: "FeatureCollection",
  features: [
    /* Jiangyin cluster: display offsets so dots + labels read cleanly at scene zoom */
    {
      type: "Feature",
      properties: { name: "JCET", share: "12%", marketcap: "$70.66B", kind: "osat" },
      geometry: { type: "Point", coordinates: [119.72, 31.48] },
    },
    {
      type: "Feature",
      properties: { name: "Tongfu Microelectronics", share: "8%", marketcap: "$8.50B", kind: "osat" },
      geometry: { type: "Point", coordinates: [121.48, 32.52] },
    },
    {
      type: "Feature",
      properties: { name: "Tianshui Huatian Technology", share: "2.2%", marketcap: "$5.4B", kind: "osat" },
      geometry: { type: "Point", coordinates: [105.70996, 34.57975] },
    },
    {
      type: "Feature",
      properties: { name: "Wise Road Capital", share: "1.7%", marketcap: "$12.33B", kind: "osat" },
      geometry: { type: "Point", coordinates: [116.4579436, 39.9095506] },
    },
  ],
};

export const osatChinaCountryHighlightIds = {
  156: { name: "China", color: "#dc2626" },
};

export const osatChinaCardData = [
  /* JCET / Tongfu: cards far apart (NE vs S) so HTML markers don’t stack on screen */
  { name: "JCET", share: "12%", marketcap: "$70.66B", coords: [132.4, 34.15] },
  { name: "Tongfu Microelectronics", share: "8%", marketcap: "$8.50B", coords: [117.85, 25.35] },
  { name: "Tianshui Huatian Technology", share: "2.2%", marketcap: "$5.4B", coords: [101.8, 38.85] },
  { name: "Wise Road Capital", share: "1.7%", marketcap: "$12.33B", coords: [125.8, 42.45] },
];

export const osatChinaLinesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "JCET" },
      geometry: { type: "LineString", coordinates: [[119.72, 31.48], [127.4, 34.15]] },
    },
    {
      type: "Feature",
      properties: { name: "Tongfu Microelectronics" },
      geometry: { type: "LineString", coordinates: [[121.48, 32.52], [117.85, 28.35]] },
    },
    {
      type: "Feature",
      properties: { name: "Tianshui Huatian Technology" },
      geometry: { type: "LineString", coordinates: [[105.70996, 34.57975], [101.8, 35.85]] },
    },
    {
      type: "Feature",
      properties: { name: "Wise Road Capital" },
      geometry: { type: "LineString", coordinates: [[116.4579436, 39.9095506], [119.8, 40.45]] },
    },
  ],
};

// OSAT global — Amkor, Hana Micron, Advantest equipment (scene 25)
export const osatGlobalGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Advantest", role: "OSAT equipment", marketcap: "$41.43B", kind: "equipment" },
      geometry: { type: "Point", coordinates: [139.7655925, 35.6836406] },
    },
    {
      type: "Feature",
      properties: { name: "Amkor Technology", share: "15.2%", marketcap: "$10.84B", kind: "osat" },
      geometry: { type: "Point", coordinates: [-111.8990921, 33.3355266] },
    },
    {
      type: "Feature",
      properties: { name: "Hana Micron", share: "2.2%", marketcap: "$1.3B", kind: "osat" },
      geometry: { type: "Point", coordinates: [127.043444, 36.8674107] },
    },
  ],
};

export const osatGlobalCountryHighlightIds = {
  840: { name: "United States", color: "#1a3a6e" },
  392: { name: "Japan", color: "#ea580c" },
  410: { name: "South Korea", color: "#2563eb" },
};

export const osatGlobalCardData = [
  { name: "Advantest", role: "OSAT equipment", marketcap: "$41.43B", kind: "equipment", coords: [128.5, 52.5] },
  { name: "Amkor Technology", share: "15.2%", marketcap: "$10.84B", kind: "osat", coords: [-118.0, 22.8] },
  { name: "Hana Micron", share: "2.2%", marketcap: "$1.3B", kind: "osat", coords: [112.5, 22.2] },
];

export const osatGlobalLinesGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Advantest" },
      geometry: { type: "LineString", coordinates: [[139.7655925, 35.6836406], [128.5, 52.5]] },
    },
    {
      type: "Feature",
      properties: { name: "Amkor Technology" },
      geometry: { type: "LineString", coordinates: [[-111.8990921, 33.3355266], [-118.0, 22.8]] },
    },
    {
      type: "Feature",
      properties: { name: "Hana Micron" },
      geometry: { type: "LineString", coordinates: [[127.043444, 36.8674107], [112.5, 22.2]] },
    },
  ],
};

