function changeContent(menuName, element) {
    const originalContent = document.getElementById('original-credit-content');
    const placeholderContent = document.getElementById('placeholder-content');
    const placeholderText = document.getElementById('placeholder-text');
    const menuItems = document.querySelectorAll('.menu-item');

    // Reset status active pada semua tombol menu
    menuItems.forEach(item => item.classList.remove('active'));
    // Set tombol yang diklik menjadi active
    element.classList.add('active');

    if (menuName === 'Credit') {
        // Tampilkan konten profil asli
        originalContent.style.display = 'flex';
        placeholderContent.style.display = 'none';
    } else {
        // Sembunyikan profil, tampilkan pesan pengembangan
        originalContent.style.display = 'none';
        placeholderContent.style.display = 'flex';
        placeholderText.innerText = `Halaman ${menuName} Sedang Dikembangkan`;
    }
}