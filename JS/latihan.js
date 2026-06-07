// JS/latihan.js

const DAFTAR_TEMA = ["kota", "rumah", "kebun", "zoo", "taman", "sea"];

// --- TUTORIAL SPOTLIGHT ---
let tutorialStep = 0;
let tutorialLang = "id";

// Tiap langkah: elemen yang disorot + arah panah tooltip
const TUTORIAL_STEPS = [
  { selector: ".spell-btn", arrowDir: "down" }, // footer → tooltip di atas
  { selector: "#options-area", arrowDir: "down" }, // tengah → tooltip di atas
  { selector: ".hint-section", arrowDir: "up" }, // progress row → tooltip di bawah
];

const TUTORIAL_TEXTS = {
  id: [
    {
      title: "🔊 Spell The Word",
      text: "Tekan tombol ini untuk mendengar pengucapan kata. Audio juga diputar otomatis saat soal muncul!",
    },
    {
      title: "🃏 Pilih Jawaban",
      text: "Pilih 1 dari 4 kartu gambar yang cocok dengan kata yang kamu dengar.",
    },
    {
      title: "💡 Gunakan Hint",
      text: "Kesulitan? Tekan hint untuk melihat huruf pertama. Kamu punya 3 kesempatan!",
    },
  ],
  en: [
    {
      title: "🔊 Spell The Word",
      text: "Tap this button to hear the word. Audio also plays automatically when a question appears!",
    },
    {
      title: "🃏 Choose Answer",
      text: "Pick 1 of 4 picture cards that matches the word you just heard.",
    },
    {
      title: "💡 Use Hint",
      text: "Stuck? Tap hint to see the first letter. You have 3 chances!",
    },
  ],
};

function showTutorialIfFirstTime() {
  if (localStorage.getItem("funvo_tutorial_done")) return;
  tutorialStep = 0;
  tutorialLang = "id";
  renderTutorialStep();
}

