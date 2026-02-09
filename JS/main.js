// JS/main.js
const appContainer = document.getElementById('app-container');

async function loadPage(pageName) {
    try {
        // Gunakan jalur folder Pages jika index.html ada di luar folder Pages
        const response = await fetch(`../Pages/${pageName}.html`); 
        const html = await response.text();

        // 1. Bersihkan kontainer agar tidak bertumpuk
        appContainer.innerHTML = ""; 
        
        // 2. Gunakan DOMParser agar kita hanya mengambil isi di dalam <body> saja
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.querySelector('body').innerHTML;
        
        appContainer.innerHTML = content;

        // 3. Jalankan inisialisasi berdasarkan halaman
        if (pageName === 'logo') initLogo();
        else if (pageName === 'home') initHome();
        else if (pageName === 'credit') initCredit();
        
    } catch (err) {
        console.error("Gagal memuat halaman:", err);
    }
}

// Inisialisasi awal
document.addEventListener("DOMContentLoaded", () => {
    loadPage('logo');
});

function initLogo() {
    const container = document.getElementById('logo-container');
    const logoImg = document.getElementById('main-logo');
    if(container && logoImg) {
        container.onclick = () => {
            logoImg.src = '../assets/images/logo-eyes.png';
            setTimeout(() => loadPage('home'), 600);
        };
    }
}

function initHome() {
    const greetingText = document.getElementById("greetings");
    if(greetingText) {
        const jam = new Date().getHours();
        let ucapan = "";
        if (jam >= 0 && jam < 12) ucapan = "Pagi";
        else if (jam >= 12 && jam < 15) ucapan = "Siang";
        else if (jam >= 15 && jam < 18) ucapan = "Sore";
        else ucapan = "Malam";
        greetingText.innerText = `Halo, Selamat ${ucapan}!`;
    }
}

function initCredit() {
    console.log("Halaman Credit Siap.");
    // Fungsi ini memastikan tombol-tombol di credit.js tetap bekerja
}