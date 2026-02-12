export const MAP_CONTAINER_ID = "interactive-map";

export const CSV_URL = new URL("../../data/semiconductor-companies-headquarters.csv", import.meta.url);

export const FILTER_MENU_OPEN_EVENT = "interactive-map:filter-menu-open";

export const COMPANIES_SOURCE_ID = "companies-final-scene";
export const COMPANIES_LAYER_ID = "companies-final-scene-points";

export const TYPE_TO_COLOR = {
  "Fabless (Design)": "#eeff41",
  "IDM (Design)": "#e9bcff",
  "Pureplay Foundry (Manufacturing)": "#94e0ea",
  "Equipment (Manufacturing)": "#e88ebd",
  "OSAT (ATP)": "#fddb75",
  "Wafer (Manufacturing)": "#ccffa9",
  "EDM & IP (Design)": "#62a1ff",
  "Other": "#00f7a9",
};

