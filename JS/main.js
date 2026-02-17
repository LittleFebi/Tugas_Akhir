// ===============================
// GLOBAL STATE
// ===============================
const appContainer = document.getElementById('app-container');

let lastPage = 'home';
let currentTheme = '';
let sessionThemesCompleted = 0;

let currentSettings = JSON.parse(localStorage.getItem('funvo_switches')) || {
    notif: true,
    suara: true,
    musik: true,
    support: true
};

// ===============================
// USER PROGRESS SYSTEM
// ===============================
function getUserProgress() {
    return JSON.parse(localStorage.getItem('funvo_progress')) || {
        tutorial: 0,
        themes: [],
        vocab: 0,
        stars: {},
        daily: 0,
        lastLoginDate: null,
        nohint: [],
        noexit: 0,
        return: 0
    };
}

function saveUserProgress(data) {
    localStorage.setItem('funvo_progress', JSON.stringify(data));
}

function updateAchievement(type, value, extraData = null) {
    let data = getUserProgress();

    if (type === 'vocab') {
        data.vocab += value;
    }

    else if (type === 'themes') {
        if (!data.themes.includes(extraData)) {
            data.themes.push(extraData);
        }
    }

    else if (type === 'stars') {
        const currentStar = data.stars[extraData.theme] || 0;
        if (value > currentStar) {
            data.stars[extraData.theme] = value;
        }
    }

    else if (type === 'nohint') {
        if (!data.nohint.includes(extraData)) {
            data.nohint.push(extraData);
        }
    }

    else if (type === 'noexit') {
        if (data.noexit === 0) {
            data.noexit = 1;
        }
    }

    saveUserProgress(data);
}

// ===============================
// DAILY LOGIN
// ===============================
function checkDailyLogin() {
    let data = getUserProgress();
    const today = new Date().toDateString();

    if (data.lastLoginDate !== today) {
        data.daily += 1;

        if (data.daily > 1) {
            data.return += 1;
        }

        data.lastLoginDate = today;
        saveUserProgress(data);
    }
}

// ===============================
// NAVIGATION SYSTEM
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

function mulaiTema(namaTema) {
    currentTheme = namaTema;
    loadPage('latihan');
}

function backToLastPage() {
    if (lastPage === 'latihan') loadPage('home');
    else loadPage(lastPage);
}

document.addEventListener("DOMContentLoaded", () => {
    loadPage('logo');
    checkDailyLogin();
});

// ===============================
// PAGE INIT
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
