

function carregarMensagens() {
    url = '/api/mensagem/conversas/utilizador/'
    idUtilizador = localStorage.getItem("idUtilizador")
 
    $.ajax({
        url: url + idUtilizador,
        method: 'get',
        success: function (resultado) {
            let chats = resultado.data;
            let mensagens = "<ul>";

            for (let index = 0; index < chats.length; index++) {
                const chat = chats[index];

                mensagens += "<li><a class='thumbnail' onclick='abrirModal("+chat.Utilizador_idUtilizador+","+chat.Anuncio_idAnuncio+")'>"+
                chat.UtilizadorNome.charAt(0)+"</a><div class='content'><h3>"+
                chat.UtilizadorNome+" ("+chat.TituloAnuncio+")</h3></div></li>" 
            }
            mensagem.innerHTML = mensagens+"</ul>"
        }
    })   
}

function abrirModal(Utilizador_idUtilizador, idAnuncio){
    window.location = "#open-modal"
    localStorage.setItem("Utilizador_idUtilizador", Utilizador_idUtilizador);
    localStorage.setItem("idAnuncio", idAnuncio);
    let idUtilizador = localStorage.getItem("idUtilizador");

    obterMensagens(Utilizador_idUtilizador, idAnuncio);   
}

function submeter(){
    let mensagem = document.getElementById("mensagemSubmeter").value;
    let url = '/api/envMeng/guardar/'
    let idUtilizador = localStorage.getItem("Utilizador_idUtilizador")
    let idAnuncio = localStorage.getItem("idAnuncio")
    $.ajax({
        url: url + localStorage.getItem("idUtilizador"),
        method: 'post',
        data:{
            mensagem: mensagem,
            idUtilizador: idUtilizador,
            idAnuncio: idAnuncio
        },
        success: function (resultado) {
            if(resultado.code==200) {
                mensagemSubmeter.value = ""
                obterMensagens(idUtilizador, idAnuncio);
            }
        }
    })
}

function obterMensagens(Utilizador_idUtilizador, idAnuncio) {
    $.ajax({
        url: '/api/mensagem/utilizador/'+Utilizador_idUtilizador+'/anuncio/'+idAnuncio,
        method: 'get',
        success: function (resultado) {
            let msgs = resultado.data;
            let msgsHtml = "<ul class='chat'>";
            console.log(msgs)
            for (let index = 0; index < msgs.length; index++) {
                const msg = msgs[index];
                const tipoMensagem = msg.Remetente_idUtilizador == idUtilizador ? 'remetente' : 'destinatario';

                msgsHtml += "<li class='"+tipoMensagem+"'><div><span>"+msg.Mensagem+"</span></div>"+
                "<small>"+msg.dataCriacao+"</small></li>";
            }
            mensagens.innerHTML = msgsHtml+"</ul>"
        }
    })
}
