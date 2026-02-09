function changeContent(menuName, element) {
    // Jika menu yang diklik sudah aktif, jangan lakukan apa-apa
    if (element.classList.contains('active')) return;

    const container = document.getElementById('dynamic-content');
    const menuItems = document.querySelectorAll('.menu-item');

    // Reset status aktif
    menuItems.forEach(item => {
        item.classList.remove('active');
        item.style.pointerEvents = "auto"; // Aktifkan kembali klik untuk menu lain
    });

    // Set menu ini jadi aktif dan matikan kliknya
    element.classList.add('active');
    element.style.pointerEvents = "none";

    if (menuName === 'Credit') {
        container.innerHTML = `
            <div class="profile-frame">
                <img src="../assets/Credit/P-Credit.png" alt="Foto Profil">
            </div>
            <div class="text-frame">
                <img src="../assets/Credit/Credit.jpg" alt="Teks Credit">
            </div>
        `;
    } else {
        container.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; width:100%; color:#004b8d; font-weight:bold; font-size:1.5rem; text-align:center;">
                Halaman ${menuName} <br> Sedang Dalam Pengembangan
            </div>
        `;
    }
}