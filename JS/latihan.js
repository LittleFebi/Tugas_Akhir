// JS/latihan.js
let soalAktif = [];
let indexSekarang = 0;
let hintsUser = 3;

function initLatihan(tema) {
    // Ambil data dari database, acak, dan ambil 10 soal
    soalAktif = [...databaseSoal[tema]].sort(() => Math.random() - 0.5).slice(0, 10);
    indexSekarang = 0;
    hintsUser = 3;
    renderSoal();
}

// JS/latihan.js

function cekJawaban(jawabanUser) {
    if (jawabanUser === soalAktif[indexSekarang].answer) {
        updateAchievementProgress('vocab', 1);
        indexSekarang++;
        updateProgressLatihan();

        if (indexSekarang < 10) {
            // Jika belum 10 soal, lanjut ke soal berikutnya
            renderSoal();
        } else {
            // JIKA SUDAH 10 SOAL:
            updateAchievementProgress('themes', 1);
            
            // PANGGIL POP-UP HASIL (Bintang & 3 Tombol)
            // Kita beri sedikit delay agar user bisa melihat progres 100% dulu
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

    // Tampilkan Foto Target di area kuning (Hanya satu gambar saja)
    const targetPhoto = document.getElementById("target-photo");
    if (targetPhoto) {
        targetPhoto.src = data.image; // Mengambil path dari assets/data/
    }

    // Siapkan 4 Pilihan (1 Benar + 3 Salah)
    let pilihanSalah = databaseSoal[temaAktif]
        .filter(s => s.answer !== data.answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    let semuaPilihan = [data, ...pilihanSalah].sort(() => Math.random() - 0.5);
    
    // Isi area grid jawaban (Hanya yang di bawah)
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

// JS/latihan.js

function useHint() {
    // 1. Cek apakah jumlah hint masih ada
    if (hintsUser > 0) {
        hintsUser--; // Kurangi jumlah hint
        
        // 2. Update angka hint di layar
        const hintLabel = document.getElementById("hint-count");
        if (hintLabel) {
            hintLabel.innerText = "Hint : " + hintsUser;
        }
        
        // 3. Ambil jawaban benar dari properti 'answer'
        const jawabanBenar = soalAktif[indexSekarang].answer; 
        const hurufPertama = jawabanBenar.charAt(0).toUpperCase();
        
        // 4. Munculkan pesan otomatis menggunakan pop-up
        showPopup("Petunjuk!", `Kata ini dimulai dengan huruf: "${hurufPertama}"`, 3000);

    } else {
        // 5. Jika hint sudah habis
        showPopup("Habis!", "Maaf, petunjuk kamu sudah habis. Ayo coba sendiri! 💪", 3000);
    }
}

function showResultPopup() {
    const popup = document.getElementById('result-popup');
    const btnNext = document.getElementById('btn-next-res');
    
    // Ambil progres dari localStorage
    let progres = JSON.parse(localStorage.getItem('funvo_ach_progres')) || {};
    let totalTema = progres['themes'] || 0;

    // ATURAN: Di tema ke-6 (setelah selesai 5 tema), tombol Next Hilang
    if (totalTema >= 5) {
        btnNext.style.display = 'none'; 
    } else {
        btnNext.style.display = 'block';
    }

    popup.style.display = 'flex';
}

// Fungsi untuk mengulang tema yang sama
function restartTema() {
    document.getElementById('result-popup').style.display = 'none';
    initLatihan(currentTheme); 
}

// Fungsi untuk lanjut ke tema berikutnya
function nextTema() {
    const daftarTema = ['kota', 'home', 'garden', 'zoo', 'park', 'undersea'];
    let currentIndex = daftarTema.indexOf(currentTheme);
    
    if (currentIndex < daftarTema.length - 1) {
        document.getElementById('result-popup').style.display = 'none';
        mulaiTema(daftarTema[currentIndex + 1]);
    }
}