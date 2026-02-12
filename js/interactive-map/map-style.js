export function buildInteractiveMapStyle() {
  return {
    version: 8,
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    sources: {
      cartoBase: {
        type: "raster",
        tiles: ["https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution:
          '<a href="https://www.openstreetmap.org/copyright"></a> <a href="https://carto.com/attributions"></a>',
      },
      cartoLabels: {
        type: "raster",
        tiles: ["https://a.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png"],
        tileSize: 256,
      },
      dem: {
        type: "raster-dem",
        url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
        tileSize: 256,
      },
    },
    layers: [
      { id: "background", type: "background", paint: { "background-color": "#f8fafc" } },
      { id: "carto-base", type: "raster", source: "cartoBase", minzoom: 0, maxzoom: 19 },
      {
        id: "terrain-hillshade",
        type: "hillshade",
        source: "dem",
        paint: {
          "hillshade-exaggeration": 0.35,
          "hillshade-shadow-color": "rgba(17,24,39,0.35)",
          "hillshade-highlight-color": "rgba(255,255,255,0.9)",
          "hillshade-accent-color": "rgba(148,163,184,0.65)",
        },
      },
      { id: "carto-labels", type: "raster", source: "cartoLabels", minzoom: 0, maxzoom: 19 },
    ],
  };
}

