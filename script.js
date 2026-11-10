/* =========================================================
   DAFTAR KARYA
   Edit bagian ini saja untuk menambah atau mengubah project.

   - format    : "9:16" (vertikal, masuk carousel atas) atau
                 "16:9" (horizontal, masuk carousel Widescreen)
   - category  : untuk tombol filter. Pilih salah satu:
                 "Commercial", "Company profile", "Social", "Motion"
                 (boleh bikin kategori baru, tombolnya muncul otomatis)
   - youtubeId : kode video YouTube. Contoh link
                 https://youtube.com/shorts/AbC123xyz  -> "AbC123xyz"
                 https://youtu.be/AbC123xyz            -> "AbC123xyz"
   - video     : (opsional) file mp4 sendiri, misal "media/fiore.mp4".
                 Dipakai untuk preview saat kursor di atas kartu,
                 dan diputar dengan suara kalau youtubeId kosong.
   - thumbnail : (opsional) gambar sampul, misal "media/fiore.jpg".
                 Kalau kosong, diambil otomatis dari YouTube.
                 Kalau semuanya kosong, kartu tampil dengan latar biru.
   ========================================================= */
const projects = [
  {
    title: "Membawaku Kembali",
    client: "FIORE perfume",
    category: "Commercial",
    type: "Product commercial",
    format: "9:16",
    duration: "1 min",
    year: "2026",
    youtubeId: "",
    video: "",
    thumbnail: ""
  },
  {
    title: "Karn Pishachini",
    client: "Guru App",
    category: "Social",
    type: "App promo, Hindi voice-over",
    format: "9:16",
    duration: "90 s",
    year: "2026",
    youtubeId: "",
    video: "",
    thumbnail: ""
  },
  {
    title: "Diamond jewelry",
    client: "Jewelry brand",
    category: "Commercial",
    type: "Product commercial",
    format: "9:16",
    duration: "15 s",
    year: "2026",
    youtubeId: "",
    video: "",
    thumbnail: ""
  },
  {
    title: "KaneGroup company profile",
    client: "KaneGroup",
    category: "Company profile",
    type: "Company profile",
    format: "16:9",
    duration: "2 min",
    year: "2026",
    youtubeId: "",
    video: "",
    thumbnail: ""
  },
  {
    title: "Hanoora Studio promo",
    client: "Hanoora Studio",
    category: "Motion",
    type: "Motion design, macro 3D",
    format: "16:9",
    duration: "15 s",
    year: "2026",
    youtubeId: "",
    video: "",
    thumbnail: ""
  }
];

/* Tools yang tampil berjalan di hero dan di bagian About */
const tools = ["Google Flow (Veo)", "Seedance", "Higgsfield", "Dreamina", "Leonardo", "Seedream", "Nano Banana"];

/* (Opsional) video latar hero, misal "media/showreel.mp4". Kosongkan untuk latar biru polos. */
const HERO_VIDEO = "";


/* =========================================================
   Di bawah ini mesin website. Tidak perlu diubah.
   ========================================================= */
