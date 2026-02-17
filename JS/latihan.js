const DAFTAR_TEMA = ['kota','rumah','kebun','zoo','taman','sea'];

let soalAktif=[];
let indexSekarang=0;
let hintsUser=3;
let correctAnswers=0;

function initLatihan(tema){
    soalAktif=[...databaseSoal[tema]]
        .sort(()=>Math.random()-0.5)
        .slice(0,10);

    indexSekarang=0;
    hintsUser=3;
    correctAnswers=0;

    renderSoal();
}

function cekJawaban(jawabanUser){
    if(jawabanUser===soalAktif[indexSekarang].answer){

        correctAnswers++;
        updateAchievement("vocab",1);

        indexSekarang++;

        if(indexSekarang<10){
            renderSoal();
        }else{
            finishGame();
        }

    }else{
        alert("Jawaban salah, coba lagi!");
    }
}

function finishGame(){

    let starsEarned =
        hintsUser===3?3:
        hintsUser===2?2:1;

    updateAchievement("stars",starsEarned,currentTheme);
    updateAchievement("themes",1,currentTheme);

    if(hintsUser===3){
        updateAchievement("nohint",1,currentTheme);
    }

    updateAchievement("noexit",1);

    sessionThemesCompleted++;

    showResultPopup();
}

function renderSoal(){
    const data=soalAktif[indexSekarang];

    let salah=databaseSoal[currentTheme]
        .filter(s=>s.answer!==data.answer)
        .sort(()=>Math.random()-0.5)
        .slice(0,3);

    let pilihan=[data,...salah]
        .sort(()=>Math.random()-0.5);

    const area=document.getElementById("options-area");
    area.innerHTML="";

    pilihan.forEach(item=>{
        area.innerHTML+=`
            <div class="answer-card"
            onclick="cekJawaban('${item.answer}')">
                <img src="${item.image}">
                <p>${item.answer.toUpperCase()}</p>
            </div>`;
    });
}

function showResultPopup(){
    const popup=document.getElementById("result-popup");
    popup.style.display="flex";
}

function restartTema(){
    document.getElementById("result-popup").style.display="none";
    initLatihan(currentTheme);
}

function nextTema(){
    let index=DAFTAR_TEMA.indexOf(currentTheme);

    if(index<DAFTAR_TEMA.length-1){
        document.getElementById("result-popup").style.display="none";
        mulaiTema(DAFTAR_TEMA[index+1]);
    }else{
        loadPage("home");
    }
}
