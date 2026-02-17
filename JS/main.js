// JS/main.js

const appContainer = document.getElementById('app-container');

// --- 1. DATA GLOBAL & KONFIGURASI ---
let lastPage = 'home'; 
let currentTheme = ''; 
let sessionThemesCompleted = 0; 

// A. SETUP MUSIK BACKGROUND (BGM)
// Pastikan file 'bgm.mp3' ada di folder assets/audio/
const bgmAudio = new Audio('assets/audio/bgm.mp3');
bgmAudio.loop = true; // Agar musik berulang terus

const MAX_TARGETS = {
    tutorial: 1, themes: 6, vocab: 60, stars: 18, 
    daily: 20, nohint: 6, onerun: 6, noexit: 1, return: 20
};

const MILESTONES = {
    vocab: [10, 20, 40, 60],
    onerun: [1, 3, 5, 6],
    daily: [1, 3, 5, 7, 10, 20],
    return: [2, 3, 5, 7, 10, 20]
};

let currentSettings = JSON.parse(localStorage.getItem('funvo_switches')) || {
    notif: true, suara: true, musik: true, support: true
};

// --- 2. LOGIKA UTAMA & MUSIK ---
document.addEventListener("DOMContentLoaded", () => {
    loadPage('logo');
    checkDailyLogin();
    
    // Set volume awal
    updateBgmVolume();
});

// Fungsi Navigasi Halaman
async function loadPage(pageName, targetMenu = 'Credit') {
    try {
        const response = await fetch(`Pages/${pageName}.html`);
        if (!response.ok) throw new Error('Halaman tidak ditemukan');
        appContainer.innerHTML = await response.text();

        if (pageName === 'home' || pageName === 'latihan') {
            lastPage = pageName;
        }

        // --- LOGIKA MUSIK BERDASARKAN HALAMAN ---
        if (pageName === 'latihan') {
            // Kalau masuk game, matikan musik menu
            bgmAudio.pause();
        } else {
            // Kalau di Home, Pengaturan, Pencapaian, Credit -> Nyalakan Musik
            // (Kecuali user mematikan musik di pengaturan)
            if (currentSettings.musik) {
                // play() butuh interaksi user dulu, jadi kita catch error-nya kalau belum di-klik
                bgmAudio.play().catch(error => console.log("Menunggu interaksi user untuk memutar musik..."));
            }
        }

        // Inisialisasi Halaman
        if (pageName === 'logo') initLogo();
        else if (pageName === 'home') initHome();
        else if (pageName === 'template') initTemplate(targetMenu);
        else if (pageName === 'latihan' && currentTheme !== '') {
            if (typeof initLatihan === "function") initLatihan(currentTheme);
        }
        
    } catch (err) { console.error("Gagal memuat halaman:", err); }
}

