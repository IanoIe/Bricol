var mapa

window.onload = function(){
    document.getElementById('Nome').innerHTML = localStorage.getItem('Nome');
}


mapa = carregarMapa('map');