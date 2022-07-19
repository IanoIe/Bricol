
var fotos

var enviMensgInf

/**Função que permite o utilizador enviar mensagem apartir do anuncio mostrado no mapa */
function comentarAnuncioMapa() {
    url = '/api/envMeng/'
    idAnuncio = localStorage.getItem("idAnuncio")
    console.log(idAnuncio)
 
    $.ajax({
        url: url + idAnuncio,
        method: 'get',
        success: function (resultado) {
            enviMensgInf = resultado.data;
            var anun = "<div class='container2'>" 
            for (let index = 0; index < enviMensgInf.length; index++) {
                const element = enviMensgInf[index];
                anun += "<div><img src='"+element.Url+
                "' class='iconDetails'/></div><div style='margin-left:0px;'><h3>"+"Titulo: "+
                element.Titulo+"</h3><div style='font-size:1.6.6em'><h4>"+"Discriçao: "+element.Descricao+
                "</h4></div><div style='font-size:1.0em'><h4>"+"Data da criação: "+element.DatAnuncio.split("T").splice(0,1)+"</h4></div></div>"               
            }
            UmAnuncio.innerHTML = anun
        }
    })   
}

/**Função para submeter as mensagens na pagina principal (idUtilizador, e idAnuncio)*/
function submeter(){
    var mensagem = document.getElementById("mensagem").value;
    console.log("mensagem: "+ mensagem)
    url = '/api/envMeng/guardar/'
    $.ajax({
        url: url + idAnuncio,
        method: 'post',
        data:{
            mensagem: mensagem,
            idUtilizador: localStorage.getItem("idUtilizador"),
            idAnuncio: localStorage.getItem("idAnuncio")
        },
        success: function (resultado) {
            if(resultado.code==200){
                window.location='main.html';
            }
        }
    })
}

