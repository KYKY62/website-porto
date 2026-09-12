# Audit dan implementasi SEO

Tanggal audit: 12 September 2026. Proyek: portfolio Rizky Akbar Siregar.

Implementasi dilakukan pada React 19 + Vite 8 + React Router 7 yang benar-benar tersedia di repositori. Tidak ditemukan `composer.json`, `artisan`, route Laravel, Vue, Inertia, database berita/agenda/OPD, maupun halaman autentikasi. Keterangan Laravel/Vue di data proyek adalah teknologi karya portfolio, bukan stack website portfolio ini. Tidak ada dependency yang di-upgrade atau ditambahkan.

Domain sementara mengikuti canonical lama: **https://rizkyakbar.net**. Domain `rizkyakbarsiregar.dev` sebelumnya terdapat dalam robots/sitemap. Konfirmasi domain produksi sebelum deployment. Seluruh hasil baru memakai konfigurasi `VITE_SITE_URL`, dengan nilai default di `src/seo/site.js`.

## 1. Temuan audit dan prioritas

| Prioritas | Masalah sebelum perbaikan | Dampak | Penanganan |
| --- | --- | --- | --- |
| Critical | Canonical/OG memakai `.net`, robots/sitemap memakai domain `.dev` | Sinyal domain dan discovery tidak konsisten | Satu konfigurasi origin untuk metadata, schema, sitemap, robots, dan build |
| High | Semua route menerima title, description, dan canonical beranda | Detail proyek tidak punya metadata sendiri; canonical dapat mengonsolidasikan halaman berbeda | Metadata dinamis sesuai route dan data proyek |
| High | HTML awal hanya berisi root kosong | Konten dan tautan bergantung pada rendering JavaScript; crawler sosial tidak menerima data detail | Static generation semua halaman publik dan hydration React |
| High | Sitemap manual belum memuat semua proyek | Proyek baru tidak terdaftar otomatis | Sitemap dibuat ulang setiap build dari sumber data proyek |
| High | Enam ID proyek mengandung spasi/huruf kapital | URL kurang konsisten dan rawan varian duplikat | Slug lowercase, internal link canonical, redirect permanen dari URL lama |
| High | Tidak ada catch-all 404; detail tidak ditemukan menggunakan H2; status server belum dikonfigurasi | Halaman kosong/soft 404 berpotensi terindeks | Halaman 404, noindex, fallback HTTP 404 di output Vercel dan preview server |
| High | `og-image.png` dirujuk tetapi tidak ada | Preview sosial gagal | JPEG asli dari screenshot, URL absolut per proyek, fallback portfolio yang tersedia |
| Medium | Gambar berukuran 205–671 KB tanpa srcset/dimensi intrinsik | Transfer lebih besar dan potensi pergeseran layout | Varian WebP responsif, width/height, lazy/eager yang sesuai |
| Medium | CSS `@import` untuk font dan bobot font tidak terpakai | Penemuan font lebih lambat | Stylesheet font langsung di head, preconnect, display=swap, bobot pixel 400 |
| Medium | Breadcrumb/back berupa navigasi tombol; hierarki arsip H1 ke H3 | Tautan konteks kurang crawlable dan heading kurang rapi | Breadcrumb `<a>`, related projects, kartu arsip H2 |
| Medium | Cache aset dan normalisasi URL belum didefinisikan | Revalidasi aset berlebih/varian URL | Cache immutable untuk aset bernama hash; redirect slash, ekstensi HTML, dan case |
| Medium | Tautan mobile kecil dan judul proyek panjang | Kemudahan tap dan overflow berpotensi bermasalah | Target navigasi minimal 44px dan wrapping judul; layout responsif dipertahankan |
| Low | Keywords berlebihan, schema menyebut teknologi yang tidak sesuai konten, bahasa dokumen tidak cocok dengan mayoritas teks | Metadata kurang akurat | Keywords dihapus; schema sesuai konten; lang=en dan bagian pengalaman lang=id |
| Low | Favicon salah MIME; icon manifest/apple-touch tidak tersedia | Permintaan aset gagal | Icon PNG ukuran nyata dan manifest diperbaiki |

Status HTTP domain live, DNS, SSL, redirect lama di hosting, dan keadaan indeks Google **belum diaudit langsung**. Temuan HTTP sebelum perubahan adalah risiko dari implementasi SPA dan tidak diklaim sebagai respons produksi yang sudah diamati.

