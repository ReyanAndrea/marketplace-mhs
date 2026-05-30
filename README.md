# Marketplace Barang Bekas Mahasiswa

Platform jual beli barang bekas khusus mahasiswa. Dibuat sebagai proyek UAS mata kuliah Pemrograman Berbasis Web.

## Tech Stack

- **Frontend**: React.js + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MySQL (XAMPP)
- **Auth**: JWT + Bcrypt

## Fitur

- Register & Login (JWT Authentication)
- Lihat daftar produk dengan foto
- Search & filter produk berdasarkan kategori
- Tambah produk dengan upload foto
- Halaman detail produk
- Hubungi penjual via WhatsApp
- Admin dashboard (kelola produk & user)
- Logout & multi-session per tab

## Cara Menjalankan

### Persiapan

- Node.js
- XAMPP (MySQL)

### 1. Clone Repository

```bash
git clone https://github.com/ReyanAndrea/marketplace-mhs.git
cd marketplace-mhs
```

### 2. Setup Database

- Jalankan XAMPP, aktifkan MySQL
- Buka phpMyAdmin
- Import file `schema.sql`

### 3. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` di folder `backend/`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=marketplace_mhs
PORT=5000
JWT_SECRET=rahasia
```

Jalankan backend:

```bash
node server.js
```

### 4. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 5. Buka di Browser

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Role User

| Role  | Akses                                      |
| ----- | ------------------------------------------ |
| user  | Lihat produk, jual barang, hubungi penjual |
| admin | Semua akses user + kelola produk & user    |

## Struktur Folder

```
marketplace-mhs/
├── backend/
│   ├── config/        # Koneksi database
│   ├── middleware/    # Auth & upload handler
│   ├── routes/        # API endpoints
│   ├── uploads/       # Foto produk
│   └── server.js
└── frontend/
    └── src/
        ├── components/  # Navbar
        └── pages/       # Halaman aplikasi
```

## API Endpoints

| Method | Endpoint                | Deskripsi            |
| ------ | ----------------------- | -------------------- |
| POST   | /api/auth/register      | Register user baru   |
| POST   | /api/auth/login         | Login                |
| GET    | /api/products           | Ambil semua produk   |
| GET    | /api/products/:id       | Detail produk        |
| POST   | /api/products           | Tambah produk baru   |
| GET    | /api/categories         | Ambil semua kategori |
| GET    | /api/admin/products     | Semua produk (admin) |
| GET    | /api/admin/users        | Semua user (admin)   |
| DELETE | /api/admin/products/:id | Hapus produk (admin) |
| DELETE | /api/admin/users/:id    | Hapus user (admin)   |

---

## Kelompok 09

| NPM           | Nama Anggota |
| ------------- | ------------ |
| 2208107010014 | Reyan Andrea |
| 2408107010008 | Rijal        |
| 24081070100xx | Fikri        |
| 24081070100xx | Rajabi       |
