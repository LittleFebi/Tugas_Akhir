document.addEventListener("DOMContentLoaded", function() {
    const greetingText = document.getElementById("greetings");
    const sekarang = new Date();
    const jam = sekarang.getHours();
    
    let ucapan = "";

    if (jam >= 0 && jam < 12) {
        ucapan = "Halo, Selamat Pagi!";
    } else if (jam >= 12 && jam < 15.5) {
        ucapan = "Halo, Selamat Siang!";
    } else if (jam >= 15.5 && jam < 18) {
        ucapan = "Halo, Selamat Sore!";
    } else {
        ucapan = "Halo, Selamat Malam!";
    }

    greetingText.innerText = ucapan;
});