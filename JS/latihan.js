// JS/latihan.js

// 1. Definisikan daftar tema di SATU TEMPAT agar konsisten
// Pastikan tulisan ini SAMA PERSIS dengan kunci di data_soal.js
const DAFTAR_TEMA = ['kota', 'rumah', 'kebun', 'zoo', 'taman', 'sea'];

let soalAktif = [];
let indexSekarang = 0;
let hintsUser = 3;

function initLatihan(tema) {
    // Cek apakah tema ada di database untuk mencegah error
    if (!databaseSoal[tema]) {
        console.error("Tema tidak ditemukan:", tema);
        return;
    }

    soalAktif = [...databaseSoal[tema]].sort(() => Math.random() - 0.5).slice(0, 10);
    indexSekarang = 0;
    hintsUser = 3;
    renderSoal();
}

function cekJawaban(jawabanUser) {
    if (jawabanUser === soalAktif[indexSekarang].answer) {
        updateAchievementProgress('vocab', 1);
        indexSekarang++;
        updateProgressLatihan();

        if (indexSekarang < 10) {
            renderSoal();
        } else {
            updateAchievementProgress('themes', 1);
            
            setTimeout(() => {
                showResultPopup(); 
            }, 500);
        }
    } else {
        showPopup("Ups!", "Coba dengarkan lagi ya 😊", 2000);
    }
}

function renderSoal() {
    playCurrentAudio();
    const data = soalAktif[indexSekarang];
    const temaAktif = currentTheme;
    
    // Ambil pilihan jawaban
    let pilihanSalah = databaseSoal[temaAktif]
        .filter(s => s.answer !== data.answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    let semuaPilihan = [data, ...pilihanSalah].sort(() => Math.random() - 0.5);
    
    // Render Grid Jawaban
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
}

function updateProgressLatihan() {
    let persen = (indexSekarang / 10) * 100;
    document.getElementById("latihan-progress").style.width = persen + "%";
    document.getElementById("butterfly-box").style.left = persen + "%";
    document.getElementById("percent-val").innerText = persen + "%";
}

function playCurrentAudio() {
    if (soalAktif[indexSekarang]) {
        new Audio(soalAktif[indexSekarang].audio).play();
    }
}

function useHint() {
    if (hintsUser > 0) {
        hintsUser--;
        const hintLabel = document.getElementById("hint-count");
        if (hintLabel) hintLabel.innerText = "Hint : " + hintsUser;
        
        const jawabanBenar = soalAktif[indexSekarang].answer; 
        const hurufPertama = jawabanBenar.charAt(0).toUpperCase();
        
        showPopup("Petunjuk!", `Kata ini dimulai dengan huruf: "${hurufPertama}"`, 3000);
    } else {
        showPopup("Habis!", "Maaf, petunjuk kamu sudah habis. Ayo coba sendiri! 💪", 3000);
    }
}

// --- FUNGSI POPUP & NAVIGASI YANG DIPERBAIKI ---

function showResultPopup() {
    const popup = document.getElementById('result-popup');
    const btnNext = document.getElementById('btn-next-res');
    
    // Gunakan DAFTAR_TEMA yang konsisten
    let currentIndex = DAFTAR_TEMA.indexOf(currentTheme);

    // Jika tema terakhir, hilangkan tombol Next
    if (currentIndex === DAFTAR_TEMA.length - 1) {
        btnNext.style.display = 'none'; 
    } else {
        btnNext.style.display = 'block'; 
    }

    popup.style.display = 'flex';
}

function restartTema() {
    document.getElementById('result-popup').style.display = 'none';
    initLatihan(currentTheme); 
}

function nextTema() {
    let currentIndex = DAFTAR_TEMA.indexOf(currentTheme);
    
    // Cek apakah masih ada tema selanjutnya
    if (currentIndex >= 0 && currentIndex < DAFTAR_TEMA.length - 1) {
        document.getElementById('result-popup').style.display = 'none';
        
        // Pindah ke tema berikutnya
        let nextThemeName = DAFTAR_TEMA[currentIndex + 1];
        mulaiTema(nextThemeName); 
    }
}