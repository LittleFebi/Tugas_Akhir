// JS/main.js

const appContainer = document.getElementById('app-container');

// --- 1. DATA GLOBAL & KONFIGURASI ---
let lastPage = 'home'; 
let currentTheme = ''; 
let sessionThemesCompleted = 0; // Untuk achievement "One Run" (reset kalau refresh)

// Target Maksimal untuk Progress Bar UI (Agar penuh 100%)
const MAX_TARGETS = {
    tutorial: 1,
    themes: 6,      // 6 Tema unik
    vocab: 60,      // Total kosakata
    stars: 18,      // 6 Tema x 3 Bintang
    daily: 20,      // Hari ke-20
    nohint: 6,      // 6 Tema tanpa hint
    onerun: 6,      // 6 Tema sekali duduk
    noexit: 1,      // 1 Kali berhasil tanpa keluar
    return: 20      // Kembali hari ke-20
};

// Target Bertahap (Milestone) untuk tombol CLAIM
const MILESTONES = {
    vocab: [10, 20, 40, 60],
    onerun: [1, 3, 5, 6],
    daily: [1, 3, 5, 7, 10, 20],
    return: [2, 3, 5, 7, 10, 20]
};

let currentSettings = JSON.parse(localStorage.getItem('funvo_switches')) || {
    notif: true, suara: true, musik: true, support: true
};

// --- 2. LOGIKA SISTEM UTAMA ---
document.addEventListener("DOMContentLoaded", () => {
    loadPage('logo');
    checkDailyLogin(); // Cek login harian saat aplikasi dibuka
});

// Fungsi Navigasi Halaman
async function loadPage(pageName, targetMenu = 'Credit') {
    try {
        const response = await fetch(`Pages/${pageName}.html`);
        if (!response.ok) throw new Error('Halaman tidak ditemukan');
        const html = await response.text();
        
        appContainer.innerHTML = html;

        if (pageName === 'home' || pageName === 'latihan') {
            lastPage = pageName;
        }

        // Inisialisasi Halaman
        if (pageName === 'logo') initLogo();
        else if (pageName === 'home') initHome();
        else if (pageName === 'template') initTemplate(targetMenu);
        else if (pageName === 'latihan' && currentTheme !== '') {
            if (typeof initLatihan === "function") initLatihan(currentTheme);
        }
        
    } catch (err) { 
        console.error("Gagal memuat halaman:", err); 
    }
}

function backToLastPage() {
    if (lastPage === 'latihan') loadPage('home');
    else loadPage(lastPage);
}

function mulaiTema(namaTema) {
    currentTheme = namaTema;
    loadPage('latihan');
}

// --- 3. SISTEM ACHIEVEMENT & MILESTONE ---

// Fungsi untuk mendapatkan data progres user
function getUserProgress() {
    return JSON.parse(localStorage.getItem('funvo_progress')) || {
        tutorial: 0,
        themes: [],         // Array nama tema yang sudah selesai (unik)
        vocab: 0,           // Total kata benar
        stars: {},          // Objek {tema: jumlahBintang}
        daily: 0,           // Hari ke-berapa
        lastLoginDate: null,
        nohint: [],         // Array tema yang selesai tanpa hint
        noexit: 0,
        return: 0,
        claimed: {}         // { achievementId: [level_claimed] }
    };
}

function saveUserProgress(data) {
    localStorage.setItem('funvo_progress', JSON.stringify(data));
}

// Fungsi Update Achievement (Paling Penting)
function updateAchievement(type, value, extraData = null) {
    let data = getUserProgress();
    let updated = false;

    if (type === 'vocab') {
        data.vocab += value;
        updated = true;
    } 
    else if (type === 'themes') {
        if (!data.themes.includes(extraData)) {
            data.themes.push(extraData);
            updated = true;
        }
    }
    else if (type === 'stars') {
        // Hanya simpan jika bintang lebih tinggi dari sebelumnya
        const currentStar = data.stars[extraData.theme] || 0;
        if (value > currentStar) {
            data.stars[extraData.theme] = value;
            updated = true;
        }
    }
    else if (type === 'nohint') {
        if (!data.nohint.includes(extraData)) {
            data.nohint.push(extraData);
            updated = true;
        }
    }
    else if (type === 'tutorial') {
        if (data.tutorial === 0) {
            data.tutorial = 1;
            updated = true;
        }
    }
    else if (type === 'noexit') {
        if (data.noexit === 0) {
            data.noexit = 1;
            updated = true;
        }
    }

    if (updated) {
        saveUserProgress(data);
        if (currentSettings.notif) {
             // Cek milestone sederhana untuk notifikasi
             checkMilestoneNotification(type, data);
        }
    }
}

