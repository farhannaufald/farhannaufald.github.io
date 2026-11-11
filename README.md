# farhannaufald.github.io

Portfolio website Farhan Naufal — Content Creator & AI Video Producer.

## Cara mengubah isi

- **Karya / video**: edit daftar `projects` di bagian paling atas `script.js`.
  - `format: "9:16"` masuk carousel vertikal, `"16:9"` masuk carousel Widescreen.
  - Isi `youtubeId` (kode video YouTube) supaya kartu bisa diputar.
  - Opsional: `video: "media/nama.mp4"` untuk preview saat kursor di atas kartu,
    dan `thumbnail: "media/nama.jpg"` untuk gambar sampul.
- **Tools** yang berjalan di hero: array `tools` di `script.js`.
- **Video latar hero**: ganti file `media/hero.mp4` (dan gambar sampul `media/hero-poster.jpg`), lalu naikkan angka `?v=` pada tag `<video>` di `index.html`.
- **Warna**: semua warna ada di bagian `:root` paling atas `style.css`. Biru utama: `--blue: #250FBA`.
- **Teks** (judul, layanan, proses, about, kontak): langsung di `index.html`.
- **Setelah mengubah `style.css` atau `script.js`**: naikkan angka `?v=5` di `index.html`
  (misal jadi `?v=6`) supaya browser pengunjung tidak memakai versi lama dari cache.
