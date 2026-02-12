let soalAktif = [];
let indexSekarang = 0;
let hintsUser = 3;

/* INIT */
function initLatihan(tema="animals") {
    soalAktif = [...data_soal.js[tema]]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    indexSekarang = 0;
    hintsUser = 3;

    document.getElementById("hint-count").innerText = "Hint : 3";

    renderSoal();
}

/* RENDER */
function renderSoal() {

    const data = soalAktif[indexSekarang];
    const box = document.getElementById("image-area");

    box.innerHTML = `<h2>${data.correct}</h2>`;

    let pilihan = [data.correct, ...data.wrong]
        .sort(() => Math.random() - 0.5);

    const area = document.getElementById("options-area");
    area.innerHTML = "";

    pilihan.forEach(jawab => {
        area.innerHTML += 
        `<div class="answer-card" onclick="cekJawaban('${jawab}')">${jawab}</div>`;
    });

    updateProgress();
}

/* CEK */
function cekJawaban(jawabanUser) {

    if(jawabanUser === soalAktif[indexSekarang].correct){

        indexSekarang++;

        if(indexSekarang < 10){
            renderSoal();
        } else {
            alert("Selamat! Kamu Selesai 🎉");
        }

    } else {
        alert("Salah! Coba lagi ya 😊");
    }
}

/* PROGRESS */
function updateProgress(){

    let persen = (indexSekarang / 10) * 100;

    document.getElementById("latihan-progress").style.width = persen + "%";
    document.getElementById("butterfly-box").style.left = persen + "%";
    document.getElementById("percent-val").innerText = persen + "%";
}

/* AUDIO */
function playCurrentAudio(){
    if(soalAktif[indexSekarang].audio){
        new Audio(soalAktif[indexSekarang].audio).play();
    }
}

/* HINT */
function useHint(){

    if(hintsUser > 0){
        hintsUser--;
        document.getElementById("hint-count").innerText = "Hint : " + hintsUser;

        alert("Jawaban diawali huruf: " + soalAktif[indexSekarang].correct[0]);

    } else {
        alert("Hint habis!");
    }
}

/* AUTO START */
window.onload = () => {
    initLatihan("animals");
};
