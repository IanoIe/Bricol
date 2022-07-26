var routes = [];
var map;
var marker;

/** Função carregar o mapa */
function carregarMapa(idElement) {
  map = L.map("map").setView([38.7015863, -9.1566962], 8);

  // osm layer
  var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
  osm.addTo(map);
}

/**Função que permitir mostrar localização atual e mostrar no mapa */
function localizacaoAtual() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (map) {
        map.remove();
        carregarMapa();
      }
      var locUtilizador = [position.coords.latitude, position.coords.longitude];
      carregarAnunciosMapa(
        map,
        locUtilizador,
        25000
      ); /** distancia maxima 25000metros */
      map.setView(locUtilizador, 8);
    });
  }
}

/** A função que carrega todos os anuncios dos outros utilizadores */
function carregarAnunciosMapa(mapa, latLng, distMax) {
  var circle = L.circle(latLng, {
    color: "green",
    fillColor: "green",
    fillOpacity: 0.1,
    radius: distMax,
  }).addTo(mapa);

  url = "/api/anuncio/";
  $.ajax({
    url: url,
    method: "get",
    success: function (resultado) {
      var anuncios = resultado.data;
      console.log(anuncios);
      for (var anuncio of anuncios) {
        var locAnuncio = [
          parseFloat(anuncio.Coordenadas.x),
          parseFloat(anuncio.Coordenadas.y),
        ];
        anuncio.locAnuncio = locAnuncio;
        var distancia = mapa.distance(latLng, locAnuncio);
        if (distancia <= distMax) {
          anuncio.Distancia = distancia;
          adicionarAnuncioMapa(mapa, anuncio, latLng);
        }
      }
    },
  });
}

/**Função para adicionar anuncio no mapa atraves das coordenadas (latitude, longitude) */
function adicionarAnuncioMapa(mapa, anuncio, latlng) {
  console.log(anuncio);
  var marker = L.marker(anuncio.locAnuncio)
    .addTo(mapa)
    .on("click", function (e) {
      for (var route of routes) {
        route.remove();
      }
      routes = [];

      var route = L.Routing.control({
        waypoints: [
          L.latLng(latlng[0], latlng[1]),
          L.latLng(anuncio.locAnuncio[0], anuncio.locAnuncio[1]),
        ],
      }).addTo(mapa);
      routes.push(route);
    });

  marker.bindPopup(
    "<h3>" +
      anuncio.Titulo +
      "</h3>" +
      "<img src=" +
      anuncio.Url +
      " width='200' height='200'/>" +
      "<p>" +
      anuncio.DatAnuncio.split("T")[0] +
      "</p>" +
      "<p>" +
      anuncio.Descricao +
      "</p>" +
      "<p>" +
      (anuncio.Distancia / 1000).toFixed(3) +
      " km</p>" +
      "<a href='#' onclick='abrirAnuncio(" +
      anuncio.idAnuncio +
      ")'>Enviar mensagem</a>"
  );
}

/**Função para abrir um anuncio no mapa para enviar uma mensagem  */
function abrirAnuncio(id) {
  localStorage.setItem("idAnuncio", parseInt(id));
  window.location = "enviarMensagem.html";
}

/**Função que permite pesquisar a localização atraves da barra de pesquisa e mostra na tela
 * Recebe a string do utilizador e vai sugerindo e quando clicando da as coords e nome da zona de localização
*/
async function geolocalizacao(event) {
  var localizacao = event.target.value;

  if (localizacao.trim() !== "") {
    var resultados = await $.ajax({
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${localizacao}.json?country=pt&limit=5&proximity=ip&types=place%2Cpostcode%2Caddress&language=pt&access_token=pk.eyJ1IjoiZ2FzZGYyMiIsImEiOiJjbDFvN3RkancwMnVrM2RrYnNjZGJhYTduIn0.IuFv3hseMpUHRZY-TnhbDw`,
      method: "get",
      dataType: "json",
    });

    var html = "";

    for (var resultado of resultados.features) {
      html += `
      <button onclick="selecionarLocalizacao(${resultado.center[0]}, ${resultado.center[1]})" type="button">${resultado.place_name_pt}</button>`;
    }

    document.querySelector("#resultados").innerHTML = html;
  } else {
    document.querySelector("#resultados").innerHTML = "";
  }
}

/** Função ao clicar no botão mostra localização selecionado*/
function selecionarLocalizacao(longitude, latitude) {
  if (map) {
    map.remove();
    carregarMapa();
  }
  var locUtilizador = [latitude, longitude];
  carregarAnunciosMapa(
    map,
    locUtilizador,
    25000
  ); /** distancia maxima 25000metros */
  map.setView(locUtilizador, 8);
}
