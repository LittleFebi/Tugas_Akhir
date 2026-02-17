// ================= GLOBAL =================

const appContainer = document.getElementById("app-container");

let lastPage = "home";
let currentTheme = "";
let sessionThemesCompleted = 0;

const MAX_TARGET = {
    tutorial: 1,
    themes: 6,
    vocab: 60,
    stars: 18,
    daily: 20,
    nohint: 6,
    onerun: 6,
    noexit: 1,
    return: 20
};

const MILESTONE = {
    vocab: [10,20,40,60],
    daily: [1,3,5,7,10,20],
    return: [2,3,5,7,10,20],
    onerun: [1,3,5,6]
};

// ================= LOCAL STORAGE =================

function getProgress(){
    return JSON.parse(localStorage.getItem("funvo_progress")) || {
        tutorial:0,
        themes:[],
        vocab:0,
        stars:{},
        daily:0,
        lastLogin:null,
        nohint:[],
        noexit:0,
        return:0
    };
}

function saveProgress(data){
    localStorage.setItem("funvo_progress", JSON.stringify(data));
}

// ================= NAVIGASI =================

async function loadPage(page){
    const res = await fetch(`Pages/${page}.html`);
    appContainer.innerHTML = await res.text();

    if(page === "home" || page === "latihan") lastPage = page;

    if(page === "logo") initLogo();
    if(page === "home") initHome();
    if(page === "latihan" && currentTheme !== "") initLatihan(currentTheme);
}

function mulaiTema(tema){
    currentTheme = tema;
    loadPage("latihan");
}

function backToLastPage(){
    loadPage(lastPage);
}

document.addEventListener("DOMContentLoaded", ()=>{
    loadPage("logo");
    checkDailyLogin();
});

// ================= DAILY CHECK =================

function checkDailyLogin(){
    let data = getProgress();
    const today = new Date().toDateString();

    if(data.lastLogin !== today){
        data.daily += 1;
        if(data.daily > 1) data.return += 1;
        data.lastLogin = today;
        saveProgress(data);
    }
}

// ================= ACHIEVEMENT UPDATE =================

function updateAchievement(type, value=1, extra=null){

    let data = getProgress();

    if(type === "vocab"){
        data.vocab += value;
        checkMilestone("vocab", data.vocab);
    }

    if(type === "themes"){
        if(!data.themes.includes(extra)){
            data.themes.push(extra);
        }
    }

    if(type === "stars"){
        const current = data.stars[extra] || 0;
        if(value > current){
            data.stars[extra] = value;
        }
    }

    if(type === "nohint"){
        if(!data.nohint.includes(extra)){
            data.nohint.push(extra);
        }
    }

    if(type === "noexit"){
        if(data.noexit === 0){
            data.noexit = 1;
        }
    }

    saveProgress(data);
}

// ================= MILESTONE CHECK =================

function checkMilestone(type, currentValue){
    if(MILESTONE[type] && MILESTONE[type].includes(currentValue)){
        showGlobalPopup("Achievement!", 
            `Kamu mencapai ${type} level ${currentValue}! 🎉`);
    }
}

// ================= ACHIEVEMENT UI =================

function initAchievementUI(){
    let data = getProgress();
    const totalStars = Object.values(data.stars)
        .reduce((a,b)=>a+b,0);

    const currentValue = {
        tutorial:data.tutorial,
        themes:data.themes.length,
        vocab:data.vocab,
        stars:totalStars,
        daily:data.daily,
        nohint:data.nohint.length,
        onerun:sessionThemesCompleted,
        noexit:data.noexit,
        return:data.return
    };

    Object.keys(MAX_TARGET).forEach(key=>{
        const bar = document.getElementById(`bar-${key}`);
        const text = document.getElementById(`txt-${key}`);

        if(bar && text){
            let percent = (currentValue[key]/MAX_TARGET[key])*100;
            bar.style.width = `${Math.min(percent,100)}%`;
            text.innerText = `${currentValue[key]}/${MAX_TARGET[key]}`;
        }
    });
}

// ================= POPUP =================

function showGlobalPopup(title,msg){
    alert(title+"\n"+msg);
}

// ================= INIT =================

function initLogo(){
    const logo = document.getElementById("logo-container");
    if(logo){
        logo.onclick = ()=>loadPage("home");
    }
}

function initHome(){
    const greet = document.getElementById("greetings");
    if(greet){
        const jam = new Date().getHours();
        greet.innerText =
            jam<12?"Halo, Selamat Pagi!":
            jam<15?"Halo, Selamat Siang!":
            jam<18?"Halo, Selamat Sore!":
            "Halo, Selamat Malam!";
    }
}
