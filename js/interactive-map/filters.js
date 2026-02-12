import { FILTER_MENU_OPEN_EVENT } from "./constants.js";

export function createFiltersBar(container) {
  const bar = document.createElement("div");
  bar.style.position = "absolute";
  bar.style.left = "16px";
  bar.style.bottom = "16px";
  bar.style.zIndex = "5";
  bar.style.pointerEvents = "auto";
  bar.style.display = "flex";
  bar.style.alignItems = "center";
  bar.style.gap = "10px";
  container.appendChild(bar);
  return bar;
}

export function createMultiSelectFilterControl({
  label,
  allItems,
  selectedItems,
  onChange,
  swatchColorForItem,
}) {
  const controlId = `filter-${label.replaceAll(" ", "-").toLowerCase()}-${Math.random()
    .toString(36)
    .slice(2)}`;

  const root = document.createElement("div");
  root.style.position = "relative";
  root.style.pointerEvents = "auto";
  root.style.fontFamily = 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif';
  root.style.display = "inline-block";

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.setAttribute("aria-haspopup", "menu");
  button.setAttribute("aria-expanded", "false");
  button.style.display = "inline-flex";
  button.style.alignItems = "center";
  button.style.gap = "8px";
  button.style.padding = "10px 12px";
  button.style.borderRadius = "12px";
  button.style.border = "1px solid rgba(17,24,39,0.25)";
  button.style.background = "rgba(255,255,255,0.92)";
  button.style.boxShadow = "0 18px 45px rgba(0,0,0,0.18)";
  button.style.fontWeight = "800";
  button.style.fontSize = "13px";
  button.style.color = "#111827";
  button.style.cursor = "pointer";

  const caret = document.createElement("span");
  caret.textContent = "▾";
  caret.style.fontWeight = "900";
  caret.style.opacity = "0.7";
  button.appendChild(caret);

  const menu = document.createElement("div");
  menu.setAttribute("role", "menu");
  menu.style.position = "absolute";
  menu.style.left = "0";
  menu.style.bottom = "calc(100% + 10px)";
  menu.style.width = "260px";
  menu.style.maxHeight = "45vh";
  menu.style.overflow = "auto";
  menu.style.borderRadius = "14px";
  menu.style.border = "1px solid rgba(17,24,39,0.18)";
  menu.style.background = "rgba(255,255,255,0.96)";
  menu.style.boxShadow = "0 18px 45px rgba(0,0,0,0.18)";
  menu.style.padding = "10px";
  menu.style.display = "none";

  const actions = document.createElement("div");
  actions.style.display = "flex";
  actions.style.gap = "8px";
  actions.style.marginBottom = "10px";

  const mkActionBtn = (text) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = text;
    b.style.flex = "1";
    b.style.padding = "8px 10px";
    b.style.borderRadius = "10px";
    b.style.border = "1px solid rgba(17,24,39,0.18)";
    b.style.background = "#ffffff";
    b.style.fontWeight = "800";
    b.style.fontSize = "12px";
    b.style.cursor = "pointer";
    return b;
  };

  const selectAllBtn = mkActionBtn("Select all");
  const clearAllBtn = mkActionBtn("Clear all");
  actions.appendChild(selectAllBtn);
  actions.appendChild(clearAllBtn);
  menu.appendChild(actions);

  const list = document.createElement("div");
  list.style.display = "flex";
  list.style.flexDirection = "column";
  list.style.gap = "8px";
  menu.appendChild(list);

  const checkboxes = new Map();

  const renderList = () => {
    list.innerHTML = "";
    checkboxes.clear();

    allItems.forEach((item) => {
      const row = document.createElement("label");
      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.justifyContent = "space-between";
      row.style.gap = "10px";
      row.style.padding = "8px 10px";
      row.style.borderRadius = "12px";
      row.style.border = "1px solid rgba(17,24,39,0.10)";
      row.style.background = "rgba(248,250,252,0.7)";
      row.style.cursor = "pointer";

      const left = document.createElement("div");
      left.style.display = "flex";
      left.style.alignItems = "center";
      left.style.gap = "10px";

      const dot = document.createElement("span");
      dot.style.width = "10px";
      dot.style.height = "10px";
      dot.style.borderRadius = "9999px";
      dot.style.background = (swatchColorForItem ? swatchColorForItem(item) : null) || "#111827";
      dot.style.border = "1px solid rgba(17,24,39,0.25)";

      const txt = document.createElement("span");
      txt.textContent = item;
      txt.style.fontWeight = "800";
      txt.style.fontSize = "12px";
      txt.style.color = "#111827";

      left.appendChild(dot);
      left.appendChild(txt);

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = selectedItems.has(item);
      cb.style.width = "16px";
      cb.style.height = "16px";
      cb.style.cursor = "pointer";

      row.appendChild(left);
      row.appendChild(cb);
      list.appendChild(row);

      checkboxes.set(item, cb);

      cb.addEventListener("change", () => {
        if (cb.checked) selectedItems.add(item);
        else selectedItems.delete(item);
        onChange(new Set(selectedItems));
      });
    });
  };

  renderList();

  selectAllBtn.addEventListener("click", () => {
    allItems.forEach((t) => selectedItems.add(t));
    checkboxes.forEach((cb) => (cb.checked = true));
    onChange(new Set(selectedItems));
  });

  clearAllBtn.addEventListener("click", () => {
    selectedItems.clear();
    checkboxes.forEach((cb) => (cb.checked = false));
    onChange(new Set(selectedItems));
  });

  const closeMenu = () => {
    menu.style.display = "none";
    button.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    window.dispatchEvent(new CustomEvent(FILTER_MENU_OPEN_EVENT, { detail: { controlId } }));
    menu.style.display = "block";
    button.setAttribute("aria-expanded", "true");
  };

  const onOtherMenuOpened = (e) => {
    const otherId = e?.detail?.controlId;
    if (!otherId || otherId === controlId) return;
    closeMenu();
  };

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.style.display !== "none";
    if (isOpen) closeMenu();
    else openMenu();
  });

  menu.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("click", closeMenu);
  window.addEventListener(FILTER_MENU_OPEN_EVENT, onOtherMenuOpened);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  root.appendChild(button);
  root.appendChild(menu);

  return { el: root };
}

