import * as readline from "readline";
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Harga menu hanya contoh, silakan sesuaikan
const menuMakanan = [
    { nama: "Nasi Goreng", harga: 20000 },
    { nama: "Mie Ayam", harga: 18000 },
    { nama: "Ayam Geprek", harga: 22000 },
];
const menuMinuman = [
    { nama: "Es Teh", harga: 5000 },
    { nama: "Es Jeruk", harga: 7000 },
    { nama: "Kopi Susu", harga: 12000 },
];
const menuCamilan = [
    { nama: "Kentang Goreng", harga: 10000 },
    { nama: "Tahu Crispy", harga: 8000 },
    { nama: "Pisang Goreng", harga: 9000 },
];
const HARGA_JUMBO = 5000;
const HARGA_SAUS_PEDAS = 3000;
const HARGA_SAUS_KEJU = 6000;
const DISKON_MEMBER = 0.1;
// ---------- Pencatatan transaksi ----------
function catatTransaksi(deskripsi, subTotal, diskon, total, metode) {
    console.log("\n===== STRUK =====");
    console.log(`Pesanan   : ${deskripsi}`);
    console.log(`Sub total : Rp${subTotal}`);
    console.log(`Diskon    : Rp${diskon}`);
    console.log(`Total     : Rp${total}`);
    console.log(`Metode    : ${metode}`);
    console.log("Pencatatan transaksi selesai.");
    console.log("\n=== Selesai ===");
    r1.close();
}
// ---------- Pembayaran QRIS (bisa diulang jika gagal) ----------
function bayarQris(deskripsi, subTotal, diskon, total) {
    console.log(`\nSilakan scan QRIS untuk membayar Rp${total}`);
    r1.question("Apakah pembayaran berhasil? (1 = ya, 2 = tidak) : ", (inputStatus) => {
        const status = Number(inputStatus);
        switch (status) {
            case 1:
                console.log("Pembayaran berhasil!");
                catatTransaksi(deskripsi, subTotal, diskon, total, "QRIS");
                break;
            case 2:
                console.log("Pembayaran gagal, lakukan pembayaran ulang.");
                bayarQris(deskripsi, subTotal, diskon, total);
                break;
            default:
                console.log("Pilihan tidak valid!");
                bayarQris(deskripsi, subTotal, diskon, total);
                break;
        }
    });
}
// ---------- Pembayaran Tunai ----------
function bayarTunai(deskripsi, subTotal, diskon, total) {
    r1.question(`Uang diterima (total Rp${total}) : `, (inputUang) => {
        const uang = Number(inputUang);
        if (uang >= total) {
            console.log(`Kembalian : Rp${uang - total}`);
            console.log("Pembayaran berhasil!");
            catatTransaksi(deskripsi, subTotal, diskon, total, "Tunai");
        }
        else {
            console.log("Uang kurang atau tidak valid, coba lagi.");
            bayarTunai(deskripsi, subTotal, diskon, total);
        }
    });
}
// ---------- Pilih metode pembayaran ----------
function pilihMetodePembayaran(deskripsi, subTotal, diskon, total) {
    console.log("\nMetode pembayaran :");
    console.log("1. Tunai");
    console.log("2. QRIS\n");
    r1.question("Pilih metode pembayaran (1-2) : ", (inputMetode) => {
        const metode = Number(inputMetode);
        switch (metode) {
            case 1:
                bayarTunai(deskripsi, subTotal, diskon, total);
                break;
            case 2:
                bayarQris(deskripsi, subTotal, diskon, total);
                break;
            default:
                console.log("Metode pembayaran tidak valid!");
                pilihMetodePembayaran(deskripsi, subTotal, diskon, total);
                break;
        }
    });
}
// ---------- Cek member, hitung diskon & total ----------
function cekMember(deskripsi, subTotal) {
    r1.question("\nApakah pelanggan member? (diskon 10%) (1 = ya, 2 = tidak) : ", (inputMember) => {
        const member = Number(inputMember);
        let diskon = 0;
        switch (member) {
            case 1:
                diskon = subTotal * DISKON_MEMBER;
                break;
            case 2:
                diskon = 0;
                break;
            default:
                console.log("Pilihan tidak valid!");
                cekMember(deskripsi, subTotal);
                return;
        }
        const total = subTotal - diskon;
        console.log(`Sub total : Rp${subTotal}`);
        console.log(`Diskon    : Rp${diskon}`);
        console.log(`Total     : Rp${total}`);
        pilihMetodePembayaran(deskripsi, subTotal, diskon, total);
    });
}
// ---------- Khusus makanan: porsi lalu add on ----------
function pilihPorsiDanAddOn(menu) {
    console.log("\nPilih porsi :");
    console.log("1. Porsi regular");
    console.log(`2. Porsi jumbo (+${HARGA_JUMBO})\n`);
    r1.question("Masukkan pilihan porsi (1-2) : ", (inputPorsi) => {
        const porsi = Number(inputPorsi);
        let subTotal = menu.harga;
        let deskripsi = menu.nama;
        switch (porsi) {
            case 1:
                deskripsi += " (regular)";
                break;
            case 2:
                subTotal += HARGA_JUMBO;
                deskripsi += " (jumbo)";
                break;
            default:
                console.log("Pilihan porsi tidak valid!");
                pilihPorsiDanAddOn(menu);
                return;
        }
        console.log("\nTambah add on? :");
        console.log(`1. Saus pedas (${HARGA_SAUS_PEDAS})`);
        console.log(`2. Saus keju (${HARGA_SAUS_KEJU})`);
        console.log("0. Tidak\n");
        r1.question("Masukkan pilihan add on (0-2) : ", (inputAddOn) => {
            const addOn = Number(inputAddOn);
            switch (addOn) {
                case 0:
                    break;
                case 1:
                    subTotal += HARGA_SAUS_PEDAS;
                    deskripsi += " + Saus pedas";
                    break;
                case 2:
                    subTotal += HARGA_SAUS_KEJU;
                    deskripsi += " + Saus keju";
                    break;
                default:
                    console.log("Pilihan add on tidak valid, dianggap tanpa add on.");
                    break;
            }
            cekMember(deskripsi, subTotal);
        });
    });
}
// ---------- Program utama ----------
console.log("=== Start Sistem ===");
console.log("Pilih kategori menu :");
console.log("1. Makanan");
console.log("2. Minuman");
console.log("3. Camilan\n");
r1.question("Masukkan pilihan kategori (1-3) : ", (inputKategori) => {
    const kategori = Number(inputKategori);
    let daftarMenu = [];
    let namaKategori = "";
    switch (kategori) {
        case 1:
            daftarMenu = menuMakanan;
            namaKategori = "makanan";
            break;
        case 2:
            daftarMenu = menuMinuman;
            namaKategori = "minuman";
            break;
        case 3:
            daftarMenu = menuCamilan;
            namaKategori = "camilan";
            break;
        default:
            console.log("Kategori pilihan Anda tidak valid!");
            r1.close();
            return;
    }
    console.log(`\nDaftar menu ${namaKategori} :`);
    daftarMenu.forEach((item, i) => {
        console.log(`${i + 1}. ${item.nama} - Rp${item.harga}`);
    });
    console.log("");
    r1.question(`Pilih menu (1-${daftarMenu.length}) : `, (inputMenu) => {
        const menu = daftarMenu[Number(inputMenu) - 1];
        if (!menu) {
            console.log("Menu pilihan Anda tidak valid!");
            r1.close();
            return;
        }
        if (kategori === 1) {
            // Makanan: pilih porsi -> add on -> member -> bayar
            pilihPorsiDanAddOn(menu);
        }
        else {
            // Minuman / camilan: langsung ke cek member
            cekMember(menu.nama, menu.harga);
        }
    });
});