## 2. Implementasi final dan file

Kode final berada langsung dalam file berikut; tidak perlu menyalin potongan kode dari laporan.

| File | Perubahan |
| --- | --- |
| `src/seo/site.js`, `.env.example` | Origin canonical, identitas situs, metadata default, konfigurasi indexable |
| `src/seo/paths.js` | Slug dan resolver ID lama tanpa mengubah isi data proyek milik pengguna |
| `src/seo/metadata.js` | Title/description/OG/Twitter/schema per halaman, canonical, escaping HTML/JSON-LD |
| `src/components/Seo.jsx` | Sinkronisasi head saat navigasi React Router; memakai fungsi yang sama dengan HTML statis |
| `src/entry-server.jsx` | Render React ke HTML dan enumerasi halaman/redirect |
| `scripts/build.mjs` | Build client + prerender, validasi slug/canonical/gambar, sitemap/robots, output hosting |
| `src/App.jsx`, `src/main.jsx` | Router yang mendukung static render dan hydration; catch-all 404 |
| `src/pages/NotFoundPage.jsx` | Halaman tidak ditemukan dengan satu H1 dan tautan internal |
| `src/pages/DetailPage.jsx`, `src/pages/DetailPage.css` | Breadcrumb, gambar utama prioritas tinggi, proyek terkait, fallback 404 |
| `src/components/RetroUI.jsx`, `src/pages/AllProjectsPage.jsx` | Link slug, alt, srcset, heading arsip H2 dan H1 yang deskriptif |
| `src/index.css`, `src/pages/HomePage.jsx` | Font discovery, target tap, wrapping teks dan bahasa bagian pengalaman |
| `scripts/optimize-images.py` | Membuat salinan gambar responsif dan icon; sumber tidak ditimpa |
| `src/data/imageVariants.js`, `src/utils/projectImages.js` | Pemetaan gambar asli ke varian dan dimensi; hash memeriksa salinan kedaluwarsa |
| `public/media/*`, `public/social/*`, `public/icon-*.png` | Gambar WebP responsif, JPEG sosial, dan icon siap deploy |
| `index.html`, `public/manifest.json` | Template head, viewport, font, dan icon yang valid |
| `public/sitemap.xml`, `public/robots.txt` | Dihasilkan ulang saat build |
| `vercel.json`, `.gitignore` | Build Vercel dan pengecualian artefak build |
| `scripts/serve.mjs` | Preview HTML produksi dengan redirect, cache, HEAD, 304, dan HTTP 404 asli |
| `scripts/seo.test.mjs` | Pengujian regresi SEO untuk seluruh route |
| `scripts/check-live-seo.mjs` | Pemeriksaan HTTP read-only setelah deploy |
| `package.json` | Perintah build/preview/tes/optimasi gambar/check live |

`dist/` berisi HTML produksi. `.vercel/output/` berisi output Build Output API. Keduanya dihasilkan otomatis dan tidak perlu di-commit. Commit source, konfigurasi, serta media hasil optimasi. `public/og-image.svg` lama tidak lagi dirujuk oleh metadata.

## 3. Dynamic SEO dan penambahan konten

Setiap proyek menggunakan data di `src/data/projects.js`. Default SEO dihasilkan dari judul, deskripsi, dan screenshot proyek. Field opsional berikut dapat ditambahkan pada objek proyek yang ada:

```js
seo: {
  title: 'MultiSite — Platform Website Pemerintah | Rizky Akbar Siregar',
  description: 'Studi proyek platform multi-tenant untuk mengelola 71 website Pemerintah Kabupaten Langkat, dengan tema kustom dan autentikasi multi-faktor.',
  canonicalUrl: '/project/multisite',
  ogImage: '/social/portfolio.jpg',
  ogTitle: 'MultiSite: 71 Website dalam Satu Platform',
  ogDescription: 'Portfolio pengembangan platform website multi-tenant oleh Rizky Akbar Siregar.',
}
```

Ini contoh pengisian, bukan perubahan klaim pengalaman. Metadata memakai nilai yang Anda isi. Canonical harus memakai origin yang dikonfigurasi, merujuk halaman publik yang benar-benar ada, serta tidak mengandung query atau fragment. Biarkan field canonical kosong bila tidak ada kebutuhan khusus; self-canonical adalah default. Jika memakai canonical menuju halaman lain karena konten benar-benar duplikat, halaman noncanonical tidak dimasukkan sitemap; sesuaikan juga ekspektasi tes yang saat ini menuntut self-canonical untuk seluruh konten yang ada.

