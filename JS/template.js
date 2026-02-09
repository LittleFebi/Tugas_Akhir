// JS/main.js
const contentArea = document.getElementById('dynamic-content');

async function loadPageContent(pageName, element) {
    try {
        // 1. Ambil file konten (Misal: Pages/Credit-content.html)
        const response = await fetch(`${pageName}-content.html`);
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
    loadPageContent('Credit', document.querySelector('.menu-item.active'));
});