# Portal TERP4024 – GitHub Pages

## Terbitkan tanpa Netlify
1. Pergi ke https://github.com/new dan cipta **public repository** `TERP4024-Penyeliaan-Klinikal` (untuk pelan GitHub Free).
2. Buka repository → **Add file → Upload files**. Muat naik **index.html, styles.css, app.js, .nojekyll** daripada folder ini. Pastikan `index.html` di root.
3. **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save.**
4. Buka pautan Pages selepas deployment siap.

## Simpan respons ke Google Sheets (pilihan tambahan)
1. Di https://script.google.com/ cipta projek baharu, salin kandungan fail `Code.gs` daripada pakej backend BERASINGAN (jangan upload `Code.gs` ke repository awam).
2. Jalankan fungsi `setup`, benarkan akses, dan buka pautan spreadsheet dalam Execution log.
3. **Deploy → New deployment → Web app → Execute as Me**, tetapkan Who has access berdasarkan keperluan dan dasar organisasi, dan terbitkan.
4. Dalam laman GitHub Pages, pilih **Panduan & sambungan**, tampalkan URL `/exec` Apps Script pada peranti berkenaan.
5. Hantar satu rekod ujian. Google membuka tab baharu; hanya status **Berjaya disimpan** mengesahkan penyimpanan. Semak baris baharu dalam Google Sheets.

## Cetak / PDF
Di borang, pilih Cetak atau Simpan PDF (pilihan Save as PDF dalam dialog pelayar).

## Keselamatan
GitHub Pages adalah laman awam. Jangan letakkan respons sulit, nama murid atau rahsia dalam repository. URL Apps Script disimpan dalam pelayar masing-masing; setiap peranti perlu memasukkan URL tersebut. Backend Apps Script yang dibuka kepada 'Anyone' boleh menerima POST tanpa autentikasi tersuai dan berpotensi disalahgunakan. Untuk data sensitif, pertimbangkan Google Forms terhad kepada akaun organisasi atau sistem dengan pengesahan pengguna yang sebenar.
