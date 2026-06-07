// JS/template.js
const contentArea = document.getElementById('dynamic-content');

// --- TAMBAHAN 1: Siapkan Audio di luar fungsi ---
const menuClickSound = new Audio('../assets/audio/bgm1.mp3');

async function loadPageContent(pageName, element) {
    try {
        // --- TAMBAHAN 2: Mainkan suara setiap fungsi ini dipanggil (saat menu diklik) ---
        menuClickSound.currentTime = 0; // Reset suara ke awal (biar kalau klik cepat tetap bunyi)
        menuClickSound.play().catch(e => console.log("Audio play error:", e));
        // -----------------------------------------------------------------------------

        // 1. Ambil file konten
        const response = await fetch(`${pageName}-content.html`); // Pastikan path file HTML-nya benar
        const html = await response.text();

        // 2. Masukkan ke area dinamis
        contentArea.innerHTML = html;

        // 3. Atur status tombol menu samping
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => item.classList.remove('active'));
        if(element) element.classList.add('active');

    } catch (err) {
        console.error("Gagal memuat konten:", err);
        contentArea.innerHTML = `<div class="dev-msg">Halaman ${pageName} Belum Tersedia</div>`;
    }
}

// Muat Credit secara otomatis saat pertama kali buka
document.addEventListener("DOMContentLoaded", () => {
    // Kita panggil loadPageContent, tapi mungkin tanpa suara untuk pertama kali (opsional)
    const firstMenu = document.querySelector('.menu-item.active');
    loadPageContent('Credit', firstMenu);
});

// Muat Credit secara otomatis saat pertama kali buka
document.addEventListener("DOMContentLoaded", () => {
    loadPageContent('Credit', document.querySelector('.menu-item.active'));
});