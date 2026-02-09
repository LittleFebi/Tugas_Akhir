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
            logoImg.src = '../assets/images/logo-eyes.png';
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
        const resp = await fetch('../Pages/credit.html'); // Jika di dalam folder Pages, cukup panggil nama filenya
        const content = await resp.text();
        dynamicArea.innerHTML = content;
    }
}

// Tambahkan fungsi changeContent di sini agar bisa dipanggil oleh menu samping
function changeContent(menuName, element) {
    const dynamicContentArea = document.getElementById('dynamic-content');
    const menuItems = document.querySelectorAll('.menu-item');

    // 1. Reset status 'active' pada semua tab menu samping
    menuItems.forEach(item => item.classList.remove('active'));
    
    // 2. Tambahkan class 'active' pada tab yang diklik
    element.classList.add('active');

    // 3. Logika penggantian isi berdasarkan menu yang diklik
    if (menuName === 'Credit') {
        // Panggil kembali fungsi untuk memuat isi asli credit.html
        initTemplate(); 
    } else {
        // Tampilkan pesan untuk menu lainnya
        dynamicContentArea.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; width: 100%; text-align: center; padding: 20px; box-sizing: border-box;">
                <h2 style="color: #004b8d; margin-top: 0;">Halaman ${menuName}</h2>
                <p style="font-size: 18px;">Halo! Bagian ini sedang dalam tahap pengembangan.</p>
                <img src="../assets/Icons/info.png" style="width: 60px; margin-top: 20px;">
            </div>
        `;
    }
}