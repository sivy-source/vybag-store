# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.
**Hasil:**
Saya sedang menjalankan npm run build untuk memverifikasi bahwa perubahan kode dan proses build Next.js berjalan tanpa kendala. Saya akan menunggu hasilnya selesai.

Fitur US-01: Katalog dari database telah selesai dikerjakan sesuai aturan pada AGENTS.md dan kriteria pada docs/user-stories.md.

File yang Dibuat / Diubah
lib/supabase/server.js (Baru)
Membuat koneksi Supabase di sisi server menggunakan createClient dari @supabase/supabase-js.
Mengambil SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable.
lib/supabase/index.js (Baru)
Mengekspor ulang fungsi koneksi dari server.js agar bisa diimpor dari @/lib/supabase maupun @/lib/supabase/server.
app/page.jsx (Diubah)
Mengubah komponen menjadi Server Component asinkron (async).
Mengambil data dari tabel produk di Supabase secara dinamis di sisi server.
Menampilkan produk dengan komponen KartuProduk tanpa mengubah tampilannya.
Menampilkan pesan error jika query database gagal.
Menampilkan tulisan "Belum ada produk" jika tabel kosong.
Menghapus komponen CatatanBelumAktif dan import data contoh produkContoh.
.env.local (Diperbaiki formatnya)
Merapikan tanda petik yang tidak tertutup agar parsing environment variable berjalan normal.
Cara Mengetes
Jalankan development server:
powershell
npm run dev
Buka http://localhost:3000 di browser.
Periksa hal-hal berikut:
Daftar produk dari tabel produk di Supabase (misalnya Sling Bag) tampil dengan kartu foto, kategori, nama, dan harga dalam format rupiah.
Komponen CatatanBelumAktif ("Masih data contoh...") sudah tidak muncul lagi.
Bila data di tabel produk kosong, akan muncul tulisan "Belum ada produk".
Bila koneksi atau query database bermasalah (misalnya SUPABASE_SECRET_KEY salah/dikosongkan sementara), muncul pesan error yang jelas pada halaman.

**Perbaikan:**

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.
**Hasil:**
Fitur US-02: Detail produk telah selesai dikerjakan sesuai spesifikasi pada docs/user-stories.md dan aturan pada AGENTS.md.

File yang Diubah
app/produk/[id]/page.jsx
Menghapus ketergantungan pada lib/data-contoh.js.
Mengambil data produk secara server-side dari tabel produk di Supabase menggunakan createServerClient dari lib/supabase/server.js berdasarkan nilai parameter id.
Memanggil notFound() jika produk tidak ditemukan di database atau jika query menghasilkan error (misalnya format ID tidak valid).
Menghapus komponen CatatanBelumAktif ("Tombol pesan belum berfungsi...").
Mempertahankan komponen TombolWhatsApp serta struktur tampilan dan gaya Tailwind tanpa ada yang diubah.
Cara Mengetes
Jalankan development server:
powershell
npm run dev
Cek produk yang ada:
Buka produk yang valid, misalnya http://localhost:3000/produk/1 (atau klik salah satu kartu produk di katalog utama).
Pastikan foto, kategori, nama, harga (format Rupiah), deskripsi produk, dan tombol WhatsApp tampil dengan baik.
Pastikan teks catatan CatatanBelumAktif sudah hilang.
Cek produk yang tidak ada:
Buka ID yang tidak ada di tabel, misalnya http://localhost:3000/produk/9999 atau http://localhost:3000/produk/abc.
Pastikan aplikasi menampilkan halaman 404 - Halaman tidak ditemukan.
**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.
**Hasil:**
Fitur US-03: Pesan via WhatsApp telah selesai dikerjakan sesuai petunjuk di docs/rancangan-teknis.md dan aturan di AGENTS.md.

File yang Diubah
components/TombolWhatsApp.jsx
Mengubah elemen <button> menjadi elemen tautan <a>.
Mengarahkan tautan ke format URL https://wa.me/<nomor>?text=<pesan> menggunakan nomor dari lib/toko.js.
Pesan otomatis telah diformat memuat nama produk dan harga dalam format rupiah (formatRupiah), lalu di-encode dengan encodeURIComponent.
Menambahkan atribut target="_blank" dan rel="noopener noreferrer" agar terbuka di tab baru.
Mempertahankan tampilan, kelas Tailwind, serta teks tombol (Pesan via WhatsApp).
app/produk/[id]/page.jsx
Catatan CatatanBelumAktif yang menyebut US-03 telah dipastikan bersih/terhapus.
Cara Mengetes
Jalankan aplikasi jika belum berjalan:
powershell
npm run dev
Buka salah satu halaman detail produk di browser, contoh: http://localhost:3000/produk/1.
Klik tombol Pesan via WhatsApp:
Tautan akan membuka tab baru ke WhatsApp (wa.me).
Nomor tujuan mengarah ke nomor WhatsApp toko yang terdaftar di lib/toko.js (6281292616689).
Pesan chat sudah otomatis terisi nama dan harga produk dalam format rupiah (misalnya: "Halo, saya ingin memesan Sling Bag Kulit Asli seharga Rp 400.000.").
**Perbaikan:**

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