// Logika Check-In Harian
function checkDailyLogin() {
    let data = getUserProgress();
    const today = new Date().toDateString(); // Hanya ambil tanggal (bukan jam)

    if (data.lastLoginDate !== today) {
        // Ini hari baru!
        data.daily += 1; // Tambah hitungan hari
        
        // Cek "Return User" (Mulai dihitung jika login > 1 hari)
        if (data.daily > 1) {
            data.return += 1;
        }

        data.lastLoginDate = today;
        saveUserProgress(data);
        console.log("Login Harian Tercatat: Hari ke-" + data.daily);
    }
}

// --- 4. UI PENCAPAIAN (RENDER) ---
function initAchievementUI() {
    const data = getUserProgress();
    
    // Hitung total bintang dari objek
    const totalStars = Object.values(data.stars).reduce((a, b) => a + b, 0);

    // Mapping nilai saat ini ke UI
    const currentValues = {
        tutorial: data.tutorial,
        themes: data.themes.length,
        vocab: data.vocab,
        stars: totalStars,
        daily: data.daily,
        nohint: data.nohint.length,
        onerun: sessionThemesCompleted, // Dari variabel session (bukan localStorage)
        noexit: data.noexit,
        return: data.return
    };

    Object.keys(MAX_TARGETS).forEach(key => {
        const bar = document.getElementById(`bar-${key}`);
        const text = document.getElementById(`txt-${key}`);
        const btn = document.getElementById(`btn-${key}`);

        if (bar && text && btn) {
            let current = currentValues[key] || 0;
            let max = MAX_TARGETS[key];
            
            // Update Bar & Text
            let percent = (current / max) * 100;
            bar.style.width = `${Math.min(percent, 100)}%`;
            text.innerText = `${current}/${max}`;

            // Logika Tombol CLAIM (Bertahap vs Sekali)
            handleClaimButton(key, btn, current);
        }
    });
}

function handleClaimButton(key, btn, currentVal) {
    let data = getUserProgress();
    let claimedList = data.claimed[key] || []; // Array level yang sudah diklaim
    
    // Cek target selanjutnya
    let nextTarget = 0;
    
    if (MILESTONES[key]) {
        // Jika achievement bertahap (vocab, daily, dll)
        // Cari target terkecil yang BELUM diklaim
        nextTarget = MILESTONES[key].find(t => !claimedList.includes(t)) || 9999;
    } else {
        // Jika achievement sekali (tutorial, noexit)
        nextTarget = MAX_TARGETS[key];
        if (claimedList.includes(nextTarget)) nextTarget = 9999; // Sudah max
    }

    if (nextTarget === 9999) {
        // Semua sudah diklaim
        btn.innerText = "CLAIMED";
        btn.classList.add('claimed');
        btn.style.display = "block";
        btn.disabled = true;
    } else if (currentVal >= nextTarget) {
        // Bisa diklaim!
        btn.innerText = "CLAIM";
        btn.classList.remove('claimed');
        btn.classList.add('ready');
        btn.style.display = "block";
        btn.disabled = false;
        btn.onclick = () => claimReward(key, nextTarget);
    } else {
        // Belum cukup
        btn.style.display = "none";
    }
}

function claimReward(key, targetLevel) {
    let data = getUserProgress();
    
    if (!data.claimed[key]) data.claimed[key] = [];
    
    // Simpan level yang diklaim
    data.claimed[key].push(targetLevel);
    saveUserProgress(data);

    alert(`Selamat! Kamu mencapai target ${targetLevel}! 🌟`);
    
    // Refresh UI tombol
    initAchievementUI();
}

function checkMilestoneNotification(key, data) {
    // Logika sederhana untuk popup notif saat bermain
    // (Bisa dikembangkan sesuai kebutuhan)
}

// --- 5. INITIALISASI LAINNYA ---
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

// Template Loader (Pengaturan, Pencapaian, Cara Main)
async function initTemplate(targetMenu = 'Credit') {
    const dynamicArea = document.getElementById('dynamic-content');
    if (dynamicArea) {
        let fileName = 'credit'; 
        if (targetMenu === 'Cara Main') fileName = 'caramain';
        else if (targetMenu === 'Pengaturan') fileName = 'pengaturan';
        else if (targetMenu === 'Pencapaian') fileName = 'pencapaian';

        try {
            const resp = await fetch(`Pages/${fileName}.html`);
            dynamicArea.innerHTML = await resp.text();

            if (fileName === 'pengaturan') initPengaturanUI();
            else if (fileName === 'pencapaian') initAchievementUI();
        } catch (err) { console.error(err); }

        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            const onClickAttr = item.getAttribute('onclick') || "";
            item.classList.toggle('active', onClickAttr.includes(targetMenu));
        });
    }
}

// --- FUNGSI PENGATURAN ---
function initPengaturanUI() {
    const volSlider = document.getElementById('vol-slider');
    const musicSlider = document.getElementById('music-slider');
    if(volSlider) volSlider.value = localStorage.getItem('funvo_vol') || 50;
    if(musicSlider) musicSlider.value = localStorage.getItem('funvo_music') || 50;

    for (let key in currentSettings) {
        const img = document.getElementById(`${key}-img`);
        if (img) img.src = currentSettings[key] ? "assets/Pengaturan/On.png" : "assets/Pengaturan/off.png";
    }
}

