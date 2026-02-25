// JS/latihan.js

const DAFTAR_TEMA = ['kota', 'rumah', 'kebun', 'zoo', 'taman', 'sea'];

let soalAktif = [];
let indexSekarang = 0;
let hintsUser = 3;
let currentAudioObj = null;

function initLatihan(tema) {
    // Cek apakah tema ada di database
    if (!databaseSoal[tema]) {
        console.error("Tema tidak ditemukan:", tema);
        return;
    }

    // Acak soal dan ambil 10
    soalAktif = [...databaseSoal[tema]].sort(() => Math.random() - 0.5).slice(0, 10);
    
    // Reset status game
    indexSekarang = 0;
    hintsUser = 3;
    
    renderSoal();
}

// JS/latihan.js

function cekJawaban(jawabanUser) {
    // 1. Ambil settingan suara dari penyimpanan
    let settings = JSON.parse(localStorage.getItem('funvo_switches')) || { suara: true };
    let savedVol = localStorage.getItem('funvo_vol') || 50;

    if (jawabanUser === soalAktif[indexSekarang].answer) {
        // --- JAWABAN BENAR ---
        
        // Mainkan suara benar (bgm4.mp3) jika settingan suara ON
        if (settings.suara) {
            let audioBenar = new Audio('../assets/audio/bgm4.mp3');
            audioBenar.volume = savedVol / 100;
            audioBenar.play().catch(e => console.log("Gagal play audio benar:", e));
        }

        // Update pencapaian
        if (typeof updateAchievement === "function") {
            updateAchievement('vocab', 1); 
        }

        // Lanjut ke soal berikutnya
        indexSekarang++;
        updateProgressLatihan();

        if (indexSekarang < 10) {
            renderSoal();
        } else {
            // Game Selesai
            finishGame();
        }
    } else {
        // --- JAWABAN SALAH ---

        // Mainkan suara salah (bgm2.mp3) jika settingan suara ON
        if (settings.suara) {
            let audioSalah = new Audio('../assets/audio/bgm2.mp3');
            audioSalah.volume = savedVol / 100; 
            audioSalah.play().catch(e => console.log("Gagal play audio salah:", e));
        }

        showPopup("Ups!", "What Out for what you heard!😊", 1500);
    }
}

function finishGame() {
    // 1. Hitung Bintang (Sisa hint 3 = 3 Bintang, dst)
    let starsEarned = (hintsUser === 3) ? 3 : (hintsUser === 2 ? 2 : 1);

    // 2. Simpan Data ke Main.js
    if (typeof updateAchievement === "function") {
        updateAchievement('themes', 1, currentTheme); // Simpan tema
        updateAchievement('stars', starsEarned, { theme: currentTheme }); // Simpan bintang
        
        if (hintsUser === 3) {
            updateAchievement('nohint', 1, currentTheme); // Achievement tanpa hint
        }
        
        // Asumsi: jika sampai sini berarti tidak keluar (No Exit)
        updateAchievement('noexit', 1);
    }

    // 3. Tampilkan Popup Hasil
    setTimeout(() => {
        showResultPopup(starsEarned); 
    }, 500);
}

