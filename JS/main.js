// JS/main.js

const appContainer = document.getElementById('app-container');

// UPDATE 1: Tambahkan parameter targetMenu dengan default 'Credit'
async function loadPage(pageName, targetMenu = 'Credit') {
    try {
        const response = await fetch(`Pages/${pageName}.html`);
        const html = await response.text();
        
        appContainer.innerHTML = html;

        if (pageName === 'logo') initLogo();
        else if (pageName === 'home') initHome();
        else if (pageName === 'template') {
            // UPDATE 2: Kirim targetMenu ke initTemplate
            initTemplate(targetMenu); 
        }
        
    } catch (err) {
        console.error("Gagal memuat:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => loadPage('logo'));

function initLogo() {
    const container = document.getElementById('logo-container');
    const logoImg = document.getElementById('main-logo');
    if (container) {
        container.onclick = () => {
            logoImg.src = '../assets/images/logo-eyes.png';
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
            const resp = await fetch(`../Pages/${fileName}.html`);
            const content = await resp.text();
            dynamicArea.innerHTML = content;
        } catch (err) {
            console.error("Gagal memuat konten dinamis:", err);
        }
    }
}

// UPDATE 3: Modifikasi initTemplate agar bisa memilih menu yang aktif
async function initTemplate(targetMenu = 'Credit') {
    const dynamicArea = document.getElementById('dynamic-content');
    if (dynamicArea) {
        // Pilih file berdasarkan targetMenu (kecilkan hurufnya untuk nama file)
        const fileName = targetMenu.toLowerCase() === 'pengaturan' ? 'pengaturan' : 'credit';
        await loadDynamicContent(fileName);

        // Update visual tab menu samping agar sesuai dengan targetMenu
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.classList.remove('active');
            // Cek jika teks onclick di HTML mengandung nama menu kita
            if (item.getAttribute('onclick').includes(targetMenu)) {
                item.classList.add('active');
            }
        });
    }
}

function changeContent(menuName, element) {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    if (menuName === 'Credit') {
        loadDynamicContent('credit');
    } else if (menuName === 'Pengaturan') {
        loadDynamicContent('pengaturan');
    } else {
        const dynamicContentArea = document.getElementById('dynamic-content');
        dynamicContentArea.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; width: 100%; text-align: center; padding: 20px;">
                <h2 style="color: #004b8d;">Halaman ${menuName}</h2>
                <p>Halo! Bagian ini sedang dalam tahap pengembangan.</p>
                <img src="../assets/Icons/info.png" style="width: 60px; margin-top: 20px;">
            </div>
        `;
    }
}