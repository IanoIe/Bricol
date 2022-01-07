var tituloAnunc
var descricaoAnunc
var datCraicaoAnunc

var latImgUploadAnun
var lngImgUploadAnunc


window.onload = function(){
    conteudoImagem = document.getElementById("conteudoImagem")
    tituloAnunc = document.getElementById()
}

/** Função que permite fazer upload da imagem, guardando-na no Imgbb */
function uploadImg(){
    var file = document.getElementById('input_img');
    var form = new FormData();
    form.append('image',file.files[0])

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
        uploadImgBD(localStorage.getItem('idUtilizador'), jx.data.url)
    })
}

/** Função que permite enviar imagens a base de dado */
function uploadImgBD(idUtilizador, url){
    $.ajax({
        url: '/api/utilizador/'+idUtilizador+'/imagens/upload',
        method: 'post',
        data: {
            lat: latImgUpload.value,
            lng: lngImgUpload.value,
            url: url
        },
        success: function(status, result){
            console.log(result)
            alert("Imagem guardado com sucesso")
            location.reload();
        },
        error: function(status, result) {
            console.log(status);
        }
    })
}