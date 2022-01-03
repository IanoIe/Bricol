
var mensagemInf

function carregarMensagens() {
    url = '/api/mensagem/'
    idUtilizador = localStorage.getItem("idUtilizador")
 
    $.ajax({
        url: url + idUtilizador,
        method: 'get',
        success: function (resultado) {
            mensagemInf = resultado.data;
            
            var mensagens = "<ul>";
            for (let index = 0; index < mensagemInf.length; index++) {
                const element = mensagemInf[index];
                mensagens += "<li><a class='thumbnail' onclick='abrirModal("+element.idAnuncio+")'>"+
                element.Nome.charAt(0)+"</a><div class='content'><h3>"+
                element.Nome+"</h3><span class='preview'>"+
                element.Mensagem+"</span><span class='meta'>"+
                element.dataCriacao.split("T").splice(0,1)+"</span></div></li>" 
            }
            mensagem.innerHTML = mensagens+"</ul>"
            
        }
    })   
}

function abrirModal(id){
    window.location = "#open-modal"
    localStorage.setItem("id", id);
}

function submeter(){
    var mensagem = document.getElementById("mensagemSubmeter").value;
    var idAnuncio = localStorage.getItem("id")
    url = '/api/envMeng/guardar/'
    $.ajax({
        url: url + idAnuncio,
        method: 'post',
        data:{
            mensagem: mensagem,
            idUtilizador: localStorage.getItem("idUtilizador") 
        },
        success: function (resultado) {
            if(resultado.code==200){
                window.location='main.html';
            }
        }
    })
}

