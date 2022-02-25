# my-recipes

## Prerequisites

Untuk bisa menggunakan aplikasi ini, anda membutuhkan tools yang dibutuhkan.

- **[Node.js](https://nodejs.org/en/)**

## Instalasi

1. clone repository ini dengan menggunakan command line:

```
git clone https://github.com/KrisnaSantosa15/my-recipes-frontend.git
```

2. masuk ke direktori tersebut

```
cd my-recipes-frontend
```

3. install packages vue dengan command line:

```
npm install
```

4. lakukan konfigurasi urlApi pada file `main.js` didalam direktori/src

```diff
+app.config.globalProperties.$urlApi = "http://localhost:8000/api/";
```

Ubah sesuai dengan URL pada server Laravel yang dijalankan

5. Jalankan aplikasi dengan command line:

```
npm run serve
```

6. Buka browser dan akses http://localhost:8080/api/register
7. Daftarkan diri anda pada form yang tersedia

## See You
