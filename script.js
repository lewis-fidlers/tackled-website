// Recreates the app's real momentum-meter component (see web/src/styles/meter.css
// in the Tackled repo) and plays a scripted loop that demonstrates its one rule:
// completing tasks fills it in, and adding more tasks never drains it back down.
(function () {
  const card = document.getElementById("demoCard");
  const dayEl = document.getElementById("demoDay");
  const cellsEl = document.getElementById("demoCells");
  const countEl = document.getElementById("demoCount");
  const noteEl = document.getElementById("demoNote");
  const noteTextEl = document.getElementById("demoNoteText");
  if (!card) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const GOAL = 4;
  const cells = [];
  for (let i = 0; i < GOAL; i++) {
    const c = document.createElement("div");
    c.className = "demo-cell";
    cellsEl.appendChild(c);
    cells.push(c);
  }

  function paint(filled) {
    cells.forEach((c, i) => {
      c.classList.toggle("on", i < filled);
      c.classList.remove("mid", "high");
      if (i < filled) {
        const frac = filled / GOAL;
        if (frac >= 1) c.classList.add("high");
        else if (frac >= 0.5) c.classList.add("mid");
      }
    });
    countEl.innerHTML = `<b>${filled}</b> of ${GOAL} done`;
    card.classList.toggle("maxed", filled >= GOAL);
  }

  function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

  async function playDay(day, addedNote) {
    dayEl.textContent = day;
    noteEl.classList.remove("show");
    paint(0);
    await wait(500);
    for (let n = 1; n <= GOAL; n++) {
      paint(n);
      await wait(420);
    }
    card.classList.add("pulse");
    await wait(700);
    card.classList.remove("pulse");
    if (addedNote) {
      noteTextEl.textContent = addedNote;
      noteEl.classList.add("show");
    }
    await wait(2200);
  }

  if (reduceMotion) {
    paint(GOAL);
    card.classList.add("maxed");
    dayEl.textContent = "Wednesday";
    noteTextEl.textContent = "2 more tasks added to today's list";
    noteEl.classList.add("show");
    return;
  }

  const script = [
    ["Monday", "1 more task added to today's list"],
    ["Tuesday", null],
    ["Wednesday", "2 more tasks added to today's list"],
    ["Thursday", "3 more tasks added to today's list"],
  ];

  (async function loop() {
    while (true) {
      for (const [day, note] of script) {
        await playDay(day, note);
      }
    }
  })();
})();
