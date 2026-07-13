// The hero and "Capture anywhere" demos are real screen recordings, autoplaying
// muted/looped via HTML attributes. Respect prefers-reduced-motion by freezing
// them on their poster frame instead.
(function () {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll("video[autoplay]").forEach((v) => {
    v.removeAttribute("autoplay");
    v.pause();
    v.currentTime = 0;
  });
})();
