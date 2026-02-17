// ===============================
// GLOBAL STATE
// ===============================
const appContainer = document.getElementById('app-container');

let lastPage = 'home';
let currentTheme = '';

let currentSettings = JSON.parse(localStorage.getItem('funvo_switches')) || {
    notif: true,
    suara: true,
    musik: true,
    support: true
};

const achTargets = {
    tutorial: 1,
    themes: 6,
    vocab: 60,
    stars: 18,
    daily: 20,
    nohint: 6,
    onerun: 6,
    noexit: 1,
    return: 20
};

// ===============================
// NAVIGASI UTAMA
// ===============================
async function loadPage(pageName, targetMenu = 'Credit') {
    try {
        const response = await fetch(`Pages/${pageName}.html`);
        if (!response.ok) throw new Error('Halaman tidak ditemukan');

        const html = await response.text();
        appContainer.innerHTML = html;

        if (pageName === 'home' || pageName === 'latihan') {
            lastPage = pageName;
        }

        if (pageName === 'logo') initLogo();
        else if (pageName === 'home') initHome();
        else if (pageName === 'template') initTemplate(targetMenu);
        else if (pageName === 'latihan' && currentTheme !== '') {
            if (typeof initLatihan === "function") {
                initLatihan(currentTheme);
            }
        }

    } catch (err) {
        console.error("Gagal memuat halaman:", err);
    }
}

function backToLastPage() {
    if (lastPage === 'latihan') {
        loadPage('home');
    } else {
        loadPage(lastPage);
    }
}

function mulaiTema(namaTema) {
    currentTheme = namaTema;
    loadPage('latihan');
}

document.addEventListener("DOMContentLoaded", () => {
    loadPage('logo');
});

// ===============================
// HALAMAN SPESIFIK
// ===============================
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
        let ucapan =
            jam < 12 ? "Pagi" :
            jam < 15 ? "Siang" :
            jam < 18 ? "Sore" : "Malam";

        greetingText.innerText = `Halo, Selamat ${ucapan}!`;
    }
}

// ===============================
// TEMPLATE SYSTEM
// ===============================
async function initTemplate(targetMenu = 'Credit') {
    const dynamicArea = document.getElementById('dynamic-content');
    if (!dynamicArea) return;

    let fileName = '';

    switch (targetMenu) {
        case 'Cara Main':
            fileName = 'caramain';
            break;
        case 'Pengaturan':
            fileName = 'pengaturan';
            break;
        case 'Pencapaian':
            fileName = 'pencapaian';
            break;
        default:
            fileName = 'credit';
    }

    try {
        const response = await fetch(`Pages/${fileName}.html`);
        if (!response.ok) throw new Error('File tidak ditemukan');

        dynamicArea.innerHTML = await response.text();

        if (fileName === 'pengaturan') initPengaturanUI();
        if (fileName === 'pencapaian') initAchievementUI();

    } catch (error) {
        dynamicArea.innerHTML = `<div style="padding:20px;">Halaman tidak tersedia</div>`;
        console.error(error);
    }

    // Update active menu
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');

        const onclickAttr = item.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(targetMenu)) {
            item.classList.add('active');
        }
    });
}

// ===============================
// ACHIEVEMENT
// ===============================
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
                btn.disabled = true;
                btn.style.display = "block";
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

// ===============================
// PENGATURAN
// ===============================
function initPengaturanUI() {
    const volSlider = document.getElementById('vol-slider');
    const musicSlider = document.getElementById('music-slider');

    if (volSlider) volSlider.value = localStorage.getItem('funvo_vol') || 50;
    if (musicSlider) musicSlider.value = localStorage.getItem('funvo_music') || 50;

    for (let key in currentSettings) {
        const img = document.getElementById(`${key}-img`);
        if (img) {
            img.src = currentSettings[key]
                ? "assets/Pengaturan/On.png"
                : "assets/Pengaturan/off.png";
        }
    }
}

function toggleSwitch(type) {
    currentSettings[type] = !currentSettings[type];

    const img = document.getElementById(`${type}-img`);
    if (img) {
        img.src = currentSettings[type]
            ? "assets/Pengaturan/On.png"
            : "assets/Pengaturan/off.png";
    }
}

function aturVolume(tipe, nilai) {
    if (tipe === 'suara') {
        localStorage.setItem('funvo_vol', nilai);
    } else if (tipe === 'musik') {
        localStorage.setItem('funvo_music', nilai);
    }
}

function saveSettings() {
    localStorage.setItem('funvo_switches', JSON.stringify(currentSettings));

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
    if (confirm("Apakah kamu yakin ingin menghapus semua data permainan?")) {
        localStorage.clear();
        loadPage('logo');
    }
}

// ===============================
// GLOBAL POPUP
// ===============================
function showPopup(title, message, duration = 3000) {
    const popup = document.getElementById('popup-notif');
    const titleEl = document.getElementById('popup-title');
    const messageEl = document.getElementById('popup-message');

    if (popup && titleEl && messageEl) {
        titleEl.innerText = title;
        messageEl.innerText = message;
        popup.style.display = 'flex';

        setTimeout(() => {
            popup.style.display = 'none';
        }, duration);
    }
}
