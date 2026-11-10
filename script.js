/* =========================================================
   DAFTAR KARYA
   Edit bagian ini saja untuk menambah atau mengubah project.

   - format    : "9:16" (vertikal) atau "16:9" (horizontal)
   - youtubeId : kode video YouTube. Contoh link
                 https://youtube.com/shorts/AbC123xyz  -> "AbC123xyz"
                 https://youtu.be/AbC123xyz            -> "AbC123xyz"
                 Kosongkan ("") kalau videonya belum diupload.
   - thumbnail : (opsional) nama file gambar sendiri, misal "images/fiore.jpg".
                 Kalau kosong, thumbnail diambil otomatis dari YouTube.
   ========================================================= */
const projects = [
  {
    title: "Membawaku Kembali",
    client: "FIORE perfume",
    type: "Product commercial",
    format: "9:16",
    duration: "1 min",
    tools: "Google Flow (Veo), Seedream",
    youtubeId: "",
    thumbnail: ""
  },
  {
    title: "KaneGroup company profile",
    client: "KaneGroup",
    type: "Company profile",
    format: "16:9",
    duration: "2 min",
    tools: "Google Flow (Veo), Nano Banana",
    youtubeId: "",
    thumbnail: ""
  },
  {
    title: "Karn Pishachini",
    client: "Guru App",
    type: "App promo, Hindi voice-over",
    format: "9:16",
    duration: "90 s",
    tools: "Google Flow (Veo)",
    youtubeId: "",
    thumbnail: ""
  },
  {
    title: "Diamond jewelry",
    client: "Jewelry brand",
    type: "Product commercial",
    format: "9:16",
    duration: "15 s",
    tools: "Seedance 2.0, Dreamina",
    youtubeId: "",
    thumbnail: ""
  },
  {
    title: "Hanoora Studio promo",
    client: "Hanoora Studio",
    type: "Motion design, macro 3D",
    format: "16:9",
    duration: "15 s",
    tools: "Generative video",
    youtubeId: "",
    thumbnail: ""
  }
];

/* =========================================================
   Di bawah ini mesin website. Tidak perlu diubah.
   ========================================================= */

// ---------- Menampilkan kartu karya ----------
const grid = document.getElementById("work-grid");

function ratioOf(format) {
  const [w, h] = format.split(":").map(Number);
  return w / h;
}

function thumbOf(p) {
  if (p.thumbnail) return p.thumbnail;
  if (p.youtubeId) return "https://i.ytimg.com/vi/" + p.youtubeId + "/hqdefault.jpg";
  return "";
}

projects.forEach(function (p, index) {
  const fig = document.createElement("figure");
  fig.className = "shot";
  fig.style.setProperty("--r", ratioOf(p.format));

  const frame = document.createElement("button");
  frame.type = "button";
  frame.className = "shot-frame";

  const thumb = thumbOf(p);

  if (thumb) {
    const img = document.createElement("img");
    img.src = thumb;
    img.alt = "";
    img.loading = "lazy";
    frame.appendChild(img);
  } else {
    const empty = document.createElement("div");
    empty.className = "shot-empty";
    empty.innerHTML = "<b>" + p.format + "</b><span>Video coming soon</span>";
    frame.appendChild(empty);
  }

  if (p.youtubeId) {
    const play = document.createElement("span");
    play.className = "shot-play";
    play.textContent = "Play";
    frame.appendChild(play);
    frame.setAttribute("aria-label", "Play " + p.title);
    frame.addEventListener("click", function () { openPlayer(index); });
  } else {
    frame.disabled = true;
    frame.setAttribute("aria-label", p.title + ", video coming soon");
  }

  const cap = document.createElement("figcaption");
  cap.innerHTML =
    "<h3></h3>" +
    "<p class='shot-meta'></p>" +
    "<p class='shot-tools'></p>";
  cap.querySelector("h3").textContent = p.title;
  cap.querySelector(".shot-meta").textContent = p.client + ", " + p.type + ", " + p.duration;
  cap.querySelector(".shot-tools").textContent = p.tools;

  fig.appendChild(frame);
  fig.appendChild(cap);
  grid.appendChild(fig);
});

// ---------- Pemutar video ----------
const player = document.getElementById("player");
const playerFrame = document.getElementById("player-frame");
const playerCaption = document.getElementById("player-caption");

function openPlayer(index) {
  const p = projects[index];
  const src = "https://www.youtube-nocookie.com/embed/" + p.youtubeId +
    "?autoplay=1&rel=0&playsinline=1";

  playerFrame.innerHTML =
    '<iframe src="' + src + '" title="' + p.title.replace(/"/g, "") +
    '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  playerCaption.textContent = p.title + ", " + p.client;
  player.classList.toggle("is-vertical", ratioOf(p.format) < 1);
  player.showModal();
}

function closePlayer() {
  player.close();
}

// hentikan video saat pemutar ditutup
player.addEventListener("close", function () {
  playerFrame.innerHTML = "";
});

player.querySelector(".player-close").addEventListener("click", closePlayer);

// ketuk area gelap di luar video untuk menutup
player.addEventListener("click", function (e) {
  if (e.target === player) closePlayer();
});

// ---------- Timecode di bingkai hero (24 fps) ----------
const timecode = document.getElementById("timecode");
const start = performance.now();

function pad(n) { return String(n).padStart(2, "0"); }

function tick(now) {
  const totalFrames = Math.floor(((now - start) / 1000) * 24);
  const ff = totalFrames % 24;
  const totalSeconds = Math.floor(totalFrames / 24);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600);
  timecode.textContent = pad(hh) + ":" + pad(mm) + ":" + pad(ss) + ":" + pad(ff);
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

// ---------- Tahun otomatis di footer ----------
document.getElementById("year").textContent = new Date().getFullYear();
