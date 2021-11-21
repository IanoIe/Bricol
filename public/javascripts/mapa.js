/** Função carregar o mapa */

function carregarMapa(idElement){
    var mapa = L.map(idElement)
    var attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
    var tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mapa);
    /**Coordenadas de localização de Lisboa */
    mapa.setView([38.7071, -9.13549], 6);
    return mapa
}
