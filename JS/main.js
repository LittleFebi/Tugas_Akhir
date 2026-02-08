const app = document.getElementById('app');

// Fungsi untuk mengambil file HTML dari folder Pages
async function loadPage(page) {
    try {
        const response = await fetch(`Pages/${page}.html`);
        const html = await response.text();
        app.innerHTML = html;
        
        // Inisialisasi logika setelah HTML masuk ke DOM
        if (page === 'logo') {
            initLogoLogic();
        } else if (page === 'home') {
            initHomeLogic();
        }
    } catch (err) {
        console.error("Gagal memuat halaman:", err);
    }
}

// Jalankan logo saat pertama kali buka
loadPage('logo');

function initLogoLogic() {
    const wrapper = document.getElementById('logoWrapper');
    const noEyes = document.getElementById('logoNoEyes');
    const eyes = document.getElementById('logoEyes');

    wrapper.addEventListener('click', () => {
        // Efek mata terbuka
        noEyes.classList.remove('show');
        eyes.classList.add('show');

        // Tunggu 1 detik lalu pindah ke halaman Home
        setTimeout(() => {
            loadPage('home');
        }, 1000);
    });
}

function initHomeLogic() {
    // Tambahkan efek hover atau klik untuk menu home di sini jika perlu
    console.log("Halaman Home siap!");
}