(function () {
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia && matchMedia("(hover: hover)").matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

  /* ---------- Isi dinamis: tools, marquee ---------- */
  const track = $("#toolTrack");
  [...tools, ...tools].forEach(t => track.appendChild(el("span", "", t)));
  const chips = $("#toolChips");
  tools.forEach(t => chips.appendChild(el("span", "", t)));

  const gm = $("#gmTrack");
  const star = '<i class="gm-star"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.5v19M2.5 12h19M5.2 5.2l13.6 13.6M18.8 5.2 5.2 18.8"/></svg></i>';
  for (let i = 0; i < 6; i++) {
    const s = el("span", "gm-item");
    s.innerHTML = (i % 2 ? "Selected <em>work</em> " : "Selected work ") + star;
    gm.appendChild(s);
  }

  if (HERO_VIDEO) {
    const hm = $("#heroMedia");
    const v = el("video");
    Object.assign(v, { src: HERO_VIDEO, muted: true, loop: true, autoplay: true, playsInline: true });
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    hm.prepend(v); hm.classList.add("has-media");
  }

  /* ---------- Kartu karya ---------- */
  const thumbOf = p => p.thumbnail || (p.youtubeId ? "https://i.ytimg.com/vi/" + p.youtubeId + "/hqdefault.jpg" : "");
  const isVertical = p => { const [w, h] = p.format.split(":").map(Number); return w / h < 1; };
  const playable = p => !!(p.youtubeId || p.video);

  function card(p, i) {
    const c = el("div", "work rv");
    c.dataset.c = p.category || "";
    c.dataset.i = i;
    const thumb = thumbOf(p);
    if (thumb) {
      const img = el("img"); img.src = thumb; img.alt = ""; img.loading = "lazy"; img.draggable = false;
      c.appendChild(img);
    } else {
      const ph = el("div", "ph"); ph.appendChild(el("b", "", p.format)); c.appendChild(ph);
    }
    if (p.video) {
      const v = el("video"); v.src = p.video; v.muted = true; v.loop = true; v.playsInline = true; v.preload = "metadata";
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      c.appendChild(v);
    }
    if (playable(p)) {
      c.appendChild(el("div", "play", "▶"));
      c.tabIndex = 0;
      c.setAttribute("role", "button");
      c.setAttribute("aria-label", "Play " + p.title);
    } else {
      c.appendChild(el("div", "soon", "Coming soon"));
      c.style.cursor = "grab";
    }
    const ov = el("div", "ov");
    ov.appendChild(el("div", "cat", p.type));
    ov.appendChild(el("div", "t", p.title));
    ov.appendChild(el("div", "m", [p.client, p.duration, p.year].filter(Boolean).join(" — ")));
    c.appendChild(ov);
    return c;
  }

  const workGrid = $("#workGrid"), landGrid = $("#landscapeGrid");
  const vert = [], land = [];
  projects.forEach((p, i) => (isVertical(p) ? vert : land).push([p, i]));
  vert.forEach(([p, i]) => workGrid.appendChild(card(p, i)));
  land.forEach(([p, i]) => landGrid.appendChild(card(p, i)));
  if (!land.length) $("#landscape").remove();
  $("#countWorks").dataset.count = projects.length;

  // muncul satu per satu
  [workGrid, landGrid].forEach(g => $$(".work", g).forEach((w, n) => { w.style.transitionDelay = Math.min(n * 0.08, 0.6).toFixed(2) + "s"; }));

  // tombol filter (dibuat dari kategori di carousel vertikal)
  const tabs = $("#workTabs");
  const cats = ["All work", ...new Set(vert.map(([p]) => p.category).filter(Boolean))];
  if (cats.length > 2) {
    cats.forEach((c, n) => {
      const b = el("button", n ? "" : "on", c); b.type = "button"; b.dataset.f = n ? c : "all";
      tabs.appendChild(b);
    });
    tabs.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", tabs).forEach(x => x.classList.toggle("on", x === b));
      $$(".work", workGrid).forEach(w => { w.style.display = b.dataset.f === "all" || w.dataset.c === b.dataset.f ? "" : "none"; });
      workGrid.scrollTo({ left: 0, behavior: "smooth" });
    });
  } else tabs.remove();

  // preview video saat hover (desktop)
  if (canHover) {
    $$(".work").forEach(w => {
      const v = $("video", w); if (!v) return;
      w.addEventListener("mouseenter", () => { w.classList.add("previewing"); v.play().catch(() => {}); });
      w.addEventListener("mouseleave", () => { w.classList.remove("previewing"); v.pause(); });
    });
  }

  /* ---------- Pemutar video ---------- */
  const player = $("#player"), frame = $("#player-frame"), caption = $("#player-caption");
  function openPlayer(p) {
    frame.innerHTML = "";
    if (p.youtubeId) {
      const f = el("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(p.youtubeId) + "?autoplay=1&rel=0&playsinline=1";
      f.title = p.title;
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      frame.appendChild(f);
    } else {
      const v = el("video"); v.src = p.video; v.controls = true; v.autoplay = true; v.playsInline = true;
      frame.appendChild(v);
    }
    caption.textContent = p.title + " — " + p.client;
    player.classList.toggle("is-vertical", isVertical(p));
    player.showModal();
    if (lenis) lenis.stop();
  }
  player.addEventListener("close", () => { frame.innerHTML = ""; if (lenis) lenis.start(); });
  $(".player-close", player).addEventListener("click", () => player.close());
  player.addEventListener("click", e => { if (e.target === player) player.close(); });

  /* ---------- Carousel: drag + tombol panah ---------- */
  function rail(r, prev, next) {
    if (!r) return;
    let down = false, moved = false, sx = 0, sl = 0, pid = null;
    r.addEventListener("pointerdown", e => {
      if (e.pointerType !== "mouse") return; // HP pakai geser bawaan
      if (e.button !== 0) return;
      down = true; moved = false; sx = e.clientX; sl = r.scrollLeft; pid = e.pointerId;
    });
    r.addEventListener("pointermove", e => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 5) { moved = true; r.classList.add("dragging"); try { r.setPointerCapture(pid); } catch (_) {} }
      if (moved) r.scrollLeft = sl - dx;
    });
    const end = () => { if (!down) return; down = false; setTimeout(() => r.classList.remove("dragging"), 0); };
    ["pointerup", "pointercancel", "pointerleave"].forEach(t => r.addEventListener(t, end));
    r.addEventListener("click", e => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; return; }
      const w = e.target.closest(".work"); if (!w) return;
      const p = projects[+w.dataset.i]; if (playable(p)) openPlayer(p);
    }, true);
    r.addEventListener("keydown", e => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const w = e.target.closest(".work"); if (!w) return;
      const p = projects[+w.dataset.i]; if (playable(p)) { e.preventDefault(); openPlayer(p); }
    });
    const step = () => Math.min(r.clientWidth * 0.85, 700);
    prev && prev.addEventListener("click", () => r.scrollBy({ left: -step(), behavior: "smooth" }));
    next && next.addEventListener("click", () => r.scrollBy({ left: step(), behavior: "smooth" }));
  }
  rail(workGrid, $("#wPrev"), $("#wNext"));
  rail(landGrid, $("#lPrev"), $("#lNext"));

  /* ---------- Nav & menu HP ---------- */
  const nav = $("#nav");
  const onNav = () => nav.classList.toggle("scrolled", scrollY > 40);
  addEventListener("scroll", onNav, { passive: true }); onNav();

  const mm = $("#mm");
  const setMenu = open => { mm.classList.toggle("open", open); mm.setAttribute("aria-hidden", String(!open)); if (lenis) open ? lenis.stop() : lenis.start(); };
  $("#burger").addEventListener("click", () => setMenu(true));
  $("#mmClose").addEventListener("click", () => setMenu(false));
  $$("a", mm).forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Reveal saat scroll ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  $$(".rv").forEach(n => { if (!n.closest(".hero")) io.observe(n); });

  /* ---------- Kalimat besar: kata terisi mengikuti scroll ---------- */
  $$("[data-split]").forEach(p => {
    const frag = document.createDocumentFragment();
    [...p.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(w => {
          if (w.trim()) frag.appendChild(el("span", "w", w));
          else if (w) frag.appendChild(document.createTextNode(w));
        });
      } else { n.classList && n.classList.add("w"); frag.appendChild(n); }
    });
    p.innerHTML = ""; p.appendChild(frag);
    if (reduce) return;
    const words = $$(".w", p);
    let ticking = false;
    const paint = () => {
      ticking = false;
      const r = p.getBoundingClientRect(), vh = innerHeight;
      const start = vh * 0.9, end = vh * 0.4;
      const head = Math.max(0, Math.min(1, (start - r.top) / (start - end))) * words.length;
      words.forEach((w, i) => { w.style.opacity = (0.16 + 0.84 * Math.max(0, Math.min(1, head - i))).toFixed(3); });
    };
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    addEventListener("scroll", req, { passive: true });
    addEventListener("resize", req, { passive: true });
    paint();
  });

  /* ---------- Angka menghitung naik ---------- */
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const n = e.target, end = +n.dataset.count, t0 = performance.now(), dur = 1400;
    cio.unobserve(n);
    if (reduce) { n.textContent = end; return; }
    const tick = now => {
      const k = Math.min(1, (now - t0) / dur);
      n.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: 0.6 });
  $$("[data-count]").forEach(n => cio.observe(n));

  /* ---------- Panel layanan (melebar saat diklik/hover) ---------- */
  const panels = $$("#capDeck .cpanel");
  const activate = p => panels.forEach(x => x.classList.toggle("active", x === p));
  panels.forEach(p => {
    p.addEventListener("click", () => activate(p));
    p.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(p); } });
  });

  /* ---------- Proses (terbuka saat hover) ---------- */
  const procs = $$("#proc .proc-item");
  const openProc = it => procs.forEach(x => x.classList.toggle("open", x === it));
  procs.forEach(it => {
    if (canHover) it.addEventListener("mouseenter", () => openProc(it));
    it.addEventListener("click", () => openProc(it));
    it.addEventListener("focus", () => openProc(it));
  });

  /* ---------- Tombol: ikon & label bertukar saat hover ---------- */
  const setupBtns = () => $$(".btn").forEach(b => {
    const ic = $(".ic", b); if (!ic) return;
    b.style.setProperty("--sw", (b.clientWidth - ic.offsetWidth - 8) + "px");
    b.style.setProperty("--iw", (ic.offsetWidth + 8) + "px");
  });
  setupBtns();
  addEventListener("resize", setupBtns, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setupBtns);

  /* ---------- Smooth scroll (Lenis) ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, touchMultiplier: 1.6 });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    $$('a[href^="#"]').forEach(a => {
      const id = a.getAttribute("href"); if (id.length < 2) return;
      a.addEventListener("click", e => { const t = $(id); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -72, duration: 1.2 }); } });
    });
  }

  /* ---------- Intro / preloader ---------- */
  const intro = $("#intro");
  document.body.classList.add("intro-lock");
  if (lenis) lenis.stop();
  const finish = () => {
    intro.classList.add("done");
    document.body.classList.remove("intro-lock");
    if (lenis) lenis.start();
    $$(".hero .rv").forEach(n => n.classList.add("in"));
    setTimeout(() => intro.remove(), 1150);
  };
  if (reduce) { setTimeout(finish, 300); }
  else {
    const num = $("#introNum"), bar = $("#introBar"), t0 = performance.now(), dur = 1500;
    const tick = now => {
      const k = Math.min(1, (now - t0) / dur), v = Math.round((1 - Math.pow(1 - k, 2)) * 100);
      num.textContent = v; bar.style.width = v + "%";
      if (k < 1) requestAnimationFrame(tick); else setTimeout(finish, 260);
    };
    requestAnimationFrame(tick);
  }

  $("#year").textContent = new Date().getFullYear();
})();
