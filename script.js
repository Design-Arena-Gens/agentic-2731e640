const tools = [
  {
    name: "Pika",
    url: "https://pika.art/",
    summary: "Best overall free option for image?to?video; great balance of speed, quality, and controls.",
    free: true,
    watermark: true,
    notes: ["High quality motion and coherence", "Frequent model updates", "Image?to?video + edits"],
    bestFor: "Overall quality with a usable free tier",
    freeNotes: "Free tier with rate limits; watermark often applies",
  },
  {
    name: "Luma Dream Machine",
    url: "https://lumalabs.ai/dream-machine",
    summary: "Top?tier fidelity and physics; queues can be slow at peak times.",
    free: true,
    watermark: true,
    notes: ["Excellent motion realism", "Great detail retention", "Higher latency at times"],
    bestFor: "Highest realism and physics",
    freeNotes: "Metered free credits; watermark/queue may apply",
  },
  {
    name: "PixVerse",
    url: "https://pixverse.ai/",
    summary: "Popular free community option; fast iterations; watermark on free tier.",
    free: true,
    watermark: true,
    notes: ["Community driven", "Decent motion", "Good for quick social posts"],
    bestFor: "Quick social?style animations",
    freeNotes: "Free with watermark; community queues",
  },
  {
    name: "CapCut Photo Animation",
    url: "https://www.capcut.com/tools/photo-animation",
    summary: "Simple one?click animations; strong templates and export presets.",
    free: true,
    watermark: true,
    notes: ["Beginner?friendly", "Templates & captions", "Great social exports"],
    bestFor: "Fast social exports and templates",
    freeNotes: "Free usage with potential watermark; account required",
  },
  {
    name: "LeiaPix Converter",
    url: "https://convert.leiapix.com/",
    summary: "Specialized 2.5D parallax animation from a single image; unique depth effect.",
    free: true,
    watermark: false,
    notes: ["Depth?based parallax", "Fast exports", "Looks great for portraits"],
    bestFor: "2.5D parallax animations",
    freeNotes: "Free tier available; terms vary for usage",
  },
  {
    name: "Runway",
    url: "https://runwayml.com/",
    summary: "Polished pro toolset (Gen?1/Gen?2); free trial is limited.",
    free: true,
    watermark: true,
    notes: ["Pro features", "Style transfer (Gen?1)", "Better paid"],
    bestFor: "Professional workflows",
    freeNotes: "Limited free credits; watermark likely",
  },
  {
    name: "Kaiber",
    url: "https://kaiber.ai/",
    summary: "Creative stylization and music video vibes; free trial only.",
    free: true,
    watermark: true,
    notes: ["Stylized looks", "Good community examples", "Trial?limited"],
    bestFor: "Stylized music?video aesthetics",
    freeNotes: "Free trial with watermark; paid for more",
  },
];

const grid = document.getElementById("tools-grid");
const search = document.getElementById("search");
const filterFree = document.getElementById("filter-free");
const filterNoWatermark = document.getElementById("filter-no-watermark");

function render(items) {
  grid.innerHTML = "";
  items.forEach((t) => {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("role", "listitem");

    const title = document.createElement("h4");
    title.textContent = t.name;

    const p = document.createElement("p");
    p.textContent = t.summary;

    const meta = document.createElement("div");
    meta.className = "meta";

    const bFree = document.createElement("span");
    bFree.className = `badge ${t.free ? "ok" : ""}`;
    bFree.textContent = t.free ? "Free tier" : "Paid";

    const bWater = document.createElement("span");
    bWater.className = `badge ${t.watermark ? "warn" : "ok"}`;
    bWater.textContent = t.watermark ? "Watermark on free" : "No watermark";

    const bBestFor = document.createElement("span");
    bBestFor.className = "badge muted";
    bBestFor.textContent = t.bestFor;

    meta.append(bFree, bWater, bBestFor);

    const actions = document.createElement("div");
    actions.className = "actions";

    const open = document.createElement("a");
    open.href = t.url;
    open.target = "_blank";
    open.rel = "noopener noreferrer";
    open.className = "button";
    open.textContent = `Open ${t.name}`;

    const detail = document.createElement("span");
    detail.className = "badge";
    detail.title = t.freeNotes;
    detail.textContent = t.freeNotes;

    actions.append(open, detail);

    card.append(title, p, meta, actions);
    grid.append(card);
  });
}

function normalize(s) {
  return (s || "").toLowerCase();
}

function applyFilters() {
  const q = normalize(search.value);
  const wantFree = filterFree.checked;
  const wantNoWatermark = filterNoWatermark.checked;

  let filtered = tools.filter(t => {
    if (wantFree && !t.free) return false;
    if (wantNoWatermark && t.watermark) return false;
    if (!q) return true;
    const hay = normalize(
      [t.name, t.summary, t.bestFor, ...(t.notes || []), t.freeNotes].join(" ")
    );
    return hay.includes(q);
  });

  render(filtered);
}

search.addEventListener("input", applyFilters);
filterFree.addEventListener("change", applyFilters);
filterNoWatermark.addEventListener("change", applyFilters);

// initial
render(tools);
