const DAFTAR_TEMA = ['kota', 'rumah', 'kebun', 'zoo', 'taman', 'sea'];

let soalAktif = [];
let indexSekarang = 0;
let hintsUser = 3;
let correctAnswers = 0;
let currentAudioObj = null;

function initLatihan(tema) {

    if (!databaseSoal[tema]) {
        console.error("Tema tidak ditemukan:", tema);
        return;
    }

    soalAktif = [...databaseSoal[tema]]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    indexSekarang = 0;
    hintsUser = 3;
    correctAnswers = 0;

    renderSoal();
}

function cekJawaban(jawabanUser) {

    if (!soalAktif[indexSekarang]) return;

    if (jawabanUser === soalAktif[indexSekarang].answer) {

        correctAnswers++;

        updateAchievement('vocab', 1);

        indexSekarang++;

        if (indexSekarang < soalAktif.length) {
            renderSoal();
        } else {
            finishGame();
        }

    } else {
        showPopup("Ups!", "Coba dengarkan lagi ya 😊", 1500);
    }
}

function finishGame() {

    let starsEarned = 0;

    if (hintsUser === 3) starsEarned = 3;
    else if (hintsUser === 2) starsEarned = 2;
    else starsEarned = 1;

    updateAchievement('stars', starsEarned, { theme: currentTheme });
    updateAchievement('themes', 1, currentTheme);

    if (hintsUser === 3) {
        updateAchievement('nohint', 1, currentTheme);
    }

    updateAchievement('noexit', 1);

    sessionThemesCompleted++;

    setTimeout(() => {
        showResultPopup(starsEarned);
    }, 500);
}

function renderSoal() {

    const data = soalAktif[indexSekarang];
    if (!data) return;

    playCurrentAudio();

    let pilihanSalah = databaseSoal[currentTheme]
        .filter(s => s.answer !== data.answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    let semuaPilihan = [data, ...pilihanSalah]
        .sort(() => Math.random() - 0.5);

    const area = document.getElementById("options-area");

    if (area) {
        area.innerHTML = "";

        semuaPilihan.forEach(item => {
            area.innerHTML += `
                <div class="answer-card" onclick="cekJawaban('${item.answer}')">
                    <div class="card-content">
                        <div class="img-box">
                            <img src="${item.image}">
                        </div>
                        <div class="text-box">
                            ${item.answer.toUpperCase()}
                        </div>
                    </div>
                </div>`;
        });
    }

    updateProgressLatihan();

    const hintLabel = document.getElementById("hint-count");
    if (hintLabel) hintLabel.innerText = "Hint : " + hintsUser;
}

function updateProgressLatihan() {

    let persen = (indexSekarang / soalAktif.length) * 100;

    const bar = document.getElementById("latihan-progress");
    const kupu = document.getElementById("butterfly-box");
    const txt = document.getElementById("percent-val");

    if (bar) bar.style.width = persen + "%";
    if (kupu) kupu.style.left = persen + "%";
    if (txt) txt.innerText = Math.floor(persen) + "%";
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
