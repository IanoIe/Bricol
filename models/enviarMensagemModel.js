var mysql = require('./connection').pool

module.exports.getEnviarMensagem = function(id, callback){
    console.log("model: "+id)
    mysql.getConnection(function(err, conn){
        if(err){
            callback(err, {code:500, status: "Erro de ligação a BD!"});
            return
        }
        
        conn.query("select Titulo, Descricao, DatAnuncio, Url, Longitude, Latitude from Anuncio, Imagens, Localizacao where Anuncio_idAnuncio = idAnuncio and Localizacao_idLocalizacao = idLocalizacao and idAnuncio = ?", id,
            function (err, result) {
                
                conn.release();
                callback(false, {code: 200, status: "ok", data: result})
                
            })
    })  
}

module.exports.guardarMensagem = function(data, callback){
    console.log(data)
    mysql.getConnection(function(err, conn){
        if(err){
            callback(err, {code:500, status: "Erro de ligação a BD!"});
            return
        }
        conn.query("insert into Mensagens (Mensagem, dataCriacao, Utilizador_idUtilizador, Anuncio_idAnuncio) values (?,?,?,?)", data,
            function (err, result) {
                if(err){
                    console.log(err)
                    return
                }
                conn.release();
                callback(false, {code: 200, status: "ok", data: result})
                
            })
    })
}