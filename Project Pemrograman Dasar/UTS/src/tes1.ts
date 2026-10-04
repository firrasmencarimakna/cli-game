// import library readline bawaan node.js untuk baca input terminal
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

//membuat antarmuka input-output terminal
const rl = readline.createInterface({ input, output });

//1.deklarasi variabel dengan 3 tipe data
// variabel string dengan const(karena judul tidak berubah)
const judulGame : string = "Misteri kematian Siswa";

// variabel number dengan let karena dinamis bisa berganti
let stamina: number = 100;
let skor: number = 0;
let waktu: number = 60;

// variable boolean 
let buktiRacun: boolean =false;
let buktiSuratAncaman =false;
let alibiTersangkaPalsu =false;

// pembuka game nampilin output 
console.log("=============================================")
console.log('Selamat Datang Di Game ' + judulGame);
console.log("=============================================")


