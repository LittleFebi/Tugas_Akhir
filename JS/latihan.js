// JS/latihan.js

const DAFTAR_TEMA = ['kota', 'rumah', 'kebun', 'zoo', 'taman', 'sea'];

let soalAktif = [];
let indexSekarang = 0;
let hintsUser = 3;
let currentAudioObj = null;

// Variabel global untuk menyimpan referensi timer/timeout agar bisa dibatalkan jika di-klik manual
let popupAutoCloseTimeout = null;
let nextQuestionTimeout = null;
let nextAudioTimeout = null;

function initLatihan(tema) {
    // Cek apakah tema ada di database
    if (!databaseSoal[tema]) {
        console.error("Tema tidak ditemukan:", tema);
        return;
    }

    // Set currentTheme agar fungsi renderSoal tidak error
    currentTheme = tema; 

    // Acak soal dan ambil 10
    soalAktif = [...databaseSoal[tema]].sort(() => Math.random() - 0.5).slice(0, 10);
    
    // Reset status game
    indexSekarang = 0;
    hintsUser = 3;
    
    // 1. LANGSUNG MUNCULKAN SOAL (Gambar & 4 Pilihan Jawaban Instan Muncul)
    renderSoal(); 

    // Bersihkan timeout audio lama jika ada sisa perpindahan tema
    if (nextAudioTimeout) clearTimeout(nextAudioTimeout);

    // 2. JEDA KHUSUS SUARA: Tunggu 1 detik setelah masuk halaman, baru audio soal 1 diputar
    nextAudioTimeout = setTimeout(() => {
        playCurrentAudio();
    }, 1000); 
}

function cekJawaban(jawabanUser) {
    let settings = JSON.parse(localStorage.getItem('funvo_switches')) || { suara: true };
    let savedVol = localStorage.getItem('funvo_vol') || 50;

    if (jawabanUser === soalAktif[indexSekarang].answer) {
        // --- JAWABAN BENAR ---
        
        if (currentAudioObj) {
            currentAudioObj.pause();
            currentAudioObj.currentTime = 0;
        }
        
        if (settings.suara) {
            let audioBenar = new Audio('../assets/audio/bgm4.mp3');
            audioBenar.volume = savedVol / 100;
            audioBenar.play().catch(e => console.log("Gagal play audio benar:", e));
        }

        if (typeof updateAchievement === "function") {
            updateAchievement('vocab', 1);
        }

        indexSekarang++;
        updateProgressLatihan();

        // TAMPILKAN POPUP "Good Job" (Default auto-close 3 detik jika didiamkan)
        showPopup("Good Job! 🎉", "Jawaban kamu benar!", 3000);

        // Hapus sisa-sisa schedule timeout sebelumnya agar tidak menumpuk
        if (nextQuestionTimeout) clearTimeout(nextQuestionTimeout);
        if (nextAudioTimeout) clearTimeout(nextAudioTimeout);

        // Jalankan transisi otomatis jika user TIDAK melakukan klik sama sekali dalam 3 detik
        nextQuestionTimeout = setTimeout(() => {
            eksekusiSoalBerikutnya();
        }, 3000);

    } else {
        // --- JAWABAN SALAH ---
        if (currentAudioObj) {
            currentAudioObj.pause();
            currentAudioObj.currentTime = 0;
        }

        if (settings.suara) {
            let audioSalah = new Audio('../assets/audio/bgm2.mp3');
            audioSalah.volume = savedVol / 100;
            audioSalah.play().catch(e => console.log("Gagal play audio salah:", e));
        }

        showPopup("Ups!", "What Out for what you heard!😊", 1500);
    }
}

// Fungsi internal untuk memproses pemindahan soal dan penundaan audio kuis berikutnya
function eksekusiSoalBerikutnya() {
    if (indexSekarang < 10) {
        // 1. Tampilkan soal baru ke layar secara instan
        renderSoal(); 
        
        // Bersihkan timeout audio lama sebelum membuat yang baru
        if (nextAudioTimeout) clearTimeout(nextAudioTimeout);

        // 2. Beri jeda 2 detik setelah soal nampang, baru audio soal berbunyi
        nextAudioTimeout = setTimeout(() => {
            playCurrentAudio();
        }, 2000);
    } else {
        finishGame();
    }
}

