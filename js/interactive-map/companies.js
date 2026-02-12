import { COMPANIES_LAYER_ID, COMPANIES_SOURCE_ID, TYPE_TO_COLOR } from "./constants.js";
import { escapeHtml, loadCompaniesGeoJson, uniqueSorted } from "./csv.js";
import { createFiltersBar, createMultiSelectFilterControl } from "./filters.js";

function buildMatchExpression(getPropertyName, mapping, defaultValue) {
  const expr = ["match", ["get", getPropertyName]];
  for (const [key, value] of Object.entries(mapping)) expr.push(key, value);
  expr.push(defaultValue);
  return expr;
}

function createHoverPopup() {
  return new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 12,
    maxWidth: "320px",
  });
}

function addCompaniesLayer(map) {
  const typeColorExpr = buildMatchExpression("type", TYPE_TO_COLOR, "#111827");

  map.addLayer({
    id: COMPANIES_LAYER_ID,
    type: "circle",
    source: COMPANIES_SOURCE_ID,
    paint: {
      "circle-radius": 11,
      "circle-color": typeColorExpr,
      "circle-stroke-color": "#111827",
      "circle-stroke-width": 1.2,
      "circle-opacity": 0.95,
    },
  });
}

function applyCompanyFilters(map, popup, selectedTypes, selectedCountries) {
  popup.remove();

  const types = Array.from(selectedTypes);
  const countries = Array.from(selectedCountries);

  const typeFilter =
    types.length === 0 ? ["==", ["get", "type"], "__none__"] : ["in", ["get", "type"], ["literal", types]];

  const countryFilter =
    countries.length === 0
      ? ["==", ["get", "country"], "__none__"]
      : ["in", ["get", "country"], ["literal", countries]];

  map.setFilter(COMPANIES_LAYER_ID, ["all", typeFilter, countryFilter]);
}

function wireCompaniesHover(map, popup) {
  map.on("mouseenter", COMPANIES_LAYER_ID, () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", COMPANIES_LAYER_ID, () => {
    map.getCanvas().style.cursor = "grab";
    popup.remove();
  });

  map.on("mousemove", COMPANIES_LAYER_ID, (e) => {
    const f = e.features && e.features[0];
    if (!f) return;
    const coords = f.geometry?.coordinates;
    if (!Array.isArray(coords) || coords.length < 2) return;

    const p = f.properties || {};
    const rank = p.rank ?? "—";
    const name = p.name ?? "—";
    const type = p.type ?? "—";
    const marketcapB = p.marketcapB ?? "—";

    const typeColor = TYPE_TO_COLOR[type] || "#111827";

    const html = `
      <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, sans-serif;">
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px;">${escapeHtml(name)}</div>
        <div style="font-size: 12px; line-height: 1.35;">
          <div><strong>Rank:</strong> ${escapeHtml(rank)}</div>
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <strong>Company type:</strong>
            <span
              style="
                display:inline-flex;
                align-items:center;
                padding:2px 10px;
                border-radius:9999px;
                background:${escapeHtml(typeColor)};
                border:1px solid rgba(17,24,39,0.25);
                font-weight:700;
                font-size:11px;
                line-height:1.6;
                color:#111827;
                white-space:nowrap;
              "
            >${escapeHtml(type)}</span>
          </div>
          <div><strong>Market cap (B):</strong> ${escapeHtml(marketcapB)}</div>
        </div>
      </div>
    `;

    popup.setLngLat(coords).setHTML(html).addTo(map);
  });
}

export async function setupCompanies(map, container) {
  const popup = createHoverPopup();

  const geojson = await loadCompaniesGeoJson();
  if (!geojson) return;

  const allTypes = uniqueSorted(geojson.features.map((f) => String(f?.properties?.type ?? "").trim()));
  const allCountries = uniqueSorted(geojson.features.map((f) => String(f?.properties?.country ?? "").trim()));

  const selectedTypes = new Set(allTypes);
  const selectedCountries = new Set(allCountries);

  if (map.getLayer(COMPANIES_LAYER_ID)) map.removeLayer(COMPANIES_LAYER_ID);
  if (map.getSource(COMPANIES_SOURCE_ID)) map.removeSource(COMPANIES_SOURCE_ID);

  map.addSource(COMPANIES_SOURCE_ID, { type: "geojson", data: geojson });
  addCompaniesLayer(map);

  const filtersBar = createFiltersBar(container);
  const typeControl = createMultiSelectFilterControl({
    label: "Company Type",
    allItems: allTypes,
    selectedItems: selectedTypes,
    swatchColorForItem: (t) => TYPE_TO_COLOR[t] || "#111827",
    onChange: (next) => {
      selectedTypes.clear();
      next.forEach((t) => selectedTypes.add(t));
      applyCompanyFilters(map, popup, selectedTypes, selectedCountries);
    },
  });

  const countryControl = createMultiSelectFilterControl({
    label: "Country",
    allItems: allCountries,
    selectedItems: selectedCountries,
    swatchColorForItem: () => "rgba(17,24,39,0.25)",
    onChange: (next) => {
      selectedCountries.clear();
      next.forEach((c) => selectedCountries.add(c));
      applyCompanyFilters(map, popup, selectedTypes, selectedCountries);
    },
  });

  filtersBar.appendChild(typeControl.el);
  filtersBar.appendChild(countryControl.el);

  applyCompanyFilters(map, popup, selectedTypes, selectedCountries);
  wireCompaniesHover(map, popup);
}

