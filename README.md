# Rizky Akbar Siregar — Portfolio

Portfolio React + Vite dengan UI retro pixel, metadata dinamis, dan HTML statis per halaman.

## Pengembangan

```sh
npm install
npm run dev
```

## Build dan pemeriksaan SEO

```sh
npm run build
npm run test:seo
npm run lint
npm run preview
```

`build` menghasilkan `dist/` dan `.vercel/output/`, termasuk 16 halaman publik saat ini, sitemap, robots, redirect URL lama, serta halaman HTTP 404. `preview` menjalankan server lokal di port 4173 yang mengikuti aturan status/redirect produksi; development Vite tidak digunakan untuk menilai HTTP SEO.

Domain default: `https://rizkyakbar.net`. Salin `.env.example` ke `.env.local` untuk mengganti `VITE_SITE_URL` sebelum build. Preview Vercel otomatis noindex; produksi harus indexable.

## Memperbarui portfolio

Konten berada di `src/data/projects.js`. Tambahkan field `seo` opsional untuk mengganti title, description, canonicalUrl, ogImage, ogTitle, dan ogDescription. Sitemap dibuat ulang dari data saat build. Screenshot baru/berubah memerlukan:

```sh
npm run images:optimize
```

Perintah optimasi memerlukan Python + Pillow. Salinan gambar dan metadata yang dihasilkan disimpan dalam repository; build deployment hanya memerlukan Node dan dependency npm yang sudah ada. File gambar asli tidak ditimpa.

## Deployment

`vercel.json` menggunakan Build Output API dengan route eksplisit; jangan menambahkan rewrite SPA global. Untuk hosting lain, adaptasi routing ke file HTML dan status 404 yang benar. Tidak ada deploy otomatis yang dilakukan melalui task ini.

Setelah deploy, jalankan pemeriksaan HTTP read-only:

```sh
npm run check:seo:live -- https://rizkyakbar.net
```

Lihat [audit, daftar file, panduan metadata, checklist pengujian, dan Search Console](docs/SEO-AUDIT.md).