function finishGame() {
    let starsEarned = (hintsUser === 3) ? 3 : (hintsUser === 2 ? 2 : 1);

    if (typeof updateAchievement === "function") {
        updateAchievement('themes', 1, currentTheme); 
        updateAchievement('stars', starsEarned, { theme: currentTheme }); 
        
        if (hintsUser === 3) {
            updateAchievement('nohint', 1, currentTheme); 
        }
        updateAchievement('noexit', 1);
    }

    setTimeout(() => {
        showResultPopup(starsEarned); 
    }, 500);
}

function renderSoal() {
    const data = soalAktif[indexSekarang];
    const temaAktif = currentTheme;

    let pilihanSalah = databaseSoal[temaAktif]
        .filter(s => s.answer !== data.answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    let semuaPilihan = [data, ...pilihanSalah].sort(() => Math.random() - 0.5);
    
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
    let settings = JSON.parse(localStorage.getItem('funvo_switches')) || { suara: true };
    if (!settings.suara) return; 

    if (currentAudioObj) {
        currentAudioObj.pause();
        currentAudioObj.currentTime = 0;
    }

    if (soalAktif[indexSekarang]) {
        currentAudioObj = new Audio(soalAktif[indexSekarang].audio);
        
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

function showResultPopup(stars) {
    let audioSelesai = new Audio('../assets/audio/bgm3.mp3');
    audioSelesai.volume = 0.5; 
    audioSelesai.play().catch(e => console.log("Gagal play audio selesai:", e));

    const popup = document.getElementById('result-popup');
    const btnNext = document.getElementById('btn-next-res');
    
    let currentIndex = DAFTAR_TEMA.indexOf(currentTheme);
    if (currentIndex === DAFTAR_TEMA.length - 1) {
        if(btnNext) btnNext.style.display = 'none'; 
    } else {
        if(btnNext) btnNext.style.display = 'block'; 
    }

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

// --- MODIFIKASI HELPER SHOWPOPUP DENGAN DETEKSI KLIK SEMBARANG ---
function showPopup(title, message, duration = 3000) {
    const popup = document.getElementById('popup-notif');
    const titleEl = document.getElementById('popup-title');
    const messageEl = document.getElementById('popup-message');

    if (popup && titleEl && messageEl) {
        titleEl.innerText = title;
        messageEl.innerText = message;
        popup.style.display = 'flex';

        // Bersihkan timeout penutupan otomatis lama jika ada kuis berjalan cepat
        if (popupAutoCloseTimeout) clearTimeout(popupAutoCloseTimeout);

        // Setel penutupan otomatis bawaan (misal: 3 detik untuk jawaban benar)
        popupAutoCloseTimeout = setTimeout(() => {
            popup.style.display = 'none';
            // Hapus event listener klik sembarang setelah pop-up menutup otomatis
            popup.onclick = null; 
        }, duration);

        // FITUR BARU: Klik di mana saja pada element pop-up untuk skip langsung
        popup.onclick = function() {
            // 1. Sembunyikan pop-up seketika tanpa menunggu sisa detiknya habis
            popup.style.display = 'none';
            
            // 2. Batalkan seluruh timer penutupan otomatis dan jadwal ganti soal default
            clearTimeout(popupAutoCloseTimeout);
            clearTimeout(nextQuestionTimeout);

            // Bersihkan event handler ini agar tidak menumpuk di klik berikutnya
            popup.onclick = null;

            // 3. Khusus untuk pop-up jawaban benar ("Good Job! 🎉"), trigger soal berikutnya secara instan
            if (title.includes("Good Job")) {
                eksekusiSoalBerikutnya();
            }
        };
    }
}