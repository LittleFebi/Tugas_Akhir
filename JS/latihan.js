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

function cekJawaban(jawabanUser) {
    if (jawabanUser === soalAktif[indexSekarang].correct) {
        indexSekarang++;
        if (indexSekarang < 10) {
            renderSoal();
        } else {
            alert("Hore! Kamu Pintar Sekali! 🎉");
            loadPage('home');
        }
    } else {
        alert("Ups! Coba dengarkan lagi ya 😊");
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

function useHint() {
    if (hintsUser > 0) {
        hintsUser--;
        document.getElementById("hint-count").innerText = "Hint : " + hintsUser;
        alert("Petunjuk: Jawaban diawali huruf '" + soalAktif[indexSekarang].correct[0] + "'");
    }
}