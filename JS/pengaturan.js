// Pastikan variabel ini tidak bertabrakan dengan script lain
let currentSettings = {
    notif: true,
    suara: true,
    musik: true
};

function toggleSwitch(type) {
    currentSettings[type] = !currentSettings[type];
    const imgElement = document.getElementById(`${type}-img`);
    
    // Sesuaikan path dan nama file (On.png / off.png)
    if (currentSettings[type]) {
        imgElement.src = "../assets/Pengaturan/On.png";
    } else {
        imgElement.src = "../assets/Pengaturan/off.png";
    }
}

function saveSettings() {
    const volValue = document.getElementById('vol-slider').value;
    const musicValue = document.getElementById('music-slider').value;
    
    localStorage.setItem('funvo_vol', volValue);
    localStorage.setItem('funvo_music', musicValue);
    localStorage.setItem('funvo_switches', JSON.stringify(currentSettings));
    
    alert("Pengaturan Berhasil Disimpan!");
}

function resetGame() {
    if (confirm("Apakah kamu yakin ingin menghapus semua data permainan?")) {
        localStorage.clear();
        alert("Data telah di-reset!");
        location.reload();
    }
}