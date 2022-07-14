const { format } = require("express/lib/response");

var fotos;

var localizacao;

var marker;

var anunciosInf;

/**Função que permite mostrar os meus anuncios */
function carregarMyAnuncios() {
  url = "/api/myAnuncio/";
  idUtilizador = localStorage.getItem("idUtilizador");

  $.ajax({
    url: url + idUtilizador,
    method: "get",
    success: function (resultado) {
      anunciosInf = resultado.data;
      var container = document.createElement("div");
      container.className = "container2";
      container.style = "display: flex; flex-direction: column";
      var anun = "<div class='container2'>";
      for (let index = 0; index < anunciosInf.length; index++) {
        var anuncio = anunciosInf[index];
        containerAnuncio = document.createElement("div");
        containerAnuncio.style = "display:inline-block; margin-bottom: 20px";
        containerImg = document.createElement("img");
        containerImg.src = anuncio.Url;
        containerImg.className = "iconDetails" + "</div>";
        containerDescricao = document.createElement("div");
        containerDescricao.innerHTML =
          "<div><h4>Titulo: " +
          anuncio.Titulo +
          "</h4>" +
          "<div style='font-size:1.6.6em'>Discrição: " +
          anuncio.Descricao +
          "</div>" +
          "<div style='font-size:1.0em'>Data da criação: " +
          anuncio.DatAnuncio.split("T")[0] +
          "</div>" +
          "<button onclick='removerAnuncio(" +
          anuncio.idAnuncio +
          ")'>Apagar Anúncio</button>" +
          "</div>";
        console.log(anuncio);
        containerAnuncio.appendChild(containerImg);
        containerAnuncio.appendChild(containerDescricao);
        container.appendChild(containerAnuncio);
      }
      MyAnuncios.appendChild(container);
    },
  });
}

/** Função que permite fazer upload da imagem e guardar no Imgbb*/
function uploadImg() {
  var file = document.getElementById("input_img");
  var form = new FormData();
  form.append("image", file.files[0]);

  $.ajax({
    url: "https://api.imgbb.com/1/upload?key=d54931f6597af555fc8dfdbb69742ceb",
    method: "POST",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  }).done(function (rep) {
    var jx = JSON.parse(rep);
    uploadAnuncio(localStorage.getItem("idUtilizador"), jx.data.url);
  });
}

/** Função que permite enviar anuncio a base de dados */
function uploadAnuncio(idUtilizador, url) {
  $.ajax({
    url: "/api/myAnuncio/guardar/Localizacao",
    method: "post",
    data: localizacao,

    success: function (status, result) {
      console.log(result);
      alert("Localização guardada com sucesso");
    },
    error: function (status, result) {
      console.log(status);
    },
  }).done(function (rep) {
    console.log(rep);
    $.ajax({
      url: "/api/myAnuncio/guardar/Anuncio",
      method: "post",
      data: {
        Titulo: document.getElementById("ftitulo").value,
        Descricao: document.getElementById("ftext").value,
        DatAnuncio: new Date(document.getElementById("dia").value)
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        Localizacao_idLocalizacao: rep.insertId,
        Utilizador_idUtilizador: idUtilizador,
      },

      success: function (status, result) {
        console.log(result);
        alert("Anuncio guardado com sucesso!");
      },
      error: function (status, result) {
        console.log(status);
      },
    }).done(function (rep) {
      console.log(rep);
      $.ajax({
        url: "/api/myAnuncio/guardar/Imagem",
        method: "post",
        data: {
          Url: url,
          DatImagem: new Date(document.getElementById("dia").value)
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          Anuncio_idAnuncio: rep.insertId,
        },

        success: function (status, result) {
          console.log(result);
          alert("Imagem guardada com sucesso");
          window.location.reload();
        },
        error: function (status, result) {
          console.log(status);
        },
      });
    });
  });
}

/*Função que permite apagar Anuncio*/
function removerAnuncio(id) {
  console.log(id);
  $.ajax({
    url: "/api/myAnuncio/apagarInfo/" + id,
    method: "delete",
    success: function (resultado) {
      console.log(resultado);
    },
  }).done(function (rep) {
    $.ajax({
      url: "/api/myAnuncio/apagarMensagens/" + id,
      method: "delete",
      success: function (resultado) {
        console.log(resultado);
      },
    }).done(function (rep) {
      $.ajax({
        url: "/api/myAnuncio/apagar/" + id,
        method: "delete",
        success: function (resultado) {
          console.log(resultado);
          window.location.reload();
        },
      });
    });
  });
}

/** Função carregar o mapa */
function carregarMapa(idElement) {
  map = L.map("map").setView([38.7015863, -9.1566962], 8);
  // osm layer
  var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
  osm.addTo(map);

  map.on("click", function (e) {
    if (marker) {
      marker.remove();
      localizacao = null;
    }
    marker = new L.marker(e.latlng).addTo(map);
    localizacao = {
      Latitude: e.latlng.lng,
      Longitude: e.latlng.lat,
    };
  });
}
