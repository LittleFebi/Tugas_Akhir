const appContainer = document.getElementById('app-container');

async function loadPage(pageName) {
    try {
        const response = await fetch(`Pages/${pageName}.html`);
        const html = await response.text();
        
        // Bersihkan wadah dan masukkan konten baru
        appContainer.innerHTML = html;

        // Inisialisasi fungsi khusus tiap halaman
        if (pageName === 'logo') initLogo();
        else if (pageName === 'home') initHome();
        else if (pageName === 'template') initTemplate();
        
    } catch (err) {
        console.error("Gagal memuat:", err);
    }
}

// Mulai dari Logo saat pertama buka
document.addEventListener("DOMContentLoaded", () => loadPage('logo'));

function initLogo() {
    const container = document.getElementById('logo-container');
    const logoImg = document.getElementById('main-logo');
    if (container) {
        container.onclick = () => {
            // Ganti mata logo
            logoImg.src = 'assets/images/logo-eyes.png';
            // Pindah ke Home setelah jeda
            setTimeout(() => loadPage('home'), 800);
        };
    }
}

function initHome() {
    // Logika sapaan jam otomatis
    const greetingText = document.getElementById("greetings");
    if (greetingText) {
        const jam = new Date().getHours();
        let ucapan = jam < 12 ? "Pagi" : (jam < 15 ? "Siang" : (jam < 18 ? "Sore" : "Malam"));
        greetingText.innerText = `Halo, Selamat ${ucapan}!`;
    }
}

async function initTemplate() {
    // Secara otomatis isi bagian buku dengan credit.html
    const dynamicArea = document.getElementById('dynamic-content');
    if (dynamicArea) {
        const resp = await fetch('Pages/credit.html');
        const content = await resp.text();
        dynamicArea.innerHTML = content;
    }
}