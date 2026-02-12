export function attachMapErrorLogger(map) {
  map.on("error", (e) => {
    console.warn("Interactive map error:", e?.error || e);
  });
}

export function preventBrowserPageZoomOnPinch(container, map) {
  // Chrome/Firefox: trackpad pinch => wheel event with ctrlKey true (browser zoom).
  // Safari: trackpad pinch can emit gesture* events (browser zoom).
  // We preventDefault these while over the map and let MapLibre handle it.
  let gestureZooming = false;

  container.addEventListener(
    "wheel",
    (e) => {
      if (gestureZooming || e.ctrlKey) e.preventDefault();
    },
    { passive: false, capture: true }
  );

  const onGestureStart = (e) => {
    gestureZooming = true;
    if (map.scrollZoom) map.scrollZoom.disable();
    e.preventDefault();
  };
  const onGestureChange = (e) => {
    if (!gestureZooming) return;
    e.preventDefault();
    map.zoomTo(map.getZoom() + Math.log2(e.scale), { duration: 0 });
  };
  const onGestureEnd = (e) => {
    gestureZooming = false;
    if (map.scrollZoom) map.scrollZoom.enable();
    e.preventDefault();
  };

  container.addEventListener("gesturestart", onGestureStart, { passive: false });
  container.addEventListener("gesturechange", onGestureChange, { passive: false });
  container.addEventListener("gestureend", onGestureEnd, { passive: false });
}

export function configureMapInteractions(map) {
  if (map.dragRotate) map.dragRotate.disable();
  if (map.touchPitch) map.touchPitch.disable();
  if (map.keyboard) map.keyboard.disable();
  if (map.doubleClickZoom) map.doubleClickZoom.enable();

  if (map.touchZoomRotate) {
    map.touchZoomRotate.enable();
    map.touchZoomRotate.disableRotation();
  }
  if (map.dragPan) map.dragPan.enable();

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
}

