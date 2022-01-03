
var routes = [];


/** Função carregar o mapa */

function carregarMapa(idElement){
    
    var map = L.map('map').setView([28.3949, 84.1240], 8);
    // osm layer
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);

    var lc = L.control.locate().addTo(map);
    lc.start();
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var locUtilizador = [position.coords.latitude, position.coords.longitude];
        carregarAnunciosMapa(map, locUtilizador, 15000); /** distancia maxima 45000metros */
      });
    }
}

/** A função que carrega todos os anuncios dos outros utilizadores */
function carregarAnunciosMapa(mapa, latLng, distMax){

  var circle = L.circle(latLng, {
    color: 'green',
    fillColor: 'green',
    fillOpacity: 0.1,
    radius: distMax
  }).addTo(mapa);

  url = '/api/anuncio/'
  idUtilizador = localStorage.getItem("idUtilizador")
  $.ajax({
    url: url + idUtilizador,
    method: 'get',
    success: function (resultado) {
        var anuncios = resultado.data;
        console.log(anuncios)
        for(var anuncio of anuncios){
          var locAnuncio = [parseFloat(anuncio.Latitude), parseFloat(anuncio.Longitude)];
          anuncio.locAnuncio = locAnuncio;
          var distancia = mapa.distance(latLng, locAnuncio);
          if(distancia <= distMax){
            anuncio.Distancia = distancia;
            adicionarAnuncioMapa(mapa, anuncio, latLng);
          }
        }
    }
  })
}

function adicionarAnuncioMapa(mapa, anuncio, latlng){
  console.log(anuncio)
  var marker = L.marker(anuncio.locAnuncio)
    .addTo(mapa)
    .on('click', function(e){
      for(var route of routes){
        route.remove();
      }
      routes = []

      var route = L.Routing.control({
                  waypoints: [
                    L.latLng(latlng[0], latlng[1]),
                    L.latLng(anuncio.locAnuncio[0], anuncio.locAnuncio[1])
                  ]
                }).addTo(mapa);
      routes.push(route)
    });
    
  marker.bindPopup(
    "<h3>"+anuncio.Titulo+"</h3>"+
    "<p>"+anuncio.DatAnuncio.split('T')[0]+"</p>"+
    "<p>"+anuncio.Descricao+"</p>"+
    "<p>"+(anuncio.Distancia/1000).toFixed(3)+" km</p>"+
    "<a href='#' onclick='abrirAnuncio("+anuncio.idAnuncio+")'>Enviar mensagem</a>"
  );
}

function abrirAnuncio(id){
  localStorage.setItem("idAnuncio", parseInt(id));
  window.location = "enviarMensagem.html";
}