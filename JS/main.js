// JS/main.js

const appContainer = document.getElementById('app-container');

// --- 1. DATA GLOBAL & PENYIMPANAN ---
let lastPage = 'home'; 
let currentTheme = ''; // Variabel untuk menyimpan tema aktif agar tidak error saat kembali dari menu

let currentSettings = JSON.parse(localStorage.getItem('funvo_switches')) || {
    notif: true,
    suara: true,
    musik: true,
    support: true
};

const achTargets = {
    tutorial: 1, themes: 6, vocab: 60, stars: 18, daily: 20, 
    nohint: 6, onerun: 6, noexit: 1, return: 20
};

// --- 2. NAVIGASI UTAMA (VERSI GABUNGAN TERLENGKAP) ---
async function loadPage(pageName, targetMenu = 'Credit') {
    try {
        const response = await fetch(`Pages/${pageName}.html`);
        if (!response.ok) throw new Error('Halaman tidak ditemukan');
        const html = await response.text();
        
        appContainer.innerHTML = html;

        // Simpan status halaman terakhir (Hanya jika Home atau Latihan)
        if (pageName === 'home' || pageName === 'latihan') {
            lastPage = pageName;
        }

        // Jalankan inisialisasi berdasarkan nama halaman
        if (pageName === 'logo') initLogo();
        else if (pageName === 'home') initHome();
        else if (pageName === 'template') initTemplate(targetMenu);
        
        // Perbaikan: Jika kembali ke latihan dari menu (Credit/Settings), muat ulang temanya
        else if (pageName === 'latihan' && currentTheme !== '') {
            if (typeof initLatihan === "function") {
                initLatihan(currentTheme);
            }
        }
        
    } catch (err) { 
        console.error("Gagal memuat halaman:", err); 
    }
}

// Fungsi untuk tombol (X) di template
function backToLastPage() {
    loadPage(lastPage);
}

// Fungsi untuk mulai tema dari Home
function mulaiTema(namaTema) {
    currentTheme = namaTema; // Simpan tema yang dipilih user ke memori
    loadPage('latihan');
}

document.addEventListener("DOMContentLoaded", () => loadPage('logo'));

// --- 3. LOGIKA HALAMAN SPESIFIK ---
function initLogo() {
    const container = document.getElementById('logo-container');
    const logoImg = document.getElementById('main-logo');
    if (container && logoImg) {
        container.onclick = () => {
            logoImg.src = 'assets/images/logo-eyes.png';
            setTimeout(() => loadPage('home'), 800);
        };
    }
}

function initHome() {
    const greetingText = document.getElementById("greetings");
    if (greetingText) {
        const jam = new Date().getHours();
        let ucapan = jam < 12 ? "Pagi" : (jam < 15 ? "Siang" : (jam < 18 ? "Sore" : "Malam"));
        greetingText.innerText = `Halo, Selamat ${ucapan}!`;
    }
}

async function loadDynamicContent(fileName) {
    const dynamicArea = document.getElementById('dynamic-content');
    if (dynamicArea) {
        try {
            const resp = await fetch(`Pages/${fileName}.html`);
            const content = await resp.text();
            dynamicArea.innerHTML = content;
            
            if (fileName === 'pengaturan') initPengaturanUI();
            else if (fileName === 'pencapaian') initAchievementUI();
            else if (fileName === 'caramain') console.log("Cara Main Loaded");
            
        } catch (err) {
            console.error("Gagal muat konten dinamis:", err);
        }
    }
}

async function initTemplate(targetMenu = 'Credit') {
    const dynamicArea = document.getElementById('dynamic-content');
    if (dynamicArea) {
        let fileName = 'credit'; 
        if (targetMenu === 'Cara Main') fileName = 'caramain';
        else if (targetMenu === 'Pengaturan') fileName = 'pengaturan';
        else if (targetMenu === 'Pencapaian') fileName = 'pencapaian';

        await loadDynamicContent(fileName);

        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            const onClickAttr = item.getAttribute('onclick') || "";
            item.classList.toggle('active', onClickAttr.includes(targetMenu));
        });
    }
}

function changeContent(menuName, element) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');
    
    if (menuName === 'Cara Main') {
        loadDynamicContent('caramain');
    } else if (menuName === 'Pencapaian') {
        loadDynamicContent('pencapaian');
    } else {
        const fileName = menuName.toLowerCase().replace(/\s/g, '');
        loadDynamicContent(fileName);
    }
}

// --- 4. SISTEM ACHIEVEMENT & CLAIM ---
function initAchievementUI() {
    const progres = JSON.parse(localStorage.getItem('funvo_ach_progres')) || {};
    const claimed = JSON.parse(localStorage.getItem('funvo_claimed')) || {};

    Object.keys(achTargets).forEach(key => {
        const bar = document.getElementById(`bar-${key}`);
        const text = document.getElementById(`txt-${key}`);
        const btn = document.getElementById(`btn-${key}`);

        if (bar && text && btn) {
            let current = progres[key] || 0;
            let target = achTargets[key];
            let percent = (current / target) * 100;

            bar.style.width = `${Math.min(percent, 100)}%`;
            text.innerText = `${current}/${target}`;

            if (claimed[key]) {
                btn.innerText = "CLAIMED";
                btn.classList.add('claimed');
                btn.style.display = "block";
                btn.disabled = true;
            } else if (current >= target) {
                btn.classList.add('ready'); 
                btn.style.display = "block";
            } else {
                btn.style.display = "none";
            }
        }
    });
}

function claimReward(id) {
    let claimed = JSON.parse(localStorage.getItem('funvo_claimed')) || {};
    if (!claimed[id]) {
        claimed[id] = true;
        localStorage.setItem('funvo_claimed', JSON.stringify(claimed));
        alert("Selamat! Pencapaian berhasil diklaim! 🌟");
        initAchievementUI();
    }
}

// --- 5. LOGIKA PENGATURAN ---
function initPengaturanUI() {
    const volSlider = document.getElementById('vol-slider');
    const musicSlider = document.getElementById('music-slider');

    if(volSlider) volSlider.value = localStorage.getItem('funvo_vol') || 80;
    if(musicSlider) musicSlider.value = localStorage.getItem('funvo_music') || 60;
    
    for (let key in currentSettings) {
        const img = document.getElementById(`${key}-img`);
        if (img) {
            img.src = currentSettings[key] ? "assets/Pengaturan/On.png" : "assets/Pengaturan/off.png";
        }
    }
}

function toggleSwitch(type) {
    currentSettings[type] = !currentSettings[type];
    const imgElement = document.getElementById(`${type}-img`);
    if (imgElement) {
        imgElement.src = currentSettings[type] ? "assets/Pengaturan/On.png" : "assets/Pengaturan/off.png";
    }
}

function saveSettings() {
    const vol = document.getElementById('vol-slider');
    const music = document.getElementById('music-slider');
    if (vol) localStorage.setItem('funvo_vol', vol.value);
    if (music) localStorage.setItem('funvo_music', music.value);
    
    localStorage.setItem('funvo_switches', JSON.stringify(currentSettings));
    alert("Pengaturan Berhasil Disimpan!");
    
    loadPage(lastPage); 
}

function resetGame() {
    if (confirm("Apakah kamu yakin ingin menghapus semua data permainan?")) {
        localStorage.clear(); 
        alert("Data telah di-reset!");
        loadPage('logo'); 
    }
}