Untuk menambah proyek:

1. Tambahkan objek dengan ID/slug unik dan konten aktual di `src/data/projects.js`.
2. Tambahkan screenshot asli di `src/assets/` dan import seperti proyek lain.
3. Jika ada screenshot baru/berubah, jalankan `npm run images:optimize` (Python + Pillow diperlukan hanya untuk langkah ini). Commit `imageVariants.js` dan salinan di `public/media` serta `public/social`.
4. Jalankan `npm run build` dan `npm run test:seo`.
5. Deploy ulang. HTML, sitemap, metadata, dan daftar URL dibuat otomatis dari data terbaru.

Build menolak slug duplikat, canonical tidak valid, gambar tanpa dimensi, dan salinan gambar yang kedaluwarsa. Sistem ini memakai konten statis dalam repository, sehingga pembaruan otomatis terjadi **pada build/deploy**, bukan setelah mutasi database. Tidak ada backend berita, agenda, atau OPD untuk dihubungkan. URL situs pemerintah yang ada di portfolio adalah tautan eksternal dan tidak dimasukkan sitemap domain ini.

## 4. Sitemap, robots, dan canonical

Produksi saat audit: **16 URL** (beranda, arsip, 14 detail proyek). Sitemap hanya memuat URL canonical publik yang indexable. Tidak ada URL login, admin, dashboard, API, 404, atau domain eksternal. `lastmod` sengaja tidak dibuat dari tanggal build karena tanggal itu belum tentu waktu perubahan konten. `priority` dan `changefreq` tidak diperlukan. [Panduan sitemap Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

`robots.txt` mengizinkan halaman publik dan aset. Prefix admin/dashboard/login/API dibatasi crawling. Robots bukan mekanisme autentikasi maupun jaminan deindex; URL yang diblokir tetap dapat diketahui melalui tautan. Pada portfolio ini endpoint tersebut tidak tersedia dan menghasilkan 404. Jika suatu saat menjadi endpoint nyata, gunakan autentikasi dan kebijakan indexing yang sesuai di backend. [Penjelasan robots.txt Google](https://developers.google.com/search/docs/crawling-indexing/robots/intro).

Query tracking seperti `?utm_source=...` tidak menciptakan isi berbeda dan canonical tetap bersih. Query tidak diblokir massal agar crawler bisa membaca canonical. Tidak ada pagination/filter publik saat ini. Tidak dibuat redirect 410 karena tidak ada daftar konten yang dikonfirmasi dihapus permanen. [Panduan canonical Google](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## 5. Hosting, HTTPS, dan status HTTP

Konfigurasi Vercel tersedia karena proyek sudah memakai integrasi Vercel; ini tidak berarti deployment atau DNS telah diubah.

- Build command: `npm run build`; output melalui `.vercel/output` Build Output API.
- Halaman publik dipetakan ke file HTML masing-masing dengan status 200.
- Enam URL ID lama, trailing slash, ekstensi `.html`, dan varian huruf kapital diarahkan permanen ke URL canonical.
- `index.html` mengarah ke `/`; tidak ada rewrite semua URL ke beranda.
- Halaman tidak dikenal memakai `404.html`, status 404, dan `X-Robots-Tag: noindex, follow`.
- Alias www/non-www berasal dari konfigurasi origin dan diarahkan 301. Domain alias tetap harus ditambahkan ke project hosting dan DNS/TLS harus aktif. Kombinasi alias host dan alias path dapat melewati dua redirect; URL internal selalu langsung canonical.
- HTTPS ditegakkan oleh Vercel. Untuk hosting berbeda, konfigurasi HTTPS/sertifikat/redirect harus diterapkan pada web server/CDN tersebut.
- Jangan menambahkan rewrite SPA global dari konfigurasi hosting lama karena akan menghidupkan kembali soft 404.
- Deployment preview Vercel (`VERCEL_ENV=preview`) otomatis menggunakan noindex di HTML/header dan sitemap tanpa URL indexable. Produksi default indexable. Untuk staging non-Vercel, set `VITE_INDEXABLE=false` saat build.
- Canonical pada staging tetap mengarah ke origin produksi, bukan hostname preview.
- HTML direvalidasi; assets/media dengan hash memakai cache immutable satu tahun. Sitemap/robots cache 5 menit. Aset sosial memakai cache satu jam.

[Dokumentasi Build Output API Vercel](https://vercel.com/docs/build-output-api/configuration) dan [domain/redirect Vercel](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting).

Jika hosting Anda ternyata VPS/Nginx/Apache, `dist/` tetap dapat dipakai tetapi aturan routing/301/404/cache perlu diadaptasi ke server tersebut. `npm run preview` adalah alat verifikasi lokal yang hanya listen di loopback, bukan konfigurasi TLS produksi. Tidak ada konfigurasi Laravel fiktif yang ditambahkan.

## 6. Performa dan mobile

- 11 gambar sumber: **4.236.264 byte**. Total varian 480px: **276.122 byte**, sekitar **93,5% lebih kecil** untuk ukuran tersebut. Ini bukan persentase percepatan halaman dan bukan pengukuran LCP.
- Browser memilih WebP 480/960/1440 sesuai viewport; gambar asli, warna, dan rasio dipertahankan. Salinan dikompresi lossy kualitas 85. File sumber tidak diubah.
- Ukuran intrinsik disediakan untuk mencegah layout berubah saat gambar selesai dimuat.
- Gambar utama detail eager + fetchPriority=high; gambar di bawah layar lazy. Tiga kartu awal arsip eager.
- Font ditemukan langsung dari head; display=swap dan preconnect dipertahankan. Font pixel 700 yang tidak digunakan dihapus dari permintaan.
- Icon memakai salinan ukuran kecil yang benar.
- Navigasi mobile memiliki target tap minimal 44px dan teks judul panjang dapat membungkus.
- Konten lengkap tetap tersedia pada mobile serta dalam HTML awal, termasuk nama lengkap sebelum animasi berjalan.
- Bundle produksi sekitar **85,7 KB gzip JS** dan **2,55 KB gzip CSS**, tanpa dependency baru. Asset asli masih tersedia di output sebagai fallback, tetapi gambar halaman memakai varian responsif.

Nilai LCP, INP, CLS, perubahan font, dan tampilan pada perangkat fisik **belum diukur**. Verifikasi visual browser sebelumnya tidak mendapat izin, sehingga tidak diklaim sebagai tes yang sudah lulus. Target evaluasi lapangan: LCP ≤2,5 detik, INP ≤200ms, CLS ≤0,1 pada persentil ke-75. [Definisi Core Web Vitals](https://web.dev/articles/vitals).

## 7. Pengujian yang dijalankan

Enam kelompok tes otomatis lulus pada build produksi dan pada build preview noindex:

- Setiap halaman: HTML berisi konten, satu H1, title/description unik, canonical, OG/Twitter, JSON-LD valid, alt/dimensi gambar dan asset tersedia.
- Semua tautan internal merujuk halaman publik yang valid; semua halaman tersebut HTTP 200 pada preview server.
- Sitemap/robots: origin sama, daftar route tepat, MIME XML, aset tidak diblokir.
- Redirect ID lama, slash, `.html`, `index.html`, dan case: HTTP 301 lalu 200; query canonical bersih.
- URL tidak dikenal/proyek tidak ada/endpoint nonpublik: HTTP 404 dan noindex, bukan canonical beranda.
- LCP image eager, cache immutable, HEAD tanpa body, conditional GET 304, serta struktur output Vercel.

`npm run lint` hanya menyisakan warning lama Fast Refresh pada `src/context/SplashContext.jsx`; tidak ditemukan error lint baru. Konfigurasi Vercel diverifikasi sebagai artefak lokal, belum diuji di infrastruktur Vercel nyata.

Jalankan ulang:

```sh
npm run build
npm run test:seo
npm run lint
npm run preview
```

Preview berada di `http://127.0.0.1:4173`. `npm run dev` tetap SPA untuk pengembangan; gunakan hasil build dan preview untuk menilai HTML awal serta HTTP 404.

## 8. Checklist setelah deployment

- [ ] Pastikan domain produksi benar; set `VITE_SITE_URL` sebelum build.
- [ ] Pastikan `VITE_INDEXABLE=true` untuk produksi dan deployment tidak memakai mode preview.
- [ ] Jalankan `npm run check:seo:live -- https://rizkyakbar.net` setelah deploy. Pemeriksaan ini read-only.
- [ ] Pastikan beranda, arsip, dan setiap detail memberi HTTP 200 tanpa login/challenge.
- [ ] Buka View Source: metadata per halaman dan konten utama sudah tersedia tanpa JavaScript.
- [ ] Uji beberapa navigasi client-side; title/canonical berubah dan tidak menumpuk.
- [ ] Uji HTTP → HTTPS, www → non-www sesuai domain pilihan, ID lama, slash, dan query.
- [ ] Uji `/project/seo-check-missing-page`: benar-benar HTTP 404.
- [ ] Buka OG image langsung dan cek preview berbagi tautan.
- [ ] Uji mobile 320/375/390/768px: overflow, menu, tombol, animasi nama, gambar, dan font.
- [ ] Uji Lighthouse mobile/PageSpeed Insights; pantau field data Core Web Vitals, jangan hanya skor lab.
- [ ] Periksa schema memakai Rich Results Test. Person/CreativeWork tidak otomatis menghasilkan rich result.
- [ ] Pastikan tidak ada rewrite/CDN lama yang mengganti respons 404 menjadi 200.

## 9. Google Search Console, sitemap, dan robots

Langkah setelah situs produksi tersedia:

1. Tambahkan Domain property untuk domain canonical di Google Search Console, lalu verifikasi kepemilikan melalui DNS. Akun Search Console dan DNS tidak diakses/diubah dalam pekerjaan ini.
2. Buka menu Sitemaps, kirim `https://rizkyakbar.net/sitemap.xml`, lalu cek status berhasil dibaca dan jumlah URL yang ditemukan.
3. Gunakan URL Inspection untuk `/`, `/projects`, dan beberapa detail. Jalankan Test Live URL; periksa bahwa fetch berhasil, crawling/indexing diizinkan, konten terlihat, dan canonical yang dideklarasikan benar.
4. Setelah data tersedia, bandingkan user-declared canonical dengan Google-selected canonical. Permintaan indexing dapat dikirim untuk halaman penting yang sudah siap.
5. Pantau Page Indexing untuk soft 404, duplicate/canonical, blocked by robots, dan crawled/discovered currently not indexed. Tidak semua status berarti error; nilai sesuai tujuan URL.
6. Pantau Performance untuk impression/click/query dan Core Web Vitals untuk data pengguna nyata. Situs kecil dapat belum memiliki data lapangan yang cukup.

[Memulai Search Console menurut Google](https://developers.google.com/search/docs/monitor-debug/search-console-start). Sitemap dan permintaan indexing membantu discovery, tetapi tidak menjamin pengindeksan atau peringkat tertentu.

Pemeriksaan manual dari terminal (PowerShell gunakan `curl.exe` bila `curl` adalah alias):

```sh
curl -I https://rizkyakbar.net/sitemap.xml
curl https://rizkyakbar.net/sitemap.xml
curl -I https://rizkyakbar.net/robots.txt
curl https://rizkyakbar.net/robots.txt
curl -I https://rizkyakbar.net/project/multisite
curl -I https://rizkyakbar.net/project/seo-check-missing-page
curl -I https://rizkyakbar.net/projects/
```

Ekspektasi: sitemap 200 + XML valid; robots 200 + plain text dan URL sitemap yang benar; detail 200; proyek tidak ada 404; slash 301 menuju `/projects`. Domain live belum diperiksa dan perubahan belum dipublikasikan oleh agen.

## 10. Peningkatan lanjutan

1. Pastikan screenshot setiap karya benar-benar mewakili proyek. Beberapa proyek masih berbagi gambar/placeholder; gunakan screenshot nyata dan uraian hasil yang spesifik.
2. Tambahkan studi kasus yang faktual: masalah, peran, solusi, dan hasil terukur. Jangan membuat angka atau testimoni yang tidak ada.
3. Ukur animasi pengetikan dan font pada perangkat lambat; sesuaikan durasi atau self-host font berlisensi jika terbukti menjadi bottleneck LCP/CLS.
4. Jika menambah CMS, sambungkan publish/unpublish ke pipeline build. Untuk konten sangat sering berubah, evaluasi SSR/ISR sesuai platform yang benar-benar digunakan.
5. Jika membuat situs multibahasa, gunakan URL bahasa terpisah, terjemahan nyata, dan hreflang yang saling merujuk; jangan menambahkan hreflang untuk halaman yang belum ada.
6. Bila domain `.dev` memang dimiliki dan pernah diindeks, siapkan migrasi redirect menuju canonical setelah domain utama dipastikan.
7. Pengukuran browser/produksi, konfigurasi DNS/TLS, dan submit Search Console tetap menjadi langkah setelah deployment.
