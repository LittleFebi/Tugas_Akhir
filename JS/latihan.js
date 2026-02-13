let soalAktif = [];
let indexSekarang = 0;
let hintsUser = 3;

function initLatihan(tema) {
    // Ambil 15 soal, acak, ambil 10
    soalAktif = [...databaseSoal[tema]].sort(() => Math.random() - 0.5).slice(0, 10);
    indexSekarang = 0;
    hintsUser = 3;
    renderSoal();
}

function renderSoal() {
    // Kotak kuning sudah dihapus di HTML, jadi JS hanya fokus ke Suara & Jawaban
    playCurrentAudio();

    // Acak pilihan jawaban
    const data = soalAktif[indexSekarang];
    let pilihan = [data.correct, ...data.wrong].sort(() => Math.random() - 0.5);
    
    const area = document.getElementById("options-area");
    area.innerHTML = "";
    
    pilihan.forEach(jawab => {
        area.innerHTML += `<div class="answer-card" onclick="cekJawaban('${jawab}')">${jawab}</div>`;
    });

    updateProgressLatihan();
}

// JS/latihan.js

function cekJawaban(jawabanUser) {
    if (jawabanUser === soalAktif[indexSekarang].correct) {
        // Tambahkan progres kosakata global
        updateAchievementProgress('vocab', 1); 

        indexSekarang++;
        
        // UPDATE progres dulu agar bar jadi 100% sebelum pindah halaman
        updateProgressLatihan(); 

        if (indexSekarang < 10) {
            renderSoal();
        } else {
            // Logika Selesai Tema
            updateAchievementProgress('themes', 1);
            
            if (hintsUser === 3) {
                updateAchievementProgress('nohint', 1);
            }

            // Gunakan pop-up otomatis untuk kemenangan
            showPopup("Hore!", "Kamu Pintar Sekali! Barusan kamu menyelesaikan satu tema! 🎉", 3000);

            setTimeout(() => {
                loadPage('home'); // Sementara balik ke home sampai halaman penanda selesai
            }, 3000);
        }
    } else {
        showPopup("Ups!", "Coba dengarkan lagi ya 😊", 2000);
    }
}

function updateProgressLatihan() {
    let persen = (indexSekarang / 10) * 100;
    document.getElementById("latihan-progress").style.width = persen + "%";
    document.getElementById("butterfly-box").style.left = persen + "%";
    document.getElementById("percent-val").innerText = persen + "%";
}

function playCurrentAudio() {
    new Audio(soalAktif[indexSekarang].audio).play();
}

// JS/latihan.js

function useHint() {
    // 1. Cek apakah jumlah hint masih ada
    if (hintsUser > 0) {
        hintsUser--; // Kurangi jumlah hint
        
        // 2. Update angka hint di layar agar anak-anak tahu sisa hint mereka
        const hintLabel = document.getElementById("hint-count");
        if (hintLabel) {
            hintLabel.innerText = "Hint : " + hintsUser;
        }
        
        // 3. Ambil jawaban benar dan ambil huruf pertamanya
        const jawabanBenar = soalAktif[indexSekarang].correct;
        const hurufPertama = jawabanBenar.charAt(0).toUpperCase();
        
        // 4. Munculkan pesan otomatis menggunakan pop-up yang sudah ada
        showPopup("Petunjuk!", `Kata ini dimulai dengan huruf: "${hurufPertama}"`, 3000);

    } else {
        // 5. Jika hint sudah 0, beri tahu pengguna
        showPopup("Habis!", "Maaf, petunjuk kamu sudah habis. Ayo coba sendiri! 💪", 3000);
    }
}