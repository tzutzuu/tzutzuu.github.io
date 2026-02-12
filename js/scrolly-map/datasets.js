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
  { name: "Intel", rank: 10, marketcap: "$242.77B", coords: [-121.97, 37.37], anchor: "top" },
  { name: "Micron Technology", rank: 6, marketcap: "$427.01B", coords: [-116.2, 43.6], anchor: "bottom" },
  { name: "Texas Instruments", rank: 12, marketcap: "$202.55B", coords: [-96.77, 32.91], anchor: "top" },
  { name: "Analog Devices", rank: 15, marketcap: "$156.9B", coords: [-71.17, 42.56], anchor: "bottom" },
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

export const asiaCardData = [
  { name: "Samsung", rank: 4, marketcap: "$773.95B", kind: "idm", coords: [127.02, 37.26], anchor: "bottom" },
  { name: "SK Hynix", rank: 7, marketcap: "$425.38B", kind: "idm", coords: [127.43, 37.27], anchor: "top" },
  { name: "Sony", rank: null, marketcap: "$166.23B", kind: "idm", coords: [139.586792, 35.400372], anchor: "top" },
  { name: "MediaTek", rank: 19, marketcap: "$90.83B", kind: "fabless", coords: [120.97, 24.81], anchor: "top" },
  { name: "Cambricon Technologies", rank: 22, marketcap: "$64.89B", kind: "fabless", coords: [116.4, 39.9], anchor: "bottom" },
];

export const europeSemiGeoJson = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { name: "Arm Holdings", label: "$148.53B\n(World No.15)\nArm Holdings", kind: "edmip" }, geometry: { type: "Point", coordinates: [0.13, 52.2] } },
    { type: "Feature", properties: { name: "Siemens", label: "$213.37B\nSiemens", kind: "edmip" }, geometry: { type: "Point", coordinates: [11.58, 48.13] } },
    { type: "Feature", properties: { name: "NXP Semiconductors", label: "$58.53B\n(World No.24)\nNXP Semiconductors", kind: "idm" }, geometry: { type: "Point", coordinates: [5.48, 51.44] } },
    { type: "Feature", properties: { name: "Infineon", label: "$57.48B\n(World No.25)\nInfineon", kind: "idm" }, geometry: { type: "Point", coordinates: [11.65, 48.08] } },
  ],
};

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

