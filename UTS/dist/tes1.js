// import library readline bawaan node.js untuk baca input terminal
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
//membuat antarmuka input-output terminal
const rl = readline.createInterface({ input, output });
//1.deklarasi variabel dengan 3 tipe data
// variabel string dengan const(karena judul tidak berubah)
const judulGame = "Misteri kematian Siswa";
// variabel number dengan let karena dinamis bisa berganti
let stamina = 100;
let skor = 0;
let waktu = 60;
// variable boolean 
let buktiRacun = false;
let buktiSuratAncaman = false;
let alibiTersangkaPalsu = false;
//2. pembuka game nampilin output 
console.log("=============================================");
console.log('    Selamat Datang Di Game ' + judulGame);
console.log("=============================================");
console.log("Kasus: Siswa bernama Reza ditemukan tewas di kelas 302");
console.log("setelah kelas sore usai pada pukul 18.00 WIB.\n");
// menerima input nama detektif dari pemain dengan tipe data string
const namaDetektif = await rl.question("Masukkan Nama Detektif Anda:");
console.log(`\n Salam kenal, Detektif ${namaDetektif}! Waktu anda hanya 60 menit. \n`);
// 3.Investigasi TKP (percabangan 4 tingkat)
//tampilkan pilihan
console.log("Pilih area yang ingin anda selidik pertama :");
console.log("1. Ruang kelas 302 (meja korban)");
console.log("2. Koridor loker siswa (loker terkunci)");
console.log("3. Ruang piket / Pos satpam)");
const pilihanLokasi = await rl.question("Pilihan anda (1/2/3)");
//tingkat 1, switch utama untuk memilih lokasi
switch (pilihanLokasi) {
    case "1":
        //output pertanyaan ke pemain
        console.log("\n--- ANDA MEMASUKI RUANG KELAS 302 ---");
        console.log("Ruangan berantakan. Ada meja korban dan papan tulis.");
        console.log("1. Periksa meja korban");
        console.log("2. Periksa papan tulis");
        //input pilihan kelas
        const aksiKelas = await rl.question("Pilihan anda (1/2)");
        //tingkat 2 if untuk menentukan fokus di kelas
        if (aksiKelas === "1") {
            console.log("\n Anda mendekati meja Reza");
            console.log("Di atas meja ada tumbler minuman yang terbuka dan berbau aneh.");
            //tingkat 3 if dengan lebih dari 1 kondisi (logika && dan !)
            if (stamina >= 20 && !buktiRacun) {
                console.log("Kondisi fisik anda prima. Apa yang ingin anda lakukan pada tumbler?");
                console.log("1. Uji aroma dan cairan kimia di dalamnya");
                console.log("2. Periksa sidik jari pada permukaan botol");
                console.log("3. Amankan tumbler langsung ke kantong bukti");
                const aksiTumbler = await rl.question("Pilihan tindakan (1/2/3): ");
                //tingkat 4 switch di dalam if(switch ke 2 )
                //memiliki 3 case + default + break
            }
        }
}
