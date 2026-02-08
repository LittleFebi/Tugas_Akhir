const container = document.getElementById('logo-container');
const logoImg = document.getElementById('main-logo');

container.addEventListener('click', () => {
    // Jalur gambar relatif terhadap index.html yang memanggil script ini
    logoImg.src = '../assets/images/logo-eyes.png';

    // Jeda sebentar agar efek mata terlihat, lalu pindah ke home.html
    setTimeout(() => {
        // Karena index.html dan home.html sama-sama di folder Pages, langsung panggil namanya
        window.location.href = 'home.html';
    }, 600);
});