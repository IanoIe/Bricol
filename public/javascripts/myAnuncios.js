const { format } = require("express/lib/response");

var fotos

var anunciosInf

function carregarMyAnuncios() {
    url = '/api/myAnuncio/'
    idUtilizador = localStorage.getItem("idUtilizador")
 
    $.ajax({
        url: url + idUtilizador,
        method: 'get',
        success: function (resultado) {
            anunciosInf = resultado.data;
            var container = document.createElement('div')
            container.className = 'container2';
            container.style = "display: flex; flex-direction: column"
            var anun = "<div class='container2'>" 
            for (let index = 0; index < anunciosInf.length; index++) {
                var anuncio = anunciosInf[index];
                containerAnuncio = document.createElement('div');
                containerAnuncio.style = "display:inline-block; margin-bottom: 20px";
                containerImg = document.createElement('img');
                containerImg.src = anuncio.Url;
                containerImg.className = 'iconDetails'+'</div>'
                containerDescricao = document.createElement('div');
                containerDescricao.innerHTML = "<div><h4>Titulo: "+anuncio.Titulo+"</h4>"+
                                                "<div style='font-size:1.6.6em'>Discrição: "+anuncio.Descricao+"</div>"+
                                                "<div style='font-size:1.0em'>Data da criação: "+anuncio.DatAnuncio.split("T")[0]+"</div></div>";
                console.log(containerAnuncio)
                containerAnuncio.appendChild(containerImg);
                containerAnuncio.appendChild(containerDescricao);
                container.appendChild(containerAnuncio);
            }
            //MyAnuncios.innerHTML = anun
            MyAnuncios.appendChild(container);
        }
    })   
}

/** Função que permite fazer upload da imagem e guardar no Imgbb*/
function uploadImg() {
    var file = document.getElementById('input_img');
    var form = new formatData();
    form.append('image', file.files[0])

    $.ajax(
        {
            'url': 'https://api.imgbb.com/1/upload?key=d54931f6597af555fc8dfdbb69742ceb',
            'method': 'POST',
            'timeout': 0,
            'processData': false,
            'mimeType': 'multipart/form-data',
            'contentType': false,
            'data': form
        }
    ).done(function(rep){
        var jx = JSON.parse(rep)
        uploadFotoBD(localStorage.getItem('idUtilizador'), jx.data.url)
    })   
}

/** Função que permite enviar imagens a base de dados */
function uploadFotoBD(idUtilizador, url){
    $.ajax({
        url: '/api/utilizador/'+idUtilizador+'/fotos/upload',
        method: 'post',
        data: {
            Titulo: " ",
            Discricao: " ",
            DataCriacao: " ",
            Localizacao: " ",
            url: url
        },

        success: function(status, result){
            console.log(result)
            alert("Imagem guardada com sucesso")
            location.reload()
        },
        error: function(status, result){
            console.log(status)
        }
    })
}