function toggleSwitch(type) {
    currentSettings[type] = !currentSettings[type];
    initPengaturanUI();
}

function saveSettings() {
    const vol = document.getElementById('vol-slider');
    const music = document.getElementById('music-slider');
    if (vol) localStorage.setItem('funvo_vol', vol.value);
    if (music) localStorage.setItem('funvo_music', music.value);
    localStorage.setItem('funvo_switches', JSON.stringify(currentSettings));
    
    // Tampilkan Popup
    const popup = document.getElementById('popup-settings');
    if (popup) {
        popup.style.display = 'flex';
        setTimeout(() => {
            popup.style.display = 'none';
            backToLastPage();
        }, 1500);
    } else {
        backToLastPage();
    }
}

function resetGame() {
    if (confirm("Hapus semua data permainan?")) {
        localStorage.clear();
        sessionThemesCompleted = 0; // Reset session achievement
        alert("Data di-reset!");
        loadPage('logo');
    }
}

// Di dalam JS/main.js

function checkMilestoneNotification(key, data) {
    // 1. Ambil nilai saat ini berdasarkan jenis achievement
    let currentVal = 0;
    
    if (key === 'vocab') currentVal = data.vocab;
    else if (key === 'daily') currentVal = data.daily;
    else if (key === 'onerun') currentVal = sessionThemesCompleted; // Ambil dari variabel global session
    else if (key === 'return') currentVal = data.return;
    
    // 2. Cek apakah nilai saat ini ADALAH salah satu milestone?
    // Kita cek apakah currentVal ada di dalam array MILESTONES[key]
    if (MILESTONES[key] && MILESTONES[key].includes(currentVal)) {
        
        // Buat pesan kustom biar lebih personal
        let pesan = "";
        if(key === 'vocab') pesan = `Hebat! Kamu sudah tahu ${currentVal} kosakata! 🧠`;
        else if(key === 'daily') pesan = `Rajin banget! Login hari ke-${currentVal}! 🗓️`;
        else if(key === 'onerun') pesan = `Fokus terjaga! ${currentVal} tema selesai sekaligus! 🔥`;
        else if(key === 'return') pesan = `Selamat datang kembali! (Hari ke-${currentVal}) 👋`;

        // Tampilkan Popup Notifikasi
        showGlobalPopup("Achievement Unlocked! 🏆", pesan);
    }
}

// Tambahkan fungsi Popup Global ini di main.js agar bisa dipanggil dari mana saja
function showGlobalPopup(title, message) {
    // Cek apakah elemen popup ada (biasanya ada di latihan.html atau template)
    // Jika tidak ada, kita buat elemen sementara (Toast Notification)
    let popup = document.getElementById('popup-notif');
    
    if (!popup) {
        // OPSI A: Jika di halaman menu/home belum ada HTML popup, pakai alert biasa (fallback)
        // alert(title + "\n" + message); 
        
        // OPSI B (LEBIH BAGUS): Buat elemen toast sederhana secara dinamis
        createToast(title, message);
        return;
    }

    // Jika elemen popup ada (seperti di latihan.html)
    const titleEl = document.getElementById('popup-title');
    const messageEl = document.getElementById('popup-message');

    if (titleEl && messageEl) {
        titleEl.innerText = title;
        messageEl.innerText = message;
        popup.style.display = 'flex';
        
        // Hilang otomatis setelah 2.5 detik agar tidak mengganggu game
        setTimeout(() => {
            popup.style.display = 'none';
        }, 2500);
    }
}

// Fitur Tambahan: Toast Dinamis (Notifikasi Kecil di Atas)
// Ini berguna kalau di halaman Home/Menu tidak ada kode HTML popup
function createToast(title, msg) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#FFD700'; // Warna Emas Achievement
    toast.style.color = '#5a3e1b';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '50px';
    toast.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    toast.style.zIndex = '9999';
    toast.style.fontWeight = 'bold';
    toast.style.textAlign = 'center';
    toast.style.border = '2px solid #FFF';
    
    toast.innerHTML = `<span>${title}</span><br><span style="font-size:0.9em; font-weight:normal;">${msg}</span>`;
    
    document.body.appendChild(toast);
    
    // Animasi Masuk
    toast.animate([
        { transform: 'translate(-50%, -20px)', opacity: 0 },
        { transform: 'translate(-50%, 0)', opacity: 1 }
    ], { duration: 300, fill: 'forwards' });

    // Hapus setelah 3 detik
    setTimeout(() => {
        toast.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], { duration: 300, fill: 'forwards' }).onfinish = () => toast.remove();
    }, 3000);
}