var map = L.map('mapid').setView([-2.145412, -79.966172], 35);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-2.145412, -79.966172]).addTo(map)
    .bindPopup('Lugar de referencia.')
    .openPopup();