function updateBgmVolume() {
    // Ambil nilai volume musik dari localStorage (0-100)
    let vol = localStorage.getItem('funvo_music');
    if (vol === null) vol = 50; 
    
    // Set volume audio (0.0 - 1.0)
    bgmAudio.volume = vol / 100;

    // Cek switch on/off
    if (!currentSettings.musik) {
        bgmAudio.pause();
    } else {
        // Jika sedang di menu (bukan latihan) dan musik nyala, mainkan
        if (lastPage !== 'latihan') {
            bgmAudio.play().catch(e => {});
        }
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

// --- 3. LOGIKA PAGE LOGO (PENTING UNTUK AUTO-PLAY) ---
function initLogo() {
    const container = document.getElementById('logo-container');
    const logoImg = document.getElementById('main-logo');
    if (container && logoImg) {
        container.onclick = () => {
            // INI PENTING: Saat user klik logo pertama kali, kita "pancing" browser untuk mengizinkan audio
            if (currentSettings.musik) {
                bgmAudio.play().catch(e => console.log(e));
            }

            logoImg.src = 'assets/images/logo-eyes.png';
            setTimeout(() => loadPage('home'), 800);
        };
    }
}

// --- 4. LOGIKA PENGATURAN (UPDATE VOLUME LIVE) ---
function initPengaturanUI() {
    const volSlider = document.getElementById('vol-slider');
    const musicSlider = document.getElementById('music-slider');
    
    // Set nilai slider dari storage
    if(volSlider) volSlider.value = localStorage.getItem('funvo_vol') || 50;
    if(musicSlider) {
        musicSlider.value = localStorage.getItem('funvo_music') || 50;
        
        // Tambahkan event listener agar saat slider digeser, volume berubah LANGSUNG
        musicSlider.addEventListener('input', function() {
            localStorage.setItem('funvo_music', this.value);
            updateBgmVolume(); // Update suara background real-time
        });
    }

    for (let key in currentSettings) {
        const img = document.getElementById(`${key}-img`);
        if (img) img.src = currentSettings[key] ? "assets/Pengaturan/On.png" : "assets/Pengaturan/off.png";
    }
}

function toggleSwitch(type) {
    currentSettings[type] = !currentSettings[type];
    
    // Simpan perubahan switch (misal: mematikan musik)
    localStorage.setItem('funvo_switches', JSON.stringify(currentSettings));
    
    // Efek langsung
    if (type === 'musik') {
        updateBgmVolume(); // Matikan/Nyalakan lagu langsung
    }

    initPengaturanUI();
}

function saveSettings() {
    // Simpan semua (Redundan tapi aman)
    const vol = document.getElementById('vol-slider');
    const music = document.getElementById('music-slider');
    if (vol) localStorage.setItem('funvo_vol', vol.value);
    if (music) localStorage.setItem('funvo_music', music.value);
    localStorage.setItem('funvo_switches', JSON.stringify(currentSettings));
    
    updateBgmVolume(); // Pastikan volume terupdate

    // Popup
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

// --- [SISA KODE ACHIEVEMENT & UTILITIES SAMA SEPERTI SEBELUMNYA] ---
// Pastikan fungsi getUserProgress, updateAchievement, checkMilestoneNotification, dll tetap ada di bawah sini.
// ... (Salin bagian ACHIEVEMENT dari kode sebelumnya ke sini) ...

function getUserProgress() {
    return JSON.parse(localStorage.getItem('funvo_progress')) || {
        tutorial: 0, themes: [], vocab: 0, stars: {}, daily: 0,
        lastLoginDate: null, nohint: [], noexit: 0, return: 0, claimed: {}
    };
}

function saveUserProgress(data) {
    localStorage.setItem('funvo_progress', JSON.stringify(data));
}

function updateAchievement(type, value, extraData = null) {
    let data = getUserProgress();
    let updated = false;

    if (type === 'vocab') { data.vocab += value; updated = true; } 
    else if (type === 'themes') { if (!data.themes.includes(extraData)) { data.themes.push(extraData); updated = true; } }
    else if (type === 'stars') { const curr = data.stars[extraData.theme] || 0; if (value > curr) { data.stars[extraData.theme] = value; updated = true; } }
    else if (type === 'nohint') { if (!data.nohint.includes(extraData)) { data.nohint.push(extraData); updated = true; } }
    else if (type === 'tutorial') { if (data.tutorial === 0) { data.tutorial = 1; updated = true; } }
    else if (type === 'noexit') { if (data.noexit === 0) { data.noexit = 1; updated = true; } }

    if (updated) {
        saveUserProgress(data);
        if (currentSettings.notif) checkMilestoneNotification(type, data);
    }
}

function checkDailyLogin() {
    let data = getUserProgress();
    const today = new Date().toDateString();
    if (data.lastLoginDate !== today) {
        data.daily += 1;
        if (data.daily > 1) data.return += 1;
        data.lastLoginDate = today;
        saveUserProgress(data);
    }
}

function initAchievementUI() {
    const data = getUserProgress();
    const totalStars = Object.values(data.stars).reduce((a, b) => a + b, 0);
    const currentValues = {
        tutorial: data.tutorial, themes: data.themes.length, vocab: data.vocab,
        stars: totalStars, daily: data.daily, nohint: data.nohint.length,
        onerun: sessionThemesCompleted, noexit: data.noexit, return: data.return
    };

    Object.keys(MAX_TARGETS).forEach(key => {
        const bar = document.getElementById(`bar-${key}`);
        const text = document.getElementById(`txt-${key}`);
        const btn = document.getElementById(`btn-${key}`);

        if (bar && text && btn) {
            let current = currentValues[key] || 0;
            let percent = (current / MAX_TARGETS[key]) * 100;
            bar.style.width = `${Math.min(percent, 100)}%`;
            text.innerText = `${current}/${MAX_TARGETS[key]}`;
            handleClaimButton(key, btn, current);
        }
    });
}

function handleClaimButton(key, btn, currentVal) {
    let data = getUserProgress();
    let claimedList = data.claimed[key] || [];
    let nextTarget = 0;
    
    if (MILESTONES[key]) {
        nextTarget = MILESTONES[key].find(t => !claimedList.includes(t)) || 9999;
    } else {
        nextTarget = MAX_TARGETS[key];
        if (claimedList.includes(nextTarget)) nextTarget = 9999;
    }

    if (nextTarget === 9999) {
        btn.innerText = "CLAIMED";
        btn.classList.add('claimed');
        btn.style.display = "block";
        btn.disabled = true;
    } else if (currentVal >= nextTarget) {
        btn.innerText = "CLAIM";
        btn.classList.remove('claimed');
        btn.classList.add('ready');
        btn.style.display = "block";
        btn.disabled = false;
        btn.onclick = () => claimReward(key, nextTarget);
    } else {
        btn.style.display = "none";
    }
}

function claimReward(key, targetLevel) {
    let data = getUserProgress();
    if (!data.claimed[key]) data.claimed[key] = [];
    data.claimed[key].push(targetLevel);
    saveUserProgress(data);
    alert(`Selamat! Kamu mencapai target ${targetLevel}! 🌟`);
    initAchievementUI();
}

function checkMilestoneNotification(key, data) {
    let currentVal = 0;
    if (key === 'vocab') currentVal = data.vocab;
    else if (key === 'daily') currentVal = data.daily;
    else if (key === 'onerun') currentVal = sessionThemesCompleted;
    else if (key === 'return') currentVal = data.return;
    
    if (MILESTONES[key] && MILESTONES[key].includes(currentVal)) {
        showGlobalPopup("Achievement Unlocked! 🏆", "Cek halaman Pencapaian!");
    }
}

function showGlobalPopup(title, message) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#FFD700';
    toast.style.color = '#5a3e1b';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '50px';
    toast.style.zIndex = '9999';
    toast.style.fontWeight = 'bold';
    toast.style.textAlign = 'center';
    toast.style.border = '2px solid #FFF';
    toast.innerHTML = `<span>${title}</span><br><span style="font-size:0.9em; font-weight:normal;">${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function initHome() {
    const greetingText = document.getElementById("greetings");
    if (greetingText) {
        const jam = new Date().getHours();
        let ucapan = jam < 12 ? "Pagi" : (jam < 15 ? "Siang" : (jam < 18 ? "Sore" : "Malam"));
        greetingText.innerText = `Halo, Selamat ${ucapan}!`;
    }
}

function initTemplate(targetMenu = 'Credit') {
    const dynamicArea = document.getElementById('dynamic-content');
    if (dynamicArea) {
        let fileName = 'credit'; 
        if (targetMenu === 'Cara Main') fileName = 'caramain';
        else if (targetMenu === 'Pengaturan') fileName = 'pengaturan';
        else if (targetMenu === 'Pencapaian') fileName = 'pencapaian';

        fetch(`Pages/${fileName}.html`).then(r => r.text()).then(html => {
            dynamicArea.innerHTML = html;
            if (fileName === 'pengaturan') initPengaturanUI();
            else if (fileName === 'pencapaian') initAchievementUI();
        });

        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('onclick').includes(targetMenu));
        });
    }
}

function resetGame() {
    if (confirm("Hapus semua data permainan?")) {
        localStorage.clear();
        sessionThemesCompleted = 0;
        alert("Data di-reset!");
        loadPage('logo');
    }
}