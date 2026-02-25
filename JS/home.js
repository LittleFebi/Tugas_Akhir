document.addEventListener("DOMContentLoaded", function() {
    // --- KODE LAMA (GREETING) ---
    const greetingText = document.getElementById("greetings");
    const sekarang = new Date();
    const jam = sekarang.getHours();
    
    let ucapan = "";
    if (jam >= 0 && jam < 12) ucapan = "Hello, Good Morning!";
    else if (jam >= 12 && jam < 15.5) ucapan = "Hello, Good Afternoon!";
    else if (jam >= 15.5 && jam < 18) ucapan = "Hello, Good Evening!";
    else ucapan = "Hello, Good Night!";

    if (greetingText) greetingText.innerText = ucapan;

    // --- TAMBAHAN BARU: EFEK SUARA TOMBOL ---
    // 1. Siapkan suaranya
    const clickSound = new Audio('../assets/audio/bgm1.mp3');

    // 2. Ambil tombolnya (Pastikan ID tombol di HTML kamu sesuai, misal "btn-start" atau "tombol-main")
    // Cek di file home.html kamu, ID tombolnya apa. Kalau belum ada ID, kasih id="btn-start"
    const tombolMain = document.getElementById("btn-start"); 

    if (tombolMain) {
        tombolMain.addEventListener("click", function() {
            // Mainkan suara
            clickSound.play();
        });
    }
});