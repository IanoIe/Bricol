
/** Função carregar o mapa */

function carregarMapa(idElement){
    var map = L.map('map').setView([28.3949, 84.1240], 8);
    // osm layer
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);

    L.control.locate().addTo(map);
}