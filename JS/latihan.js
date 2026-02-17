// JS/latihan.js

const DAFTAR_TEMA = ['kota', 'rumah', 'kebun', 'zoo', 'taman', 'sea'];

let soalAktif = [];
let indexSekarang = 0;
let hintsUser = 3; // Reset setiap tema dimulai
let correctAnswers = 0; // Hitung jawaban benar
let currentAudioObj = null;

function initLatihan(tema) {
    if (!databaseSoal[tema]) {
        console.error("Tema tidak ditemukan:", tema);
        return;
    }

    // Reset Variable Permainan
    soalAktif = [...databaseSoal[tema]].sort(() => Math.random() - 0.5).slice(0, 10);
    indexSekarang = 0;
    hintsUser = 3; 
    correctAnswers = 0;
    
    renderSoal();
}

function cekJawaban(jawabanUser) {
    // Jawaban Benar
    if (jawabanUser === soalAktif[indexSekarang].answer) {
        correctAnswers++;
        
        // Update Achievement Kosakata (Langsung dihitung per kata)
        updateAchievement('vocab', 1);

        indexSekarang++;
        updateProgressLatihan();

        if (indexSekarang < 10) {
            renderSoal();
        } else {
            // GAME SELESAI
            finishGame();
        }
    } else {
        // Jawaban Salah
        showPopup("Ups!", "Coba dengarkan lagi ya 😊", 1500);
    }
}

function finishGame() {
    // 1. Hitung Bintang (Logika: Salah 0-1 = 3 Bintang, Salah 2-3 = 2 Bintang, >3 = 1 Bintang)
    // Karena sistem kita di atas hanya lanjut kalau benar, maka logicnya kita pakai hintsUser
    // 3 Hint sisa = 3 Bintang, 2 Hint = 2 Bintang, dst.
    
    let starsEarned = 0;
    if (hintsUser === 3) starsEarned = 3;
    else if (hintsUser === 2) starsEarned = 2;
    else starsEarned = 1;

    // Simpan Bintang ke Achievement
    updateAchievement('stars', starsEarned, { theme: currentTheme });

    // 2. Simpan Tema Selesai (Unik)
    updateAchievement('themes', 1, currentTheme);

    // 3. Cek Achievement "No Hint"
    if (hintsUser === 3) {
        updateAchievement('nohint', 1, currentTheme);
    }

    // 4. Achievement "One Run" (Session)
    sessionThemesCompleted++;
    // Logic One Run tidak disimpan di localStorage progress biasa, tapi kita bisa update UI-nya nanti
    // Untuk achievement session, kita tidak panggil updateAchievement 'vocab' dsb, tapi biarkan UI membaca variabel global.

    // 5. Achievement "No Exit"
    // Asumsi: jika fungsi finishGame dipanggil, berarti user tidak keluar
    updateAchievement('noexit', 1);

    // Tampilkan Hasil
    setTimeout(() => {
        showResultPopup(starsEarned);
    }, 500);
}

function renderSoal() {
    playCurrentAudio();
    const data = soalAktif[indexSekarang];
    
    // Pilihan Jawaban
    let pilihanSalah = databaseSoal[currentTheme]
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
    
    // Update label hint
    const hintLabel = document.getElementById("hint-count");
    if (hintLabel) hintLabel.innerText = "Hint : " + hintsUser;
}

function updateProgressLatihan() {
    let persen = (indexSekarang / 10) * 100;
    const bar = document.getElementById("latihan-progress");
    const kupu = document.getElementById("butterfly-box");
    const txt = document.getElementById("percent-val");

    if(bar) bar.style.width = persen + "%";
    if(kupu) kupu.style.left = persen + "%";
    if(txt) txt.innerText = persen + "%";
}

function playCurrentAudio() {
    if (currentAudioObj) {
        currentAudioObj.pause();
        currentAudioObj.currentTime = 0;
    }

    if (soalAktif[indexSekarang]) {
        currentAudioObj = new Audio(soalAktif[indexSekarang].audio);
        let savedVol = localStorage.getItem('funvo_vol') || 50;
        currentAudioObj.volume = savedVol / 100;
        currentAudioObj.play().catch(e => console.log("Audio error:", e));
    }
}

function useHint() {
    if (hintsUser > 0) {
        hintsUser--;
        const hintLabel = document.getElementById("hint-count");
        if (hintLabel) hintLabel.innerText = "Hint : " + hintsUser;
        
        const jawabanBenar = soalAktif[indexSekarang].answer; 
        const hurufPertama = jawabanBenar.charAt(0).toUpperCase();
        
        showPopup("Petunjuk!", `Kata dimulai huruf: "${hurufPertama}"`, 2000);
    } else {
        showPopup("Habis!", "Petunjuk kamu sudah habis! 💪", 2000);
    }
}

// --- POPUP HASIL ---
function showResultPopup(stars) {
    const popup = document.getElementById('result-popup');
    const btnNext = document.getElementById('btn-next-res');
    
    // Tampilkan Bintang di Popup (Jika ada elemen bintang di HTML popup kamu)
    // Kamu bisa menambahkan logika manipulasi DOM untuk gambar bintang di sini jika perlu
    
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