var mapa
var coordPopup = L.popup()


window.onload = function(){
    document.getElementById('Nome').innerHTML = localStorage.getItem('Nome')
}

mapa = carregarMapa('map');