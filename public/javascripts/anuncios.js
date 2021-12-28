const { format } = require("express/lib/response");

var fotos

var anunciosInf

function carregarAnuncios() {
    url = '/api/anuncio/'
    idUtilizador = localStorage.getItem("idUtilizador")
 
    $.ajax({
        url: url + idUtilizador,
        method: 'get',
        success: function (resultado) {
            anunciosInf = resultado.data;
            var anun = "<div class='container2'>" 
            for (let index = 0; index < anunciosInf.length; index++) {
                const element = anunciosInf[index];
                anun += "<div><img src='"+element.Url+
                "' class='iconDetails'/></div><div style='margin-left:60px;'><h4>"+"Titulo: "+
                element.Titulo+"</h4><div style='font-size:1.6.6em'>"+"Discriçao: "+element.Descricao+
                "</div><div style='font-size:1.0em'>"+"Data da criação: "+element.DatAnuncio.split("T").splice(0,1)+"</div></div>"               
            }
            anuncios.innerHTML = anun
        }
    })   
}
