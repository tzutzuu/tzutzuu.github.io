export function setupInteractiveMapInfoToggle() {
  const expanded = document.getElementById("interactive-map-info-expanded");
  const collapsed = document.getElementById("interactive-map-info-collapsed");
  const collapseBtn = document.getElementById("interactive-map-info-collapse");
  if (!expanded || !collapsed || !collapseBtn) return;

  const setCollapsed = (isCollapsed) => {
    if (isCollapsed) {
      expanded.classList.add("hidden");
      collapsed.classList.remove("hidden");
    } else {
      collapsed.classList.add("hidden");
      expanded.classList.remove("hidden");
    }
  };

  setCollapsed(false);

  collapseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setCollapsed(true);
  });

  collapsed.addEventListener("click", (e) => {
    e.stopPropagation();
    setCollapsed(false);
  });
}

