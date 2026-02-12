import { CSV_URL } from "./constants.js";

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function parseCsv(text) {
  // RFC4180-ish parser that supports commas, quotes, and newlines inside quotes.
  const rows = [];
  let row = [];
  let field = "";
  let i = 0;
  let inQuotes = false;

  while (i < text.length) {
    const c = text[i];

    if (inQuotes) {
      if (c === '"') {
        const next = text[i + 1];
        if (next === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += c;
      i += 1;
      continue;
    }

    if (c === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }

    if (c === ",") {
      row.push(field);
      field = "";
      i += 1;
      continue;
    }

    if (c === "\r") {
      i += 1;
      continue;
    }

    if (c === "\n") {
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
      i += 1;
      continue;
    }

    field += c;
    i += 1;
  }

  row.push(field);
  rows.push(row);
  return rows;
}

export function uniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

export async function loadCompaniesGeoJson() {
  const res = await fetch(CSV_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch CSV (${res.status})`);

  const text = await res.text();
  const rows = parseCsv(text).filter((r) => r.some((cell) => String(cell ?? "").trim() !== ""));
  if (rows.length < 2) return null;

  const header = rows[0].map((h) => String(h || "").trim());
  const idx = (name) => header.findIndex((h) => h.toLowerCase() === name.toLowerCase());

  const iRank = idx("Rank");
  const iName = idx("Name");
  const iType = idx("Type of company");
  const iCap = idx("marketcap (billion)");
  const iLat = idx("Latitude");
  const iLon = idx("Longitude");
  const iCountry = idx("country");

  const features = [];

  for (let r = 1; r < rows.length; r += 1) {
    const cols = rows[r];
    const lat = Number(String(cols[iLat] ?? "").trim());
    const lon = Number(String(cols[iLon] ?? "").trim());
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;

    const rankRaw = String(cols[iRank] ?? "").trim();
    const rank = rankRaw === "" ? null : Number(rankRaw);

    features.push({
      type: "Feature",
      properties: {
        rank: Number.isFinite(rank) ? rank : rankRaw || null,
        name: String(cols[iName] ?? "").trim(),
        type: String(cols[iType] ?? "").trim(),
        marketcapB: String(cols[iCap] ?? "").trim(),
        country: String(cols[iCountry] ?? "").trim(),
      },
      geometry: { type: "Point", coordinates: [lon, lat] },
    });
  }

  return { type: "FeatureCollection", features };
}

