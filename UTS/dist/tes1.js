// ============================================================================
// TUGAS UTS PEMROGRAMAN DASAR: GAME DETEKTIF "MURDER AT BLACKWOOD MANOR"
// Bahasa: TypeScript (CLI / Terminal Base)
// ============================================================================
// --- 1. DEKLARASI KONSTANTA DAN VARIABEL (Penggunaan const & let) ---
// Menggunakan const untuk nilai yang bersifat tetap (Konstanta)
const NAMA_KORBAN = "Tuan Blackwood"; // Tipe Data String
const TOTAL_WAKTU_AWAL = 5; // Tipe Data Number (Jumlah Jam/Kesempatan)
// Menggunakan let untuk nilai yang akan berubah selama program berjalan
let namaDetektif = "Rian"; // Tipe Data String
let sisaWaktu = TOTAL_WAKTU_AWAL; // Tipe Data Number
let poinBukti = 0; // Tipe Data Number
let punyaKacaPembesar = true; // Tipe Data Boolean
let kasusSelesai = false; // Tipe Data Boolean
// Menampilkan Header Game di Terminal
console.log("==================================================");
console.log(`  SELAMAT DATANG DETEKTIF ${namaDetektif.toUpperCase()}`);
console.log(`  KASUS: Pembunuhan ${NAMA_KORBAN}`);
console.log("==================================================\n");
// --- 2. PERCABANGAN UTAMA (SWITCH LEVEL 1) ---
// Simulasi input pilihan lokasi dari pemain (1 = Ruang Kerja, 2 = Kamar Tidur, 3 = Ruang Interogasi)
let pilihanLokasi = 1;
// PENGGUNAAN SWITCH KE-1 (Minimal 3 case + default + break)
switch (pilihanLokasi) {
    // ------------------------------------------------------------------------
    // CASE 1: RUANG KERJA KORBAN
    // ------------------------------------------------------------------------
    case 1:
        console.log("--> Anda memasuki Ruang Kerja Korban.");
        // NESTED LEVEL 2 (IF KE-1): Pengecekan Waktu & Status Kasus
        // Menggunakan Operator Logika (&&) dan Perbandingan (>)
        if (sisaWaktu > 0 && !kasusSelesai) {
            // Simulasi input pilihan aksi di dalam Ruang Kerja
            let pilihanAksiRuangKerja = "A";
            // NESTED LEVEL 3 (SWITCH KE-2): Pilihan Aksi Spesifik di Ruang Kerja
            switch (pilihanAksiRuangKerja) {
                case "A":
                    console.log("--- Anda memilih untuk memeriksanya Laci Meja Kaca ---");
                    // NESTED LEVEL 4 (IF KE-2): Pengecekan Alat & Kondisi Bukti
                    // Menggunakan Operator Logika (&&) dan Perbandingan (===)
                    if (punyaKacaPembesar === true && poinBukti < 50) {
                        console.log("[SUKSES] Dengan Kaca Pembesar, Anda menemukan jejak racun!");
                        // Operator Compound Assignment (+=) dan Aritmatika (+)
                        poinBukti += 25;
                        // Operator Compound Assignment (-=)
                        sisaWaktu -= 1;
                        console.log(`Bukti Bertambah! Total Bukti: ${poinBukti}`);
                        console.log(`Sisa Waktu Investigasi: ${sisaWaktu} jam.`);
                    }
                    else {
                        console.log("[GAGAL] Anda tidak melihat sesuatu yang mencurigakan tanpa alat.");
                        sisaWaktu -= 1; // Operator Compound Assignment (-=)
                    }
                    break; // Break yang benar sesuai aturan
                case "B":
                    console.log("--- Anda memeriksanya Brankas Rahasia ---");
                    poinBukti += 10;
                    sisaWaktu -= 1;
                    break;
                case "C":
                    console.log("--- Anda hanya melihat-lihat ruangan ---");
                    break;
                default:
                    console.log("[ERROR] Aksi di ruang kerja tidak valid!");
                    break;
            } // Akhir Switch Level 3
        }
        else {
            console.log("[PERINGATAN] Waktu Anda telah habis atau kasus sudah selesai!");
        } // Akhir If Level 2
        break; // Break untuk Case 1 Switch Level 1
    // ------------------------------------------------------------------------
    // CASE 2: KAMAR TIDUR KORBAN
    // ------------------------------------------------------------------------
    case 2:
        console.log("--> Anda memasuki Kamar Tidur Korban.");
        // Pengecekan kondisi menggunakan operator perbandingan & logika
        if (sisaWaktu >= 2 || poinBukti !== 0) {
            console.log("Anda menemukan surat ancaman di bawah bantal!");
            poinBukti += 15;
            sisaWaktu -= 2;
        }
        else {
            console.log("Kamar terlalu gelap dan bukti kurang memadai.");
        }
        break;
    // ------------------------------------------------------------------------
    // CASE 3: RUANG INTEROGASI TERSANGKA
    // ------------------------------------------------------------------------
    case 3:
        console.log("--> Anda memasuki Ruang Interogasi.");
        // Pengecekan apakah poin bukti sudah cukup untuk menuduh pelaku
        if (poinBukti >= 20) {
            console.log("[BERHASIL] Bukti Anda cukup! Pelaku berhasil diinterogasi dan mengaku.");
            kasusSelesai = true;
        }
        else {
            console.log("[GAGAL] Bukti belum cukup. Tersangka tertawa dan enggan menjawab.");
        }
        break;
    // ------------------------------------------------------------------------
    // DEFAULT CASE
    // ------------------------------------------------------------------------
    default:
        console.log("[ERROR] Lokasi yang Anda pilih tidak terdaftar di mansion!");
        break;
} // Akhir Switch Level 1
// --- 3. EVALUASI AKHIR GAME (PERHITUNGAN & OPERATOR PERBANDINGAN) ---
console.log("\n==================================================");
console.log("                 RANGKUMAN HARI INI              ");
console.log("==================================================");
// Menggunakan Operator Logika AND (&&) dan NOT (!)
if (kasusSelesai === true && sisaWaktu >= 0) {
    console.log("SELAMAT! Anda menyelesaikan kasus sebelum waktu habis!");
}
else if (poinBukti > 0 && !kasusSelesai) {
    console.log("Penyelidikan belum selesai. Kumpulkan lebih banyak bukti esok hari!");
}
else {
    console.log("GAME OVER! Anda gagal menemukan petunjuk apapun.");
}
export {};
