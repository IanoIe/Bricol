
var anunciosInf

function carregarAnuncios() {
    url = '/api/anuncio/'
    idUtilizador = localStorage.getItem("idUtilizador")
 
    $.ajax({
        url: url + idUtilizador,
        method: 'get',
        success: function (resultado) {
            anunciosInf = resultado.data;
            console.log(anunciosInf)

            var anun = "<div class='container2'>" 
            for (let index = 0; index < anunciosInf.length; index++) {
                const element = anunciosInf[index];
                anun += "<div><img src='"+element.Url+
                "' class='iconDetails'/></div><div style='margin-left:60px;'><h4>"+
                element.Titulo+"</h4><div style='font-size:1.6.6em'>"+element.Descricao+
                "</div><div style='font-size:1.6em'>"+element.DatAnuncio.split("T").splice(0,1)+"</div></div>"
                
            }
            anuncios.innerHTML = anun
        }
    })
    
}