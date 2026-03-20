const header = document.querySelector(".site-header");
const nav = header?.querySelector(".site-nav");
const toggleButton = header?.querySelector(".site-nav-toggle");

if (!header || !nav || !toggleButton) {
  // Nothing to wire on pages without the shared header.
} else {
  const setOpenState = (isOpen) => {
    header.classList.toggle("is-open", isOpen);
    toggleButton.classList.toggle("is-active", isOpen);
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    toggleButton.setAttribute("aria-label", isOpen ? "Hide navigation" : "Show navigation");
  };

  setOpenState(false);

  toggleButton.addEventListener("click", () => {
    const isOpen = header.classList.contains("is-open");
    setOpenState(!isOpen);
  });

  let lastKnownScrollY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const currentY = window.scrollY;
      const movedEnoughToClose = Math.abs(currentY - lastKnownScrollY) > 3;

      if (header.classList.contains("is-open") && movedEnoughToClose) {
        setOpenState(false);
      }

      lastKnownScrollY = currentY;
    },
    { passive: true }
  );

  header.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-open")) {
      setOpenState(false);
      toggleButton.focus();
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpenState(false));
  });
}