function renderTutorialStep() {
  document.getElementById("tutorial-overlay")?.remove();
  document.getElementById("tutorial-tooltip")?.remove();

  const step = TUTORIAL_STEPS[tutorialStep];
  const texts = TUTORIAL_TEXTS[tutorialLang][tutorialStep];
  const target = document.querySelector(step.selector);
  if (!target) {
    closeTutorial();
    return;
  }

  const rect = target.getBoundingClientRect();
  const pad = 10;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isLast = tutorialStep === TUTORIAL_STEPS.length - 1;
  const isID = tutorialLang === "id";

  // --- Overlay SVG dengan spotlight "lubang" di area target ---
  const rx = Math.round(rect.left - pad);
  const ry = Math.round(rect.top - pad);
  const rw = Math.round(rect.width + pad * 2);
  const rh = Math.round(rect.height + pad * 2);

  const overlay = document.createElement("div");
  overlay.id = "tutorial-overlay";
  overlay.className = "tutorial-overlay";
  overlay.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <mask id="tut-m">
              <rect width="100%" height="100%" fill="white"/>
              <rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" rx="14" fill="black"/>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(0,0,0,0.75)" mask="url(#tut-m)"/>
          <rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" rx="14"
                fill="none" stroke="#FFD700" stroke-width="3"/>
        </svg>`;
  document.body.appendChild(overlay);

  // --- Tooltip dengan panah ---
  const dotsHTML = TUTORIAL_STEPS.map(
    (_, i) =>
      `<span class="tut-dot${i === tutorialStep ? " active" : ""}"></span>`,
  ).join("");
  const nextLabel = isLast
    ? isID
      ? "Mulai! 🎮"
      : "Let's Go! 🎮"
    : isID
      ? "Lanjut →"
      : "Next →";

  const tooltip = document.createElement("div");
  tooltip.id = "tutorial-tooltip";
  tooltip.className = "tutorial-tooltip";
  tooltip.innerHTML = `
        <span class="tut-arrow ${step.arrowDir}"></span>
        <div class="tut-header">
            <strong class="tut-title">${texts.title}</strong>
            <button class="tut-btn-lang" onclick="toggleTutorialLang()">${isID ? "🇺🇸 EN" : "🇮🇩 ID"}</button>
        </div>
        <p class="tut-text">${texts.text}</p>
        <div class="tut-footer">
            <span class="tut-dots">${dotsHTML}</span>
            <button class="tut-btn-next" onclick="nextTutorialStep()">${nextLabel}</button>
        </div>`;
  document.body.appendChild(tooltip);

  // --- Hitung posisi tooltip ---
  const tooltipW = Math.min(300, vw * 0.82);
  tooltip.style.width = tooltipW + "px";
  tooltip.style.visibility = "hidden";
  tooltip.style.top = "0px";
  const tooltipH = tooltip.offsetHeight || 140;
  tooltip.style.visibility = "";

  const margin = 18;
  let top =
    step.arrowDir === "down"
      ? rect.top - pad - tooltipH - margin // tooltip di atas elemen
      : rect.bottom + pad + margin; // tooltip di bawah elemen

  let left = rect.left + rect.width / 2 - tooltipW / 2;
  left = Math.max(10, Math.min(left, vw - tooltipW - 10));
  top = Math.max(10, Math.min(top, vh - tooltipH - 10));

  tooltip.style.left = left + "px";
  tooltip.style.top = top + "px";

  // Sesuaikan posisi horizontal panah agar tepat menunjuk ke tengah elemen
  const arrow = tooltip.querySelector(".tut-arrow");
  if (arrow) {
    const targetCX = rect.left + rect.width / 2;
    const arrowLeft = Math.max(20, Math.min(targetCX - left, tooltipW - 20));
    arrow.style.left = arrowLeft + "px";
    arrow.style.transform = "translateX(-50%) rotate(45deg)";
  }
}

function nextTutorialStep() {
  if (tutorialStep < TUTORIAL_STEPS.length - 1) {
    tutorialStep++;
    renderTutorialStep();
  } else {
    closeTutorial();
  }
}

function toggleTutorialLang() {
  tutorialLang = tutorialLang === "id" ? "en" : "id";
  renderTutorialStep();
}

function closeTutorial() {
  document.getElementById("tutorial-overlay")?.remove();
  document.getElementById("tutorial-tooltip")?.remove();
  localStorage.setItem("funvo_tutorial_done", "1");

  if (typeof updateAchievement === "function") {
    updateAchievement("tutorial", 1);
  }

  if (nextAudioTimeout) clearTimeout(nextAudioTimeout);
  nextAudioTimeout = setTimeout(() => playCurrentAudio(), 800);
}

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
  soalAktif = [...databaseSoal[tema]]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  // Reset status game
  indexSekarang = 0;
  hintsUser = 3;

  // 1. LANGSUNG MUNCULKAN SOAL (Gambar & 4 Pilihan Jawaban Instan Muncul)
  renderSoal();

  // Bersihkan timeout audio lama jika ada sisa perpindahan tema
  if (nextAudioTimeout) clearTimeout(nextAudioTimeout);

  // 2. Tampilkan tutorial jika pertama kali — audio ditunda sampai tutorial ditutup
  showTutorialIfFirstTime();

  // 3. JEDA KHUSUS SUARA: Hanya mulai jika tutorial TIDAK sedang tampil
  if (!document.getElementById("tutorial-overlay")) {
    nextAudioTimeout = setTimeout(() => {
      playCurrentAudio();
    }, 1000);
  }
}

function cekJawaban(jawabanUser) {
  let settings = JSON.parse(localStorage.getItem("funvo_switches")) || {
    suara: true,
  };
  let savedVol = localStorage.getItem("funvo_vol") || 50;

  if (jawabanUser === soalAktif[indexSekarang].answer) {
    // --- JAWABAN BENAR ---
    if (currentAudioObj) {
      currentAudioObj.pause();
      currentAudioObj.currentTime = 0;
    }

    if (settings.suara) {
      let audioBenar = new Audio("../assets/audio/bgm4.mp3");
      audioBenar.volume = savedVol / 100;
      audioBenar.play().catch((e) => console.log("Gagal play audio benar:", e));
    }

    if (typeof updateAchievement === "function") {
      updateAchievement("vocab", 1);
    }

    indexSekarang++;
    updateProgressLatihan();

    showPopup("Good Job! 🎉", "Jawaban kamu benar!", 3000);

    if (nextQuestionTimeout) clearTimeout(nextQuestionTimeout);
    if (nextAudioTimeout) clearTimeout(nextAudioTimeout);

    nextQuestionTimeout = setTimeout(() => {
      eksekusiSoalBerikutnya();
    }, 3000);

  } else { // <--- SEBELUMNYA KURUNG KURAWAL TUTUP DI SINI HILANG
    // --- JAWABAN SALAH ---
    if (currentAudioObj) {
      currentAudioObj.pause();
      currentAudioObj.currentTime = 0;
    }

    // Tampilkan popup salah selama 1.5 detik (1500ms)
    showPopup("Ups!", "What Out for what you heard!😊", 1500);

    // Hapus dulu antrean timeout audio lama agar aman tidak tumpang tindih
    if (nextAudioTimeout) clearTimeout(nextAudioTimeout);

    if (settings.suara) {
      let audioSalah = new Audio("../assets/audio/bgm2.mp3");
      audioSalah.volume = savedVol / 100;
      audioSalah.play().catch((e) => console.log("Gagal play audio salah:", e));

      // LOGIKA JEDA: TUNGGU AUDIO SALAH SELESAI, BARU BERI JEDA 2 DETIK
      audioSalah.onended = () => {
        nextAudioTimeout = setTimeout(() => {
          playCurrentAudio();
        }, 500); // Jeda hening 2 detik setelah efek suara salah berhenti total
      };
    } else {
      // Jika user mematikan fitur suara di pengaturan, langsung beri jeda 2 detik dari sekarang
      nextAudioTimeout = setTimeout(() => {
        playCurrentAudio();
      }, 500);
    }
  }
} // <--- Pembatas akhir fungsi cekJawaban yang benar

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
  let starsEarned = hintsUser === 3 ? 3 : hintsUser === 2 ? 2 : 1;

  if (typeof updateAchievement === "function") {
    updateAchievement("themes", 1, currentTheme);
    updateAchievement("stars", starsEarned, { theme: currentTheme });

    if (hintsUser === 3) {
      updateAchievement("nohint", 1, currentTheme);
    }
    updateAchievement("noexit", 1);
  }

  setTimeout(() => {
    showResultPopup(starsEarned);
  }, 500);
}

function renderSoal() {
  const data = soalAktif[indexSekarang];
  const temaAktif = currentTheme;

  let pilihanSalah = databaseSoal[temaAktif]
    .filter((s) => s.answer !== data.answer)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  let semuaPilihan = [data, ...pilihanSalah].sort(() => Math.random() - 0.5);

  const area = document.getElementById("options-area");
  if (area) {
    area.innerHTML = "";
    semuaPilihan.forEach((item) => {
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
  if (document.getElementById("tutorial-overlay")) return;

  let settings = JSON.parse(localStorage.getItem("funvo_switches")) || {
    suara: true,
  };
  if (!settings.suara) return;

  if (currentAudioObj) {
    currentAudioObj.pause();
    currentAudioObj.currentTime = 0;
  }

  if (soalAktif[indexSekarang]) {
    currentAudioObj = new Audio(soalAktif[indexSekarang].audio);

    let savedVol = localStorage.getItem("funvo_vol");
    if (savedVol === null) savedVol = 50;
    currentAudioObj.volume = savedVol / 100;

    currentAudioObj.play().catch((e) => console.log("Gagal memutar audio:", e));
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
    showPopup(
      "Run out!",
      "Sorry, Your hints are up. Come on, try it yourself! 💪",
      2000,
    );
  }
}

function showResultPopup(stars) {
  let audioSelesai = new Audio("../assets/audio/bgm3.mp3");
  audioSelesai.volume = 0.5;
  audioSelesai.play().catch((e) => console.log("Gagal play audio selesai:", e));

  const popup = document.getElementById("result-popup");
  const btnNext = document.getElementById("btn-next-res");

  let currentIndex = DAFTAR_TEMA.indexOf(currentTheme);
  if (currentIndex === DAFTAR_TEMA.length - 1) {
    if (btnNext) btnNext.style.display = "none";
  } else {
    if (btnNext) btnNext.style.display = "block";
  }

  if (popup) popup.style.display = "flex";
}

function restartTema() {
  document.getElementById("result-popup").style.display = "none";
  initLatihan(currentTheme);
}

function nextTema() {
  let currentIndex = DAFTAR_TEMA.indexOf(currentTheme);
  if (currentIndex >= 0 && currentIndex < DAFTAR_TEMA.length - 1) {
    document.getElementById("result-popup").style.display = "none";
    let nextThemeName = DAFTAR_TEMA[currentIndex + 1];
    mulaiTema(nextThemeName);
  }
}

// --- MODIFIKASI HELPER SHOWPOPUP DENGAN DETEKSI KLIK SEMBARANG ---
function showPopup(title, message, duration = 3000) {
  const popup = document.getElementById("popup-notif");
  const titleEl = document.getElementById("popup-title");
  const messageEl = document.getElementById("popup-message");

  if (popup && titleEl && messageEl) {
    titleEl.innerText = title;
    messageEl.innerText = message;
    popup.style.display = "flex";

    // Bersihkan timeout penutupan otomatis lama jika ada kuis berjalan cepat
    if (popupAutoCloseTimeout) clearTimeout(popupAutoCloseTimeout);

    // Setel penutupan otomatis bawaan (misal: 3 detik untuk jawaban benar)
    popupAutoCloseTimeout = setTimeout(() => {
      popup.style.display = "none";
      // Hapus event listener klik sembarang setelah pop-up menutup otomatis
      popup.onclick = null;
    }, duration);

    // FITUR BARU: Klik di mana saja pada element pop-up untuk skip langsung
    popup.onclick = function () {
      // 1. Sembunyikan pop-up seketika tanpa menunggu sisa detiknya habis
      popup.style.display = "none";

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
