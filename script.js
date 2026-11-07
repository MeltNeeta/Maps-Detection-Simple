
//1. Membuat peta awal pada maps
let map = L.map('map').setView([-6.1751, 106.8650], 13); // Koordinat awal di Jakarta

//Mengambil gambar peta dari OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Buat Variable untuk menampung pin letak awal
var User = null;

//fungsi button pada tombol GPS
document.getElementById('btnGPS').addEventListener('click', function(){
    if (!navigator.geolocation){
        alert("web kamu tidak bisa akses GPS!");
        return;
    }

    document.getElementById('infoStatus').innerHTML="Status: <b>Sedang mencari titik lokasi</b>";
    navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

    //ketika berhasil
    document.getElementById('infoStatus').innerHTML="Status: <b>Berhasil</b>"+"<br>"+
    "Latitude: "+lat+"<br>"+"Longitude: "+lng;

    //menghindari pin double
    if (User){
        map.removeLayer(User);
    }

    //view kamera peta otomatis
    map.setView([lat,lng], 13);

    //pasang pin baru di titik lokasimu
    User = L.marker([lat,lng]).addTo(map);
    User.bindPopup("Ini Lokasi Kamu").openPopup();

    }, function(error){
        alert("Masih Gagal! Coba pastikan akses lokasi aktif");
        document.getElementById('infoStatus').innerHTML = "GPS: <b>Ditolak<b>"    
    });
});