function renderSoal() {
    playCurrentAudio();
    const data = soalAktif[indexSekarang];
    const temaAktif = currentTheme;

    // Ambil pilihan jawaban (1 benar + 3 salah)
    let pilihanSalah = databaseSoal[temaAktif]
        .filter(s => s.answer !== data.answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    let semuaPilihan = [data, ...pilihanSalah].sort(() => Math.random() - 0.5);
    
    // Render ke HTML
    const area = document.getElementById("options-area");
    if (area) {
        area.innerHTML = "";
        semuaPilihan.forEach(item => {
            area.innerHTML += `
                <div class="answer-card" onclick="cekJawaban('${item.answer}')">
                    <div class="card-content">
                        <div class="img-box"><img src="${item.image}"></div>
                        <div class="text-box">${item.answer.toUpperCase()}</div>
                    </div>
                </div>`;
        });
    }

    updateProgressLatihan();
    
    // Update label hint
    const hintLabel = document.getElementById("hint-count");
    if (hintLabel) hintLabel.innerText = "Hint : " + hintsUser;
}

function updateProgressLatihan() {
    let persen = (indexSekarang / 10) * 100;
    const bar = document.getElementById("latihan-progress");
    const kupu = document.getElementById("butterfly-box");
    const txt = document.getElementById("percent-val");

    if (bar) bar.style.width = persen + "%";
    if (kupu) kupu.style.left = persen + "%";
    if (txt) txt.innerText = persen + "%";
}

function playCurrentAudio() {
    // 1. Cek Settingan Suara (ON/OFF) dari LocalStorage
    let settings = JSON.parse(localStorage.getItem('funvo_switches')) || { suara: true };
    if (!settings.suara) return; // Kalau OFF, langsung berhenti

    // 2. Stop audio lama
    if (currentAudioObj) {
        currentAudioObj.pause();
        currentAudioObj.currentTime = 0;
    }

    if (soalAktif[indexSekarang]) {
        currentAudioObj = new Audio(soalAktif[indexSekarang].audio);
        
        // 3. Atur Volume
        let savedVol = localStorage.getItem('funvo_vol');
        if (savedVol === null) savedVol = 50; 
        currentAudioObj.volume = savedVol / 100;

        currentAudioObj.play().catch(e => console.log("Gagal memutar audio:", e));
    }
}

function useHint() {
    if (hintsUser > 0) {
        hintsUser--;
        const hintLabel = document.getElementById("hint-count");
        if (hintLabel) hintLabel.innerText = "Hint : " + hintsUser;
        
        const jawabanBenar = soalAktif[indexSekarang].answer; 
        const hurufPertama = jawabanBenar.charAt(0).toUpperCase();
        
        showPopup("Hint!", `The First Word Start With: "${hurufPertama}"`, 2000);
    } else {
        showPopup("Run out!", "Sorry, Your hints are up. Come on, try it yourself! 💪", 2000);
    }
}

// --- NAVIGASI POPUP HASIL ---

function showResultPopup(stars) {
    // --- MODIFIKASI: Suara Popup Selesai (bgm3.mp3) ---
    let audioSelesai = new Audio('../assets/audio/bgm3.mp3');
    audioSelesai.volume = 0.5; // Sesuaikan volume
    audioSelesai.play().catch(e => console.log("Gagal play audio selesai:", e));

    const popup = document.getElementById('result-popup');
    const btnNext = document.getElementById('btn-next-res');
    
    // Logic Next Button (Hilang kalau tema terakhir)
    let currentIndex = DAFTAR_TEMA.indexOf(currentTheme);
    if (currentIndex === DAFTAR_TEMA.length - 1) {
        if(btnNext) btnNext.style.display = 'none'; 
    } else {
        if(btnNext) btnNext.style.display = 'block'; 
    }

    // Tampilkan Popup
    if(popup) popup.style.display = 'flex';
}

function restartTema() {
    document.getElementById('result-popup').style.display = 'none';
    initLatihan(currentTheme); 
}

function nextTema() {
    let currentIndex = DAFTAR_TEMA.indexOf(currentTheme);
    if (currentIndex >= 0 && currentIndex < DAFTAR_TEMA.length - 1) {
        document.getElementById('result-popup').style.display = 'none';
        let nextThemeName = DAFTAR_TEMA[currentIndex + 1];
        mulaiTema(nextThemeName); 
    }
}

// Fungsi ShowPopup Helper (untuk latihan.html yang mungkin belum meload main.js secara penuh saat transisi)
function showPopup(title, message, duration = 3000) {
    const popup = document.getElementById('popup-notif');
    const titleEl = document.getElementById('popup-title');
    const messageEl = document.getElementById('popup-message');

    if (popup && titleEl && messageEl) {
        titleEl.innerText = title;
        messageEl.innerText = message;
        popup.style.display = 'flex';
        setTimeout(() => { popup.style.display = 'none'; }, duration);
    }
}